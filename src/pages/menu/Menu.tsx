import { useEffect, useMemo, useState } from "react";
import {
    CategoryDictionary,
    MenuResolver,
    rawItems,
} from "../../components/features/menu/menuResolver";
import { MenuSidebar } from "../../components/features/menu/sidebar/MenuSidebar";
import { MenuList } from "../../components/features/menu/content/MenuList";
import { MobileCategoryTabs } from "../../components/features/menu/content/MobileCaregoryTabs";
import { MenuReserve } from "./sections/MenuReserve";

const dictionary = new CategoryDictionary(
    [
        "tapas_and_appetizers",
        "fish_and_seafood",
        "pasta",
        "meat",
        "children_menu",
    ],
    {
        tapas_and_appetizers: "Tapas & Appetizers",
        fish_and_seafood: "Fish & Seafood",
        pasta: "Pasta",
        meat: "Meat",
        children_menu: "Children's Menu",
    }
);

export const Menu = () => {
    const resolved = useMemo(() => {
        const resolver = new MenuResolver(rawItems, dictionary);
        return resolver.resolve();
    }, []);

    const [activeSlug, setActiveSlug] = useState(
        resolved.sidebar[0]?.slug ?? ""
    );

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-menu-section]")
        );
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length) {
                    const slug =
                        visible[0].target.getAttribute("data-menu-section") ||
                        "";
                    if (slug && slug !== activeSlug) setActiveSlug(slug);
                } else {
                    const top = sections
                        .map((s) => ({
                            s,
                            y: Math.abs(s.getBoundingClientRect().top),
                        }))
                        .sort((a, b) => a.y - b.y)[0];
                    const slug = top?.s.getAttribute("data-menu-section") || "";
                    if (slug && slug !== activeSlug) setActiveSlug(slug);
                }
            },
            {
                // root: null,
                // rootMargin: "-40% 0px -50% 0px",
                // threshold: [0.1, 0.25, 0.5, 0.75, 1],
            }
        );
        console.log(observer);
        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, [activeSlug]);

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
                        discover new facets of flavor
                    </h1>
                    <p className="description hero-description !ml-0 max-w-2xl !text-left text-base md:text-lg">
                        Experience the taste of Mediterranean cuisine against
                        the backdrop of the Atlantic Ocean. At La Medusa, we
                        create an atmosphere where every moment is a pleasure
                        and every dish is a story.
                    </p>
                </div>
            </section>

            <section className="section bg-white-100">
                <div className="container flex flex-col gap-10 lg:flex-row">
                    <MenuSidebar
                        items={resolved.sidebar}
                        activeSlug={activeSlug}
                        onSelect={setActiveSlug}
                    />
                    <MenuList categories={resolved.categories} />
                </div>
                <MenuReserve />
            </section>
        </main>
    );
};
