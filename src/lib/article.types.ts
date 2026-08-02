export interface Article {
  id: string | null;
  article_content: string;
  article_title: string;
  article_description: string;
  meta_title: string;
  meta_description: string;
  main_image: string;
  created_date: string;
  updated_date?: string;
}
