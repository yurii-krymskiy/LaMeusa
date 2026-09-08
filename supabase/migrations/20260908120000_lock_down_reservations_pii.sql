-- Security hardening: stop leaking customer PII to the public (anon) role.
--
-- Before this migration the `reservations` and `reservation_tables` tables were
-- readable by anyone holding the (public) anon key, exposing customer name,
-- email, phone and wishes. The public booking flow also inserted rows directly
-- and computed availability client-side, which required that open read access.
--
-- This migration:
--   1. Removes ALL anon read/insert access to reservations & reservation_tables.
--   2. Adds a SECURITY DEFINER `create_reservation` RPC that validates input and
--      availability server-side, so the public form never touches raw rows.
--   3. Makes availability RPCs SECURITY DEFINER (they must read the now-locked
--      tables on behalf of anon) with a fixed search_path.
--   4. Revokes dangerous RPC grants from anon (reminder dump, calendar blocking).
--   5. Cleans up duplicate policies and pins search_path on all functions.
--
-- Safe to run multiple times.

-- ============================================================================
-- 1. reservations / reservation_tables: drop all the permissive anon policies.
--    Admin (authenticated) keeps full access via "Admin full access ..." policy.
-- ============================================================================

drop policy if exists "Public can read reservations"        on public.reservations;
drop policy if exists "Allow anonymous read reservations"    on public.reservations;
drop policy if exists "Public can insert reservations"       on public.reservations;
drop policy if exists "Allow anonymous insert reservations"  on public.reservations;

drop policy if exists "Public can read reservation_tables"       on public.reservation_tables;
drop policy if exists "Allow anonymous read reservation_tables"  on public.reservation_tables;
drop policy if exists "Public can insert reservation_tables"      on public.reservation_tables;
drop policy if exists "Allow anonymous insert reservation_tables" on public.reservation_tables;

-- Make sure RLS stays on (no anon policy left => anon is fully denied).
alter table public.reservations       enable row level security;
alter table public.reservation_tables enable row level security;

-- ============================================================================
-- 2. Server-side, validated public booking entry point.
--    SECURITY DEFINER so it can read tables / insert rows despite anon having
--    no direct table privileges. All availability logic lives here.
-- ============================================================================

create or replace function public.create_reservation(
    p_customer_name     text,
    p_number_of_guests  integer,
    p_reservation_date  date,
    p_reservation_time  time,
    p_email             text,
    p_phone             text,
    p_promo_code        text default null,
    p_additional_wishes text default null,
    p_duration_hours    integer default 2
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
    v_reservation_id integer;
    v_running        integer := 0;
    v_table          record;
    v_selected       bigint[] := '{}';
    v_slot           record;
    v_req_minutes    integer;
begin
    -- ---- input validation -------------------------------------------------
    if coalesce(trim(p_customer_name), '') = '' then
        return query select false, null::integer, 'Name is required.'::text; return;
    end if;
    if coalesce(trim(p_email), '') = '' or position('@' in p_email) = 0 then
        return query select false, null::integer, 'A valid email is required.'::text; return;
    end if;
    if coalesce(trim(p_phone), '') = '' then
        return query select false, null::integer, 'A phone number is required.'::text; return;
    end if;
    if p_number_of_guests is null or p_number_of_guests < 1 or p_number_of_guests > 100 then
        return query select false, null::integer, 'Invalid number of guests.'::text; return;
    end if;
    if p_reservation_date is null or p_reservation_time is null then
        return query select false, null::integer, 'Date and time are required.'::text; return;
    end if;
    -- reject bookings in the past (Tenerife local time)
    if (p_reservation_date + p_reservation_time)
       < (now() at time zone 'Atlantic/Canary') then
        return query select false, null::integer, 'Cannot book a time in the past.'::text; return;
    end if;

    -- Serialize concurrent bookings for the same date to avoid double-booking
    -- races between the availability check and the insert below.
    perform pg_advisory_xact_lock(hashtext(p_reservation_date::text));

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
    -- Prefer a single table that fits (smallest excess capacity first).
    select avail.table_id into v_reservation_id  -- reuse var briefly, cleared below
    from public.get_available_tables(p_reservation_date, p_reservation_time, p_duration_hours) avail
    where avail.capacity >= p_number_of_guests
    order by avail.capacity asc, avail.table_id asc
    limit 1;

    if v_reservation_id is not null then
        v_selected := array[v_reservation_id::bigint];
    else
        -- Combine combinable tables, largest first, until capacity is met.
        for v_table in
            select avail.table_id, avail.capacity
            from public.get_available_tables(p_reservation_date, p_reservation_time, p_duration_hours) avail
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

-- ============================================================================
-- 3. Availability RPCs must run as owner now that anon can't read the tables.
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
          and check_time < (r.reservation_time + (reservation_duration_hours || ' hours')::interval)::time
          and (check_time + (reservation_duration_hours || ' hours')::interval)::time > r.reservation_time
    )
    order by t.capacity, t.label;
end;
$$;

create or replace function public.get_capacity_stats(
    check_date date,
    check_time time without time zone
)
returns table(total_tables bigint, occupied_tables bigint, available_tables bigint,
              total_capacity bigint, available_capacity bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
    return query
    with available as (
        select * from public.get_available_tables(check_date, check_time)
    )
    select
        (select count(*) from public.tables)::bigint,
        ((select count(*) from public.tables) - (select count(*) from available))::bigint,
        (select count(*) from available)::bigint,
        (select coalesce(sum(capacity), 0) from public.tables)::bigint,
        (select coalesce(sum(capacity), 0) from available)::bigint;
end;
$$;

-- ============================================================================
-- 4. Lock down function EXECUTE grants.
-- ============================================================================

-- Public booking + availability: anon may call these (they expose no PII).
grant execute on function public.create_reservation(text, integer, date, time, text, text, text, text, integer) to anon, authenticated;
grant execute on function public.get_available_tables(date, time, integer) to anon, authenticated;
grant execute on function public.get_capacity_stats(date, time) to anon, authenticated;

-- PII dump: only the service role (edge function) may run this. Never anon.
revoke execute on function public.get_reservations_due_for_reminder(text, interval, interval) from anon, public;

-- Calendar blocking is an admin action; anon must not be able to block dates.
revoke execute on function public.block_date(date, text) from anon, public;
revoke execute on function public.block_time_range(date, time, time, text) from anon, public;

-- cancel_reservation_by_token is invoked by the edge function with the service
-- role; it also requires a secret token, so leaving anon execute is harmless,
-- but we pin its search_path below.

-- ============================================================================
-- 5. Pin search_path on remaining functions (advisor: function_search_path_mutable).
-- ============================================================================

alter function public.get_reservations_due_for_reminder(text, interval, interval) set search_path = public;
alter function public.cancel_reservation_by_token(text, text) set search_path = public;
alter function public.block_date(date, text) set search_path = public;
alter function public.block_time_range(date, time, time, text) set search_path = public;
