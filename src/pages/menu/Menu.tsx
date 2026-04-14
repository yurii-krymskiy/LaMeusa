import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import {
    CategoryDictionary,
    MenuResolver,
} from "../../components/features/menu/menuResolver";
import {
    MenuSidebar,
    type SidebarSection,
} from "../../components/features/menu/sidebar/MenuSidebar";
import { MenuList } from "../../components/features/menu/content/MenuList";
import { MobileCategoryTabs } from "../../components/features/menu/content/MobileCaregoryTabs";
import { MobileSectionTabs } from "../../components/features/menu/content/MobileSectionTabs";
import { MenuReserve } from "./sections/MenuReserve";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { useMenuItems } from "../../hooks/useMenuItems";
import { useBarItems } from "../../hooks/useBarItems";
import { useCocktailItems } from "../../hooks/useCocktailItems";
import { MobileCategoryTabsSkeleton } from "../../components/features/menu/content/MobileCategoryTabsSkeleton";
import { SidebarSkeleton } from "../../components/features/menu/sidebar/SidebarSkeleton";
import { MenuListSkeleton } from "../../components/features/menu/content/MenuListSkeleton";

export const Menu = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { items: menuItems, isLoading: menuLoading } = useMenuItems();
    const { items: barItems, isLoading: barLoading } = useBarItems();
    const { items: cocktailItems, isLoading: cocktailLoading } =
        useCocktailItems();

    const isLoading = menuLoading || barLoading || cocktailLoading;

    // Food menu dictionary (ordered subcategories)
    const menuDictionary = useMemo(
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

    // Resolve each section independently
    const menuResolved = useMemo(
        () => new MenuResolver(menuItems, menuDictionary).resolve(),
        [menuItems, menuDictionary]
    );
    const barResolved = useMemo(
        () => new MenuResolver(barItems).resolve(),
        [barItems]
    );
    const cocktailResolved = useMemo(
        () => new MenuResolver(cocktailItems).resolve(),
        [cocktailItems]
    );

    // Merge all categories into one continuous list
    const allCategories = useMemo(
        () => [
            ...menuResolved.categories,
            ...barResolved.categories,
            ...cocktailResolved.categories,
        ],
        [menuResolved, barResolved, cocktailResolved]
    );

    // Sidebar sections for accordion (desktop)
    const sidebarSections: SidebarSection[] = useMemo(
        () => [
            {
                key: "menu",
                label: t("menu.sections.menu"),
                items: menuResolved.sidebar,
            },
            {
                key: "bar",
                label: t("menu.sections.bar"),
                items: barResolved.sidebar,
            },
            {
                key: "cocktails",
                label: t("menu.sections.cocktails"),
                items: cocktailResolved.sidebar,
            },
        ],
        [t, menuResolved.sidebar, barResolved.sidebar, cocktailResolved.sidebar]
    );

    const [activeSlug, setActiveSlug] = useState("");
    const [activeSection, setActiveSection] = useState("menu");
    const isScrollingToSection = useRef(false);

    // Map slug → section key for scroll spy
    const slugToSectionMap = useMemo(() => {
        const map = new Map<string, string>();
        for (const s of sidebarSections) {
            for (const item of s.items) {
                map.set(item.slug, s.key);
            }
        }
        return map;
    }, [sidebarSections]);

    // Subcategories for the active section (mobile second row)
    const activeSectionItems = useMemo(() => {
        return (
            sidebarSections.find((s) => s.key === activeSection)?.items ?? []
        );
    }, [sidebarSections, activeSection]);

    // When user taps a section tab, instantly switch section + scroll
    const handleSectionSelect = useCallback(
        (key: string) => {
            const section = sidebarSections.find((s) => s.key === key);
            if (section && section.items.length > 0) {
                setActiveSection(key);
                setActiveSlug(section.items[0].slug);
            }
        },
        [sidebarSections]
    );

    // Set initial active slug only after ALL data has loaded
    useEffect(() => {
        if (!isLoading && menuResolved.sidebar.length > 0 && !activeSlug) {
            setActiveSlug(menuResolved.sidebar[0]?.slug ?? "");
        }
    }, [isLoading, menuResolved.sidebar, activeSlug]);

    // Scroll to section from URL hash (e.g. /menu#fish)
    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (!hash || allCategories.length === 0) return;

        setActiveSlug(hash);
        const section = slugToSectionMap.get(hash);
        if (section) setActiveSection(section);

        const target = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        ).find((el) => el.getAttribute("data-menu-section") === hash);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [location.hash, allCategories, slugToSectionMap]);

    // Scroll spy — update activeSlug based on scroll position
    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        );
        if (!sections.length) return;

        let currentSlug = "";
        let rafId = 0;

        const updateActiveSection = () => {
            if (isScrollingToSection.current) return;

            let bestSlug = "";
            let bestDistance = Infinity;
            const headerBottom = 100;

            for (const sec of sections) {
                const rect = sec.getBoundingClientRect();
                const distance = Math.abs(rect.top - headerBottom);
                if (
                    rect.top <= 300 &&
                    rect.bottom > headerBottom &&
                    distance < bestDistance
                ) {
                    bestDistance = distance;
                    bestSlug =
                        sec.getAttribute("data-menu-section") || "";
                }
            }

            // Fallback: find the first section still visible below the header
            if (!bestSlug) {
                for (const sec of sections) {
                    const rect = sec.getBoundingClientRect();
                    if (rect.bottom > headerBottom) {
                        bestSlug =
                            sec.getAttribute("data-menu-section") || "";
                        break;
                    }
                }
            }

            if (bestSlug && bestSlug !== currentSlug) {
                currentSlug = bestSlug;
                setActiveSlug(bestSlug);
                const sec = slugToSectionMap.get(bestSlug);
                if (sec) setActiveSection(sec);
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateActiveSection);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [allCategories, slugToSectionMap]);

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
            <SEO
                title={t("seo.menu.title")}
                description={t("seo.menu.description")}
                path="/menu"
                preloadImages={[
                    "/images/menu/top-view-seafood-side-dish-plates-with-shrimp-crab-meat-anchovy.webp",
                ]}
            />
            {/* Mobile: dual navigation — section tabs + subcategory tabs */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur md:hidden will-change-transform">
                <MobileSectionTabs
                    sections={sidebarSections}
                    activeSection={activeSection}
                    onSelect={handleSectionSelect}
                    scrollLockRef={isScrollingToSection}
                />
                <div className="border-t border-gray-200/50">
                    <MobileCategoryTabs
                        items={activeSectionItems}
                        activeSlug={activeSlug}
                        onSelect={setActiveSlug}
                        headerOffset={96}
                        scrollLockRef={isScrollingToSection}
                    />
                </div>
            </div>
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
                            sections={sidebarSections}
                            activeSlug={activeSlug}
                            activeSection={activeSection}
                            onSelect={setActiveSlug}
                            onSectionSelect={(key) => {
                                setActiveSection(key);
                            }}
                        />
                        <MenuList categories={allCategories} />
                    </div>
                </div>
                <MenuReserve />
            </section>
        </main>
    );
};
