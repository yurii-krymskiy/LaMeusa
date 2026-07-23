import { Editor, EditorContent } from "@tiptap/react";
import type { Article } from "../../lib/article.types";
import "./TiptapEditor.css";

interface TiptapEditorProps {
  article: Article;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  editor: Editor | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  article,
  handleTitleChange,
  handleDescriptionChange,
  editor,
  fileInputRef,
  handleFileChange,
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
