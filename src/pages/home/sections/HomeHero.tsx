import ScrollCircle from "../../../components/features/ScrollCircle";
import { Button } from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";

export const HomeHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero home-hero">
            <div className="mb-10 max-w-6xl">
                <h2 className="title hero-title">
                    {t("home.hero.title")}
                </h2>
                <p className="description hero-description !font-normal">
                    {t("home.hero.description")}
                </p>
            </div>
            <Button variant="white-outline" className="mb-20" to="/booking">
                {t("home.hero.button")}
            </Button>
            <ScrollCircle />
        </main>
    );
};
