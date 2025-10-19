import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const AboutChooseUs = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-6 size-[22px]"
                    />
                    <p className="title section-title">Why Choose us</p>
                    <p className="description section-description inline-block">
                        At <b>La Medusa</b>, every ingredient, every flavor is a
                        grateful embodiment of Mediterranean tradition. Our
                        chefs strive for each dish to be not just food, but an
                        emotion that stays with you.
                    </p>
                </div>
                <img
                    src="/images/about/image-2.jpg"
                    className="mb-10 object-cover"
                />

                <div className="mb-10 flex flex-col gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/crepe-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Taste and Quality
                            </span>
                            <p className="description md:text-lg">
                                We use only fresh local and imported products,
                                and we pay close attention to every flavor and
                                combination.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/sunrise-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Taste and Quality
                            </span>
                            <p className="description md:text-lg">
                                We use only fresh local and imported products,
                                and we pay close attention to every flavor and
                                combination.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/taste-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Taste and Quality
                            </span>
                            <p className="description md:text-lg">
                                We use only fresh local and imported products,
                                and we pay close attention to every flavor and
                                combination.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        Reserve a Table
                    </ButtonOpenReservation>
                    <Button variant="blue-outline">Contact us</Button>
                </div>
            </div>
        </section>
    );
};
