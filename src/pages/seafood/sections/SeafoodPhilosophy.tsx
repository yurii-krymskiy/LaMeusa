import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const SeafoodPhilosophy = () => {
    const { t } = useTranslation();
    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                    />
                    <p className="title section-title">
                        {t("seafood.philosophy.title")}
                    </p>
                    <p className="description section-description">
                        {t("seafood.philosophy.p1")}
                    </p>
                </div>

                <div className="mb-5 lg:mb-10 flex flex-col justify-between gap-5 lg:gap-14 md:flex-row">
                    <div className="w-full">

                        <img src="/images/seafood/image-2.jpg" className="h-[300px] lg:h-[600px] w-full object-cover" />
                    </div>
                    <div className="w-full">
                        <img src="/images/seafood/image-1.jpg" className="h-[300px] lg:h-[600px] w-full object-cover" />
                    </div>
                </div>

                <p className="description section-description mx-auto max-w-3xl mb-5 lg:mb-10 text-center">
                    {t("seafood.philosophy.p2")}
                </p>
                <div>
                    <img src="/images/seafood/image-3.webp" loading="lazy" className="min-h-[250px] object-cover" />
                </div>
            </div>
        </section>
    );
};
