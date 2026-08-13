import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { MenuDelicios } from "../menu/sections/MenuDelicios";

const SeoSeafood = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO
                title={t("seoPages.seafood.meta.title")}
                description={t("seoPages.seafood.meta.description")}
                path="/fish-seafood-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">{t("seoPages.seafood.hero.title")}</h1>
                    <p className="description hero-description">{t("seoPages.seafood.hero.description")}</p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">{t("seoPages.seafood.intro.p1")}</p>
                    <p className="description section-description">{t("seoPages.seafood.intro.p2")}</p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.seafood.philosophy.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.seafood.philosophy.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.seafood.philosophy.p1")}</p>
                    <p className="description section-description mb-4">{t("seoPages.seafood.philosophy.p2")}</p>
                    <p className="description section-description">{t("seoPages.seafood.philosophy.p3")}</p>
                </div>
            </section>

            {/* Freshness Inspired by the Sea */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.seafood.freshness.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.seafood.freshness.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.seafood.freshness.p1")}</p>
                    <p className="description section-description">{t("seoPages.seafood.freshness.p2")}</p>
                </div>
            </section>

            {/* Why Choose */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">{t("seoPages.seafood.whyChoose.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.seafood.whyChoose.title")}</h2>
                    <p className="description section-description mb-8">{t("seoPages.seafood.whyChoose.intro")}</p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.seafood.whyChoose.feature1Title")}</h3>
                            <p className="description section-description">{t("seoPages.seafood.whyChoose.feature1Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.seafood.whyChoose.feature2Title")}</h3>
                            <p className="description section-description">{t("seoPages.seafood.whyChoose.feature2Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.seafood.whyChoose.feature3Title")}</h3>
                            <p className="description section-description">{t("seoPages.seafood.whyChoose.feature3Desc")}</p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">{t("seoPages.seafood.whyChoose.feature4Title")}</h3>
                            <p className="description section-description">{t("seoPages.seafood.whyChoose.feature4Desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memory */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">{t("seoPages.seafood.memory.p1")}</p>
                </div>
            </section>

            {/* Menu */}
            <MenuDelicios categorySlug="fish" />

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">{t("seoPages.seafood.cta.decorative")}</p>
                    <h2 className="title section-title">{t("seoPages.seafood.cta.title")}</h2>
                    <p className="description section-description mb-4">{t("seoPages.seafood.cta.p1")}</p>
                    <p className="description section-description mb-8">{t("seoPages.seafood.cta.p2")}</p>
                    <ButtonOpenReservation variant="blue">{t("seoCommon.bookATable")}</ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoSeafood;
