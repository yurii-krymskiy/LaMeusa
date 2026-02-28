import { TableBook } from "../../../components/features/reservation-form/TableBook";

export const BookingTable = () => {
    return (
        <section className="w-full">
            <div className="mb-5 md:mb-10">
                <span className="title mb-5 block font-semibold uppercase md:text-2xl">
                    Book a table
                </span>
                <span className="description md:text-lg">
                    Book a table with us today, we have a great atmosphere that
                    you will love.
                </span>
            </div>

            <div>
                <TableBook />
                <span className="mt-5 block text-sm">
                    *More than 8 pers. please contact{" "}
                    <a
                        href="mailto:lamedusarestaurants@gmail.com"
                        className="font-bold"
                    >
                        lamedusarestaurants@gmail.com
                    </a>
                </span>
            </div>
        </section>
    );
};
