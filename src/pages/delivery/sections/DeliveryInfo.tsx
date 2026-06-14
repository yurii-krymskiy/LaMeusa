import { useTranslation } from "react-i18next";

const infoItems = [
    {
        key: "area",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        key: "hours",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        key: "minOrder",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        key: "time",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
];

export const DeliveryInfo = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-10 lg:mb-14">
                    <span className="decorative">{t("delivery.info.decorative")}</span>
                    <h2 className="title section-title">{t("delivery.info.title")}</h2>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                    {infoItems.map((item) => (
                        <div
                            key={item.key}
                            className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center bg-white hover:bg-white-100 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2 text-sky mb-1">
                                {item.icon}
                                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                    {t(`delivery.info.items.${item.key}.label`)}
                                </span>
                            </div>
                            <p className="title text-xl md:text-2xl font-semibold text-navy leading-tight">
                                {t(`delivery.info.items.${item.key}.value`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-14 text-center">
                    <p className="description section-description mb-6">
                        {t("delivery.info.cta")}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="tel:+34603839509"
                            className="title button button-blue text-center"
                        >
                            {t("delivery.info.callButton")}
                        </a>
                        <a
                            href="https://wa.me/34603839509"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="title button button-blue-outline text-center"
                        >
                            {t("delivery.info.whatsappButton")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
