import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CategoryDictionary,
    MenuResolver,
} from "../../components/features/menu/menuResolver";
import { MenuSidebar } from "../../components/features/menu/sidebar/MenuSidebar";
import { MenuList } from "../../components/features/menu/content/MenuList";
import { MobileCategoryTabs } from "../../components/features/menu/content/MobileCaregoryTabs";
import { MenuReserve } from "./sections/MenuReserve";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { useMenuItems } from "../../hooks/useMenuItems";
import { MobileCategoryTabsSkeleton } from "../../components/features/menu/content/MobileCategoryTabsSkeleton";
import { SidebarSkeleton } from "../../components/features/menu/sidebar/SidebarSkeleton";
import { MenuListSkeleton } from "../../components/features/menu/content/MenuListSkeleton";

export const Menu = () => {
    const { t } = useTranslation();
    const { items, isLoading } = useMenuItems();

    const dictionary = useMemo(
        () =>
            new CategoryDictionary(
                [
                    "tapas",
                    "salads",
                    "pizza",
                    "pasta",
                    "fish",
                    "meat",
                    "burgers",
                    "paella",
                    "dessert",
                    "kids",
                    "sauces",
                ],
                {
                    tapas: t("menu.categories.tapas"),
                    salads: t("menu.categories.salads"),
                    pizza: t("menu.categories.pizza"),
                    pasta: t("menu.categories.pasta"),
                    fish: t("menu.categories.fish"),
                    meat: t("menu.categories.meat"),
                    burgers: t("menu.categories.burgers"),
                    paella: t("menu.categories.paella"),
                    dessert: t("menu.categories.desserts"),
                    kids: t("menu.categories.kids"),
                    sauces: t("menu.categories.sauces"),
                }
            ),
        [t]
    );

    const resolved = useMemo(() => {
        const resolver = new MenuResolver(items, dictionary);
        return resolver.resolve();
    }, [items, dictionary]);

    const [activeSlug, setActiveSlug] = useState("");

    // Set initial active slug when data loads
    useEffect(() => {
        if (resolved.sidebar.length > 0 && !activeSlug) {
            setActiveSlug(resolved.sidebar[0]?.slug ?? "");
        }
    }, [resolved.sidebar, activeSlug]);

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        );
        if (!sections.length) return;

        // Use a ref-like approach to avoid recreating observer on activeSlug change
        let currentSlug = activeSlug;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the section closest to the top of the viewport
                const validEntries = entries.filter((e) => e.isIntersecting);
                
                if (validEntries.length > 0) {
                    // Sort by how close to top of viewport (accounting for header)
                    const sorted = validEntries.sort((a, b) => {
                        const aTop = a.boundingClientRect.top;
                        const bTop = b.boundingClientRect.top;
                        return aTop - bTop;
                    });
                    
                    const slug = sorted[0].target.getAttribute("data-menu-section") || "";
                    if (slug && slug !== currentSlug) {
                        currentSlug = slug;
                        setActiveSlug(slug);
                    }
                }
            },
            {
                root: null,
                rootMargin: "-50px 0px -70% 0px",
                threshold: [0, 0.1],
            }
        );
        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, [resolved.categories]);

    if (isLoading) {
        return (
            <main>
                <MobileCategoryTabsSkeleton />
                <section className="hero menu-hero hidden bg-white md:block">
                    <div className="container flex max-w-[1050px] flex-col items-start text-left">
                        <h1 className="title hero-title !ml-0 !text-left text-4xl md:text-5xl">
                            {t("menu.hero.title")}
                        </h1>
                        <p className="description hero-description !ml-0 max-w-2xl !text-left text-base md:text-lg">
                            {t("menu.hero.description")}
                        </p>
                    </div>
                </section>

                <section className="bg-white-100 relative pt-2 pb-6 lg:pt-6 lg:pb-16">
                    <div className="container">
                        <Breadcrumb />
                        <div className="flex flex-col gap-10 lg:flex-row">
                            <SidebarSkeleton />
                            <MenuListSkeleton />
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <MobileCategoryTabs
                items={resolved.sidebar}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
                headerOffset={96}
            />
            <section className="hero menu-hero hidden bg-white md:block">
                <div className="container flex max-w-[1050px] flex-col items-start text-left">
                    <h1 className="title hero-title !ml-0 !text-left text-4xl md:text-5xl">
                        {t("menu.hero.title")}
                    </h1>
                    <p className="description hero-description !ml-0 max-w-2xl !text-left text-base md:text-lg">
                        {t("menu.hero.description")}
                    </p>
                </div>
            </section>

            <section className="bg-white-100 relative pt-2 pb-6 lg:pt-6 lg:pb-16">
                <div className="container">
                    <Breadcrumb />
                    <div className="flex flex-col gap-10 lg:flex-row">
                        <MenuSidebar
                            items={resolved.sidebar}
                            activeSlug={activeSlug}
                            onSelect={setActiveSlug}
                        />
                        <MenuList categories={resolved.categories} />
                    </div>
                </div>
                <MenuReserve />
            </section>
        </main>
    );
};
