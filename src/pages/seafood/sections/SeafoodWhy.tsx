import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const SeafoodWhy = () => {
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
                    <p className="title section-title">
                        {t("seafood.why.title")}
                    </p>
                    <p className="description section-description inline-block">
                        {t("seafood.why.description")}
                    </p>
                </div>
                <img
                    src="/images/seafood/image-5.webp"
                    className="mb-10  min-h-[226px] object-cover"
                />

                <div className="mb-10 flex flex-col gap-5 lg:gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/crepe-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("seafood.why.feature1Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("seafood.why.feature1Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/sunrise-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("seafood.why.feature2Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("seafood.why.feature2Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/taste-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("seafood.why.feature3Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("seafood.why.feature3Desc")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        {t("seafood.why.reserveTable")}
                    </ButtonOpenReservation>
                    <Button to="/contact" variant="blue-outline">{t("seafood.why.contactUs")}</Button>
                </div>
            </div>
        </section>
    );
};
