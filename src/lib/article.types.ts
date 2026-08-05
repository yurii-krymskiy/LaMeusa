export type ArticleLanguage = "en" | "uk" | "es";

export const ARTICLE_LANGUAGES: ArticleLanguage[] = ["en", "uk", "es"];

export interface ArticleTranslation {
  language: ArticleLanguage;
  article_title: string;
  article_description: string;
  article_content: string;
  meta_title: string;
  meta_description: string;
}

export interface Article {
  id: string | null;
  main_image: string;
  created_date: string;
  updated_date?: string;
  translations: Partial<Record<ArticleLanguage, ArticleTranslation>>;
}

export const emptyTranslation = (language: ArticleLanguage): ArticleTranslation => ({
  language,
  article_title: "",
  article_description: "",
  article_content: "",
  meta_title: "",
  meta_description: "",
});

/** The translation to display for `language`, falling back to English, then an empty draft. */
export const resolveTranslation = (article: Article, language: ArticleLanguage): ArticleTranslation =>
  article.translations[language] ?? article.translations.en ?? emptyTranslation(language);
