import { supabase } from "./supabase";
import type { Article, ArticleLanguage, ArticleTranslation } from "./article.types";
import { resolveTranslation } from "./article.types";

type TranslationsMap = Partial<Record<ArticleLanguage, ArticleTranslation>>;

type DbArticleRow = {
  id: string;
  main_image: string;
  created_date: string;
  updated_date?: string;
  article_translations: ArticleTranslation[];
};

const toArticle = (row: DbArticleRow): Article => ({
  id: row.id,
  main_image: row.main_image,
  created_date: row.created_date,
  updated_date: row.updated_date,
  translations: Object.fromEntries(row.article_translations.map((t) => [t.language, t])),
});

// Only persist languages the admin actually filled in (English is required by the UI).
const filledTranslations = (translations: TranslationsMap): ArticleTranslation[] =>
  Object.values(translations).filter((t): t is ArticleTranslation => !!t && t.article_title.trim().length > 0);

// Helper to extract image URLs from HTML content
export const extractImageUrls = (content: string): string[] => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const urls: string[] = [];
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
};

// Upload image to Supabase storage
export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage.from("article-images").upload(filePath, file);

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("article-images").getPublicUrl(filePath);

  return data.publicUrl;
};

// Delete image from Supabase storage
export const deleteImage = async (url: string): Promise<void> => {
  try {
    const urlParts = url.split("/article-images/");
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage.from("article-images").remove([filePath]);

    if (error) {
      console.error("Error deleting image:", error);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

// Create article: one language-independent row + one translation row per filled language
export const createArticle = async (mainImage: string, translations: TranslationsMap): Promise<string> => {
  const { data, error } = await supabase
    .from("articles")
    .insert([{ main_image: mainImage, created_date: new Date().toISOString() }])
    .select("id")
    .single();

  if (error) {
    throw new Error(`Error creating article: ${error.message}`);
  }

  const rows = filledTranslations(translations).map((t) => ({ ...t, article_id: data.id }));
  if (rows.length) {
    const { error: translationsError } = await supabase.from("article_translations").insert(rows);
    if (translationsError) {
      throw new Error(`Error creating article translations: ${translationsError.message}`);
    }
  }

  return data.id as string;
};

// Update article
export const updateArticle = async (
  articleId: string,
  mainImage: string,
  translations: TranslationsMap
): Promise<void> => {
  const { data: oldArticle, error: articleFetchError } = await supabase
    .from("articles")
    .select("main_image")
    .eq("id", articleId)
    .single();

  if (articleFetchError) {
    throw new Error(`Error fetching old article: ${articleFetchError.message}`);
  }

  const { data: oldTranslations, error: translationsFetchError } = await supabase
    .from("article_translations")
    .select("language, article_content")
    .eq("article_id", articleId);

  if (translationsFetchError) {
    throw new Error(`Error fetching old translations: ${translationsFetchError.message}`);
  }

  const newRows = filledTranslations(translations);

  // Clean up images that no longer appear in any translation's content
  const oldImageUrls = (oldTranslations ?? []).flatMap((t) => extractImageUrls(t.article_content));
  const newImageUrls = new Set(newRows.flatMap((t) => extractImageUrls(t.article_content)));
  const removedImages = oldImageUrls.filter((url) => !newImageUrls.has(url));
  await Promise.all(removedImages.map(deleteImage));

  if (oldArticle.main_image && oldArticle.main_image !== mainImage) {
    await deleteImage(oldArticle.main_image);
  }

  const { error: articleUpdateError } = await supabase
    .from("articles")
    .update({ main_image: mainImage, updated_date: new Date().toISOString() })
    .eq("id", articleId);

  if (articleUpdateError) {
    throw new Error(`Error updating article: ${articleUpdateError.message}`);
  }

  // Drop translations for languages that were cleared out in the editor
  const keptLanguages = newRows.map((t) => t.language);
  const removedLanguages = (oldTranslations ?? [])
    .map((t) => t.language)
    .filter((lang) => !keptLanguages.includes(lang));

  if (removedLanguages.length) {
    const { error: deleteTranslationsError } = await supabase
      .from("article_translations")
      .delete()
      .eq("article_id", articleId)
      .in("language", removedLanguages);

    if (deleteTranslationsError) {
      throw new Error(`Error removing translations: ${deleteTranslationsError.message}`);
    }
  }

  if (newRows.length) {
    const { error: upsertError } = await supabase
      .from("article_translations")
      .upsert(
        newRows.map((t) => ({ ...t, article_id: articleId })),
        { onConflict: "article_id,language" }
      );

    if (upsertError) {
      throw new Error(`Error saving translations: ${upsertError.message}`);
    }
  }
};

// Delete article
export const deleteArticle = async (articleId: string): Promise<void> => {
  const { data: article, error: articleFetchError } = await supabase
    .from("articles")
    .select("main_image")
    .eq("id", articleId)
    .single();

  if (articleFetchError) {
    throw new Error(`Error fetching article: ${articleFetchError.message}`);
  }

  const { data: translations, error: translationsFetchError } = await supabase
    .from("article_translations")
    .select("article_content")
    .eq("article_id", articleId);

  if (translationsFetchError) {
    throw new Error(`Error fetching article translations: ${translationsFetchError.message}`);
  }

  const imageUrls = (translations ?? []).flatMap((t) => extractImageUrls(t.article_content));
  await Promise.all(imageUrls.map(deleteImage));

  if (article.main_image) {
    await deleteImage(article.main_image);
  }

  // article_translations rows cascade-delete via the FK
  const { error } = await supabase.from("articles").delete().eq("id", articleId);

  if (error) {
    throw new Error(`Error deleting article: ${error.message}`);
  }
};

// Get article by ID, with all of its translations
export const getArticleById = async (articleId: string): Promise<Article> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_translations(*)")
    .eq("id", articleId)
    .single();

  if (error) {
    throw new Error(`Error fetching article: ${error.message}`);
  }

  return toArticle(data as DbArticleRow);
};

// Fetch a handful of other articles, for a "you might also like" section
export const fetchRecommendedArticles = async (excludeArticleId: string, limit = 3): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_translations(*)")
    .neq("id", excludeArticleId)
    .order("created_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recommended articles:", error);
    return [];
  }

  return (data as DbArticleRow[] | null)?.map(toArticle) ?? [];
};

// Fetch articles with pagination and search, resolved to `language` (falling back to English)
export const fetchArticles = async (
  page: number,
  search: string,
  language: ArticleLanguage,
  setArticles: (v: Article[]) => void,
  setTotalPages: (v: number) => void,
  setIsLoading: (v: boolean) => void
) => {
  setIsLoading(true);
  try {
    const articlesPerPage = 6;

    const { data, error } = await supabase
      .from("articles")
      .select("*, article_translations(*)")
      .order("created_date", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
      return;
    }

    let articles = (data as DbArticleRow[] | null)?.map(toArticle) ?? [];

    if (search) {
      const query = search.toLowerCase();
      articles = articles.filter((article) =>
        resolveTranslation(article, language).article_title.toLowerCase().includes(query)
      );
    }

    setTotalPages(Math.max(1, Math.ceil(articles.length / articlesPerPage)));
    setArticles(articles.slice((page - 1) * articlesPerPage, page * articlesPerPage));
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    setIsLoading(false);
  }
};
