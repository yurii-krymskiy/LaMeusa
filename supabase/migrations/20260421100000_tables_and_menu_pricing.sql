-- Update table inventory and menu pricing metadata.

-- 1) Tables: move from old layout to 41 tables
--    - 39 tables for 2 people (combinable)
--    - 2 tables for 4 people (not combinable)

-- Keep reservations, but reset table links because table IDs are regenerated.
delete from public.reservation_tables;

delete from public.tables;

insert into public.tables (label, capacity, is_combinable)
select 'Table ' || n, 2, true
from generate_series(1, 39) as n;

insert into public.tables (label, capacity, is_combinable)
values
    ('Table 40', 4, false),
    ('Table 41', 4, false);

-- 2) Promo code check: ensure column exists (logic is already wired in app)
alter table public.reservations
    add column if not exists promo_code text;

-- 3) Optional second size price for menu items
alter table public.menu_items
    add column if not exists price_large numeric(10, 2);

-- 4) Generic unit label for price display (e.g. "per ball")
alter table public.menu_items
    add column if not exists price_unit_label text;

-- Optional seed for dessert example.
update public.menu_items
set price_unit_label = coalesce(price_unit_label, 'per ball')
where lower(title) = 'assorted ice cream';
