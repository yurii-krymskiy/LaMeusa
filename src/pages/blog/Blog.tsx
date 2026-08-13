import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { fetchArticles } from "../../lib/article.service";
import type { Article, ArticleLanguage } from "../../lib/article.types";
import { resolveTranslation } from "../../lib/article.types";
import { OceanLoader } from "../../components/blog/OceanLoader";
import { dateLocaleFor } from "../../lib/dateLocale";
import "./Blog.css";

const extractPreview = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const firstImage = doc.querySelector("img")?.getAttribute("src") || "";

  return { firstImage };
};

export const Blog = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as ArticleLanguage;
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(currentPage, searchQuery, language, setArticles, setTotalPages, setIsLoading);
  }, [currentPage, searchQuery, language]);

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
      <div className="hero blog-hero-banner">
        <h1 className="title hero-title relative">{t("blog.hero.title")}</h1>
        <p className="description hero-description relative">
          {t("blog.hero.description")}
        </p>
      </div>

      <div className="blog-container">
        <div className="blog-search-section">
          <input
            type="text"
            placeholder={t("blog.search")}
            value={searchQuery}
            onChange={handleSearchChange}
            className="blog-search-input"
          />
        </div>

        {isLoading ? (
          <div className="blog-loading">
            <OceanLoader label={t("blog.loadingArticles")} />
          </div>
        ) : articles.length === 0 ? (
          <div className="blog-empty">
            <p>{t("blog.empty")}</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {articles.map((article) => {
                const translation = resolveTranslation(article, language);
                const { firstImage } = extractPreview(translation.article_content);
                // Use main_image if available, otherwise fall back to first image in content
                const displayImage = article.main_image || firstImage;

                return (
                  <article key={article.id} className="blog-card">
                    {displayImage && (
                      <div className="blog-card-image-wrapper">
                        <img
                          src={displayImage}
                          alt={translation.article_title}
                          className="blog-card-image"
                        />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <time className="blog-card-date">
                        {new Date(article.created_date).toLocaleDateString(dateLocaleFor(language), {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <h2 className="blog-card-title">{translation.article_title}</h2>
                      <p className="blog-card-description">
                        {translation.article_description.length > 150
                          ? translation.article_description.slice(0, 150) + "..."
                          : translation.article_description}
                      </p>
                      <button
                        onClick={() => handleReadMore(article.id!)}
                        className="blog-card-button"
                      >
                        {t("blog.readMore")} →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <ReactPaginate
                previousLabel={t("blog.pagination.previous")}
                nextLabel={t("blog.pagination.next")}
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
