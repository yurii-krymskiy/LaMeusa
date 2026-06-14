import { useTranslation } from "react-i18next";

export const DeliveryHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero delivery-hero">
            <div className="mb-8 max-w-4xl text-center">
                <h1 className="title hero-title">{t("delivery.hero.title")}</h1>
                <p className="description hero-description !font-normal mt-3">
                    {t("delivery.hero.description")}
                </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <a
                    href="tel:+34603839509"
                    className="title button button-white-outline text-center"
                >
                    {t("delivery.hero.callButton")}
                </a>
                <a
                    href="https://wa.me/34603839509"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title button button-white-outline text-center"
                >
                    {t("delivery.hero.whatsappButton")}
                </a>
            </div>
        </main>
    );
};
