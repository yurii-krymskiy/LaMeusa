import { useForm, useWatch, Controller } from "react-hook-form";
import { useBookingStore } from "./store";
import { BookTableSchemaPick, type BookTableSchemaPickType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { DatePickerInput } from "../../ui/DatePickerInput";
import { TimePickerInput } from "../../ui/TimePickerInput";

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
        },
    });

    const promoValue = useWatch({
        control: form.control,
        name: "promoCode",
    });

    const isDisabledPromo = !promoValue;
    console.log(form.formState.errors);
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
                type="text"
                placeholder="Number of guests"
                required
                {...form.register("guests", {
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: "Minimum 1 guest",
                    },
                    max: {
                        value: 10,
                        message: "Maximum 10 guests allowed",
                    },
                    onChange: (e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    },
                })}
                error={form.formState.errors.guests?.message}
            />
            <div className="flex flex-col gap-5 md:flex-row">
                <Controller
                    name="time"
                    control={form.control}
                    render={({ field }) => (
                        <TimePickerInput
                            placeholder="Time"
                            required
                            value={field.value}
                            onChange={field.onChange}
                            error={form.formState.errors.time?.message}
                        />
                    )}
                />

                <Controller
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <DatePickerInput
                            placeholder="Date"
                            required
                            value={field.value}
                            onChange={field.onChange}
                            error={form.formState.errors.date?.message}
                        />
                    )}
                />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    type="text"
                    className="w-full"
                    placeholder="Type Promo Code here"
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

            <Button type="submit" className="!w-full" variant={"blue"}>
                Reserve Now
            </Button>
        </form>
    );
};
