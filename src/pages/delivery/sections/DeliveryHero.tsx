import { useTranslation } from "react-i18next";
import { useUberEatsLink } from "../../../hooks/useUberEatsLink";

export const DeliveryHero = () => {
    const { t } = useTranslation();
    const { handleOrderClick } = useUberEatsLink();

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
                    href="https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName="
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOrderClick}
                    className="title button button-white-outline text-center"
                >
                    {t("delivery.hero.orderButton")}
                </a>
            </div>
        </main>
    );
};
