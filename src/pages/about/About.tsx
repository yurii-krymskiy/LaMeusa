import { ContactUs } from "../contact/sections/ContactUs";
import { HomeGallery } from "../home/sections/HomeGallery";
import { AboutChooseUs } from "./sections/AboutChooseUs";
import { AboutCuisine } from "./sections/AboutCuisine";
import { AboutGrid } from "./sections/AboutGrid";
import { AboutHero } from "./sections/AboutHero";
import { AboutOutTeam } from "./sections/AboutOurTeam";
import { AboutOutStory } from "./sections/AboutOutStory";

const About = () => {
    return (
        <>
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
