-- Multi-language menu content, mirroring public.article_translations.
-- Scope: food fully translatable (title + description + category name);
-- drinks translate category name + description only (product names kept as-is).
-- Supported languages: en, uk, es, it, fr, de, nl.

-- ============ FOOD: menu items (title + description) ============
create table if not exists public.menu_item_translations (
    id uuid primary key default gen_random_uuid(),
    menu_item_id uuid not null references public.menu_items(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    title text not null default '',
    description text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (menu_item_id, language)
);
create index if not exists menu_item_translations_item_id_idx on public.menu_item_translations (menu_item_id);

-- ============ FOOD: categories (name) ============
create table if not exists public.category_translations (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.categories(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    name text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (category_id, language)
);
create index if not exists category_translations_category_id_idx on public.category_translations (category_id);

-- ============ COCKTAILS: category name ============
create table if not exists public.cocktail_category_translations (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.cocktail_categories(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    name text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (category_id, language)
);
create index if not exists cocktail_category_translations_category_id_idx on public.cocktail_category_translations (category_id);

-- ============ COCKTAILS: item description (name kept as-is) ============
create table if not exists public.cocktail_item_translations (
    id uuid primary key default gen_random_uuid(),
    cocktail_item_id uuid not null references public.cocktail_items(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    description text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (cocktail_item_id, language)
);
create index if not exists cocktail_item_translations_item_id_idx on public.cocktail_item_translations (cocktail_item_id);

-- ============ BAR: category name ============
create table if not exists public.bar_category_translations (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.bar_categories(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    name text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (category_id, language)
);
create index if not exists bar_category_translations_category_id_idx on public.bar_category_translations (category_id);

-- ============ BAR: item description (name/brand kept as-is) ============
create table if not exists public.bar_item_translations (
    id uuid primary key default gen_random_uuid(),
    bar_item_id uuid not null references public.bar_items(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    description text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (bar_item_id, language)
);
create index if not exists bar_item_translations_item_id_idx on public.bar_item_translations (bar_item_id);

-- ============ WINE: category name ============
create table if not exists public.wine_category_translations (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.wine_categories(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    name text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (category_id, language)
);
create index if not exists wine_category_translations_category_id_idx on public.wine_category_translations (category_id);

-- ============ WINE: tasting description (name/grape/region kept as-is) ============
create table if not exists public.wine_translations (
    id uuid primary key default gen_random_uuid(),
    wine_id uuid not null references public.wines(id) on delete cascade,
    language text not null check (language in ('en','uk','es','it','fr','de','nl')),
    description text not null default '',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique (wine_id, language)
);
create index if not exists wine_translations_wine_id_idx on public.wine_translations (wine_id);

-- ============ RLS: public read, authenticated write (mirrors article_translations) ============
do $$
declare t text;
begin
  foreach t in array array[
    'menu_item_translations','category_translations',
    'cocktail_category_translations','cocktail_item_translations',
    'bar_category_translations','bar_item_translations',
    'wine_category_translations','wine_translations'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Anyone can view %1$s" on public.%1$I for select using (true)', t);
    execute format('create policy "Authenticated insert %1$s" on public.%1$I for insert with check (auth.role() = ''authenticated'')', t);
    execute format('create policy "Authenticated update %1$s" on public.%1$I for update using (auth.role() = ''authenticated'')', t);
    execute format('create policy "Authenticated delete %1$s" on public.%1$I for delete using (auth.role() = ''authenticated'')', t);
  end loop;
end $$;
