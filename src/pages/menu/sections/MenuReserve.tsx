import { useTranslation } from "react-i18next";

import { LiteForm } from "../../../components/features/lite-reservation-form/LiteForm";

export const MenuReserve = () => {
    const { t } = useTranslation();
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-20 md:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/birthday/image-11.webp" />
                    </div>

                    <div className="flex-1">
                        <span className="decorative">{t("menu.reserve.decorative")}</span>
                        <div className="title section-title">
                            {t("menu.reserve.title")}
                        </div>
                        <LiteForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
