import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
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
    const location = useLocation();
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
    const isScrollingToSection = useRef(false);

    // Set initial active slug when data loads
    useEffect(() => {
        if (resolved.sidebar.length > 0 && !activeSlug) {
            setActiveSlug(resolved.sidebar[0]?.slug ?? "");
        }
    }, [resolved.sidebar, activeSlug]);

    // Scroll to section from URL hash (e.g. /menu#fish)
    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (!hash || resolved.categories.length === 0) return;

        setActiveSlug(hash);

        const target = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        ).find((el) => el.getAttribute("data-menu-section") === hash);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [location.hash, resolved.categories]);

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
                // Find the section whose top is closest to but not far above the viewport top
                // Use 100px as the reference point (below sticky header/tabs)
                const distance = Math.abs(rect.top - 100);
                if (rect.top <= 200 && rect.bottom > 100 && distance < bestDistance) {
                    bestDistance = distance;
                    bestSlug = sec.getAttribute("data-menu-section") || "";
                }
            }

            // Fallback: if nothing matched (scrolled past everything), pick the last visible
            if (!bestSlug) {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const rect = sections[i].getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        bestSlug = sections[i].getAttribute("data-menu-section") || "";
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
            <SEO
                title={t("seo.menu.title")}
                description={t("seo.menu.description")}
                path="/menu"
                preloadImages={["/images/menu/top-view-seafood-side-dish-plates-with-shrimp-crab-meat-anchovy.webp"]}
            />
            <MobileCategoryTabs
                items={resolved.sidebar}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
                headerOffset={96}
                scrollLockRef={isScrollingToSection}
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
