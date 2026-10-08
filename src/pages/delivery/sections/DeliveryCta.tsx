import { useTranslation } from "react-i18next";

export const DeliveryCta = () => {
    const { t } = useTranslation();

    return (
        <section className="grid items-center bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/images/delivery/delivery-cta.jpg')] bg-cover bg-center bg-no-repeat px-4 py-9 md:py-28">
            <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">
                <h2 className="section-title title mb-7 text-white">
                    {t("delivery.cta.title")}
                </h2>
                <p className="description section-description mb-10 inline-block text-white">
                    {t("delivery.info.cta")}
                </p>
                <a
                    href="https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title button button-white-outline text-center"
                >
                    {t("delivery.info.orderButton")}
                </a>
            </div>
        </section>
    );
};
