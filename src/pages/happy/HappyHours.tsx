import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { HappyHoursReserve } from "./sections/HaapyHoursReserv";
import { HappyHoursGallery } from "./sections/HappyHoursGallery";
import { HappyHoursHero } from "./sections/HappyHoursHero";
import { HappyHoursSpecial } from "./sections/HappyHoursSpecial";
import { HappyHoursWhy } from "./sections/HappyHoursWhy";

export const HappyHours = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.happyHours.title")}
                description={t("seo.happyHours.description")}
                path="/happy-hours"
                preloadImages={["/images/pasta/top-view-seafood-side-dish-plates-with-shrimp-crab-meat-anchovy.webp"]}
            />
            <HappyHoursHero />
            <HappyHoursWhy />
            <HappyHoursSpecial />
            <HappyHoursGallery />
            <HappyHoursReserve />
        </>
    );
};
