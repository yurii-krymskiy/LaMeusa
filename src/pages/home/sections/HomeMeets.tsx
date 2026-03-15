import { Button } from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";

export const HomeMeets = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="section decorative-line">
                <div className="container">
                    <div className="text-center">
                        <span className="decorative">
                            {t("home.meets.decorative")}
                        </span>
                        <p className="title section-title !mb-5 lg:!mb-6 text-[48px]">
                            {t("home.meets.title")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 md:gap-16 lg:flex-row">
                        <div className="w-full lg:max-w-[730px]">
                            <img
                                src="/images/home/image-14.jpg"
                                alt=""
                                className="mb-6 h-[200px] object-cover lg:h-[340px]"
                            />

                            <p className="description section-description mb-2.5">
                                {t("home.meets.p1")}
                            </p>

                            <p className="description section-description mb-5 lg:mb-10">
                                {t("home.meets.p2")}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button to="/menu" variant="blue">{t("home.meets.viewMenu")}</Button>
                                <Button to="/booking" variant="blue-outline">
                                    {t("home.meets.reserveTable")}
                                </Button>
                            </div>
                        </div>

                        <img
                            src="/images/home/image-15.jpg"
                            alt=""
                            className="w-full h-[400px] lg:h-auto object-cover lg:max-w-[530px]"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
