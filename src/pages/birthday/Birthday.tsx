import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { BirthdayGallery } from "./section/BirthdayGallery";
import { BirthdayGift } from "./section/BirthdayGift";
import { BirthdayGrid } from "./section/BirthdayGrid";
import { BirthdayHero } from "./section/BirthdayHero";
import { BirthdayReserve } from "./section/BirthdayReserve";
import { BirthdayWhy } from "./section/BirthdayWhy";

export const Birthday = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.birthdays.title")}
                description={t("seo.birthdays.description")}
                path="/birthdays"
                preloadImages={["/images/birthday/top-view-seafood-side-dish-plates-with-shrimp-crab-meat-anchovy.webp"]}
            />
            <BirthdayHero />
            <BirthdayWhy />
            <BirthdayGallery />
            <BirthdayGift />
            <BirthdayGrid />
            <BirthdayReserve />
        </>
    );
};
