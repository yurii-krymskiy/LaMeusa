import { Link } from "react-router";
import { Menu } from "./features/Menu";
import { ButtonOpenReservation } from "./features/reservation-form/ButtonOpenReservation";

const Header = () => {
    return (
        <header className="relative container flex flex-row items-center justify-between py-2.5">
            <Menu />
            <Link to="/">
                <img
                    src="/icons/logo.svg"
                    alt="logo"
                    className="absolute top-1/2 left-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:w-[250px]"
                />
            </Link>
            <div className="flex flex-row items-center gap-5">
                <div className="hidden flex-row items-center gap-1 md:flex">
                    <p className="title font-bold text-[#1B1B1B]">EN</p>
                    <img
                        src="/icons/arrow-lang.svg"
                        alt="arrow-lang"
                        className="cursor-pointer"
                    />
                </div>

                <ButtonOpenReservation
                    variant="blue"
                    className="!px-3 md:!px-12"
                >
                    Book <span className="hidden md:inline">Now</span>
                </ButtonOpenReservation>
            </div>
        </header>
    );
};

export default Header;
