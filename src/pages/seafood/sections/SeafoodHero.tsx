import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const SeafoodHero = () => {
    return (
        <main className="hero seafood-hero">
            <div className="container">
                <div className="mb-10  max-w-[800px]">
                    <h2 className="title hero-title md:!text-left">
                        Discover the Taste of the Ocean
                    </h2>
                    <p className="description hero-description !ml-0 md:!text-left">
                        Fresh seafood delivered daily, in our chefs' original
                        recipes. This is a culinary journey along the
                        Mediterranean coast - from classic dishes to modern
                        interpretations.
                    </p>
                </div>
                <div className="mb-20 flex gap-3 flex-wrap">
                    <Button variant="white-outline" to={Paths.menu}>Explore Menu</Button>
                    <ButtonOpenReservation variant="default" className="!text-white">
                        <span>Reserve a Table</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </ButtonOpenReservation>
                </div>
            </div>
        </main>
    );
};
