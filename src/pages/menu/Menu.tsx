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
    const isScrollingToSection = useRef(false);
    // Locks the displayed section during programmatic scroll to prevent
    // subcategory tabs from cycling through intermediate sections
    const lockedSectionRef = useRef<string | null>(null);

    // Derive active section from activeSlug
    const derivedSection = useMemo(() => {
        for (const s of sidebarSections) {
            if (s.items.some((i) => i.slug === activeSlug)) return s.key;
        }
        return sidebarSections[0]?.key ?? "menu";
    }, [activeSlug, sidebarSections]);

    // Use locked section during scroll animation, otherwise derived
    const activeSection = lockedSectionRef.current ?? derivedSection;

    // Subcategories for the active section (mobile second row)
    const activeSectionItems = useMemo(() => {
        return (
            sidebarSections.find((s) => s.key === activeSection)?.items ?? []
        );
    }, [sidebarSections, activeSection]);

    // When user taps a section tab, scroll to its first subcategory
    const handleSectionSelect = useCallback(
        (key: string) => {
            const section = sidebarSections.find((s) => s.key === key);
            if (section && section.items.length > 0) {
                // Lock the section so subcategory tabs don't cycle during scroll
                lockedSectionRef.current = key;
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

    // Called when MobileSectionTabs finishes its scroll animation
    const handleSectionScrollDone = useCallback(() => {
        lockedSectionRef.current = null;
    }, []);

    // Scroll to section from URL hash (e.g. /menu#fish)
    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (!hash || allCategories.length === 0) return;

        setActiveSlug(hash);

        const target = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        ).find((el) => el.getAttribute("data-menu-section") === hash);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [location.hash, allCategories]);

    // Scroll spy — update activeSlug based on scroll position
    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        );
        if (!sections.length) return;

        let currentSlug = activeSlug;
        let rafId = 0;

        const updateActiveSection = () => {
            if (isScrollingToSection.current) return;

            let bestSlug = "";
            let bestDistance = Infinity;

            for (const sec of sections) {
                const rect = sec.getBoundingClientRect();
                const distance = Math.abs(rect.top - 100);
                if (
                    rect.top <= 200 &&
                    rect.bottom > 100 &&
                    distance < bestDistance
                ) {
                    bestDistance = distance;
                    bestSlug =
                        sec.getAttribute("data-menu-section") || "";
                }
            }

            if (!bestSlug) {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const rect = sections[i].getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        bestSlug =
                            sections[i].getAttribute("data-menu-section") || "";
                        break;
                    }
                }
            }

            if (bestSlug && bestSlug !== currentSlug) {
                currentSlug = bestSlug;
                setActiveSlug(bestSlug);
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
    }, [allCategories]);

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
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur md:hidden">
                <MobileSectionTabs
                    sections={sidebarSections}
                    activeSection={activeSection}
                    onSelect={handleSectionSelect}
                    scrollLockRef={isScrollingToSection}
                    onScrollDone={handleSectionScrollDone}
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
                                lockedSectionRef.current = key;
                                isScrollingToSection.current = true;
                                // Release lock when scroll ends
                                const unlock = () => {
                                    window.removeEventListener("scrollend", unlock);
                                    isScrollingToSection.current = false;
                                    lockedSectionRef.current = null;
                                };
                                window.addEventListener("scrollend", unlock, { once: true });
                                setTimeout(unlock, 4000);
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
