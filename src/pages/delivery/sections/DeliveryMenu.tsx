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

const EASE = "ease-[cubic-bezier(0.25,0.1,0.25,1)]";

type CategoryGroup = {
    slug: string;
    label: string;
    items: MenuItemType[];
};

// ── Single menu row ───────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: MenuItemType }) {
    const priceDisplay =
        typeof item.price === "number"
            ? `€${item.price.toFixed(2)}`
            : item.price;

    return (
        <div className="border-sky/10 flex items-center gap-3.5 border-b py-3 last:border-0">
            {/* thumbnail */}
            {item.imageUrl ? (
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="size-14 shrink-0 rounded-[10px] object-cover"
                />
            ) : (
                <div className="bg-white-100 flex size-14 shrink-0 items-center justify-center rounded-[10px]">
                    <img
                        src="/icons/star.svg"
                        alt=""
                        className="size-5 opacity-30"
                    />
                </div>
            )}

            {/* info */}
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                    <span className="text-navy min-w-0 text-[16px] leading-snug font-semibold break-words md:truncate">
                        {item.title}
                        {item.isSpicy && (
                            <span className="ml-2 align-middle text-xs">
                                🌶
                            </span>
                        )}
                        {item.isTwoPerson && (
                            <span className="ml-2 align-middle text-xs">
                                👥
                            </span>
                        )}
                    </span>
                    <span className="border-sky/40 mb-[3px] hidden min-w-4 flex-1 border-b border-dotted md:block" />
                    <span className="title text-sky ml-auto shrink-0 text-base font-semibold whitespace-nowrap md:ml-0">
                        {priceDisplay}
                    </span>
                </div>
                {item.description && (
                    <p className="mt-0.5 line-clamp-1 text-sm font-light text-gray-500">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function CategoryAccordion({
    group,
    defaultOpen,
}: {
    group: CategoryGroup;
    defaultOpen?: boolean;
}) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(defaultOpen ?? false);

    return (
        <div
            className={`overflow-hidden rounded-xl border bg-white transition-colors duration-500 ${EASE} ${
                open ? "border-navy" : "border-gray-200"
            }`}
        >
            <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-500 ${EASE} md:px-6 ${
                    open ? "bg-navy" : "hover:bg-sky/5 bg-white"
                }`}
            >
                <h3
                    className={`title text-lg font-semibold tracking-wide transition-colors duration-500 md:text-xl ${
                        open ? "!text-white" : ""
                    }`}
                >
                    {group.label}
                </h3>
                <div className="flex shrink-0 items-center gap-3">
                    <span
                        className={`text-sm font-light whitespace-nowrap transition-colors duration-500 ${
                            open ? "text-white/65" : "text-gray-400"
                        }`}
                    >
                        {t("delivery.menu.dishes", {
                            count: group.items.length,
                        })}
                    </span>
                    <svg
                        className={`size-5 transition-all duration-500 ${EASE} ${
                            open ? "rotate-180 text-[#7cc3ec]" : "text-sky"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.6}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>

            <div
                className={`grid transition-all duration-500 ${EASE} ${
                    open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div
                        className={`px-5 pb-4 transition-transform duration-500 ${EASE} md:px-6 ${
                            open ? "translate-y-0" : "-translate-y-2"
                        }`}
                    >
                        {group.items.map((item) => (
                            <MenuItemRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
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
                <div className="mb-10 text-center lg:mb-14">
                    <span className="decorative">
                        {t("delivery.menu.decorative")}
                    </span>
                    <h2 className="title section-title">
                        {t("delivery.menu.title")}
                    </h2>
                    <p className="description section-description mx-auto mt-3 max-w-2xl">
                        {t("delivery.menu.description")}
                    </p>
                </div>

                {isLoading && (
                    <div className="flex justify-center py-20">
                        <div className="border-royal-blue h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
                    </div>
                )}

                {error && (
                    <p className="py-10 text-center text-red-500">{error}</p>
                )}

                {!isLoading && !error && (
                    <div className="mx-auto max-w-3xl space-y-4">
                        {categoryGroups.map((group, idx) => (
                            <CategoryAccordion
                                key={group.slug}
                                group={group}
                                defaultOpen={idx === 0}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
