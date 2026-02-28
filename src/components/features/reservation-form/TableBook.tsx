import { useForm, useWatch, Controller } from "react-hook-form";
import { useBookingStore } from "./store";
import { BookTableSchemaPick, type BookTableSchemaPickType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { DatePickerInput } from "../../ui/DatePickerInput";
import { TimePickerInput } from "../../ui/TimePickerInput";
import { useEffect, useCallback } from "react";
import { checkAvailability } from "../../../lib/reservation.service";
import {
    FormErrors,
    SingleError,
    SuccessMessage,
    LoadingStatus,
} from "../../ui/FormErrors";

export const TableBook = () => {
    const setData = useBookingStore((state) => state.setData);
    const setStep = useBookingStore((state) => state.setStep);
    const setAvailability = useBookingStore((state) => state.setAvailability);
    const setIsCheckingAvailability = useBookingStore(
        (state) => state.setIsCheckingAvailability
    );
    const setError = useBookingStore((state) => state.setError);
    const isCheckingAvailability = useBookingStore(
        (state) => state.isCheckingAvailability
    );
    const availability = useBookingStore((state) => state.availability);
    const error = useBookingStore((state) => state.error);

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

    // Watch date, time, and guests for availability check
    const watchedDate = useWatch({ control: form.control, name: "date" });
    const watchedTime = useWatch({ control: form.control, name: "time" });
    const watchedGuests = useWatch({ control: form.control, name: "guests" });

    // Check availability when date, time, or guests change
    const checkTableAvailability = useCallback(async () => {
        if (!watchedDate || !watchedTime || !watchedGuests || watchedGuests <= 0) {
            setAvailability(null);
            setError(null);
            return;
        }

        setIsCheckingAvailability(true);
        setError(null);

        try {
            const result = await checkAvailability(
                watchedDate,
                watchedTime,
                watchedGuests
            );
            setAvailability(result);

            if (!result.available) {
                setError(result.message || "No tables available for this time");
            }
        } catch (err) {
            console.error("Error checking availability:", err);
            setError("Failed to check availability. Please try again.");
            setAvailability(null);
        } finally {
            setIsCheckingAvailability(false);
        }
    }, [
        watchedDate,
        watchedTime,
        watchedGuests,
        setAvailability,
        setIsCheckingAvailability,
        setError,
    ]);

    // Debounced availability check
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkTableAvailability();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [checkTableAvailability]);

    const isDisabledPromo = !promoValue;

    const onSubmit = (data: BookTableSchemaPickType) => {
        // Don't proceed if no tables available
        if (availability && !availability.available) {
            setError(
                availability.message || "No tables available for this time"
            );
            return;
        }

        setData(data);
        setStep(1);
    };

    const isSubmitDisabled =
        isCheckingAvailability || (availability !== null && !availability.available);

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
            />
            <Input
                type="text"
                placeholder="Number of guests"
                required
                {...form.register("guests", {
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: "How many guests will be joining?",
                    },
                    max: {
                        value: 8,
                        message: "For parties larger than 8, please call us",
                    },
                    onChange: (e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    },
                })}
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

            {/* Form Validation Errors */}
            {Object.keys(form.formState.errors).length > 0 && (
                <FormErrors errors={form.formState.errors} />
            )}

            {/* Availability Status */}
            {isCheckingAvailability && (
                <LoadingStatus message="Checking availability..." />
            )}

            {!isCheckingAvailability && availability?.available && Object.keys(form.formState.errors).length === 0 && (
                <SuccessMessage message="Tables available for your reservation!" />
            )}

            {error && <SingleError message={error} />}

            <Button
                type="submit"
                className="!w-full"
                variant={"blue"}
                disabled={isSubmitDisabled}
            >
                {isCheckingAvailability ? "Checking..." : "Reserve Now"}
            </Button>
        </form>
    );
};
