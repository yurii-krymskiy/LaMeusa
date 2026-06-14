import { useTranslation } from "react-i18next";

const steps = [
    {
        number: "01",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        key: "browse",
    },
    {
        number: "02",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        key: "order",
    },
    {
        number: "03",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        key: "enjoy",
    },
];

export const DeliveryHowTo = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-10 lg:mb-14">
                    <span className="decorative">{t("delivery.howto.decorative")}</span>
                    <h2 className="title section-title">{t("delivery.howto.title")}</h2>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.key}
                            className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-gray-200 hover:border-sky/40 hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-sky/10 flex items-center justify-center text-sky">
                                {step.icon}
                            </div>
                            <span className="font-Arizonia text-sky text-3xl leading-none">{step.number}</span>
                            <h3 className="title text-lg font-semibold">
                                {t(`delivery.howto.steps.${step.key}.title`)}
                            </h3>
                            <p className="description text-sm font-light">
                                {t(`delivery.howto.steps.${step.key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
