import { useState } from "react";

import { MenuItem } from "../../../components/features/menu/content/item/MenuItem";
import { MenuResolver } from "../../../components/features/menu/menuResolver";
import type { MenuItemType } from "../../../components/features/menu/types";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

const rawItems: MenuItemType[] = [
    {
        id: "1",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "134",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "15432",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "15423",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "16543",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "17564",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Starters",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "128675",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Salads",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "185672",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Soups",
        imageUrl: "/images/home/image-3.jpg",
    },
    {
        id: "108957642",
        title: "Mix of canarian cheeses",
        description:
            "This is a section of your menu. Give your section a brief description",
        price: 17,
        category: "Desserts",
        imageUrl: "/images/home/image-3.jpg",
    },
];

export const MenuDelicios = () => {
    const { categories } = new MenuResolver(rawItems).resolve();
    const [activeCategory, setActiveCategory] = useState(
        () => categories[3]?.slug ?? ""
    );

    const currentCategory =
        categories.some((category) => category.slug === activeCategory) &&
        activeCategory
            ? activeCategory
            : (categories[0]?.slug ?? "");

    const activeItems =
        categories.find((category) => category.slug === currentCategory)
            ?.items ?? [];

    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-6 size-[22px]"
                    />
                    <p className="title section-title">Our delicious menu</p>
                </div>

                <div className="mb-11 flex flex-wrap justify-center gap-8">
                    {categories.map((category) => {
                        const isActive = category.slug === currentCategory;
                        return (
                            <button
                                key={category.slug}
                                type="button"
                                onClick={() => setActiveCategory(category.slug)}
                                className={`text-2xl font-semibold transition-colors hover:opacity-80 ${isActive ? "text-royal-blue underline decoration-2 underline-offset-4" : "text-gray-700"}`}
                                aria-pressed={isActive}
                            >
                                {category.title}
                            </button>
                        );
                    })}
                </div>

                <article className="grid-col-1 mb-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
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
