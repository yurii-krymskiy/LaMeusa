import { useTranslation } from "react-i18next";

export const AboutOutStory = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container flex flex-col items-end gap-5 lg:gap-10 lg:flex-row">
                <img
                    src="/images/about/teamate-3.jpg"
                    className="max-w-full h-[500px] lg:h-[620px] lg:max-w-[610px] self-stretch object-cover"
                />

                <div>
                    <span className="decorative">{t("about.ourStory.decorative")}</span>
                    <div className="title section-title">{t("about.ourStory.title")}</div>
                    <p className="description section-description mb-3">
                        {t("about.ourStory.p1")}
                    </p>
                    <p className="description section-description mb-3">
                        {t("about.ourStory.p2")}
                    </p>

                    <div className="flex gap-3.5 py-3">
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-5.jpg" />
                        </div>
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-6.jpg" />
                        </div>
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-4.jpg" />
                        </div>
                    </div>
                    <p className="description section-description">
                        {t("about.ourStory.p3")}
                    </p>
                </div>
            </div>
        </section>
    );
};
