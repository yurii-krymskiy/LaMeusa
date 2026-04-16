import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";

export const PastaHours = () => {
    const { t } = useTranslation();
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-24">
                    <img
                        src="/images/pasta/image-5.webp"
                        loading="lazy"
                        className="max-w-[620px]"
                    />

                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="decorative mb-2.5 block">
                                {t("pasta.hours.decorative")}
                            </span>
                            <h2 className="section-title title mb-7 inline-block">
                                {t("pasta.hours.title")}
                            </h2>
                            <p className="section-description description mb-2.5">
                                {t("pasta.hours.p1")}
                            </p>
                            <p className="section-description description mb-2.5">
                                {t("pasta.hours.p2")}
                            </p>
                            <p className="section-description description">
                                {t("pasta.hours.p3")}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <ButtonOpenReservation variant="blue">
                                {t("pasta.hours.bookNow")}
                            </ButtonOpenReservation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
