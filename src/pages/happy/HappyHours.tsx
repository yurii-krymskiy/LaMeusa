import { HappyHoursReserve } from "./sections/HaapyHoursReserv";
import { HappyHoursGallery } from "./sections/HappyHoursGallery";
import { HappyHoursHero } from "./sections/HappyHoursHero";
import { HappyHoursSpecial } from "./sections/HappyHoursSpecial";
import { HappyHoursWhy } from "./sections/HappyHoursWhy";

export const HappyHours = () => {
    return (
        <>
            <HappyHoursHero />
            <HappyHoursWhy />
            <HappyHoursSpecial />
            <HappyHoursGallery />
            <HappyHoursReserve />
        </>
    );
};
