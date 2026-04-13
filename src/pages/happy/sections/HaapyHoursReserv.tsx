import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HappyHoursReserve = () => {
    const { t } = useTranslation();
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
                            {t("happy.reserve.decorative")}
                        </span>
                        <h2 className="title section-title">
                            {t("happy.reserve.title")}
                        </h2>
                        <p className="description section-description">
                            {t("happy.reserve.description")}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-5 lg:gap-10">
                        <ButtonOpenReservation variant="blue">
                            {t("happy.reserve.reserveNow")}
                        </ButtonOpenReservation>
                        <Button variant="blue-outline" to={Paths.contact}>
                            {t("happy.reserve.contactUs")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
