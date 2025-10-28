import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { SeafoodGallery } from "./sections/SeafoodGallery";
import { SeafoodHappyHours } from "./sections/SeafoodHappyHours";
import { SeafoodHero } from "./sections/SeafoodHero";
import { SeafoodPhilosophy } from "./sections/SeafoodPhilosophy";
import { SeafoodReserve } from "./sections/SeafoodReserve";
import { SeafoodWhy } from "./sections/SeafoodWhy";

const Seafood = () => {
    return (
        <>
            <SeafoodHero />
            <SeafoodPhilosophy />
            <MenuDelicios />
            <SeafoodHappyHours />
            <SeafoodWhy />
            <SeafoodGallery />
            <SeafoodReserve />
        </>
    );
};

export default Seafood;
