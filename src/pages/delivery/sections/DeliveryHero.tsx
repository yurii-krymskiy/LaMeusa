import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const DeliveryHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero delivery-hero">
            <div className="mb-8 max-w-4xl text-center">
                <h1 className="title hero-title">{t("delivery.hero.title")}</h1>
                <p className="description hero-description mt-3 !font-normal">
                    {t("delivery.hero.description")}
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <a
                    href="https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title button button-white-outline text-center"
                >
                    {t("delivery.hero.orderButton")}
                </a>
                <Button variant="white-outline" to={Paths.menu}>
                    {t("seoCommon.exploreMenu")}
                </Button>
            </div>
        </main>
    );
};
