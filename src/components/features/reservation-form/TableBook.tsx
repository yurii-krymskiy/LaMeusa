import { useForm, useWatch } from "react-hook-form";
import { useBookingStore } from "./store";
import { BookTableSchemaPick, type BookTableSchemaPickType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

export const TableBook = () => {
    const setData = useBookingStore((state) => state.setData);
    const setStep = useBookingStore((state) => state.setStep);

    const form = useForm<BookTableSchemaPickType>({
        resolver: zodResolver(BookTableSchemaPick),
        defaultValues: {
            name: "",
            guests: null,
            time: "",
            date: "",
            promoCode: "",
            details: "",
        },
    });

    const promoValue = useWatch({
        control: form.control,
        name: "promoCode",
    });

    const isDisabledPromo = !promoValue;
    console.log(form.formState.errors)
    const onSubmit = (data: BookTableSchemaPickType) => {
        setData(data);
        setStep(1);
    };

    return (
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
            <Input
                type="number"
                placeholder="Number of guests"
                required
                {...form.register("guests", {
                    valueAsNumber: true,
                })}
                error={form.formState.errors.guests?.message}
            />
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    className="w-full"
                    type="time"
                    placeholder="Time"
                    required
                    {...form.register("time")}
                    error={form.formState.errors.time?.message}
                />

                <Input
                    className="w-full"
                    type="date"
                    placeholder="Date"
                    required
                    {...form.register("date")}
                    error={form.formState.errors.date?.message}
                />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    type="text"
                    className="w-full"
                    placeholder="Promo Code"
                    {...form.register("promoCode")}
                />
                <Button
                    type="button"
                    variant={"blue-outline"}
                    disabled={isDisabledPromo}
                >
                    Apply
                </Button>
            </div>
            <Input
                type="textarea"
                className="w-full"
                placeholder="Additional wishes"
                {...form.register("details")}
            />
            <Button type="submit" className="!w-full" variant={"blue"}>
                Reserve Now
            </Button>
        </form>
    );
};
