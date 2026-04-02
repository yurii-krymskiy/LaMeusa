import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <>
            <footer className="bg-white-100 py-16">
                <div className="container flex flex-wrap justify-between gap-5">
                    <div className="w-full md:max-w-[320px]">
                        <div>
                            <img
                                src="/icons/logo.svg"
                                alt="La Medusa"
                                className="mb-2.5"
                            />
                            <div className="mt-5 flex flex-wrap md:flex-nowrap gap-8">
                                <a href="https://maps.app.goo.gl/BPYTGnnVsCb3d8Ss8" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity duration-200">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src="/images/google.png"
                                            alt="Google"
                                            className="max-w-[90px]"
                                        />
                                        <img
                                            src="/icons/arrow-more.svg"
                                            className="w-[30px]"
                                        />
                                    </div>
                                    <span className="description text-xs">
                                        <b>2,692</b> {t("footer.reviews")}
                                    </span>
                                </a>
                                <a href="https://www.tripadvisor.com/Restaurant_Review-g187479-d20257413-Reviews-or15-Restaurant_La_Medusa_Cocktail_Bar-Tenerife_Canary_Islands.html" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity duration-200">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src="/images/tripadvisor.png"
                                            alt="TripAdvisor"
                                            className="max-w-[120px]"
                                        />
                                        <img
                                            src="/icons/arrow-more.svg"
                                            className="w-[30px]"
                                        />
                                    </div>
                                    <span className="description text-xs">
                                        <b>532</b> {t("footer.reviews")}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[420px]">
                        <div className="title border-navy mb-3.5 border-b pb-3.5 text-xl font-normal text-gray-700 capitalize">
                            {t("footer.explore")}
                        </div>
                        <div className="flex flex-row gap-5 lg:gap-10 justify-between">
                            <ul className="text-royal-blue flex flex-col gap-2.5 font-semibold md:text-lg">
                                <li><Link to="/" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.home")}</Link></li>
                                <li><Link to="/menu" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.menu")}</Link></li>
                                <li><Link to="/about" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.about")}</Link></li>
                                <li><Link to="/seafood" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.seafood")}</Link></li>
                                <li><Link to="/menu#paella" className="hover:text-[#3650b9] transition-colors duration-200">{t("footer.paella")}</Link></li>
                            </ul>
                            <ul className="text-royal-blue flex flex-col gap-2.5 font-semibold md:text-lg">
                                <li><Link to="/menu#burgers" className="hover:text-[#3650b9] transition-colors duration-200">{t("footer.burger")}</Link></li>
                                <li><Link to="/birthdays" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.birthday")}</Link></li>
                                <li><Link to="/happy-hours" className="hover:text-[#3650b9] transition-colors duration-200">{t("nav.happyHours")}</Link></li>
                                <li><Link to="/menu#pizza" className="hover:text-[#3650b9] transition-colors duration-200">{t("footer.pizza")}</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-[350px]">
                        <div className="title border-navy mb-3.5 border-b pb-3.5 text-xl font-normal text-gray-700 capitalize">
                            {t("footer.contact")}
                        </div>
                        <ul className="text-royal-blue mb-7 text-sm font-semibold md:text-lg">
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="tel:+34603839509"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/phone-blue.svg"
                                        className="w-[30px]"
                                    />
                                    +34 603 83 95 09
                                </a>
                            </li>
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="mailto:lamedusarestaurants@gmail.com"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/email-blue.svg"
                                        className="w-[30px]"
                                    />
                                    lamedusarestaurants@gmail.com
                                </a>
                            </li>
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="https://maps.app.goo.gl/M55dr8fUoBHpSpkBA"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/location-pin 1.svg"
                                        className="w-[30px]"
                                    />
                                    Avenida La Habana 9
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-wrap gap-6">
                            <li>
                                <a href="https://www.facebook.com/restaurantlamedusa" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/facebook-blue.svg"
                                        alt="Facebook"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/la_medusa_tenerife/" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/instagram-blue.svg"
                                        alt="Instagram"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/34603839509" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/whatsapp-blue.svg"
                                        alt="Whatsapp"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@lamedusarestaurant" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/tik-tok-blue.svg"
                                        alt="TikTok"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="bg-royal-blue">
                <div className="container flex flex-col justify-between py-5 text-xs text-white md:flex-row md:text-lg">
                    <p className="flex-1 text-center md:text-left">
                        {t("footer.copyright", { year: new Date().getFullYear() })}
                    </p>

                    <div className="mt-4 flex flex-1 items-center justify justify-between md:gap-10 md:mt-0 md:justify-end">
                        <Link to="/terms-of-service" className="hover:underline transition-opacity duration-200">{t("footer.terms")}</Link>
                        <Link to="/privacy-policy" className="hover:underline transition-opacity duration-200">{t("footer.privacy")}</Link>
                        <Link to="/cookies-settings" className="hover:underline transition-opacity duration-200">{t("footer.cookies")}</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
