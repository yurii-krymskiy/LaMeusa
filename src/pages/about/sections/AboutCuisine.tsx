import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";

export const AboutCuisine = () => {
    const { t } = useTranslation();

    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-15">
                    <div className="">
                        <div className="mb-10">
                            <p className="decorative">{t("about.cuisine.decorative")}</p>
                            <p className="title section-title">{t("about.cuisine.title")}</p>
                            <p className="description section-description mb-3.5 inline-block">
                                {t("about.cuisine.p1")}
                            </p>
                            <p className="description section-description inline-block">
                                {t("about.cuisine.p2")}
                            </p>
                        </div>
                        <Button to="/menu" variant="blue">{t("about.cuisine.button")}</Button>
                    </div>
                    <img
                        src="/images/about/image-1.jpg"
                        alt="image"
                        className="max-w-full h-[400px] lg:h-auto lg:max-w-[660px] object-cover"
                        fetchPriority="high"
                    />
                </div>
            </div>
        </section>
    );
};
