import { useTranslation } from "react-i18next";

export const PastaMeets = () => {
    const { t } = useTranslation();
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="mb-5 lg:mb-10 text-center">
                        <span className="decorative mb-2.5">
                            {t("pasta.meets.decorative")}
                        </span>
                        <div className="title section-title">
                            {t("pasta.meets.title")}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:gap-14 md:flex-row">
                        <div className="max-w-[740px]">
                            <img
                                src="/images/pasta/image-6.webp"
                                alt=""
                                className="mb-6 min-h-[200px] object-cover"
                            />
                            <p className="section-description description mb-4">
                                {t("pasta.meets.p1")}
                            </p>
                            <p className="section-description description mb-4">
                                {t("pasta.meets.p2")}
                            </p>
                            <p className="section-description description">
                                {t("pasta.meets.p3")}
                            </p>
                        </div>
                        <div>
                            <img
                                src="/images/pasta/image-7.webp"
                                className="h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
