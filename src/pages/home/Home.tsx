
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
    return (
        <>
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
