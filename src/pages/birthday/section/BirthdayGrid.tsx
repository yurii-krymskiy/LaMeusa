import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayGrid = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="mb-5 lg:mb-10 flex flex-col-reverse items-center gap-5 lg:gap-14 lg:mb-24 lg:flex-row">
                    <div>
                        <div className="mb-0 lg:mb-10">
                            <h2 className="section-title title mb-7 inline-block">
                                {t("birthday.grid.set1Title")}
                            </h2>
                            <p className="section-description description">
                                {t("birthday.grid.set1Desc")}
                            </p>
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        src="/images/birthday/image-8.webp"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[620px] object-cover"
                    />
                </div>
                <div className="flex flex-col items-center gap-5 lg:gap-14 lg:mb-24 lg:flex-row">
                    <img
                        loading="lazy"
                        src="/images/birthday/image-10.webp"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[620px] object-cover"
                    />
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <h2 className="section-title title mb-7 inline-block">
                                {t("birthday.grid.set2Title")}
                            </h2>
                            <p className="section-description description">
                                {t("birthday.grid.set2Desc")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse items-center gap-5 lg:gap-14 lg:mb-24 lg:flex-row">
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <h2 className="section-title title mb-7 inline-block">
                                {t("birthday.grid.set3Title")}
                            </h2>
                            <p className="section-description description">
                                {t("birthday.grid.set3Desc")}
                            </p>
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        src="/images/birthday/image-9.webp"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[620px] object-cover"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-5 lg:gap-10">
                    <ButtonOpenReservation variant="blue">
                        {t("birthday.grid.reserveTable")}
                    </ButtonOpenReservation>
                    <Button variant="blue-outline" to={Paths.menu}>
                        {t("birthday.grid.viewMenu")}
                    </Button>
                </div>
            </div>
        </section>
    );
};
