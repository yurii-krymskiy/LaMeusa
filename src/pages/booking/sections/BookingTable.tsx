import { TableBook } from "../../../components/features/reservation-form/TableBook";
import { useTranslation } from "react-i18next";

export const BookingTable = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full">
            <div className="mb-5 md:mb-10">
                <span className="title mb-5 block font-semibold uppercase md:text-2xl">
                    {t("booking.table.title")}
                </span>
                <span className="description md:text-lg">
                    {t("booking.table.description")}
                </span>
            </div>

            <div>
                <TableBook />
                <span className="mt-5 block text-sm">
                    {t("booking.table.note")}{" "}
                    <a
                        href="mailto:lamedusarestaurants@gmail.com"
                        className="font-bold"
                    >
                        {t("booking.table.noteEmail")}
                    </a>
                </span>
            </div>
        </section>
    );
};
