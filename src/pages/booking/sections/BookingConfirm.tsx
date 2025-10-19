import { useBookingStore } from "../../../components/features/reservation-form/store";
import { TableConfirm } from "../../../components/features/reservation-form/TableConfirm";
import moment from "moment";

export const BookingConfirm = () => {
    const calculateS = (guests: number | null | undefined) => {
        const n = Number(guests ?? 0);
        return n === 1 ? "person" : "persons";
    };

    const calculateTime = (
        date: string | undefined,
        time: string | undefined
    ) => {
        const m = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm", true);
        console.log(m);

        if (!m.isValid()) return "";
        return m.format("D MMMM YYYY [at] HH:mm");
    };

    const guests = useBookingStore((state) => state.guests);
    const date = useBookingStore((state) => state.date);
    const time = useBookingStore((state) => state.time);

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
            <div className="mb-10 flex flex-wrap gap-5 justify-between">
                <div>
                    <span className="title normal-case md:text-xl">
                        Number of Guests
                    </span>
                    <div className="description md:text-lg">
                        {guests} {calculateS(guests)}
                    </div>
                </div>
                <div>
                    <span className="title normal-case md:text-xl">
                        Date and Time
                    </span>
                    <div className="description md:text-lg">
                        {calculateTime(date, time)}
                    </div>
                </div>
            </div>

            <div>
                <TableConfirm />
            </div>
        </section>
    );
};
