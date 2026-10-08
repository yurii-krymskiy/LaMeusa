import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const TakeawayLocation = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container flex flex-col items-center gap-5 lg:flex-row-reverse lg:gap-24">
                <img
                    src="/images/takeaway/takeaway-location.jpg"
                    loading="lazy"
                    alt={t("takeaway.location.title")}
                    className="max-h-[500px] max-w-full object-cover lg:max-w-[620px]"
                />

                <div>
                    <div className="mb-5 lg:mb-10">
                        <h2 className="section-title title mb-7 inline-block">
                            {t("takeaway.location.title")}
                        </h2>
                        <p className="section-description description mb-4">
                            {t("takeaway.location.p1")}
                        </p>
                        <p className="section-description description">
                            {t("takeaway.location.p2")}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <Button variant="blue" to={Paths.contact}>
                            {t("seoCommon.contactUs")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
