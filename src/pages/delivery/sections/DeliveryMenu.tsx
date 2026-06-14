import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDeliveryItems } from "../../../hooks/useDeliveryItems";
import type { MenuItemType } from "../../../components/features/menu/types";

// Delivery-specific category order and labels
const DELIVERY_CATEGORIES = [
    { slug: "tapas", labelKey: "delivery.menu.categories.appetizers" },
    { slug: "salads", labelKey: "delivery.menu.categories.salads" },
    { slug: "pizza", labelKey: "delivery.menu.categories.pizza" },
    { slug: "pasta", labelKey: "delivery.menu.categories.pasta" },
    { slug: "fish", labelKey: "delivery.menu.categories.mainCourse" },
    { slug: "meat", labelKey: "delivery.menu.categories.mainCourse" },
    { slug: "burgers", labelKey: "delivery.menu.categories.burgers" },
    { slug: "dessert", labelKey: "delivery.menu.categories.desserts" },
];

// Merge "fish" and "meat" under one "Main Course" display group
const MERGED_SLUGS: Record<string, string> = {
    fish: "main_course",
    meat: "main_course",
};

type CategoryGroup = {
    slug: string;
    label: string;
    items: MenuItemType[];
};

// ── Featured photo grid ───────────────────────────────────────────────────────
function FeaturedGrid({ items }: { items: MenuItemType[] }) {
    const withImages = items.filter((i) => i.imageUrl).slice(0, 6);
    if (withImages.length === 0) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {withImages.map((item) => {
                const price =
                    typeof item.price === "number"
                        ? `€${item.price.toFixed(2)}`
                        : item.price;
                return (
                    <div
                        key={item.id}
                        className="relative rounded-xl overflow-hidden aspect-square group"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
                                {item.title}
                            </p>
                            <p className="text-white text-sm font-bold mt-0.5">{price}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── Single menu row ───────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: MenuItemType }) {
    const priceDisplay =
        typeof item.price === "number" ? `€${item.price.toFixed(2)}` : item.price;

    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
            {/* thumbnail */}
            {item.imageUrl ? (
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
            ) : (
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}

            {/* info */}
            <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-900 leading-snug">
                    {item.title}
                    {item.isSpicy && (
                        <span className="ml-2 text-xs text-red-500 align-middle">🌶</span>
                    )}
                    {item.isTwoPerson && (
                        <span className="ml-2 text-xs text-gray-500 align-middle">👥</span>
                    )}
                </span>
                {item.description && (
                    <p className="text-sm text-gray-500 font-light mt-0.5 line-clamp-1">
                        {item.description}
                    </p>
                )}
            </div>

            {/* price */}
            <span className="text-sm font-semibold text-royal-blue whitespace-nowrap flex-shrink-0">
                {priceDisplay}
            </span>
        </div>
    );
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function CategoryAccordion({ group, defaultOpen }: { group: CategoryGroup; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen ?? false);

    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-200 text-left"
            >
                <h3 className="title text-xl font-semibold tracking-wide">{group.label}</h3>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm text-gray-400 font-normal">
                        {group.items.length} {group.items.length === 1 ? "dish" : "dishes"}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            {open && (
                <div className="px-4 pb-4 bg-white">
                    {group.items.map((item) => (
                        <MenuItemRow key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────
export const DeliveryMenu = () => {
    const { t } = useTranslation();
    const { items, isLoading, error } = useDeliveryItems();

    const categoryGroups: CategoryGroup[] = useMemo(() => {
        const groupMap = new Map<string, CategoryGroup>();

        for (const cat of DELIVERY_CATEGORIES) {
            const displaySlug = MERGED_SLUGS[cat.slug] ?? cat.slug;
            if (!groupMap.has(displaySlug)) {
                groupMap.set(displaySlug, {
                    slug: displaySlug,
                    label: t(cat.labelKey),
                    items: [],
                });
            }
        }

        for (const item of items) {
            const displaySlug = MERGED_SLUGS[item.category] ?? item.category;
            const group = groupMap.get(displaySlug);
            if (group) {
                group.items.push(item);
            } else {
                groupMap.set(displaySlug, {
                    slug: displaySlug,
                    label: item.category,
                    items: [item],
                });
            }
        }

        return Array.from(groupMap.values()).filter((g) => g.items.length > 0);
    }, [items, t]);

    return (
        <section className="section bg-white-100">
            <div className="container">
                <div className="text-center mb-10 lg:mb-14">
                    <span className="decorative">{t("delivery.menu.decorative")}</span>
                    <h2 className="title section-title">{t("delivery.menu.title")}</h2>
                    <p className="description section-description mt-3 max-w-2xl mx-auto">
                        {t("delivery.menu.description")}
                    </p>
                </div>

                {isLoading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-10 w-10 border-4 border-royal-blue border-t-transparent rounded-full" />
                    </div>
                )}

                {error && (
                    <p className="text-center text-red-500 py-10">{error}</p>
                )}

                {!isLoading && !error && (
                    <>
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {categoryGroups.map((group, idx) => (
                                <CategoryAccordion
                                    key={group.slug}
                                    group={group}
                                    defaultOpen={idx === 0}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
