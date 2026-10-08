import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";

export const TakeawayOrder = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className="grid items-center bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url('/images/takeaway/takeaway-order.jpg')] bg-cover bg-center bg-no-repeat px-4 py-9 md:py-28">
            <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">
                <h2 className="section-title title mb-7 text-white">
                    {t("takeaway.order.title")}
                </h2>
                <p className="description section-description mb-2 inline-block text-white">
                    {t("takeaway.order.p1")}
                </p>
                <p className="description section-description mb-10 inline-block text-white">
                    {t("takeaway.order.p2")}
                </p>

                <div className="flex flex-wrap justify-center gap-5">
                    <a
                        href="tel:+34603839509"
                        className="title button button-white-outline text-center"
                    >
                        {t("takeaway.order.callButton")}
                    </a>
                    <Button
                        variant="white-outline"
                        onClick={() => navigate("/menu")}
                    >
                        {t("seoCommon.exploreMenu")}
                    </Button>
                </div>
            </div>
        </section>
    );
};
