import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HomeDelivery = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="relative overflow-hidden rounded-3xl bg-[url('/images/delivery/delivery-hero.jpg')] bg-cover bg-center px-6 py-14 md:px-16 md:py-24">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
                        <span className="decorative !text-white">
                            {t("home.delivery.decorative")}
                        </span>
                        <h2 className="title section-title !mb-4 !text-white lg:!mb-6">
                            {t("home.delivery.title")}
                        </h2>
                        <p className="description section-description mb-6 !text-white/85 lg:mb-8">
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
