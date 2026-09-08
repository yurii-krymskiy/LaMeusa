import DOMPurify from "dompurify";

/**
 * Sanitizes article/TipTap HTML before it is injected via dangerouslySetInnerHTML.
 * Strips <script>, event handlers (onerror, onclick, ...) and javascript: URLs
 * while keeping the rich-text markup the editor produces (headings, lists,
 * links, images, text-align styles). Defense in depth against stored XSS.
 */
export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        // TipTap links open in a new tab; "target" is not in the default allowlist.
        ADD_ATTR: ["target"],
    });
}
