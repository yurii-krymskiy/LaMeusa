import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";

export const PastaReserve = () => {
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
                            {t("pasta.reserve.decorative")}
                        </span>
                        <h2 className="title section-title">
                            {t("pasta.reserve.title")}
                        </h2>
                        <p className="description section-description mb-2">
                            {t("pasta.reserve.p1")}
                        </p>
                        <p className="description section-description">
                            {t("pasta.reserve.p2")}
                        </p>
                    </div>
                    <ButtonOpenReservation variant="blue">
                        {t("pasta.reserve.button")}
                    </ButtonOpenReservation>
                </div>
            </div>
        </section>
    );
};
