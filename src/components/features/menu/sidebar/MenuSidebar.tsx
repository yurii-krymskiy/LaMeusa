import { useCallback } from "react";
import type { SidebarType } from "../types";

export type SidebarSection = {
    key: string;
    label: string;
    items: SidebarType[];
};

type MenuSidebarProps = {
    sections: SidebarSection[];
    activeSlug?: string;
    activeSection?: string;
    onSelect?: (slug: string) => void;
    onSectionSelect?: (key: string) => void;
};

export const MenuSidebar = ({
    sections,
    activeSlug,
    activeSection,
    onSelect,
    onSectionSelect,
}: MenuSidebarProps) => {
    const scrollToSection = useCallback(
        (slug: string, sectionKey?: string) => {
            if (sectionKey) onSectionSelect?.(sectionKey);
            onSelect?.(slug);
            const el = document.getElementById(slug);
            if (el) {
                const y =
                    window.scrollY +
                    el.getBoundingClientRect().top -
                    100;
                window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
            }
        },
        [onSelect, onSectionSelect]
    );

    if (!sections.length) return null;

    // Use provided activeSection, otherwise derive from slug
    const activeSectionKey =
        activeSection ??
        sections.find((s) => s.items.some((i) => i.slug === activeSlug))?.key ??
        sections[0]?.key;

    return (
        <aside className="hidden w-[266px] shrink-0 md:block">
            <div className="sticky top-28 space-y-2">
                <nav aria-label="Menu sections">
                    {sections.map((section) => {
                        const isExpanded = section.key === activeSectionKey;
                        return (
                            <div key={section.key} className="mb-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (section.items.length > 0) {
                                            scrollToSection(section.items[0].slug, section.key);
                                        }
                                    }}
                                    className={[
                                        "title flex w-full items-center justify-between py-2 text-left text-2xl uppercase transition-colors",
                                        isExpanded
                                            ? "text-sky"
                                            : "hover:text-sky text-gray-700",
                                    ].join(" ")}
                                >
                                    <span>{section.label}</span>
                                    <svg
                                        className={[
                                            "h-4 w-4 transition-transform duration-200",
                                            isExpanded ? "rotate-180" : "",
                                        ].join(" ")}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                <div
                                    className={[
                                        "overflow-hidden transition-all duration-300",
                                        isExpanded
                                            ? "max-h-[2000px] opacity-100"
                                            : "max-h-0 opacity-0",
                                    ].join(" ")}
                                >
                                    <ul className="space-y-1 pl-3 pb-2">
                                        {section.items.map((item) => {
                                            const isActive =
                                                item.slug === activeSlug;
                                            return (
                                                <li key={item.slug}>
                                                    <a
                                                        href={`#${item.slug}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection(
                                                                item.slug
                                                            );
                                                        }}
                                                        className={[
                                                            "description flex items-center rounded-full p-1 text-lg font-semibold uppercase transition-colors",
                                                            isActive
                                                                ? "text-sky"
                                                                : "hover:text-sky text-royal-blue",
                                                        ].join(" ")}
                                                    >
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};
