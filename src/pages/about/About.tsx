import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { ContactUs } from "../contact/sections/ContactUs";
import { HomeGallery } from "../home/sections/HomeGallery";
import { AboutChooseUs } from "./sections/AboutChooseUs";
import { AboutCuisine } from "./sections/AboutCuisine";
import { AboutGrid } from "./sections/AboutGrid";
import { AboutHero } from "./sections/AboutHero";
import { AboutOutTeam } from "./sections/AboutOurTeam";
import { AboutOutStory } from "./sections/AboutOutStory";

const About = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.about.title")}
                description={t("seo.about.description")}
                path="/about"
                preloadImages={["/images/about/top-view-seafood-side-dish-plates-with-shrimp-crab-meat-anchovy.jpg", "/images/about/image-1.jpg"]}
            />
            <AboutHero />
            <AboutCuisine />
            <AboutOutTeam />
            <AboutChooseUs />
            <AboutOutStory />
            <HomeGallery />
            <AboutGrid />
            <ContactUs />
        </>
    );
};

export default About;
