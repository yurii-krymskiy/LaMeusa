-- Multi-language blog articles: move language-specific fields into their own table
create table if not exists public.article_translations (
    id uuid primary key default gen_random_uuid(),
    article_id uuid not null references public.articles(id) on delete cascade,
    language text not null check (language in ('en', 'uk', 'es')),
    article_title text not null default '',
    article_description text not null default '',
    article_content text not null default '',
    meta_title text not null default '',
    meta_description text not null default '',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique (article_id, language)
);

create index if not exists article_translations_article_id_idx on public.article_translations (article_id);

alter table public.article_translations enable row level security;

create policy "Anyone can view article translations"
    on public.article_translations
    for select
    using (true);

create policy "Authenticated users can insert article translations"
    on public.article_translations
    for insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated users can update article translations"
    on public.article_translations
    for update
    using (auth.role() = 'authenticated');

create policy "Authenticated users can delete article translations"
    on public.article_translations
    for delete
    using (auth.role() = 'authenticated');

-- Backfill existing articles as their English translation
insert into public.article_translations
    (article_id, language, article_title, article_description, article_content, meta_title, meta_description)
select id, 'en', article_title, article_description, article_content, meta_title, meta_description
from public.articles
on conflict (article_id, language) do nothing;

-- The articles table now only holds language-independent fields
alter table public.articles
    drop column if exists article_title,
    drop column if exists article_description,
    drop column if exists article_content,
    drop column if exists meta_title,
    drop column if exists meta_description;
