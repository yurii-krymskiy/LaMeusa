import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const AboutChooseUs = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                    />
                    <h2 className="title section-title">{t("about.chooseUs.title")}</h2>
                    <p className="description section-description inline-block">
                        {t("about.chooseUs.description")}
                    </p>
                </div>
                <img
                    src="/images/about/image-2.jpg"
                    className="mb-5 lg:mb-10 min-h-[226px] max-h-[600px] object-cover"
                />

                <div className="mb-10 flex flex-col gap-5 lg:gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/crepe-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("about.chooseUs.feature1Title")}
                            </h3>
                            <p className="description md:text-lg">
                                {t("about.chooseUs.feature1Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/sunrise-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("about.chooseUs.feature2Title")}
                            </h3>
                            <p className="description md:text-lg">
                                {t("about.chooseUs.feature2Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/taste-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("about.chooseUs.feature3Title")}
                            </h3>
                            <p className="description md:text-lg">
                                {t("about.chooseUs.feature3Desc")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        {t("about.chooseUs.reserveTable")}
                    </ButtonOpenReservation>
                    <Button to="/contact" variant="blue-outline">{t("about.chooseUs.contactUs")}</Button>
                </div>
            </div>
        </section>
    );
};
