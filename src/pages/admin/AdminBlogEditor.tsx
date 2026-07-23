import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiptapEditor } from "../../components/blog/TiptapEditor";
import { useArticleManagement } from "../../lib/useArticleManagement";
import {
  getArticleById,
  createArticle,
  updateArticle,
  uploadImage,
} from "../../lib/article.service";
import { toast } from "sonner";
import "./AdminBlogEditor.css";

export const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleTitleChange,
    handleDescriptionChange,
    handleEditorContentChange,
    setArticle,
    article,
    setLocalImages,
    localImages,
    editor,
    fileInputRef,
  } = useArticleManagement();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const fetchedArticle = await getArticleById(id);
        setArticle(fetchedArticle);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch article");
        navigate("/admin/blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, setArticle, navigate]);

  useEffect(() => {
    if (editor && article?.article_content) {
      editor.commands.setContent(article.article_content);
    }
  }, [editor, article]);

  const handleSave = async () => {
    if (!editor || !article) return;

    if (!article.article_title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!article.article_description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setIsLoading(true);
    try {
      let html = editor.getHTML();
      const updatedImages: Record<string, string> = {};

      // Upload local images and replace blob URLs with public URLs
      for (const { blobUrl, file } of localImages) {
        const publicUrl = await uploadImage(file);
        updatedImages[blobUrl] = publicUrl;
      }

      Object.entries(updatedImages).forEach(([blob, url]) => {
        html = html.replace(new RegExp(blob, "g"), url);
      });

      handleEditorContentChange(html);

      if (id) {
        await updateArticle(id, {
          ...article,
          article_content: html,
        });
        toast.success("Article updated successfully");
      } else {
        await createArticle({
          ...article,
          article_content: html,
        });
        toast.success("Article created successfully");
      }

      setLocalImages([]);
      navigate("/admin/blog");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred while saving the article"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !editor) return;

    const newImages: { blobUrl: string; file: File }[] = [];

    for (const file of files) {
      const blobUrl = URL.createObjectURL(file);
      newImages.push({ blobUrl, file });
      editor.chain().focus().setImage({ src: blobUrl }).run();
    }

    setLocalImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    navigate("/admin/blog");
  };

  return (
    <div className="admin-blog-editor-container">
      <div className="admin-blog-editor-header">
        <h1 className="admin-blog-editor-title">
          {id ? "Edit Article" : "Create New Article"}
        </h1>
      </div>

      {isLoading && <div className="admin-blog-editor-loading">Loading...</div>}

      <div className="admin-blog-editor-main">
        <TiptapEditor
          article={article}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          editor={editor}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
      </div>

      <div className="admin-blog-editor-actions">
        <button onClick={handleCancel} className="admin-blog-editor-cancel-btn">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="admin-blog-editor-save-btn"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : id ? "Update Article" : "Create Article"}
        </button>
      </div>
    </div>
  );
};
