import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";

export const SeafoodReserve = () => {
    const { t } = useTranslation();
    return (
        <section className="section">
            <div className="container flex flex-col items-center lg:flex-row">
                <img
                    src="/images/seafood/image-6.webp"
                    alt="image"
                    className="max-w-[610px]"
                />

                <div className="lg:-ml-10">
                    <div className="mb-5 lg:mb-10">
                        <span className="decorative mb-2.5">
                            {t("seafood.reserve.decorative")}
                        </span>
                        <div className="title section-title">
                            {t("seafood.reserve.title")}
                        </div>
                        <p className="description section-description mb-2">
                            {t("seafood.reserve.p1")}
                        </p>
                        <p className="description section-description">
                            {t("seafood.reserve.p2")}
                        </p>
                    </div>
                    <ButtonOpenReservation variant="blue">
                        {t("seafood.reserve.button")}
                    </ButtonOpenReservation>
                </div>
            </div>
        </section>
    );
};
