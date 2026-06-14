import ScrollCircle from "../../../components/features/ScrollCircle";
import { Button } from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";

export const HomeHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero home-hero">
            {/* Background video — poster shows instantly, video streams in behind */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/images/home-bg.jpg"
            >
                <source src="/video/hero.webm" type="video/webm" />
                <source src="/video/hero.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Content */}
            <div className="relative mb-10 max-w-6xl">
                <h1 className="title hero-title">
                    {t("home.hero.title")}
                </h1>
                <p className="description hero-description !font-normal">
                    {t("home.hero.description")}
                </p>
            </div>
            <Button variant="white-outline" className="relative mb-20" to="/booking">
                {t("home.hero.button")}
            </Button>
            <div className="relative">
                <ScrollCircle />
            </div>
        </main>
    );
};
