import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";

export const SeafoodHappyHours = () => {
    const { t } = useTranslation();
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-24">
                    <img
                        src="/images/seafood/image-4.webp"
                        loading="lazy"
                        className="max-w-[620px]"
                    />

                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="decorative mb-2.5 block">
                                {t("seafood.happyHours.decorative")}
                            </span>
                            <h2 className="section-title title mb-7 inline-block">
                                {t("seafood.happyHours.title")}
                            </h2>
                            <p className="section-description description mb-2.5">
                                {t("seafood.happyHours.p1")}
                            </p>
                            <p className="section-description description mb-2.5">
                                {t("seafood.happyHours.p2")}
                            </p>
                            <p className="section-description description">
                                {t("seafood.happyHours.p3")}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <ButtonOpenReservation variant="blue">
                                {t("seafood.happyHours.bookNow")}
                            </ButtonOpenReservation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
