import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, getPrefixForLanguage } from "../lib/i18nRouting";

interface SEOProps {
    title: string;
    description: string;
    path?: string;
    image?: string;
    preloadImages?: string[];
    type?: "website" | "article";
}

const SITE_NAME = "La Medusa";
const BASE_URL = "https://lamedusa.es";
const DEFAULT_IMAGE = "/images/home/home-hero.jpg";

export const SEO = ({ title, description, path = "", image, preloadImages, type = "website" }: SEOProps) => {
    const { i18n } = useTranslation();
    const fullTitle = path === "/" || !path ? SITE_NAME : `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${getPrefixForLanguage(i18n.language)}${path}`;
    const imageUrl = `${BASE_URL}${image || DEFAULT_IMAGE}`;

    return (
        <Helmet htmlAttributes={{ lang: i18n.language }}>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Hreflang tags */}
            {SUPPORTED_LANGUAGES.map((lang) => (
                <link key={lang} rel="alternate" hrefLang={lang} href={`${BASE_URL}${getPrefixForLanguage(lang)}${path}`} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${path}`} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Preload critical images */}
            {preloadImages?.map((src) => (
                <link
                    key={src}
                    rel="preload"
                    as="image"
                    href={src}
                />
            ))}
        </Helmet>
    );
};
