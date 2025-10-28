import type { SidebarType } from "../types";

type MenuSidebarProps = {
    items: SidebarType[];
    activeSlug?: string;
    onSelect?: (slug: string) => void;
};

export const MenuSidebar = ({
    items,
    activeSlug,
    onSelect,
}: MenuSidebarProps) => {
    if (!items.length) return null;

    return (
        <aside className="hidden w-[266px] md:block">
            <div className="sticky top-28 space-y-6">
                <div>
                    <h3 className="title text-2xl text-gray-700 uppercase">
                        Menu
                    </h3>
                </div>
                <nav aria-label="Menu sections">
                    <ul className="space-y-1">
                        {items.map((item) => {
                            const isActive = item.slug === activeSlug;
                            return (
                                <li key={item.slug}>
                                    <a
                                        href={`#menu-section-${item.slug}`}
                                        onClick={() => onSelect?.(item.slug)}
                                        className={[
                                            "description flex items-center justify-between rounded-full p-1 text-2xl font-semibold uppercase transition-colors",
                                            isActive
                                                ? "text-sky"
                                                : "hover:text-sky text-royal-blue",
                                        ].join(" ")}
                                    >
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};
