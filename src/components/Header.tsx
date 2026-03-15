import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu } from "./features/Menu";
import { ButtonOpenReservation } from "./features/reservation-form/ButtonOpenReservation";
import { LanguageSwitcher } from "./features/LanguageSwitcher";

const Header = () => {
    const { t } = useTranslation();
    return (
        <header className="relative container flex flex-row items-center justify-between py-2.5">
            <Menu />
            <Link to="/">
                <img
                    src="/icons/logo.svg"
                    alt="logo"
                    className="absolute top-1/2 left-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:w-[200px]"
                />
            </Link>
            <div className="flex flex-row items-center gap-2 lg:gap-5">
                <div className="hidden lg:flex">
                    <LanguageSwitcher />
                </div>

                <ButtonOpenReservation
                    variant="blue"
                    className="!px-3 md:!px-10 hidden lg:block"
                >
                    <span className="md:hidden">{t("nav.bookNow")}</span>
                    <span className="hidden md:inline">{t("nav.bookNowFull")}</span>
                </ButtonOpenReservation>
            </div>
        </header>
    );
};

export default Header;
