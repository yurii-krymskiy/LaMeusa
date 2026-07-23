export interface Article {
  id: string | null;
  article_content: string;
  article_title: string;
  article_description: string;
  created_date: string;
  updated_date?: string;
}
