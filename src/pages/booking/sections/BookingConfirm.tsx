import { TableConfirm } from "../../../components/features/reservation-form/TableConfirm";

export const BookingConfirm = () => {
    return (
        <section>
            <div className="mb-10">
                <span className="title mb-5 block font-semibold uppercase md:text-2xl">
                    Booking confirmation
                </span>
                <span className="description md:text-lg">
                    Please confirm whether you have entered everything correctly
                    and write your name and email to confirm the booking.
                </span>
            </div>

            <TableConfirm />
        </section>
    );
};
