import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { TakeawayHero } from "./sections/TakeawayHero";
import { TakeawayIntro } from "./sections/TakeawayIntro";
import { TakeawayLocation } from "./sections/TakeawayLocation";
import { TakeawayOrder } from "./sections/TakeawayOrder";
import { TakeawayFaq } from "./sections/TakeawayFaq";

export const Takeaway = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.takeaway.title")}
                description={t("seo.takeaway.description")}
                path="/takeaway"
                image="/images/takeaway/takeaway-hero.jpg"
            />
            <TakeawayHero />
            <TakeawayIntro />
            <TakeawayLocation />
            <TakeawayOrder />
            <TakeawayFaq />
        </>
    );
};
