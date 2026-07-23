import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles, deleteArticle } from "../../lib/article.service";
import type { Article } from "../../lib/article.types";
import { toast } from "sonner";
import "./AdminBlog.css";

export const AdminBlog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(currentPage, searchQuery, setArticles, setTotalPages, setIsLoading);
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      await deleteArticle(id);
      toast.success("Article deleted successfully");
      fetchArticles(currentPage, searchQuery, setArticles, setTotalPages, setIsLoading);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete article");
    }
  };

  const handleCreate = () => {
    navigate("/admin/blog/create");
  };

  return (
    <div className="admin-blog-container">
      <div className="admin-blog-header">
        <h1 className="admin-blog-title">Blog Articles</h1>
        <div className="admin-blog-actions">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="admin-blog-search"
          />
          <button onClick={handleCreate} className="admin-blog-create-btn">
            Create New Article
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-blog-loading">Loading...</div>
      ) : (
        <div className="admin-blog-grid">
          {articles.map((article) => (
            <div key={article.id} className="admin-blog-card">
              <h3 className="admin-blog-card-title">{article.article_title}</h3>
              <p className="admin-blog-card-desc">{article.article_description}</p>
              <p className="admin-blog-card-date">
                {new Date(article.created_date).toLocaleDateString()}
              </p>
              <div className="admin-blog-card-actions">
                <button
                  onClick={() => handleEdit(article.id!)}
                  className="admin-blog-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id!)}
                  className="admin-blog-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && articles.length === 0 && (
        <div className="admin-blog-empty">
          No articles found. Create your first article!
        </div>
      )}

      {totalPages > 1 && (
        <div className="admin-blog-pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="admin-blog-page-btn"
          >
            Previous
          </button>
          <span className="admin-blog-page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="admin-blog-page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
