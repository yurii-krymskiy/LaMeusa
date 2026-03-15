import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayWhy = () => {
    const { t } = useTranslation();

    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                    />
                    <p className="title section-title">
                        {t("birthday.why.title")}
                    </p>
                </div>
                <img
                    src="/images/birthday/image-1.webp"
                    className="mb-5 lg:mb-10 min-h-[225px] object-cover"
                />

                <div className="mb-5 lg:mb-10 flex flex-col gap-5 lg:gap-14 md:flex-row">
                    <div className="text-center">
                        <img
                            src="/icons/sunrise-icon.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("birthday.why.feature1Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("birthday.why.feature1Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/g2193.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("birthday.why.feature2Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("birthday.why.feature2Desc")}
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <img
                            src="/icons/musical-notes.svg"
                            className="mx-auto mb-2.5 size-[100px]"
                        />
                        <div>
                            <span className="title mb-2.5 inline-block text-lg md:text-xl">
                                {t("birthday.why.feature3Title")}
                            </span>
                            <p className="description md:text-lg">
                                {t("birthday.why.feature3Desc")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        {t("birthday.why.reserveTable")}
                    </ButtonOpenReservation>
                    <Button variant="blue-outline" to={Paths.contact}>
                        {t("birthday.why.contactUs")}
                    </Button>
                </div>
            </div>
        </section>
    );
};
