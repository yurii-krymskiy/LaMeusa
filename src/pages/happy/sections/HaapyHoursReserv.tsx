import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HappyHoursReserve = () => {
    return (
        <section className="section">
            <div className="container flex flex-col gap-10 lg:gap-20 items-center lg:flex-row">
                <img
                    src="/images/happy-hours/image-5.webp"
                    alt="image"
                    className="max-w-[510px]"
                />

                <div className="">
                    <div className="mb-5 lg:mb-10">
                        <span className="decorative mb-2.5">
                            Reserve a Table
                        </span>
                        <div className="title section-title">
                            join Us for Happy Hours
                        </div>
                        <p className="description section-description">
                            Don't miss the opportunity to experience the
                            atmosphere of <b>La Medusa</b> at a special time.
                            Reserve a table and spend the best hours of your day
                            with us.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-5 lg:gap-10">
                        <ButtonOpenReservation variant="blue">
                            Reserve Now
                        </ButtonOpenReservation>
                        <Button variant="blue-outline" to={Paths.contact}>
                            Contact us
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
