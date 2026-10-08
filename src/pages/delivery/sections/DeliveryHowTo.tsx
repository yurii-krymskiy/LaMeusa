import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";

const stepKeys = ["browse", "order", "enjoy"];

export const DeliveryHowTo = () => {
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
                        {t("delivery.howto.title")}
                    </h2>
                </div>

                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-24">
                    <img
                        src="/images/delivery/delivery-howto.jpg"
                        loading="lazy"
                        alt={t("delivery.howto.title")}
                        className="max-h-[500px] max-w-full object-cover lg:max-w-[620px]"
                    />

                    <div className="w-full">
                        <span className="decorative mb-2.5">
                            {t("delivery.howto.decorative")}
                        </span>
                        <ol className="mt-4 mb-8 space-y-6">
                            {stepKeys.map((key, index) => (
                                <li key={key} className="flex gap-5">
                                    <span className="font-Arizonia text-sky shrink-0 text-4xl leading-none">
                                        0{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="title mb-1 text-lg md:text-xl">
                                            {t(
                                                `delivery.howto.steps.${key}.title`
                                            )}
                                        </h3>
                                        <p className="description text-base font-light">
                                            {t(
                                                `delivery.howto.steps.${key}.desc`
                                            )}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <a
                            href="https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="title button button-blue inline-block text-center"
                        >
                            {t("delivery.hero.orderButton")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
