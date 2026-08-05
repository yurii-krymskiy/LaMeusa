import { useState, useRef, useCallback, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import type { Article, ArticleLanguage, ArticleTranslation } from "./article.types";
import { emptyTranslation } from "./article.types";

interface LocalImage {
  blobUrl: string;
  file: File;
}

const emptyTranslations = (): Record<ArticleLanguage, ArticleTranslation> => ({
  en: emptyTranslation("en"),
  uk: emptyTranslation("uk"),
  es: emptyTranslation("es"),
});

export const useArticleManagement = () => {
  const [id, setId] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date().toISOString());
  const [translations, setTranslations] = useState<Record<ArticleLanguage, ArticleTranslation>>(emptyTranslations);
  const [activeLanguage, setActiveLanguageState] = useState<ArticleLanguage>("en");

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
    content: "",
    onUpdate: () => {
      forceUpdate({});
    },
    onSelectionUpdate: () => {
      forceUpdate({});
    },
  });

  // Sync the editor's content whenever it becomes ready or a different article is loaded.
  // Deliberately not keyed on `translations`/`activeLanguage` so typing doesn't reset the editor.
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(translations[activeLanguage]?.article_content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, id]);

  const updateActiveTranslation = useCallback(
    (patch: Partial<ArticleTranslation>) => {
      setTranslations((prev) => ({
        ...prev,
        [activeLanguage]: { ...prev[activeLanguage], ...patch },
      }));
    },
    [activeLanguage]
  );

  const setActiveLanguage = useCallback(
    (language: ArticleLanguage) => {
      if (language === activeLanguage) return;
      if (editor) {
        const html = editor.getHTML();
        setTranslations((prev) => {
          const next = { ...prev, [activeLanguage]: { ...prev[activeLanguage], article_content: html } };
          editor.commands.setContent(next[language]?.article_content || "");
          return next;
        });
      }
      setActiveLanguageState(language);
    },
    [editor, activeLanguage]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateActiveTranslation({ article_title: e.target.value });
    },
    [updateActiveTranslation]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateActiveTranslation({ article_description: e.target.value });
    },
    [updateActiveTranslation]
  );

  const handleMetaTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateActiveTranslation({ meta_title: e.target.value });
    },
    [updateActiveTranslation]
  );

  const handleMetaDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateActiveTranslation({ meta_description: e.target.value });
    },
    [updateActiveTranslation]
  );

  const handleMainImageChange = useCallback((url: string) => {
    setMainImage(url);
  }, []);

  const handleEditorContentChange = useCallback(
    (content: string) => {
      updateActiveTranslation({ article_content: content });
    },
    [updateActiveTranslation]
  );

  // Flushes the currently-focused editor's HTML into `translations` and returns it.
  // Needed before saving, since the active language's content only lives in the
  // editor instance until a tab switch (or this) copies it out.
  const flushActiveTranslation = useCallback((): Record<ArticleLanguage, ArticleTranslation> => {
    if (!editor) return translations;
    const html = editor.getHTML();
    const next = { ...translations, [activeLanguage]: { ...translations[activeLanguage], article_content: html } };
    setTranslations(next);
    return next;
  }, [editor, translations, activeLanguage]);

  const loadArticle = useCallback((article: Article) => {
    setId(article.id);
    setMainImage(article.main_image);
    setCreatedDate(article.created_date);
    setTranslations({
      en: article.translations.en ?? emptyTranslation("en"),
      uk: article.translations.uk ?? emptyTranslation("uk"),
      es: article.translations.es ?? emptyTranslation("es"),
    });
    setActiveLanguageState("en");
  }, []);

  return {
    id,
    mainImage,
    createdDate,
    translations,
    activeLanguage,
    setActiveLanguage,
    activeTranslation: translations[activeLanguage],
    loadArticle,
    flushActiveTranslation,
    localImages,
    setLocalImages,
    fileInputRef,
    editor,
    handleTitleChange,
    handleDescriptionChange,
    handleMetaTitleChange,
    handleMetaDescriptionChange,
    handleMainImageChange,
    handleEditorContentChange,
  };
};
