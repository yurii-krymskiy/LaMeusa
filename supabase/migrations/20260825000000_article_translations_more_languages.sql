-- Allow authoring blog articles in the newly added site languages
alter table public.article_translations
    drop constraint if exists article_translations_language_check;

alter table public.article_translations
    add constraint article_translations_language_check
    check (language in ('en', 'uk', 'es', 'it', 'fr', 'de', 'nl'));
