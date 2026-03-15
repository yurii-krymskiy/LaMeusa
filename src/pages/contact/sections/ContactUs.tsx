import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const ContactUs = () => {
    const { t } = useTranslation();

    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-5 lg:gap-14 lg:flex-row">
                    <div>
                        <div>
                            <span className="decorative">{t("contact.us.decorative")}</span>
                            <div className="title leading-[100%] section-title">
                                {t("contact.us.title")}
                            </div>
                        </div>

                        <p className="description font-[300] section-description mb-[20px] lg:mb-[30px]">
                            {t("contact.us.description")}
                        </p>

                        <div className="mb-4 w-full space-y-3 lg:space-y-6">
                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">
                                    {t("contact.us.restaurantHours")}
                                </span>
                                <div className="font-[300]">
                                    <div>{t("contact.hero.hours")}</div>
                                    <div>{t("contact.hero.music")}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">{t("contact.us.address")}</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    Avenida La Habana 9
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">{t("contact.us.phone")}</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    <a href="tel:+34603839509">
                                        +34 603 83 95 09
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">{t("contact.us.email")}</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    <a href="mailto:lamedusarestaurants@gmail.com">
                                        lamedusarestaurants@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-[700px] min-w-[100px]">
                        <img src="/images/contact/Rectangle 132.jpg" />
                    </div>
                </div>
            </div>
        </section>
    );
};
