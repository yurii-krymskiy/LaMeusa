import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../../lib/article.service";
import type { Article } from "../../lib/article.types";
import "./BlogArticle.css";

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
      behavior: 'smooth',
    });
  }
};

export const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Article not found");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedArticle = await getArticleById(id);
        setArticle(fetchedArticle);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (!article?.article_content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(article.article_content, "text/html");

    const headers = Array.from(doc.querySelectorAll('h1, h2, h3'));
    const tocItems: TocItem[] = headers.map((el, index) => {
      const text = el.textContent || `Section ${index + 1}`;
      const id = index + '';
      el.setAttribute('id', id);
      return {
        id,
        text,
        level: el.tagName === 'H1' ? 1 : el.tagName === 'H2' ? 2 : 3,
      };
    });

    setToc(tocItems);
    setArticle(prev => prev ? { ...prev, article_content: doc.body.innerHTML } : prev);
  }, [article?.article_content]);

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
        <div className="blog-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="blog-article-error">
        <h2>Oops!</h2>
        <p>{error || "Article not found"}</p>
        <button onClick={() => navigate("/blog")} className="blog-article-back-btn">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-article-page">
      <div className="blog-article-sidebar">
        <button onClick={() => navigate("/blog")} className="blog-article-back">
          <span>←</span>
          <span>Back to all blogs</span>
        </button>

        <h1 className="blog-article-sidebar-title">{article.article_title}</h1>
        
        <time className="blog-article-sidebar-date">
          {new Date(article.created_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {toc.length > 0 && (
          <div className="blog-article-toc">
            <p className="blog-article-toc-title">TABLE OF CONTENTS</p>
            {toc.map((item, index) => (
              <h2
                key={index}
                className={`blog-article-toc-item level-${item.level} ${activeSectionId === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id, setActiveSectionId)}
                style={{ paddingLeft: item.level === 3 ? '16px' : item.level === 2 ? '8px' : '0' }}
              >
                {item.text}
              </h2>
            ))}
          </div>
        )}
      </div>

      <div className="blog-article-content-wrapper">
        {article.article_description && (
          <p className="blog-article-description">{article.article_description}</p>
        )}
        
        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={{ __html: article.article_content }}
        />
      </div>
    </div>
  );
};
