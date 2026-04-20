-- Reservation reminders and self-cancellation support
-- Safe to run multiple times.

create extension if not exists pgcrypto;

alter table public.reservations
    add column if not exists cancellation_token text,
    add column if not exists cancelled_at timestamptz,
    add column if not exists reminder_sent_at timestamptz;

update public.reservations
set cancellation_token = gen_random_uuid()::text
where cancellation_token is null;

alter table public.reservations
    alter column cancellation_token set not null;

create unique index if not exists reservations_cancellation_token_uidx
    on public.reservations (cancellation_token);

create index if not exists reservations_due_reminder_idx
    on public.reservations (reservation_date, reservation_time)
    where cancelled_at is null and reminder_sent_at is null;

-- Returns reservations that should receive a reminder around the configured lead time.
create or replace function public.get_reservations_due_for_reminder(
    p_timezone text default 'Atlantic/Canary',
    p_target_lead interval default interval '2 hours',
    p_window interval default interval '5 minutes'
)
returns table (
    id integer,
    customer_name text,
    email text,
    phone text,
    number_of_guests integer,
    reservation_date date,
    reservation_time time,
    additional_wishes text,
    cancellation_token text,
    reservation_ts timestamptz
)
language sql
stable
as $$
    with reservations_with_ts as (
        select
            r.id,
            r.customer_name,
            r.email,
            r.phone,
            r.number_of_guests,
            r.reservation_date,
            r.reservation_time,
            r.additional_wishes,
            r.cancellation_token,
            (
                (
                    r.reservation_date::text || ' ' || split_part(r.reservation_time::text, '.', 1)
                )::timestamp at time zone p_timezone
            ) as reservation_ts
        from public.reservations r
        where r.cancelled_at is null
          and r.reminder_sent_at is null
          and coalesce(r.email, '') <> ''
    )
    select *
    from reservations_with_ts
    where reservation_ts >= now() + p_target_lead - p_window
      and reservation_ts < now() + p_target_lead + p_window
    order by reservation_ts asc;
$$;

-- Cancels a reservation by one-time token if reservation has not started yet.
create or replace function public.cancel_reservation_by_token(
    p_token text,
    p_timezone text default 'Atlantic/Canary'
)
returns table (
    success boolean,
    reservation_id integer,
    message text
)
language plpgsql
as $$
declare
    v_reservation_id integer;
    v_already_cancelled boolean;
    v_started boolean;
begin
    select
        r.id,
        (r.cancelled_at is not null) as already_cancelled,
        (
            (
                (
                    r.reservation_date::text || ' ' || split_part(r.reservation_time::text, '.', 1)
                )::timestamp at time zone p_timezone
            ) <= now()
        ) as started
    into v_reservation_id, v_already_cancelled, v_started
    from public.reservations r
    where r.cancellation_token = p_token;

    if v_reservation_id is null then
        return query select false, null::integer, 'Invalid cancellation link.'::text;
        return;
    end if;

    if v_already_cancelled then
        return query select true, v_reservation_id, 'Reservation is already cancelled.'::text;
        return;
    end if;

    if v_started then
        return query select false, v_reservation_id, 'Reservation has already started and cannot be cancelled online.'::text;
        return;
    end if;

    update public.reservations
    set cancelled_at = now()
    where id = v_reservation_id
      and cancelled_at is null;

    return query select true, v_reservation_id, 'Reservation cancelled successfully.'::text;
end;
$$;
