import { supabase } from "./supabase";
import type { Article } from "./article.types";

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
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('article-images')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('article-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Delete image from Supabase storage
export const deleteImage = async (url: string): Promise<void> => {
  try {
    const urlParts = url.split('/article-images/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('article-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

// Create article
export const createArticle = async (article: Article) => {
  const { error } = await supabase.from("articles").insert([
    {
      article_content: article.article_content,
      article_title: article.article_title,
      article_description: article.article_description,
      created_date: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error(`Error creating article: ${error.message}`);
  }
};

// Update article
export const updateArticle = async (articleId: string, article: Article) => {
  // Get the old article to compare images
  const { data: oldArticle, error: fetchError } = await supabase
    .from("articles")
    .select("article_content")
    .eq('id', articleId)
    .single();

  if (fetchError) {
    throw new Error(`Error fetching old article: ${fetchError.message}`);
  }

  // Extract image URLs from old and new content
  const oldImageUrls = extractImageUrls(oldArticle.article_content);
  const newImageUrls = extractImageUrls(article.article_content);

  // Find images that were removed
  const removedImages = oldImageUrls.filter(url => !newImageUrls.includes(url));

  // Delete removed images
  await Promise.all(removedImages.map(url => deleteImage(url)));

  // Update the article
  const { error } = await supabase
    .from("articles")
    .update({
      article_content: article.article_content,
      article_title: article.article_title,
      article_description: article.article_description,
      updated_date: new Date().toISOString(),
    })
    .eq('id', articleId);

  if (error) {
    throw new Error(`Error updating article: ${error.message}`);
  }
};

// Delete article
export const deleteArticle = async (articleId: string) => {
  // Get the article to extract image URLs
  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("article_content")
    .eq('id', articleId)
    .single();

  if (fetchError) {
    throw new Error(`Error fetching article: ${fetchError.message}`);
  }

  // Extract and delete all images
  const imageUrls = extractImageUrls(article.article_content);
  await Promise.all(imageUrls.map(url => deleteImage(url)));

  // Delete the article
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq('id', articleId);

  if (error) {
    throw new Error(`Error deleting article: ${error.message}`);
  }
};

// Get article by ID
export const getArticleById = async (articleId: string): Promise<Article> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq('id', articleId)
    .single();

  if (error) {
    throw new Error(`Error fetching article: ${error.message}`);
  }

  return data;
};

// Fetch articles with pagination and search
export const fetchArticles = async (
  page: number,
  search: string,
  setArticles: (v: Article[]) => void,
  setTotalPages: (v: number) => void,
  setIsLoading: (v: boolean) => void,
) => {
  setIsLoading(true);
  try {
    const articlesPerPage = 6;

    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_date', { ascending: false });

    if (search) {
      query = query.ilike('article_title', `%${search}%`);
    }

    const { data, error, count } = await query.range(
      (page - 1) * articlesPerPage,
      page * articlesPerPage - 1
    );

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    setArticles(data || []);
    setTotalPages(Math.ceil((count || 0) / articlesPerPage));
  } catch (error) {
    console.error('Error fetching articles:', error);
  } finally {
    setIsLoading(false);
  }
};
