import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { MenuDelicios } from "../menu/sections/MenuDelicios";

const SeoPasta = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO
                title={t("seoPages.pasta.meta.title")}
                description={t("seoPages.pasta.meta.description")}
                path="/pasta-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">{t("seoPages.pasta.hero.title")}</h1>
                    <p className="description hero-description">{t("seoPages.pasta.hero.description")}</p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">{t("seoPages.pasta.intro.p1")}</p>
                    <p className="description section-description">{t("seoPages.pasta.intro.p2")}</p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.pasta.philosophy.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.pasta.philosophy.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.pasta.philosophy.p1")}</p>
                    <p className="description section-description">{t("seoPages.pasta.philosophy.p2")}</p>
                </div>
            </section>

            {/* Fresh Pasta, Timeless Flavour */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.pasta.freshPasta.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.pasta.freshPasta.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.pasta.freshPasta.p1")}</p>
                    <p className="description section-description">{t("seoPages.pasta.freshPasta.p2")}</p>
                </div>
            </section>

            {/* Why Pasta at La Medusa */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.pasta.whyChoose.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.pasta.whyChoose.title")}</h2>
                    <p className="description section-description mb-8">{t("seoPages.pasta.whyChoose.intro")}</p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.pasta.whyChoose.feature1Title")}</h3>
                            <p className="description section-description">{t("seoPages.pasta.whyChoose.feature1Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.pasta.whyChoose.feature2Title")}</h3>
                            <p className="description section-description">{t("seoPages.pasta.whyChoose.feature2Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.pasta.whyChoose.feature3Title")}</h3>
                            <p className="description section-description">{t("seoPages.pasta.whyChoose.feature3Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.pasta.whyChoose.feature4Title")}</h3>
                            <p className="description section-description">{t("seoPages.pasta.whyChoose.feature4Desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">{t("seoPages.pasta.closing.p1")}</p>
                </div>
            </section>

            {/* Menu */}
            <MenuDelicios categorySlug="pasta" />

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">{t("seoPages.pasta.cta.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.pasta.cta.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.pasta.cta.p1")}</p>
                    <p className="description section-description mb-8">{t("seoPages.pasta.cta.p2")}</p>
                    <ButtonOpenReservation variant="blue">{t("seoCommon.bookATable")}</ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoPasta;
