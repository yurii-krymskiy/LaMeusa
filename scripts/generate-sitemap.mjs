/**
 * Generates public/sitemap.xml before the build (see "prebuild" in package.json).
 * Static routes get priority 1.0; blog pages get priority 0.5.
 */

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../public/sitemap.xml");

const BASE_URL = "https://www.lamedusa-restaurant.com";
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_PREFIXES = { uk: "ua", es: "es", it: "it", fr: "fr", de: "de", nl: "nl" };
const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, ...Object.keys(LANGUAGE_PREFIXES)];
const prefixFor = (lang) => (LANGUAGE_PREFIXES[lang] ? `/${LANGUAGE_PREFIXES[lang]}` : "");

const STATIC_PATHS = [
    "/",
    "/about",
    "/contact",
    "/seafood",
    "/happy-hours",
    "/pasta",
    "/menu",
    "/delivery",
    "/booking",
    "/privacy-policy",
    "/terms-of-service",
    "/cookies-settings",
    // SEO landing pages
    "/best-salads-tenerife",
    "/pizza-los-cristianos",
    "/meat-los-cristianos",
    "/burgers-los-cristianos",
    "/paella-los-cristianos",
    "/fish-seafood-los-cristianos",
    "/tapas-appetizers-los-cristianos",
    "/pasta-los-cristianos",
    "/dessert-los-cristianos",
    "/children-menu-los-cristianos",
    "/sauces-adds-los-cristianos",
    "/garnish-los-cristianos",
];

const BLOG_LIST_PATH = "/blog";

const fetchBlogArticleIds = async () => {
    const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("[sitemap] Supabase env vars missing, skipping blog article URLs.");
        return [];
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.from("articles").select("id, updated_date, created_date");

    if (error) {
        console.warn(`[sitemap] Failed to fetch articles: ${error.message}`);
        return [];
    }

    return (data ?? []).map((row) => ({
        path: `/blog/${row.id}`,
        lastmod: (row.updated_date || row.created_date || "").slice(0, 10),
    }));
};

const alternateLinks = (path) =>
    [
        ...SUPPORTED_LANGUAGES.map(
            (lang) => `        <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${prefixFor(lang)}${path}" />`
        ),
        `        <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}" />`,
    ].join("\n");

const urlEntry = (path, { priority, changefreq, lastmod, lang = DEFAULT_LANGUAGE }) => {
    const loc = `${BASE_URL}${prefixFor(lang)}${path}`;
    return [
        "    <url>",
        `        <loc>${loc}</loc>`,
        lastmod ? `        <lastmod>${lastmod}</lastmod>` : null,
        `        <changefreq>${changefreq}</changefreq>`,
        `        <priority>${priority.toFixed(1)}</priority>`,
        alternateLinks(path),
        "    </url>",
    ]
        .filter(Boolean)
        .join("\n");
};

const buildSitemap = async () => {
    const blogArticles = await fetchBlogArticleIds();

    const entries = [];

    for (const lang of SUPPORTED_LANGUAGES) {
        for (const path of STATIC_PATHS) {
            entries.push(urlEntry(path, { priority: 1.0, changefreq: "weekly", lang }));
        }

        entries.push(urlEntry(BLOG_LIST_PATH, { priority: 0.5, changefreq: "weekly", lang }));

        for (const article of blogArticles) {
            entries.push(
                urlEntry(article.path, { priority: 0.5, changefreq: "weekly", lastmod: article.lastmod, lang })
            );
        }
    }

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        entries.join("\n"),
        "</urlset>",
        "",
    ].join("\n");

    writeFileSync(OUTPUT_PATH, xml, "utf-8");
    console.log(`[sitemap] Wrote ${entries.length} URLs to ${OUTPUT_PATH}`);
};

buildSitemap();
