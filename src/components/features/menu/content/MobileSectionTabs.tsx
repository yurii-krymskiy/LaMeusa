import { useCallback, useEffect, useRef, useMemo, type MutableRefObject } from "react";
import type { SidebarSection } from "../sidebar/MenuSidebar";

type Props = {
    sections: SidebarSection[];
    activeSection?: string;
    onSelect?: (sectionKey: string) => void;
    scrollLockRef?: MutableRefObject<boolean>;
};

export const MobileSectionTabs = ({
    sections,
    activeSection,
    onSelect,
    scrollLockRef,
}: Props) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    // Center the active section tab
    useEffect(() => {
        if (!activeSection || !listRef.current) return;
        const el = listRef.current.querySelector<HTMLButtonElement>(
            `[data-section-tab="${activeSection}"]`
        );
        if (!el) return;

        const container = listRef.current;
        const scrollLeft =
            el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }, [activeSection]);

    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const scrollToFirstInSection = useCallback(
        (section: SidebarSection) => {
            onSelect?.(section.key);

            if (section.items.length === 0) return;
            const slug = section.items[0].slug;
            const el = document.getElementById(slug);
            if (!el) return;

            if (scrollLockRef) scrollLockRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

            const y =
                window.scrollY + el.getBoundingClientRect().top - 96;
            window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });

            const unlock = () => {
                window.removeEventListener("scrollend", unlock);
                if (scrollLockRef) scrollLockRef.current = false;
            };
            window.addEventListener("scrollend", unlock, { once: true });
            scrollTimeoutRef.current = setTimeout(unlock, 1000);
        },
        [onSelect, scrollLockRef]
    );

    const buttons = useMemo(
        () =>
            sections.map((section) => {
                const isActive = section.key === activeSection;
                return (
                    <button
                        key={section.key}
                        type="button"
                        data-section-tab={section.key}
                        onClick={() => scrollToFirstInSection(section)}
                        className={[
                            "shrink-0 rounded-full px-5 py-2 text-sm font-bold uppercase transition-colors",
                            isActive
                                ? "bg-sky text-white"
                                : "bg-gray-100 text-royal-blue hover:bg-gray-200",
                        ].join(" ")}
                    >
                        {section.label}
                    </button>
                );
            }),
        [sections, activeSection, scrollToFirstInSection]
    );

    if (!sections.length) return null;

    return (
        <div
            ref={listRef}
            className="no-scrollbar flex w-full gap-2 overflow-x-auto overscroll-x-contain px-4 py-2"
            aria-label="Menu sections"
            role="tablist"
        >
            {buttons}
        </div>
    );
};
