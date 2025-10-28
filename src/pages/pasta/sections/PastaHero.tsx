import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const PastaHero = () => {
    return (
        <main className="hero happy-hours-hero">
            <div className="container">
                <div className="mb-10 max-w-[800px]">
                    <h2 className="title hero-title !text-left">
                        A Symphony of Pasta
                    </h2>
                    <p className="description hero-description !ml-0 !text-left">
                        Homemade pasta made with the finest ingredients is the
                        heart of Italian cuisine. At <b>La Medusa</b>, we create dishes
                        that combine tradition and originality. From classic
                        recipes to unexpected combinations, the pasta here is
                        always special.
                    </p>
                </div>
                <div className="mb-20 flex flex-wrap">
                    <Button variant="white-outline" to={Paths.menu}>
                        Explore Pasta Menu
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
