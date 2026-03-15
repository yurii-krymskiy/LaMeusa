import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const PastaHero = () => {
    const { t } = useTranslation();
    return (
        <main className="hero happy-hours-hero">
            <div className="container">
                <div className="mb-10 max-w-[800px]">
                    <h2 className="title hero-title md:!text-left">
                        {t("pasta.hero.title")}
                    </h2>
                    <p className="description hero-description !ml-0 md:!text-left">
                        {t("pasta.hero.description")}
                    </p>
                </div>
                <div className="mb-20 flex gap-3 flex-wrap">
                    <Button variant="white-outline" to={Paths.menu}>
                        {t("pasta.hero.exploreMenu")}
                    </Button>
                    <ButtonOpenReservation
                        variant="default"
                        className="!text-white"
                    >
                        <span>{t("pasta.hero.reserveTable")}</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </ButtonOpenReservation>
                </div>
            </div>
        </main>
    );
};
