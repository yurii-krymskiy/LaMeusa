import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";

export const PastaReserve = () => {
    return (
        <section className="section">
            <div className="container flex flex-col items-center lg:flex-row">
                <img
                    src="/images/seafood/image-6.webp"
                    alt="image"
                    className="max-w-[610px]"
                />

                <div className="lg:-ml-10">
                    <div className="mb-10">
                        <span className="decorative mb-2.5">
                            Reserve a Table
                        </span>
                        <div className="title section-title">
                            Make your dinner special
                        </div>
                        <p className="description section-description mb-2">
                            Book a table and spend an evening in an atmosphere
                            of sophistication and inspiration.
                        </p>
                        <p className="description section-description">
                            Your evening at <b>La Medusa</b> will be a story you
                            will want to return to.
                        </p>
                    </div>
                    <ButtonOpenReservation variant="blue">
                        Make a reservation
                    </ButtonOpenReservation>
                </div>
            </div>
        </section>
    );
};
