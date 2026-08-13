import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getArticleById, fetchRecommendedArticles } from "../../lib/article.service";
import type { Article, ArticleLanguage } from "../../lib/article.types";
import { resolveTranslation } from "../../lib/article.types";
import { SEO } from "../../components/SEO";
import { OceanLoader } from "../../components/blog/OceanLoader";
import { dateLocaleFor } from "../../lib/dateLocale";
import "./BlogArticle.css";
import "./Blog.css";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const scrollToSection = (id: string, setActiveSectionId: (v: string) => void) => {
  setActiveSectionId(id);

  const el = document.getElementById(id);
  if (el) {
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
};

export const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language as ArticleLanguage;
  const [article, setArticle] = useState<Article | null>(null);
  const [displayContent, setDisplayContent] = useState("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);
  const [errorKind, setErrorKind] = useState<"notFound" | "loadFailed" | null>(null);
  const [recommended, setRecommended] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setErrorKind("notFound");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setRecommended([]);
      try {
        const fetchedArticle = await getArticleById(id);
        setArticle(fetchedArticle);
        fetchRecommendedArticles(id).then(setRecommended);
      } catch {
        setErrorKind("loadFailed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const translation = article ? resolveTranslation(article, language) : null;

  useEffect(() => {
    if (!translation?.article_content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(translation.article_content, "text/html");

    const headers = Array.from(doc.querySelectorAll("h1, h2, h3"));
    const tocItems: TocItem[] = headers.map((el, index) => {
      const text = el.textContent || `Section ${index + 1}`;
      const id = index + "";
      el.setAttribute("id", id);
      return {
        id,
        text,
        level: el.tagName === "H1" ? 1 : el.tagName === "H2" ? 2 : 3,
      };
    });

    setToc(tocItems);
    setDisplayContent(doc.body.innerHTML);
  }, [translation?.article_content]);

  useEffect(() => {
    if (window.innerWidth < 900) return;

    const handleScroll = () => {
      const sections = toc.map(item => document.getElementById(item.id));
      let activeId = "";

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 4) {
            activeId = toc[index].id;
          }
        }
      });

      setActiveSectionId(activeId);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  if (isLoading) {
    return (
      <div className="blog-article-loading">
        <OceanLoader label={t("blog.loadingArticle")} />
      </div>
    );
  }

  if (errorKind || !article || !translation) {
    return (
      <div className="blog-article-error">
        <h2>{t("blog.article.oops")}</h2>
        <p>{t(`blog.article.${errorKind ?? "notFound"}`)}</p>
        <button onClick={() => navigate("/blog")} className="blog-article-back-btn">
          {t("blog.article.backToBlog")}
        </button>
      </div>
    );
  }

  // Generate Schema.org Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": translation.meta_title || translation.article_title,
    "description": translation.meta_description || translation.article_description,
    "image": article.main_image || "",
    "datePublished": article.created_date,
    "dateModified": article.updated_date || article.created_date,
    "author": {
      "@type": "Organization",
      "name": "La Medusa Restaurant"
    },
    "publisher": {
      "@type": "Organization",
      "name": "La Medusa Restaurant",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lameusa.com/icons/logo.svg"
      }
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={translation.meta_title || translation.article_title}
        description={translation.meta_description || translation.article_description}
        path={`/blog/${article.id}`}
        image={article.main_image}
        type="article"
      />

      {/* Schema.org Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="blog-article-page">
      <div className="blog-article-sidebar">
        <button onClick={() => navigate("/blog")} className="blog-article-back">
          <span>←</span>
          <span>{t("blog.article.back")}</span>
        </button>

        <h1 className="blog-article-sidebar-title">{translation.article_title}</h1>

        <time className="blog-article-sidebar-date">
          {new Date(article.created_date).toLocaleDateString(dateLocaleFor(language), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {toc.length > 0 && (
          <div className="blog-article-toc">
            <p className="blog-article-toc-title">{t("blog.article.toc")}</p>
            {toc.map((item, index) => (
              <h2
                key={index}
                className={`blog-article-toc-item level-${item.level} ${activeSectionId === item.id ? "active" : ""}`}
                onClick={() => scrollToSection(item.id, setActiveSectionId)}
                style={{ paddingLeft: item.level === 3 ? "16px" : item.level === 2 ? "8px" : "0" }}
              >
                {item.text}
              </h2>
            ))}
          </div>
        )}
      </div>

      <div className="blog-article-content-wrapper">
        <h2 className="blog-article-main-title">{translation.article_title}</h2>

        <time className="blog-article-main-date">
          {new Date(article.created_date).toLocaleDateString(dateLocaleFor(language), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {article.main_image && (
          <div className="blog-article-main-image-wrapper">
            <img
              src={article.main_image}
              alt={translation.article_title}
              className="blog-article-main-image"
            />
          </div>
        )}

        {translation.article_description && (
          <p className="blog-article-description">{translation.article_description}</p>
        )}

        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      </div>
    </div>

    {recommended.length > 0 && (
      <div className="blog-article-recommended">
        <h2 className="blog-article-recommended-title">{t("blog.article.recommended")}</h2>
        <div className="blog-grid">
          {recommended.map((recommendedArticle) => {
            const recommendedTranslation = resolveTranslation(recommendedArticle, language);
            return (
              <article
                key={recommendedArticle.id}
                className="blog-card"
                onClick={() => navigate(`/blog/${recommendedArticle.id}`)}
              >
                {recommendedArticle.main_image && (
                  <div className="blog-card-image-wrapper">
                    <img
                      src={recommendedArticle.main_image}
                      alt={recommendedTranslation.article_title}
                      className="blog-card-image"
                    />
                  </div>
                )}
                <div className="blog-card-content">
                  <time className="blog-card-date">
                    {new Date(recommendedArticle.created_date).toLocaleDateString(dateLocaleFor(language), {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="blog-card-title">{recommendedTranslation.article_title}</h3>
                  <p className="blog-card-description">
                    {recommendedTranslation.article_description.length > 150
                      ? recommendedTranslation.article_description.slice(0, 150) + "..."
                      : recommendedTranslation.article_description}
                  </p>
                  <button
                    onClick={() => navigate(`/blog/${recommendedArticle.id}`)}
                    className="blog-card-button"
                  >
                    {t("blog.readMore")} →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    )}
    </>
  );
};
