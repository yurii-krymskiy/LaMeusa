import { useState, useRef, useCallback } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import type { Article } from "./article.types";

interface LocalImage {
  blobUrl: string;
  file: File;
}

export const useArticleManagement = () => {
  const [article, setArticle] = useState<Article>({
    id: null,
    article_content: "",
    article_title: "",
    article_description: "",
    created_date: new Date().toISOString(),
  });

  const [localImages, setLocalImages] = useState<LocalImage[]>([]);
  const [, forceUpdate] = useState({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: article.article_content,
    onUpdate: () => {
      forceUpdate({});
    },
    onSelectionUpdate: () => {
      forceUpdate({});
    },
  });

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArticle((prev) => ({ ...prev, article_title: e.target.value }));
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setArticle((prev) => ({ ...prev, article_description: e.target.value }));
    },
    []
  );

  const handleEditorContentChange = useCallback((content: string) => {
    setArticle((prev) => ({ ...prev, article_content: content }));
  }, []);

  return {
    article,
    setArticle,
    localImages,
    setLocalImages,
    fileInputRef,
    editor,
    handleTitleChange,
    handleDescriptionChange,
    handleEditorContentChange,
  };
};
