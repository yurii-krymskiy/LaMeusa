import { useEffect, useMemo, useState } from "react";

import { MenuItem } from "../../../components/features/menu/content/item/MenuItem";
import { MenuResolver } from "../../../components/features/menu/menuResolver";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";
import { useLocation } from "react-router-dom";
import { useMenuItems } from "../../../hooks/useMenuItems";
import { CategoryTabsSkeleton } from "../../../components/features/menu/content/CategoryTabsSkeleton";
import { MenuItemSkeletonGrid } from "../../../components/features/menu/content/item/MenuItemSkeleton";

export const MenuDelicios = () => {
    const location = useLocation().pathname;
    const { items, isLoading } = useMenuItems();

    const { categories: allCategories } = useMemo(() => {
        return new MenuResolver(items).resolve();
    }, [items]);

    // Show only first 4 categories for this component
    const categories = allCategories.slice(0, 4);

    const [activeCategory, setActiveCategory] = useState("");

    // Set initial category when categories load
    useEffect(() => {
        if (categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0]?.slug ?? "");
        }
    }, [categories, activeCategory]);

    const currentCategory =
        categories.some((category) => category.slug === activeCategory) &&
        activeCategory
            ? activeCategory
            : (categories[0]?.slug ?? "");

    const activeItems =
        categories.find((category) => category.slug === currentCategory)
            ?.items ?? [];

    // Capitalize first letter of title
    const capitalize = (str: string) => 
        str.charAt(0).toUpperCase() + str.slice(1);

    if (isLoading) {
        return (
            <section className="section bg-white-100">
                <div className="container">
                    <div className="mx-auto mb-10 max-w-[850px] text-center">
                        {location !== Paths.seafood ? (
                            <img
                                src="/icons/star.svg"
                                alt="star"
                                className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                            />
                        ) : (
                            <p className="decorative">Menu</p>
                        )}
                        <p className="title section-title">Our delicious menu</p>
                    </div>

                    <CategoryTabsSkeleton />
                    <MenuItemSkeletonGrid count={6} />

                    <div className="text-center">
                        <Button variant="blue" to={Paths.menu}>
                            view menu
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-white-100">
            <div className="container">
                <div className="mx-auto mb-10 max-w-[850px] text-center">
                    {location !== Paths.seafood ? (
                        <img
                            src="/icons/star.svg"
                            alt="star"
                            className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                        />
                    ) : (
                        <p className="decorative">Menu</p>
                    )}

                    <p className="title section-title">Our delicious menu</p>
                </div>

                <div className="mb-11 flex flex-wrap justify-center gap-5">
                    {categories.map((category) => {
                        const isActive = category.slug === currentCategory;
                        return (
                            <button
                                key={category.slug}
                                type="button"
                                onClick={() => setActiveCategory(category.slug)}
                                className={`cursor-pointer text-lg lg:text-xl font-medium transition-colors hover:opacity-80 ${isActive ? "text-royal-blue font-semibold underline decoration-2 underline-offset-4" : "text-gray-700"}`}
                                aria-pressed={isActive}
                            >
                                {capitalize(category.title)}
                            </button>
                        );
                    })}
                </div>

                <article className="grid-col-1 mb-10 grid gap-x-10 gap-y-10 lg:grid-cols-2">
                    {activeItems.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </article>
                <div className="text-center">
                    <Button variant="blue" to={Paths.menu}>
                        view menu
                    </Button>
                </div>
            </div>
        </section>
    );
};
