import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

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
                            <span className="section-title title mb-7 inline-block">
                                {t("pasta.hours.title")}
                            </span>
                            <p className="section-description description">
                                {t("pasta.hours.description")}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <Button variant="blue">{t("pasta.hours.viewOffer")}</Button>
                            <ButtonOpenReservation variant="blue-outline">
                                {t("pasta.hours.bookNow")}
                            </ButtonOpenReservation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
