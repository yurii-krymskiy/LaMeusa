-- Create blog articles table
create table if not exists public.articles (
    id uuid primary key default gen_random_uuid(),
    article_title text not null,
    article_description text not null,
    article_content text not null,
    created_date timestamp with time zone default now(),
    updated_date timestamp with time zone default now()
);

-- Create an index on created_date for faster sorting
create index if not exists articles_created_date_idx on public.articles (created_date desc);

-- Create an index for title search
create index if not exists articles_title_idx on public.articles using gin (to_tsvector('english', article_title));

-- Enable RLS
alter table public.articles enable row level security;

-- Public can read articles
create policy "Anyone can view articles"
    on public.articles
    for select
    using (true);

-- Only authenticated users can insert/update/delete
create policy "Authenticated users can insert articles"
    on public.articles
    for insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated users can update articles"
    on public.articles
    for update
    using (auth.role() = 'authenticated');

create policy "Authenticated users can delete articles"
    on public.articles
    for delete
    using (auth.role() = 'authenticated');

-- Create storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

-- Allow public read access to article images
create policy "Public can view article images"
    on storage.objects
    for select
    using (bucket_id = 'article-images');

-- Allow authenticated users to upload article images
create policy "Authenticated users can upload article images"
    on storage.objects
    for insert
    with check (
        bucket_id = 'article-images' 
        and auth.role() = 'authenticated'
    );

-- Allow authenticated users to delete article images
create policy "Authenticated users can delete article images"
    on storage.objects
    for delete
    using (
        bucket_id = 'article-images' 
        and auth.role() = 'authenticated'
    );
