import { useCallback, useEffect, useMemo, useRef } from "react";
import type { SidebarType } from "../types";

type Props = {
    items: SidebarType[];
    activeSlug?: string;
    onSelect?: (slug: string) => void;
    headerOffset?: number;
};

export const MobileCategoryTabs = ({
    items,
    activeSlug,
    onSelect,
    headerOffset = 40,
}: Props) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const isUserScrolling = useRef(false);

    useEffect(() => {
        if (!activeSlug || !listRef.current || isUserScrolling.current) return;
        const el = listRef.current.querySelector<HTMLButtonElement>(
            `[data-tab="${activeSlug}"]`
        );
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [activeSlug]);

    const scrollToSlug = useCallback(
        (slug: string) => {
            isUserScrolling.current = true;
            const section = document.getElementById(`menu-section-${slug}`);
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const y = Math.max(window.scrollY + rect.top - headerOffset, 0);
            window.scrollTo({ top: y, behavior: "smooth" });
            
            // Reset user scrolling flag after animation
            setTimeout(() => {
                isUserScrolling.current = false;
            }, 500);
        },
        [headerOffset]
    );

    const buttons = useMemo(
        () =>
            items.map((item) => {
                const isActive = item.slug === activeSlug;
                return (
                    <button
                        key={item.slug}
                        type="button"
                        data-tab={item.slug}
                        onClick={() => {
                            onSelect?.(item.slug);
                            scrollToSlug(item.slug);
                        }}
                        className={[
                            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors",
                            isActive
                                ? "text-sky"
                                : "hover:text-sky text-royal-blue",
                        ].join(" ")}
                    >
                        {item.title}
                    </button>
                );
            }),
        [items, activeSlug, onSelect, scrollToSlug]
    );

    if (!items.length) return null;

    return (
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur md:hidden">
            <div
                ref={listRef}
                className="no-scrollbar flex w-full gap-2 overflow-x-auto overscroll-x-contain px-4 py-3"
                style={{ 
                    WebkitOverflowScrolling: "touch",
                }}
                aria-label="Menu categories"
                role="tablist"
            >
                {buttons}
            </div>
        </div>
    );
};
