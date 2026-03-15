import { useTranslation } from "react-i18next";
import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero birthday-hero">
            <div className="container">
                <div className="mb-10 max-w-[800px]">
                    <h2 className="title hero-title md:!text-left">
                        {t("birthday.hero.title")}
                    </h2>
                    <p className="description hero-description !ml-0 md:!text-left">
                        {t("birthday.hero.description")}
                    </p>
                </div>
                <div className="mb-20 flex gap-3 flex-wrap">
                    <ButtonOpenReservation variant="white-outline">
                        {t("birthday.hero.bookButton")}
                    </ButtonOpenReservation>
                    <Button
                        to={Paths.menu}
                        variant="default"
                        className="!text-white"
                    >
                        <span>{t("birthday.hero.menuButton")}</span>
                        <img src="/icons/arrow-right.svg" className="size-7" />
                    </Button>
                </div>
            </div>
        </main>
    );
};
