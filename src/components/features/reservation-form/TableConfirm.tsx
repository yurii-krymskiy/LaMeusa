import { useForm } from "react-hook-form";
import { useBookingStore } from "./store";
import {
    BookConfirmSchemaPick,
    type BookConfirmSchemaPickType,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const TableConfirm = () => {
    const navigate = useNavigate();

    const setStep = useBookingStore((state) => state.setStep);
    const guests = useBookingStore((state) => state.guests);
    const time = useBookingStore((state) => state.time);
    const date = useBookingStore((state) => state.date);
    const promo = useBookingStore((state) => state.promoCode);
    const details = useBookingStore((state) => state.details);

    const setData = useBookingStore((state) => state.setData);

    const form = useForm<BookConfirmSchemaPickType>({
        resolver: zodResolver(BookConfirmSchemaPick),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = (data: BookConfirmSchemaPickType) => {
        setData(data);
        console.log("----submit----");

        console.log({
            ...data,
            guests,
            time,
            date,
            promo,
            details,
        });
    };

    const calculateS = (guests: number | null | undefined) => {
        const n = Number(guests ?? 0);
        return n === 1 ? "person" : "persons";
    };

    const calculateTime = (
        date: string | undefined,
        time: string | undefined
    ) => {
        const m = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm", true);

        if (!m.isValid()) return "";
        return m.format("D MMMM YYYY [at] HH:mm");
    };

    useEffect(() => {
        console.log(name, date, !time, !guests);

        if (!date || !time || !guests) {
            setStep(0);
        }
    }, [navigate, date, time, guests, setStep]);

    return (
        <div>
            <div className="mb-10 flex flex-wrap justify-between gap-5">
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

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <Input
                    type="text"
                    placeholder="Full Name"
                    required
                    {...form.register("name")}
                    error={form.formState.errors.name?.message}
                />

                <div className="flex flex-col items-center gap-5 md:flex-row">
                    <Input
                        type="email"
                        className="w-full"
                        placeholder="Email"
                        {...form.register("email")}
                        error={form.formState.errors.email?.message}
                    />
                    <span className="mx-8 inline-block">or</span>
                    <Input
                        type="phone"
                        className="w-full"
                        placeholder="Phone Number"
                        {...form.register("phone")}
                        error={form.formState.errors.phone?.message}
                    />
                </div>
                <Button type="submit" className="!w-full" variant={"blue"}>
                    Confirm
                </Button>
            </form>
        </div>
    );
};
