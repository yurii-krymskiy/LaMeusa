import { useTranslation } from "react-i18next";
import { LiteForm } from "../../../components/features/lite-reservation-form/LiteForm";

export const ContactReserve = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col items-center gap-20 lg:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/contact/Group 4.webp" />
                    </div>

                    <div className="flex-1 w-full">
                        <span className="decorative">{t("contact.reserve.decorative")}</span>
                        <div className="title section-title">{t("contact.reserve.title")}</div>
                        <LiteForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
