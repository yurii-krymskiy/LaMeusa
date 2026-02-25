import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const PastaHours = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-24">
                    <img
                        src="/images/pasta/image-5.webp"
                        loading="lazy"
                        className="max-w-[620px]"
                    />

                    <div>
                        <div className="mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Pasta Lovers Hour
                            </span>
                            <p className="section-description description">
                                Every <b>Tuesday</b> and <b>Wednesday</b> from
                                <b>2:00 PM</b> to <b>5:00 PM</b> — a unique
                                promotion: order any pasta and receive a glass
                                of wine as a gift. A great opportunity to make
                                lunch or dinner even more enjoyable.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <Button variant="blue">View Offer</Button>
                            <ButtonOpenReservation variant="blue-outline">
                                Book Now
                            </ButtonOpenReservation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
