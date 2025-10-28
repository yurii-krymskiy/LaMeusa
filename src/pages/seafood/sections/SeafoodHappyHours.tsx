import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const SeafoodHappyHours = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-24">
                    <img
                        src="/images/seafood/image-4.webp"
                        loading="lazy"
                        className="max-w-[620px]"
                    />

                    <div>
                        <div className="mb-10">
                            <span className="decorative mb-2.5 block">
                                Happy Hours
                            </span>
                            <span className="section-title title mb-7 inline-block">
                                Seafood Happy Hours
                            </span>
                            <p className="section-description description">
                                Every day from <b>3:00 PM</b> to <b>5:00 PM</b>,
                                there is a special offer: when you order a
                                seafood set, you get a glass of wine as a gift.
                                This is a great opportunity to try several
                                dishes at once and experience the fullness of
                                the Mediterranean flavor.
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
