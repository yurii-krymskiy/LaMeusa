-- Add SEO fields and main image to articles table
alter table public.articles 
add column if not exists meta_title text not null default '',
add column if not exists meta_description text not null default '',
add column if not exists main_image text not null default '';

-- Create an index for meta title search
create index if not exists articles_meta_title_idx on public.articles using gin (to_tsvector('english', meta_title));
