import { TableConfirm } from "../../../components/features/reservation-form/TableConfirm";
import { useTranslation } from "react-i18next";

export const BookingConfirm = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full">
            <div className="mb-5 md:mb-10">
                <span className="title mb-5 block font-semibold uppercase md:text-2xl">
                    {t("booking.confirm.title")}
                </span>
                <span className="description md:text-lg">
                    {t("booking.confirm.description")}
                </span>
            </div>

            <TableConfirm />
        </section>
    );
};
