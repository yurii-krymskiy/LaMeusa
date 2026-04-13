import { Button } from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";

export const HomeAboutUs = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container flex flex-col items-center gap-5 lg:flex-row lg:gap-15">
                <div className="flex-1">
                    <div className="mb-5 lg:mb-10">
                        <p className="decorative">{t("home.aboutUs.decorative")}</p>
                        <h2 className="title section-title">
                            {t("home.aboutUs.title")}
                        </h2>
                        <p className="description section-description mb-3.5 inline-block">
                            {t("home.aboutUs.p1")}
                        </p>
                        <p className="description section-description inline-block">
                            {t("home.aboutUs.p2")}
                        </p>
                    </div>
                    <Button to="/about" variant="blue-outline">{t("home.aboutUs.button")}</Button>
                </div>
                <div className="flex-1">
                    <img
                        src="/images/home/image-10.jpg"
                        alt="image"
                        className="object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};
