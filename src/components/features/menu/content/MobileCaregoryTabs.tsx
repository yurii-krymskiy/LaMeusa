import { useCallback, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import type { SidebarType } from "../types";

type Props = {
    items: SidebarType[];
    activeSlug?: string;
    onSelect?: (slug: string) => void;
    headerOffset?: number;
    scrollLockRef?: MutableRefObject<boolean>;
};

export const MobileCategoryTabs = ({
    items,
    activeSlug,
    onSelect,
    headerOffset = 40,
    scrollLockRef,
}: Props) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const isUserScrolling = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const setScrollLock = useCallback(
        (locked: boolean) => {
            isUserScrolling.current = locked;
            if (scrollLockRef) scrollLockRef.current = locked;
        },
        [scrollLockRef]
    );

    // When items change (section switch), instantly reset scroll to start
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollLeft = 0;
        }
    }, [items]);

    // Smoothly center the active tab without fighting page scroll
    useEffect(() => {
        if (!activeSlug || !listRef.current || isUserScrolling.current) return;
        const el = listRef.current.querySelector<HTMLButtonElement>(
            `[data-tab="${activeSlug}"]`
        );
        if (!el || !listRef.current) return;

        const container = listRef.current;
        const scrollLeft =
            el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    }, [activeSlug]);

    const scrollToSlug = useCallback(
        (slug: string) => {
            setScrollLock(true);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            const section = document.getElementById(slug);
            if (!section) {
                setScrollLock(false);
                return;
            }
            const rect = section.getBoundingClientRect();
            const y = Math.max(window.scrollY + rect.top - headerOffset, 0);
            window.scrollTo({ top: y, behavior: "smooth" });

            const unlock = () => {
                window.removeEventListener("scrollend", unlock);
                setScrollLock(false);
            };
            window.addEventListener("scrollend", unlock, { once: true });
            scrollTimeoutRef.current = setTimeout(unlock, 4000);
        },
        [headerOffset, setScrollLock]
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
        <div
            ref={listRef}
            className="no-scrollbar flex w-full gap-2 overflow-x-auto overscroll-x-contain px-4 py-2 md:hidden"
            style={{ 
                WebkitOverflowScrolling: "touch",
            }}
            aria-label="Menu categories"
            role="tablist"
        >
            {buttons}
        </div>
    );
};
