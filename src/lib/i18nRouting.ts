/**
 * URL <-> language mapping.
 * English is the main language and is never prefixed; every other
 * language is served under its own URL segment (e.g. /ua, /es).
 */
export const DEFAULT_LANGUAGE = "en";

export const LANGUAGE_PREFIXES: Record<string, string> = {
    uk: "ua",
    es: "es",
};

const PREFIX_TO_LANGUAGE: Record<string, string> = Object.fromEntries(
    Object.entries(LANGUAGE_PREFIXES).map(([lang, prefix]) => [prefix, lang])
);

export const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, ...Object.keys(LANGUAGE_PREFIXES)];

const firstSegment = (pathname: string) => pathname.split("/")[1] ?? "";

/** The i18n language code implied by a URL, e.g. "/ua/menu" -> "uk". */
export const getLanguageFromPath = (pathname: string): string => {
    return PREFIX_TO_LANGUAGE[firstSegment(pathname)] ?? DEFAULT_LANGUAGE;
};

/** The router basename implied by a URL, e.g. "/ua/menu" -> "/ua". */
export const getBasenameFromPath = (pathname: string): string => {
    const segment = firstSegment(pathname);
    return PREFIX_TO_LANGUAGE[segment] ? `/${segment}` : "";
};

/** Builds the URL path (with prefix) for `lang`, preserving the current path/search/hash. */
export const getPathForLanguage = (lang: string) => {
    const { pathname, search, hash } = window.location;
    const currentBasename = getBasenameFromPath(pathname);
    const rest = currentBasename ? pathname.slice(currentBasename.length) || "/" : pathname;
    const prefix = LANGUAGE_PREFIXES[lang] ? `/${LANGUAGE_PREFIXES[lang]}` : "";
    return `${prefix}${rest === "/" ? (prefix ? "" : "/") : rest}${search}${hash}`;
};

/** The URL prefix for `lang` ("" for the default language). */
export const getPrefixForLanguage = (lang: string) => (LANGUAGE_PREFIXES[lang] ? `/${LANGUAGE_PREFIXES[lang]}` : "");
