-- Server-side booking confirmation emails (kills the EmailJS open relay).
--
-- Previously the browser sent booking emails via @emailjs/browser using the
-- public EmailJS key baked into the JS bundle — anyone could extract the key +
-- template ids and send arbitrary emails through the restaurant's EmailJS
-- account. Now:
--   * create_reservation enqueues an async pg_net call to the `booking-emails`
--     edge function (authenticated with the internal secret).
--   * The function loads the reservation from the DB and emails ONLY its stored
--     address — recipient and content can never be attacker-controlled.
--   * confirmation_sent_at is claimed atomically first, so exactly one
--     confirmation is ever sent per reservation.
--
-- Safe to run multiple times.

alter table public.reservations
    add column if not exists confirmation_sent_at timestamptz;

-- Historic rows already got their (client-side) confirmation.
update public.reservations
set confirmation_sent_at = created_at
where confirmation_sent_at is null;

-- EmailJS template ids move server-side (they were public in the bundle before).
insert into private.app_secrets (name, value) values
    ('emailjs_confirmation_template_id', 'template_ay63wh9'),
    ('emailjs_restaurant_template_id', 'template_yd4ztjg')
on conflict (name) do nothing;

-- Generic secret accessor for edge functions (service role only).
create or replace function public.get_app_secret(p_name text)
returns text
language sql
stable
security definer
set search_path = public
as $$
    select value from private.app_secrets where name = p_name;
$$;

revoke execute on function public.get_app_secret(text) from public, anon, authenticated;
grant execute on function public.get_app_secret(text) to service_role;

-- ============================================================================
-- create_reservation: enqueue the confirmation email server-side after commit.
-- (Body otherwise identical to 20260908160000_booking_abuse_hardening.sql.)
-- ============================================================================

create or replace function public.create_reservation(
    p_customer_name     text,
    p_number_of_guests  integer,
    p_reservation_date  date,
    p_reservation_time  time,
    p_email             text,
    p_phone             text,
    p_promo_code        text default null,
    p_additional_wishes text default null
)
returns table (
    success         boolean,
    reservation_id  integer,
    error           text
)
language plpgsql
security definer
set search_path = public
as $$
declare
    c_duration_hours constant integer := 2;
    c_max_days_ahead constant integer := 90;
    c_max_guests     constant integer := 20;
    c_max_per_email  constant integer := 3;
    v_reservation_id integer;
    v_running        integer := 0;
    v_table          record;
    v_selected       bigint[] := '{}';
    v_slot           record;
    v_req_minutes    integer;
    v_today          date;
