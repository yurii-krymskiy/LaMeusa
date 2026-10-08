import { useTranslation } from "react-i18next";

const infoItems = [
    {
        key: "area",
        icon: (
            <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        key: "hours",
        icon: (
            <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    {
        key: "minOrder",
        icon: (
            <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
    },
    {
        key: "time",
        icon: (
            <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
    },
];

export const DeliveryInfo = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto max-w-[1100px]">
                    <div className="mb-10 text-center lg:mb-14">
                        <span className="decorative">
                            {t("delivery.info.decorative")}
                        </span>
                        <h2 className="title section-title">
                            {t("delivery.info.title")}
                        </h2>
                    </div>

                    {/* Info facts separated by thin sky hairlines */}
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {infoItems.map((item, idx) => (
                            <div
                                key={item.key}
                                className={`border-sky/25 flex flex-col items-center gap-2 px-3 py-7 text-center lg:px-6 lg:py-3 ${
                                    idx % 2 === 0
                                        ? "border-r lg:border-r-0"
                                        : ""
                                } ${idx < 2 ? "border-b lg:border-b-0" : ""} ${
                                    idx > 0 ? "lg:border-l" : ""
                                }`}
                            >
                                <div className="text-sky mb-1">{item.icon}</div>
                                <span className="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                                    {t(`delivery.info.items.${item.key}.label`)}
                                </span>
                                <p className="title text-navy text-lg leading-snug md:text-xl">
                                    {t(`delivery.info.items.${item.key}.value`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
