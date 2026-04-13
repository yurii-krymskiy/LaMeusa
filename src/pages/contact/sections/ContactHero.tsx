import { useTranslation } from "react-i18next";

export const ContactHero = () => {
    const { t } = useTranslation();

    return (
        <main className="hero contact-hero !items-start">
            <div className="container">
                <div className="">
                    <h1 className="title hero-title !text-left">
                        {t("contact.hero.title")}
                    </h1>
                    <p className="description hero-description !max-w-none !text-left">
                        {t("contact.hero.description")}
                    </p>
                </div>

                <div className="flex justify-end">
                    <div className="mt-[100px] flex w-full max-w-[540px] flex-col gap-5 lg:gap-10 text-white">
                        <div className="flex justify-between">
                            <span className="title text-[24px] md:text-[28px] font-semibold text-white">
                                {t("contact.hero.openTime")}
                            </span>
                            <span className="text-[18px] font-[300] md:text-2xl">{t("contact.hero.monSat")}</span>
                        </div>

                        <div className="w-full h-[2px] bg-[repeating-linear-gradient(to_right,white_0_8px,transparent_8px_20px)]" />
                        <div className="flex justify-between gap-3">
                            <span className="inline-block max-w-[245px] text-[18px] font-[300] md:text-2xl">
                                {t("contact.hero.hours")}
                            </span>
                            <span className="inline-block max-w-[200px] text-[18px] font-[300] md:text-2xl">
                                {t("contact.hero.music")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