begin
    if coalesce(trim(p_customer_name), '') = '' then
        return query select false, null::integer, 'Name is required.'::text; return;
    end if;
    if length(p_customer_name) > 120 then
        return query select false, null::integer, 'Name is too long.'::text; return;
    end if;
    if coalesce(trim(p_email), '') = '' or position('@' in p_email) = 0 or length(p_email) > 254 then
        return query select false, null::integer, 'A valid email is required.'::text; return;
    end if;
    if coalesce(trim(p_phone), '') = '' or length(p_phone) > 40 then
        return query select false, null::integer, 'A valid phone number is required.'::text; return;
    end if;
    if length(coalesce(p_promo_code, '')) > 60 then
        return query select false, null::integer, 'Promo code is too long.'::text; return;
    end if;
    if length(coalesce(p_additional_wishes, '')) > 1000 then
        return query select false, null::integer, 'Additional wishes are too long (max 1000 characters).'::text; return;
    end if;
    if p_number_of_guests is null or p_number_of_guests < 1 or p_number_of_guests > c_max_guests then
        return query select false, null::integer,
            format('For groups larger than %s guests, please contact the restaurant directly.', c_max_guests)::text; return;
    end if;
    if p_reservation_date is null or p_reservation_time is null then
        return query select false, null::integer, 'Date and time are required.'::text; return;
    end if;

    v_today := (now() at time zone 'Atlantic/Canary')::date;

    if (p_reservation_date + p_reservation_time) < (now() at time zone 'Atlantic/Canary') then
        return query select false, null::integer, 'Cannot book a time in the past.'::text; return;
    end if;
    if p_reservation_date > v_today + c_max_days_ahead then
        return query select false, null::integer,
            format('Reservations can be made at most %s days in advance.', c_max_days_ahead)::text; return;
    end if;

    perform pg_advisory_xact_lock(hashtext('email:' || lower(trim(p_email))));
    perform pg_advisory_xact_lock(hashtext(p_reservation_date::text));

    if (
        select count(*)
        from public.reservations r
        where lower(r.email) = lower(trim(p_email))
          and r.cancelled_at is null
          and (r.reservation_date + r.reservation_time) >= (now() at time zone 'Atlantic/Canary')
    ) >= c_max_per_email then
        return query select false, null::integer,
            'You already have several upcoming reservations. Please contact the restaurant to book more.'::text; return;
    end if;

    v_req_minutes := extract(hour from p_reservation_time) * 60
                   + extract(minute from p_reservation_time);
    for v_slot in
        select blocked_time_start, blocked_time_end, reason
        from public.blocked_slots
        where blocked_date = p_reservation_date
    loop
        if v_slot.blocked_time_start is null or v_slot.blocked_time_end is null then
            return query select false, null::integer,
                coalesce(v_slot.reason, 'This day is fully booked.')::text; return;
        end if;
        if v_req_minutes >= (extract(hour from v_slot.blocked_time_start) * 60
                             + extract(minute from v_slot.blocked_time_start))
           and v_req_minutes < (extract(hour from v_slot.blocked_time_end) * 60
                                + extract(minute from v_slot.blocked_time_end)) then
            return query select false, null::integer,
                coalesce(v_slot.reason, 'This time slot is unavailable.')::text; return;
        end if;
    end loop;

    select avail.table_id into v_reservation_id
    from public.get_available_tables(p_reservation_date, p_reservation_time, c_duration_hours) avail
    where avail.capacity >= p_number_of_guests
    order by avail.capacity asc, avail.table_id asc
    limit 1;

    if v_reservation_id is not null then
        v_selected := array[v_reservation_id::bigint];
    else
        for v_table in
            select avail.table_id, avail.capacity
            from public.get_available_tables(p_reservation_date, p_reservation_time, c_duration_hours) avail
            where avail.is_combinable
            order by avail.capacity desc, avail.table_id asc
        loop
            v_selected := v_selected || v_table.table_id;
            v_running  := v_running + v_table.capacity;
            exit when v_running >= p_number_of_guests;
        end loop;

        if v_running < p_number_of_guests then
            return query select false, null::integer,
                'Sorry, we do not have enough tables available for this time.'::text; return;
        end if;
    end if;
    v_reservation_id := null;

    insert into public.reservations (
        customer_name, number_of_guests, reservation_time, reservation_date,
        promo_code, email, phone, additional_wishes, cancellation_token
    )
    values (
        trim(p_customer_name), p_number_of_guests, p_reservation_time, p_reservation_date,
        nullif(trim(coalesce(p_promo_code, '')), ''), trim(p_email), trim(p_phone),
        nullif(trim(coalesce(p_additional_wishes, '')), ''), gen_random_uuid()::text
    )
    returning id into v_reservation_id;

    insert into public.reservation_tables (reservation_id, table_id)
    select v_reservation_id, unnest(v_selected);

    -- Enqueue the confirmation email (async via pg_net; runs after commit).
    -- Never let email plumbing fail the booking itself.
    begin
        perform net.http_post(
            url := 'https://jxvrulwcfufrcciwatjc.supabase.co/functions/v1/booking-emails',
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'x-cron-secret', (select value from private.app_secrets where name = 'cron_secret')
            ),
            body := jsonb_build_object('reservation_id', v_reservation_id)
        );
    exception when others then
        raise warning 'booking-emails enqueue failed: %', sqlerrm;
    end;

    return query select true, v_reservation_id, null::text;
end;
$$;

grant execute on function public.create_reservation(text, integer, date, time, text, text, text, text) to anon, authenticated;
