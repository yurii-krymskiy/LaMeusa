import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const TakeawayIntro = () => {
    const { t } = useTranslation();

    return (
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
                        {t("takeaway.intro.title")}
                    </h2>
                    <p className="description section-description inline-block">
                        {t("takeaway.intro.p1")}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-24">
                    <img
                        src="/images/takeaway/takeaway-intro.jpg"
                        loading="lazy"
                        alt={t("takeaway.intro.title")}
                        className="max-h-[500px] max-w-full object-cover lg:max-w-[620px]"
                    />

                    <div>
                        <span className="decorative mb-2.5">
                            {t("takeaway.intro.decorative")}
                        </span>
                        <p className="description section-description mb-4">
                            {t("takeaway.intro.p2")}
                        </p>
                        <p className="description section-description mb-8">
                            {t("takeaway.intro.p3")}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Button variant="blue" to={Paths.menu}>
                                {t("seoCommon.exploreMenu")}
                            </Button>
                            <Button variant="blue-outline" to={Paths.contact}>
                                {t("seoCommon.contactUs")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
