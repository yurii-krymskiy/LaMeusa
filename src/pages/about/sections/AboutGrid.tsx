import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const AboutGrid = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="mb-10 flex flex-col items-center gap-5 lg:gap-15 lg:mb-24 lg:flex-row">
                    <img
                        src="/images/about/IMG_3159.jpeg"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[550px] xl:max-w-[620px] object-cover"
                    />
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="section-title title mb-7 inline-block">
                                {t("about.grid.guitar.title")}
                            </span>
                            <p className="section-description description mb-2.5">
                                {t("about.grid.guitar.p1")}
                            </p>
                            <p className="section-description description">
                                {t("about.grid.guitar.p2")}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <ButtonOpenReservation variant="blue">
                                {t("about.grid.guitar.reserveTable")}
                            </ButtonOpenReservation>
                            <a href="/files/drinks.pdf" target="_blank" rel="noreferrer" className="title button button-blue-outline">
                                {t("about.grid.guitar.discoverCocktails")}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-10 flex flex-col items-center gap-5 lg:mb-24 lg:flex-row lg:gap-26">
                    <div className="max-w-full lg:max-w-[590px]">
                        <div className="mb-5 lg:mb-10">
                            <img
                                src="/images/about/IMG_3184.jpeg"
                                className="mb-5 max-w-full h-[215px] lg:h-auto lg:max-w-[515px] object-cover"
                            />
                            <span className="section-title title mb-7 inline-block">
                                {t("about.grid.vocal.title")}
                            </span>
                            <p className="section-description description mb-2.5">
                                {t("about.grid.vocal.p1")}
                            </p>
                            <p className="section-description description">
                                {t("about.grid.vocal.p2")}
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="/files/drinks.pdf" target="_blank" rel="noreferrer" className="title button button-blue-outline">
                                {t("about.grid.vocal.button")}
                            </a>
                        </div>
                    </div>

                    <img
                        src="/images/about/example.png"
                        className="max-w-full h-[400px] lg:h-[600px] lg:max-w-[690px] object-cover"
                    />
                </div>

                <div className="mb-10 flex flex-col items-center gap-5 lg:gap-15 lg:mb-24 lg:flex-row">
                    <img
                        src="/images/about/image-8.jpg"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[620px] object-cover"
                    />
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="section-title title mb-7 inline-block">
                                {t("about.grid.burgers.title")}
                            </span>
                            <p className="section-description description mb-2.5">
                                {t("about.grid.burgers.p1")}
                            </p>
                            <p className="section-description description">
                                {t("about.grid.burgers.p2")}
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <Button to="/happy-hours" variant="blue-outline">{t("about.grid.burgers.button")}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
