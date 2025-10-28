import { BirthdayGallery } from "./section/BirthdayGallery";
import { BirthdayGift } from "./section/BirthdayGift";
import { BirthdayGrid } from "./section/BirthdayGrid";
import { BirthdayHero } from "./section/BirthdayHero";
import { BirthdayReserve } from "./section/BirthdayReserve";
import { BirthdayWhy } from "./section/BirthdayWhy";

export const Birthday = () => {
    return (
        <>
            <BirthdayHero />
            <BirthdayWhy />
            <BirthdayGallery />
            <BirthdayGift />
            <BirthdayGrid />
            <BirthdayReserve />
        </>
    );
};
