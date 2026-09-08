-- Security hardening: "authenticated" no longer means "admin".
--
-- Public auth signup is enabled on this project, and every admin policy used
-- to check only `auth.role() = 'authenticated'` — so anyone who self-registered
-- an account instantly gained full admin access (all reservations PII, menu,
-- articles, storage, calendar blocking).
--
-- This migration introduces an explicit admin whitelist:
--   1. `admin_users` table (locked down, not readable by clients) + `is_admin()`.
--   2. Every write/admin policy in public + storage now requires is_admin().
--   3. Duplicate public-read policies collapsed to one per table.
--
-- To add a future admin: insert their auth.users id into public.admin_users.
-- Safe to run multiple times.

-- ============================================================================
-- 1. Admin whitelist
-- ============================================================================

create table if not exists public.admin_users (
    user_id uuid primary key references auth.users (id) on delete cascade,
    note text,
    created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;

-- The restaurant owner's account (lamedusarestaurants@gmail.com).
insert into public.admin_users (user_id, note)
values ('a96a4609-8be1-469c-b4a7-834a1238dbcb', 'lamedusarestaurants@gmail.com — restaurant owner')
on conflict (user_id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select auth.uid() is not null
       and exists (select 1 from public.admin_users au where au.user_id = auth.uid());
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ============================================================================
-- 2. Replace "Admin full access" (ALL to authenticated) with is_admin()
-- ============================================================================

do $$
declare t text;
begin
    foreach t in array array[
        'bar_items', 'blocked_slots', 'categories', 'cocktail_items',
        'menu_items', 'reservation_tables', 'reservations', 'tables',
        'visitors', 'wines'
    ]
    loop
        execute format('drop policy if exists "Admin full access on %s" on public.%I', t, t);
        execute format(
            'create policy "Admin full access on %s" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
            t, t
        );
    end loop;
end $$;

-- ============================================================================
-- 3. Articles + article_translations: authenticated → is_admin()
-- ============================================================================

drop policy if exists "Authenticated users can insert articles" on public.articles;
drop policy if exists "Authenticated users can update articles" on public.articles;
drop policy if exists "Authenticated users can delete articles" on public.articles;
create policy "Admins can insert articles" on public.articles
    for insert to authenticated with check (public.is_admin());
create policy "Admins can update articles" on public.articles
    for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete articles" on public.articles
    for delete to authenticated using (public.is_admin());

drop policy if exists "Authenticated users can insert article translations" on public.article_translations;
drop policy if exists "Authenticated users can update article translations" on public.article_translations;
drop policy if exists "Authenticated users can delete article translations" on public.article_translations;
create policy "Admins can insert article translations" on public.article_translations
    for insert to authenticated with check (public.is_admin());
create policy "Admins can update article translations" on public.article_translations
    for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete article translations" on public.article_translations
    for delete to authenticated using (public.is_admin());

-- ============================================================================
-- 4. Menu/bar/cocktail/wine translation sidecar tables: same replacement
--    (policy names created by migration 20260901000000_menu_translations.sql)
-- ============================================================================

do $$
declare t text;
begin
    foreach t in array array[
        'category_translations', 'menu_item_translations',
        'bar_category_translations', 'bar_item_translations',
        'cocktail_category_translations', 'cocktail_item_translations',
        'wine_category_translations', 'wine_translations'
    ]
    loop
        execute format('drop policy if exists "Authenticated insert %s" on public.%I', t, t);
        execute format('drop policy if exists "Authenticated update %s" on public.%I', t, t);
        execute format('drop policy if exists "Authenticated delete %s" on public.%I', t, t);
        execute format('create policy "Admin insert %s" on public.%I for insert to authenticated with check (public.is_admin())', t, t);
        execute format('create policy "Admin update %s" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t, t);
        execute format('create policy "Admin delete %s" on public.%I for delete to authenticated using (public.is_admin())', t, t);
    end loop;
end $$;

-- ============================================================================
-- 5. Collapse duplicate public-read policies (accumulated over time) to one.
--    Menus/wines/blocked slots are public content — one clear policy each.
-- ============================================================================

-- bar_items
drop policy if exists "Allow public read bar_items" on public.bar_items;
drop policy if exists "Enable read access for all users on bar_items" on public.bar_items;
drop policy if exists "Public can read bar_items" on public.bar_items;
drop policy if exists "Public read bar_items" on public.bar_items;
create policy "Public read bar_items" on public.bar_items for select to public using (true);

-- blocked_slots
drop policy if exists "Allow anon read blocked_slots" on public.blocked_slots;
drop policy if exists "Allow anonymous read blocked_slots" on public.blocked_slots;
drop policy if exists "Public can read blocked_slots" on public.blocked_slots;
drop policy if exists "Public read blocked_slots" on public.blocked_slots;
create policy "Public read blocked_slots" on public.blocked_slots for select to public using (true);

-- categories
drop policy if exists "Enable read access for all users" on public.categories;
drop policy if exists "Public can read categories" on public.categories;
drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories for select to public using (true);

-- cocktail_items
drop policy if exists "Allow public read cocktail_items" on public.cocktail_items;
drop policy if exists "Enable read access for all users on cocktail_items" on public.cocktail_items;
drop policy if exists "Public can read cocktail_items" on public.cocktail_items;
drop policy if exists "Public read cocktail_items" on public.cocktail_items;
create policy "Public read cocktail_items" on public.cocktail_items for select to public using (true);

-- menu_items
drop policy if exists "Enable read access for all users" on public.menu_items;
drop policy if exists "Public can read menu_items" on public.menu_items;
drop policy if exists "Public read menu_items" on public.menu_items;
create policy "Public read menu_items" on public.menu_items for select to public using (true);

-- tables
drop policy if exists "Allow anonymous read tables" on public.tables;
drop policy if exists "Public can read tables" on public.tables;
drop policy if exists "Public read tables" on public.tables;
create policy "Public read tables" on public.tables for select to public using (true);

-- wines
drop policy if exists "Enable read access for all users on wines" on public.wines;
drop policy if exists "Public can read wines" on public.wines;
drop policy if exists "Public read wines" on public.wines;
create policy "Public read wines" on public.wines for select to public using (true);

-- ============================================================================
-- 6. Storage: menu + article-images buckets writable only by admins.
--    (Public read stays.)
-- ============================================================================

drop policy if exists "Admin full access on menu storage" on storage.objects;
drop policy if exists "access for admin 1zr6n_0" on storage.objects;
drop policy if exists "access for admin 1zr6n_1" on storage.objects;
drop policy if exists "access for admin 1zr6n_2" on storage.objects;
drop policy if exists "access for admin 1zr6n_3" on storage.objects;
drop policy if exists "Authenticated users can upload article images" on storage.objects;
drop policy if exists "Authenticated users can delete article images" on storage.objects;

create policy "Admin full access on menu storage" on storage.objects
    for all to authenticated
    using (bucket_id = 'menu' and public.is_admin())
    with check (bucket_id = 'menu' and public.is_admin());

create policy "Admins can upload article images" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'article-images' and public.is_admin());

create policy "Admins can delete article images" on storage.objects
    for delete to authenticated
    using (bucket_id = 'article-images' and public.is_admin());
