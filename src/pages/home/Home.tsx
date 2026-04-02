
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { HomeAboutUs } from "./sections/HomeAboutUs";
import { HomeFoodStory } from "./sections/HomeFoodStory";
import { HomeGallery } from "./sections/HomeGallery";
import { HomeHero } from "./sections/HomeHero";
import { HomeMeets } from "./sections/HomeMeets";
import { HomeOurMenu } from "./sections/HomeOurMenu";
import { HomeQueries } from "./sections/HomeQueries";
import { HomeReserve } from "./sections/HomeReserve";
import { HomeSpecial } from "./sections/HomeSpecial";
import { HomeStory } from "./sections/HomeStory";

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.home.title")}
                description={t("seo.home.description")}
                path="/"
            />
            <HomeHero />
            <HomeOurMenu />
            <HomeStory />
            <HomeAboutUs />
            <HomeGallery />
            <HomeFoodStory />
            <HomeMeets />
            <HomeSpecial />
            <HomeQueries />
            <HomeReserve />
        </>
    );
};

export default Home;
