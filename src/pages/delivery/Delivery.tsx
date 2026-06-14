import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { DeliveryHero } from "./sections/DeliveryHero";
import { DeliveryHowTo } from "./sections/DeliveryHowTo";
import { DeliveryMenu } from "./sections/DeliveryMenu";
import { DeliveryInfo } from "./sections/DeliveryInfo";

export const Delivery = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.delivery.title")}
                description={t("seo.delivery.description")}
                path="/delivery"
            />
            <DeliveryHero />
            <DeliveryHowTo />
            <DeliveryMenu />
            <DeliveryInfo />
        </>
    );
};
