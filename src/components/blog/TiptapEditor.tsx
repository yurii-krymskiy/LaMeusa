import { Editor, EditorContent } from "@tiptap/react";
import type { Article } from "../../lib/article.types";
import "./TiptapEditor.css";

interface TiptapEditorProps {
  article: Article;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMetaTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMetaDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMainImageChange: (url: string) => void;
  editor: Editor | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mainImageInputRef: React.RefObject<HTMLInputElement>;
  handleMainImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingMainImage: boolean;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  article,
  handleTitleChange,
  handleDescriptionChange,
  handleMetaTitleChange,
  handleMetaDescriptionChange,
  handleMainImageChange,
  editor,
  fileInputRef,
  handleFileChange,
  mainImageInputRef,
  handleMainImageFileChange,
  isUploadingMainImage,
}) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="tiptap-editor-container">
      <div className="editor-header">
        <input
          type="text"
          placeholder="Article Title"
          value={article.article_title}
          onChange={handleTitleChange}
          className="editor-title-input"
        />
        <textarea
          placeholder="Article Description (for preview)"
          value={article.article_description}
          onChange={handleDescriptionChange}
          className="editor-description-input"
          rows={3}
        />

        {/* SEO Fields */}
        <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#374151" }}>
            SEO Settings
          </h3>
          <input
            type="text"
            placeholder="Meta Title (for search engines)"
            value={article.meta_title}
            onChange={handleMetaTitleChange}
            className="editor-title-input"
            style={{ marginBottom: "12px" }}
          />
          <textarea
            placeholder="Meta Description (for search engines)"
            value={article.meta_description}
            onChange={handleMetaDescriptionChange}
            className="editor-description-input"
            rows={2}
            style={{ marginBottom: "12px" }}
          />
          
          {/* Main Image Field */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#374151" }}>
              Main Image (Featured Image)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => mainImageInputRef.current?.click()}
                type="button"
                disabled={isUploadingMainImage}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isUploadingMainImage ? "not-allowed" : "pointer",
                  opacity: isUploadingMainImage ? 0.6 : 1,
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                {isUploadingMainImage ? "Uploading..." : "Upload Image"}
              </button>
              <input
                type="file"
                ref={mainImageInputRef}
                onChange={handleMainImageFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              {article.main_image && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img 
                    src={article.main_image} 
                    alt="Main" 
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} 
                  />
                  <button
                    onClick={() => handleMainImageChange("")}
                    type="button"
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          type="button"
          title="Bold (Ctrl+B)"
        >
          𝐁
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          type="button"
          title="Italic (Ctrl+I)"
        >
          𝐼
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          type="button"
          title="Strikethrough"
        >
          S̶
        </button>
        <div style={{ width: "1px", height: "24px", background: "#d1d5db", margin: "0 4px" }}></div>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          type="button"
          title="Heading 1"
        >
          H₁
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          type="button"
          title="Heading 2"
        >
          H₂
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          type="button"
          title="Heading 3"
        >
          H₃
        </button>
        <div style={{ width: "1px", height: "24px", background: "#d1d5db", margin: "0 4px" }}></div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          type="button"
          title="Bullet List"
        >
          ≣
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          type="button"
          title="Numbered List"
        >
          ≡
        </button>
        <div style={{ width: "1px", height: "24px", background: "#d1d5db", margin: "0 4px" }}></div>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          type="button"
          title="Align Left"
        >
          ☰
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
          type="button"
          title="Align Center"
        >
          ☱
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          type="button"
          title="Align Right"
        >
          ☴
        </button>
        <div style={{ width: "1px", height: "24px", background: "#d1d5db", margin: "0 4px" }}></div>
        <button onClick={addLink} type="button" title="Insert Link">
          🔗
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          title="Insert Image"
        >
          🖼
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ display: "none" }}
        />
      </div>

      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
