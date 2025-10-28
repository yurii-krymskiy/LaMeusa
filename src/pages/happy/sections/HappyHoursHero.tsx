import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HappyHoursHero = () => {
    return (
        <main className="hero happy-hours-hero">
            <div className="container">
                <div className="mb-10 max-w-[800px]">
                    <h2 className="title hero-title !text-left">
                        Happy Hours at La Medusa
                    </h2>
                    <p className="description hero-description !ml-0 !text-left">
                        The best time of day is when you can enjoy your favorite
                        dishes and drinks at special prices. We created Happy
                        Hours to make your meetings with friends or colleagues
                        even more enjoyable.
                    </p>
                </div>
                <div className="mb-20 flex flex-wrap">
                    <Button variant="white-outline" to={Paths.menu}>
                        Explore Menu
                    </Button>
                    <ButtonOpenReservation
                        variant="default"
                        className="!text-white"
                    >
                        <span>Reserve a Table</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </ButtonOpenReservation>
                </div>
            </div>
        </main>
    );
};
