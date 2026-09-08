-- Booking abuse hardening (findings from 2026-09-08 security audit).
--
--   1. create_reservation: the p_duration_hours parameter was client-controlled;
--      duration <= 0 defeated the overlap check (double-booking), large values
--      blocked huge windows. Parameter removed — duration is fixed server-side.
--   2. create_reservation: no booking horizon meant anon could book out the
--      restaurant years ahead (booking DoS). Now max 90 days in advance.
--   3. create_reservation: unbounded text fields allowed multi-MB rows and
--      email-template injection payloads. Now length-capped.
--   4. create_reservation: per-email cap — max 3 active future reservations.
--   5. get_available_tables: duration clamped to sane range.
--   6. visitors: anon could insert arbitrary columns/values; now only
--      number_of_guests (1..50) can be supplied.
--   7. private.app_secrets + get_cron_secret(): shared secret so only the
--      pg_cron job (not anyone with the public anon key) can trigger the
--      reminder edge function.
--
-- Safe to run multiple times.

-- ============================================================================
-- 1-4. Rebuild create_reservation without client-controlled duration.
-- ============================================================================

drop function if exists public.create_reservation(text, integer, date, time, text, text, text, text, integer);

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
    c_duration_hours constant integer := 2;   -- fixed server-side, never client input
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
    -- ---- input validation -------------------------------------------------
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

    -- Serialize per-email first, then per-date (consistent order avoids deadlocks).
    perform pg_advisory_xact_lock(hashtext('email:' || lower(trim(p_email))));
    perform pg_advisory_xact_lock(hashtext(p_reservation_date::text));

    -- ---- per-email cap on active future reservations ------------------------
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

    -- ---- blocked-slot check ------------------------------------------------
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

    -- ---- table selection over currently-available tables -------------------
    select avail.table_id into v_reservation_id  -- reuse var briefly, cleared below
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

    -- ---- persist -----------------------------------------------------------
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

    return query select true, v_reservation_id, null::text;
end;
$$;

grant execute on function public.create_reservation(text, integer, date, time, text, text, text, text) to anon, authenticated;

-- ============================================================================
-- 5. Clamp duration inside get_available_tables (defense in depth).
-- ============================================================================

create or replace function public.get_available_tables(
    check_date date,
    check_time time without time zone,
    reservation_duration_hours integer default 2
)
returns table(table_id bigint, label text, capacity integer, is_combinable boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_duration integer := greatest(1, least(coalesce(reservation_duration_hours, 2), 12));
begin
    return query
    select t.id, t.label, t.capacity, t.is_combinable
    from public.tables t
    where t.id not in (
        select distinct rt.table_id
        from public.reservation_tables rt
        join public.reservations r on r.id = rt.reservation_id
        where r.reservation_date = check_date
          and r.cancelled_at is null
          and check_time < (r.reservation_time + (v_duration || ' hours')::interval)::time
          and (check_time + (v_duration || ' hours')::interval)::time > r.reservation_time
    )
    order by t.capacity, t.label;
end;
$$;

-- ============================================================================
-- 6. visitors: anon may only supply number_of_guests, within sane bounds.
-- ============================================================================

revoke insert on public.visitors from anon;
grant insert (number_of_guests) on public.visitors to anon;

drop policy if exists "anon can insert visitors" on public.visitors;
create policy "anon can insert visitors" on public.visitors
    for insert to anon
    with check (number_of_guests between 1 and 50);

-- ============================================================================
-- 7. Cron shared secret: only the scheduled job may trigger the reminder run.
--    The secret lives in a private schema (not exposed via PostgREST) and is
--    readable by the edge function only through a service-role-gated RPC.
-- ============================================================================

create schema if not exists private;

create table if not exists private.app_secrets (
    name text primary key,
    value text not null,
    created_at timestamptz not null default now()
);

insert into private.app_secrets (name, value)
values ('cron_secret', encode(gen_random_bytes(32), 'hex'))
on conflict (name) do nothing;

create or replace function public.get_cron_secret()
returns text
language sql
stable
security definer
set search_path = public
as $$
    select value from private.app_secrets where name = 'cron_secret';
$$;

revoke execute on function public.get_cron_secret() from public, anon, authenticated;
grant execute on function public.get_cron_secret() to service_role;
