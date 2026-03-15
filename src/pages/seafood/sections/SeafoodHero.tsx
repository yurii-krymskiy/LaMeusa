import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const SeafoodHero = () => {
    const { t } = useTranslation();
    return (
        <main className="hero seafood-hero">
            <div className="container">
                <div className="mb-10  max-w-[800px]">
                    <h2 className="title hero-title md:!text-left">
                        {t("seafood.hero.title")}
                    </h2>
                    <p className="description hero-description !ml-0 md:!text-left">
                        {t("seafood.hero.description")}
                    </p>
                </div>
                <div className="mb-20 flex gap-3 flex-wrap">
                    <Button variant="white-outline" to={Paths.menu}>{t("seafood.hero.exploreMenu")}</Button>
                    <ButtonOpenReservation variant="default" className="!text-white">
                        <span>{t("seafood.hero.reserveTable")}</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </ButtonOpenReservation>
                </div>
            </div>
        </main>
    );
};
