import type { ArticleLanguage } from "./article.types";

const DATE_LOCALES: Record<ArticleLanguage, string> = {
  en: "en-US",
  uk: "uk-UA",
  es: "es-ES",
};

export const dateLocaleFor = (language: string) => DATE_LOCALES[language as ArticleLanguage] ?? "en-US";
