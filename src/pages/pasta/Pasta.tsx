import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { PastaGallery } from "./sections/PastaGallery";
import { PastaHero } from "./sections/PastaHero";
import { PastaHours } from "./sections/PastaHours";
import { PastaMeets } from "./sections/PastaMeets";
import { PastaReserve } from "./sections/PastaReserve";
import { PastVideo } from "./sections/PastaVideo";
import { PastaWhy } from "./sections/PastaWhy";

export const Pasta = () => {
    return (
        <>
            <PastaHero />
            <PastaWhy />
            <PastaGallery />
            <PastaHours />
            <MenuDelicios />
            <PastaMeets />
            <PastVideo />

            <PastaReserve />
        </>
    );
};
