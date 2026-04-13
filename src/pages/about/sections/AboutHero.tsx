import { useTranslation } from "react-i18next";

export const AboutHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero about-hero">
            <div className=" max-w-6xl">
                <h1 className="title hero-title">{t("about.hero.title")}</h1>
                <p className="description hero-description">
                    {t("about.hero.description")}
                </p>
            </div>
        </main>
    );
};
