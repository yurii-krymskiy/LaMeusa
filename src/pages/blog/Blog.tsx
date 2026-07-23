import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { fetchArticles } from "../../lib/article.service";
import type { Article } from "../../lib/article.types";
import "./Blog.css";

const extractPreview = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const firstImage = doc.querySelector("img")?.getAttribute("src") || "";
  const firstH1 = doc.querySelector("h1")?.textContent || "Untitled";
  const firstParagraph = doc.querySelector("p")?.textContent || "";

  return { firstImage, firstH1, firstParagraph };
};

export const Blog = () => {
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

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadMore = (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1 className="blog-hero-title">Our Blog</h1>
        <p className="blog-hero-subtitle">
          Discover the latest news, recipes, and stories from La Meusa
        </p>
      </div>

      <div className="blog-container">
        <div className="blog-search-section">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="blog-search-input"
          />
        </div>

        {isLoading ? (
          <div className="blog-loading">
            <div className="blog-spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="blog-empty">
            <p>No articles found. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {articles.map((article) => {
                const { firstImage, firstH1, firstParagraph } = extractPreview(
                  article.article_content
                );

                return (
                  <article key={article.id} className="blog-card">
                    {firstImage && (
                      <div className="blog-card-image-wrapper">
                        <img
                          src={firstImage}
                          alt={firstH1}
                          className="blog-card-image"
                        />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <time className="blog-card-date">
                        {new Date(article.created_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <h2 className="blog-card-title">{article.article_title}</h2>
                      <p className="blog-card-description">
                        {article.article_description.length > 150
                          ? article.article_description.slice(0, 150) + "..."
                          : article.article_description}
                      </p>
                      <button
                        onClick={() => handleReadMore(article.id!)}
                        className="blog-card-button"
                      >
                        Read More →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"blog-pagination"}
                pageClassName={"blog-pagination-page"}
                pageLinkClassName={"blog-pagination-link"}
                activeClassName={"blog-pagination-active"}
                previousClassName={"blog-pagination-prev"}
                nextClassName={"blog-pagination-next"}
                disabledClassName={"blog-pagination-disabled"}
                breakClassName={"blog-pagination-break"}
                forcePage={currentPage - 1}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
