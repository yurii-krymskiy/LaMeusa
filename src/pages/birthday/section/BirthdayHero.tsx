import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayHero = () => {
    return (
        <main className="hero birthday-hero">
            <div className="container">
                <div className="mb-10 max-w-[800px]">
                    <h2 className="title hero-title !text-left">
                        Your Birthday, Our Celebration
                    </h2>
                    <p className="description hero-description !ml-0 !text-left">
                        At <b>La Medusa</b>, a birthday becomes an event you
                        will remember for a long time. Exquisite cuisine, a cozy
                        atmosphere and a panoramic view create the perfect place
                        for special moments.
                    </p>
                </div>
                <div className="mb-20 flex flex-wrap">
                    <ButtonOpenReservation variant="white-outline">
                        Book Your Celebration
                    </ButtonOpenReservation>
                    <Button
                        to={Paths.menu}
                        variant="default"
                        className="!text-white"
                    >
                        <span>Explore Our Menus</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </Button>
                </div>
            </div>
        </main>
    );
};
