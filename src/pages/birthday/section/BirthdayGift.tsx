import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayGift = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="section bg-white-100">
                <div className="decorative-line container flex flex-col-reverse gap-5 md:gap-16 lg:flex-row">
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-[336px_309px]">
                        <img
                            src="/images/birthday/image-6.webp"
                            alt="image"
                            className="h-auto w-full object-contain lg:object-cover"
                            loading="lazy"
                        />
                        <div className="flex flex-col gap-6 self-end">
                            <img
                                src="/images/birthday/image-5.webp"
                                alt="image"
                                className="mt-10 h-auto w-full object-contain"
                                loading="lazy"
                            />
                            <img
                                src="/images/birthday/image-7.webp"
                                alt="image"
                                className="h-auto w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:max-w-[590px] self-center">
                        <p className="decorative mb-2.5 text-[34px]">
                            {t("birthday.gift.decorative")}
                        </p>
                        <h2 className="title section-title mb-6 text-[48px]">
                            {t("birthday.gift.title")}
                        </h2>
                        <p className="description section-description mb-2.5">
                            {t("birthday.gift.p1")}
                        </p>
                        <p className="description section-description mb-5 lg:mb-10">
                            {t("birthday.gift.p2")}
                        </p>

                        <Button variant="blue" to={Paths.contact}>
                            {t("birthday.gift.button")}
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
