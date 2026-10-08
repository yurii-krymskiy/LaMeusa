import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const TakeawayHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero takeaway-hero">
            <div className="mb-8 max-w-4xl text-center">
                <h1 className="title hero-title">{t("takeaway.hero.title")}</h1>
                <p className="description hero-description mt-3 !font-normal">
                    {t("takeaway.hero.description")}
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <Button variant="white-outline" to={Paths.menu}>
                    {t("seoCommon.exploreMenu")}
                </Button>
                <a
                    href="tel:+34603839509"
                    className="title button button-white-outline text-center"
                >
                    {t("takeaway.order.callButton")}
                </a>
            </div>
        </main>
    );
};
