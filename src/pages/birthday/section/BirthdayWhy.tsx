import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayWhy = () => {
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
                    <p className="title section-title">
                        Why Choose La Medusa for Your Birthday
                    </p>
                </div>
                <img
                    src="/images/birthday/image-1.webp"
                    className="mb-10 object-cover"
                />

                <div className="mb-10 flex flex-col gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/sunrise-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Atmosphere
                            </span>
                            <p className="description md:text-lg">
                                Elegant interior and a magical sea view.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/g2193.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Individual menu
                            </span>
                            <p className="description md:text-lg">
                                We will help you create the perfect selection of
                                dishes and drinks.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/musical-notes.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                Live music and cocktails
                            </span>
                            <p className="description md:text-lg">
                                Create a special mood for guests.
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
