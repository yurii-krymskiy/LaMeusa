import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { useTranslation } from "react-i18next";

export const HomeReserve = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container flex flex-col items-center lg:flex-row">
                <img
                    src="/images/home/image-16.png"
                    alt="image"
                    className="max-w-[610px]"
                />

                <div className="md:-ml-10">
                    <div className="mb-5 lg:mb-10">
                        <span className="decorative">
                            {t("home.reserve.decorative")}
                        </span>
                        <div className="title !mb-2.5 lg:!mb-6 section-title">
                            {t("home.reserve.title")}
                        </div>
                        <p className="description section-description mb-2">
                            {t("home.reserve.p1")}
                        </p>
                        <p className="description section-description">
                            {t("home.reserve.p2")}
                        </p>
                    </div>
                    <ButtonOpenReservation variant="blue">
                        {t("home.reserve.button")}
                    </ButtonOpenReservation>
                </div>
            </div>
        </section>
    );
};
