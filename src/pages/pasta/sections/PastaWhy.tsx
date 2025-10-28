import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const PastaWhy = () => {
    return (
        <section className="section">
            <div className="container">
                <Breadcrumb />
                <div className="mx-auto mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-6 size-[22px]"
                    />
                    <p className="title section-title">Why Our Pasta?</p>
                    <p className="description section-description inline-block">
                        Pasta is not just a dish, but a moment of enjoyment.
                    </p>
                </div>
                <img
                    src="/images/pasta/image-1.webp"
                    className="mb-10 object-cover"
                />

                <div className="mb-10 flex flex-col gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/fruit.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Fresh every day
                            </span>
                            <p className="description md:text-lg">
                                We prepare the pasta ourselves, using authentic
                                techniques.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/flour.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Local and Italian ingredients
                            </span>
                            <p className="description md:text-lg">
                                Combining the best of both worlds.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/marinara-sauce.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Author's sauces
                            </span>
                            <p className="description md:text-lg">
                                From classic Bolognese to unique combinations
                                with seafood.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        Reserve a Table
                    </ButtonOpenReservation>
                    <Button variant="blue-outline" to={Paths.contact}>
                        Contact us
                    </Button>
                </div>
            </div>
        </section>
    );
};
