import { useTranslation } from "react-i18next";
import { LiteForm } from "../../../components/features/lite-reservation-form/LiteForm";

export const BirthdayReserve = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-20 items-center lg:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/birthday/image-11.webp" />
                    </div>

                    <div className="flex-1 w-full">
                        <span className="decorative">{t("birthday.reserve.decorative")}</span>
                        <div className="title section-title">
                            {t("birthday.reserve.title")}
                        </div>
                        <LiteForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
