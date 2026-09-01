-- Backfill existing content as English rows so the site is visually unchanged.
insert into public.menu_item_translations (menu_item_id, language, title, description)
select id, 'en', coalesce(title,''), coalesce(description,'') from public.menu_items
on conflict (menu_item_id, language) do nothing;

insert into public.category_translations (category_id, language, name)
select id, 'en', coalesce(name,'') from public.categories
on conflict (category_id, language) do nothing;

insert into public.cocktail_category_translations (category_id, language, name)
select id, 'en', coalesce(name,'') from public.cocktail_categories
on conflict (category_id, language) do nothing;

insert into public.cocktail_item_translations (cocktail_item_id, language, description)
select id, 'en', coalesce(description,'') from public.cocktail_items
on conflict (cocktail_item_id, language) do nothing;

insert into public.bar_category_translations (category_id, language, name)
select id, 'en', coalesce(name,'') from public.bar_categories
on conflict (category_id, language) do nothing;

insert into public.bar_item_translations (bar_item_id, language, description)
select id, 'en', coalesce(description,'') from public.bar_items
on conflict (bar_item_id, language) do nothing;

insert into public.wine_category_translations (category_id, language, name)
select id, 'en', coalesce(name,'') from public.wine_categories
on conflict (category_id, language) do nothing;

insert into public.wine_translations (wine_id, language, description)
select id, 'en', coalesce(description_en,'') from public.wines
on conflict (wine_id, language) do nothing;
