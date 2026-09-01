// Helpers for the sidecar *_translations tables.
// A translation row for a language may exist but be empty (not yet filled in);
// in that case we fall back to English, then to the base-table column.

export const FALLBACK_LANGUAGE = "en";

type WithLanguage = { language: string };

const nonEmpty = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim() ? value : undefined;

/**
 * Pick a single translated field with graceful fallback:
 *   requested language → English → base-table value.
 * Empty strings are treated as "not translated" and skipped.
 */
export function pickField<T extends WithLanguage>(
    rows: T[] | null | undefined,
    lang: string,
    field: keyof T,
    base?: string | null
): string | undefined {
    const fromLang = nonEmpty(rows?.find((r) => r.language === lang)?.[field]);
    if (fromLang) return fromLang;

    const fromEn = nonEmpty(
        rows?.find((r) => r.language === FALLBACK_LANGUAGE)?.[field]
    );
    if (fromEn) return fromEn;

    return nonEmpty(base);
}
