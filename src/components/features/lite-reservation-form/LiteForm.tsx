import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
    LiteBookTableSchemaPick,
    type LiteBookTableSchemaPickType,
} from "../reservation-form/schema";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { DatePickerInput } from "../../ui/DatePickerInput";
import { TimePickerInput } from "../../ui/TimePickerInput";

export const LiteForm = () => {
    const form = useForm<LiteBookTableSchemaPickType>({
        resolver: zodResolver(LiteBookTableSchemaPick),
        defaultValues: {
            name: "",
            phone: "",
            time: "",
            date: "",
            details: "",
        },
    });

    const onSubmit = (data: LiteBookTableSchemaPickType) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
        >
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    type="text"
                    placeholder="Full Name"
                    required
                    {...form.register("name")}
                    error={form.formState.errors.name?.message}
                />
                <Input
                    type="phone"
                    className="w-full"
                    placeholder="Phone Number"
                    required
                    {...form.register("phone")}
                    error={form.formState.errors.phone?.message}
                />
            </div>
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

            <Textarea
                type="text"
                placeholder="Additional wishes"
                {...form.register("details")}
                error={form.formState.errors.details?.message}
            />

            <div className="flex flex-col justify-between gap-3 md:flex-row">
                <p className="description max-w-[340px] text-sm">
                    By clicking the reservation button, you agree to the
                    processing of personal data
                </p>
                <Button type="submit" className="" variant={"blue"}>
                    Book Now
                </Button>
            </div>
        </form>
    );
};
