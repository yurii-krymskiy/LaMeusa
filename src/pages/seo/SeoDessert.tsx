import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { SeoKitchenSection } from "./components/SeoKitchenSection";
import { Paths } from "../../router";

const SeoDessert = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seoPages.dessert.meta.title")}
                description={t("seoPages.dessert.meta.description")}
                path="/dessert-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            {t("seoPages.dessert.hero.title")}
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            {t("seoPages.dessert.hero.description")}
                        </p>
                    </div>
                    <div className="mb-20 flex flex-wrap gap-3">
                        <Button
                            variant="white-outline"
                            onClick={() => navigate("/menu")}
                        >
                            {t("seoCommon.exploreMenu")}
                        </Button>
                        <ButtonOpenReservation
                            variant="default"
                            className="!text-white"
                        >
                            <span>{t("seoCommon.reserveTable")}</span>
                            <img
                                src="/icons/arrow-right.svg"
                                className="size-7"
                            />
                        </ButtonOpenReservation>
                    </div>
                </div>
            </main>

            {/* Why Section */}
            <section className="section-breadcrumb">
                <div className="container">
                    <Breadcrumb />
                    <div className="mx-auto mb-5 max-w-[850px] text-center lg:mb-10">
                        <img
                            src="/icons/star.svg"
                            alt="star"
                            className="mx-auto mb-1.5 size-[22px] lg:mb-6"
                        />
                        <h2 className="title section-title">
                            {t("seoPages.dessert.why.title")}
                        </h2>
                        <p className="description section-description hidden lg:inline-block">
                            {t("seoPages.dessert.why.longDesc")}
                        </p>
                        <p className="description section-description inline-block lg:hidden">
                            {t("seoPages.dessert.why.shortDesc")}
                        </p>
                    </div>
                    <img
                        src="/images/home-slider/img9.jpeg"
                        alt={t("seoPages.dessert.hero.title")}
                        className="mb-5 max-h-[500px] min-h-[225px] object-cover lg:mb-10"
                    />

                    <div className="mb-5 flex flex-col gap-5 md:flex-row lg:mb-10 lg:gap-14">
                        <div className="text-center">
                            <img
                                src="/icons/fruit.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    {t("seoPages.dessert.why.feature1Title")}
                                </h3>
                                <p className="description md:text-lg">
                                    {t("seoPages.dessert.why.feature1Desc")}
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <img
                                src="/icons/flour.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    {t("seoPages.dessert.why.feature2Title")}
                                </h3>
                                <p className="description md:text-lg">
                                    {t("seoPages.dessert.why.feature2Desc")}
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <img
                                src="/icons/marinara-sauce.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    {t("seoPages.dessert.why.feature3Title")}
                                </h3>
                                <p className="description md:text-lg">
                                    {t("seoPages.dessert.why.feature3Desc")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                        <ButtonOpenReservation variant="blue">
                            {t("seoCommon.reserveTable")}
                        </ButtonOpenReservation>
                        <Button variant="blue-outline" to={Paths.contact}>
                            {t("seoCommon.contactUs")}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Hours */}
            <section className="section">
                <div className="container">
                    <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-24">
                        <img
                            src="/IMG_3093.jpeg"
                            loading="lazy"
                            alt={t("seoPages.dessert.hours.title")}
                            className="max-h-[500px] max-w-[620px] object-cover lg:max-h-[600px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    {t("seoPages.dessert.hours.title")}
                                </h2>
                                <p className="section-description description">
                                    {t("seoPages.dessert.hours.description")}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <Button to="/happy-hours" variant="blue">
                                    {t("seoCommon.viewHappyHours")}
                                </Button>
                                <ButtonOpenReservation variant="blue-outline">
                                    {t("seoCommon.bookNow")}
                                </ButtonOpenReservation>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu */}
            <MenuDelicios categorySlug="dessert" />

            {/* Meets */}
            <SeoKitchenSection
                decorative={t("seoPages.dessert.kitchen.decorative")}
                title={t("seoPages.dessert.kitchen.title")}
                image1="/IMG_3440.jpeg"
                image2="/IMG_3438.jpeg"
                paragraphs={[
                    t("seoPages.dessert.kitchen.p1"),
                    t("seoPages.dessert.kitchen.p2"),
                    t("seoPages.dessert.kitchen.p3"),
                ]}
            />

            {/* Video */}
            <section className="grid items-center bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/IMG_3083.jpeg')] bg-cover bg-no-repeat px-4 py-9 md:py-[151px]">
                <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">
                    <h2 className="section-title title mb-7 text-white">
                        {t("seoPages.dessert.video.title")}
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        {t("seoPages.dessert.video.description")}
                    </p>

                    <ScrollCircle />
                </div>
            </section>

            {/* Reserve */}
            <section className="section">
                <div className="container flex flex-col items-center lg:flex-row">
                    <img
                        src="/images/seafood/image-6.webp"
                        alt="image"
                        className="max-w-[610px]"
                    />

                    <div className="lg:-ml-10">
                        <div className="mb-5 lg:mb-10">
                            <span className="decorative mb-2.5">
                                {t("seoCommon.joinUs")}
                            </span>
                            <h2 className="title section-title">
                                {t("seoPages.dessert.reserve.title")}
                            </h2>
                            <p className="description section-description mb-2">
                                {t("seoPages.dessert.reserve.p1")}
                            </p>
                            <p className="description section-description">
                                {t("seoPages.dessert.reserve.p2")}
                            </p>
                        </div>
                        <ButtonOpenReservation variant="blue">
                            {t("seoCommon.bookATable")}
                        </ButtonOpenReservation>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeoDessert;
