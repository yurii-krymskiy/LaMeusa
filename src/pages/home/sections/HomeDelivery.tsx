import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HomeDelivery = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="relative overflow-hidden rounded-3xl bg-[url('/images/home/inside-restaurant.jpg')] bg-cover bg-center px-6 py-14 text-center md:px-16 md:py-20">
                    <div className="absolute inset-0 bg-navy/75" />
                    <div className="relative flex flex-col items-center">
                        <span className="decorative !text-white">
                            {t("home.delivery.decorative")}
                        </span>
                        <h2 className="title !mb-4 lg:!mb-6 section-title !text-white max-w-2xl">
                            {t("home.delivery.title")}
                        </h2>
                        <p className="description section-description mb-6 max-w-xl !text-white/80 lg:mb-8">
                            {t("home.delivery.description")}
                        </p>
                        <Button variant="white-outline" to={Paths.delivery}>
                            {t("home.delivery.button")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
