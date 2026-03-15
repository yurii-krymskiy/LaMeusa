import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    LiteBookTableSchemaPick,
    type LiteBookTableSchemaPickType,
} from "../reservation-form/schema";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { DatePickerInput } from "../../ui/DatePickerInput";
import { TimePickerInput } from "../../ui/TimePickerInput";
import { useState, useEffect, useCallback } from "react";
import { checkAvailability, createReservation } from "../../../lib/reservation.service";
import {
    sendReservationEmails,
    formatDateForEmail,
    formatTimeForEmail,
} from "../../../lib/email.service";
import type { AvailabilityResponse } from "../../../lib/database.types";
import {
    FormErrors,
    SingleError,
    SuccessMessage,
    LoadingStatus,
} from "../../ui/FormErrors";

export const LiteForm = () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"pending" | "sent" | "failed">("pending");

    const form = useForm<LiteBookTableSchemaPickType>({
        resolver: zodResolver(LiteBookTableSchemaPick),
        defaultValues: {
            name: "",
            phone: "",
            time: "",
            email: "",
            date: "",
            details: "",
            guests: null,
        },
    });

    // Watch date, time, and guests for availability check
    const watchedDate = useWatch({ control: form.control, name: "date" });
    const watchedTime = useWatch({ control: form.control, name: "time" });
    const watchedGuests = useWatch({ control: form.control, name: "guests" });

    // Check availability when date, time, or guests changes
    const checkTableAvailability = useCallback(async () => {
        if (!watchedDate || !watchedTime || !watchedGuests || watchedGuests <= 0) {
            setAvailability(null);
            setError(null);
            return;
        }

        setIsCheckingAvailability(true);
        setError(null);

        try {
            const result = await checkAvailability(watchedDate, watchedTime, watchedGuests);
            setAvailability(result);

            if (!result.available) {
                setError(result.message || t("reservation.noTables"));
            }
        } catch (err) {
            console.error("Error checking availability:", err);
            setError(t("reservation.checkFailed"));
            setAvailability(null);
        } finally {
            setIsCheckingAvailability(false);
        }
    }, [watchedDate, watchedTime, watchedGuests]);

    // Debounced availability check
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkTableAvailability();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [checkTableAvailability]);

    const onSubmit = async (data: LiteBookTableSchemaPickType) => {
        // Custom validation for empty fields
        if (!data.name.trim()) {
            setError(t("reservation.enterName"));
            return;
        }
        if (!data.guests || data.guests <= 0) {
            setError(t("reservation.enterGuests"));
            return;
        }
        if (!data.time) {
            setError(t("reservation.selectTime"));
            return;
        }
        if (!data.date) {
            setError(t("reservation.selectDate"));
            return;
        }

        // Check availability before submitting
        if (availability && !availability.available) {
            setError(availability.message || t("reservation.noTables"));
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createReservation({
                customer_name: data.name,
                number_of_guests: data.guests,
                reservation_time: data.time,
                reservation_date: data.date,
                email: data.email,
                phone: data.phone,
                additional_wishes: data.details || undefined,
            });

            if (result.success) {
                setIsSuccess(true);

                // Send confirmation emails
                if (data.email) {
                    try {
                        const emailResult = await sendReservationEmails({
                            customer_name: data.name,
                            email: data.email,
                            phone: data.phone,
                            number_of_guests: data.guests,
                            reservation_date: formatDateForEmail(data.date),
                            reservation_time: formatTimeForEmail(data.time),
                            additional_wishes: data.details,
                        });
                        setEmailStatus(emailResult.success ? "sent" : "failed");
                    } catch {
                        setEmailStatus("failed");
                    }
                } else {
                    setEmailStatus("sent");
                }
            } else {
                setError(result.error || t("reservation.createFailed"));
            }
        } catch (err) {
            console.error("Error creating reservation:", err);
            setError(t("reservation.unexpectedError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewReservation = () => {
        form.reset();
        setIsSuccess(false);
        setAvailability(null);
        setError(null);
        setEmailStatus("pending");
    };

    // Success state
    if (isSuccess) {
        return (
            <div className="text-center py-8">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="title mb-2 text-xl font-semibold">
                    {t("reservation.confirmed")}
                </h3>
                <p className="description mb-4">
                    {t("reservation.thankYou")}
                </p>
                {emailStatus === "pending" && (
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2 mb-4">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t("reservation.sendingConfirmation")}
                    </p>
                )}
                {emailStatus === "sent" && (
                    <p className="text-sm text-green-600 mb-4">
                        {t("reservation.emailSent")}
                    </p>
                )}
                {emailStatus === "failed" && (
                    <p className="text-sm text-amber-600 mb-4">
                        {t("reservation.emailFailed")}
                    </p>
                )}
                <Button
                    type="button"
                    variant="blue-outline"
                    onClick={handleNewReservation}
                >
                    {t("reservation.makeAnother")}
                </Button>
            </div>
        );
    }

    const isSubmitDisabled =
        isSubmitting ||
        isCheckingAvailability ||
        (availability !== null && !availability.available);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
        >
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    type="text"
                    placeholder={t("reservation.fullName")}
                    required
                    {...form.register("name")}
                    disabled={isSubmitting}
                />
                <Input
                    type="text"
                    placeholder={t("reservation.numberOfGuests")}
                    required
                    {...form.register("guests", {
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: t("reservation.guestsQuestion"),
                        },
                        max: {
                            value: 8,
                            message: t("reservation.maxGuests"),
                        },
                        onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        },
                    })}
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <Input
                    type="email"
                    placeholder={t("reservation.email")}
                    required
                    {...form.register("email")}
                    disabled={isSubmitting}
                />
                <Input
                    type="phone"
                    className="w-full"
                    placeholder={t("reservation.phone")}
                    required
                    {...form.register("phone")}
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <Controller
                    name="time"
                    control={form.control}
                    render={({ field }) => (
                        <TimePickerInput
                            placeholder={t("reservation.time")}
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
                            placeholder={t("reservation.date")}
                            required
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            {/* Form Validation Errors */}
            {Object.keys(form.formState.errors).length > 0 && (
                <FormErrors errors={form.formState.errors} />
            )}

            {/* Availability Status */}
            {isCheckingAvailability && (
                <LoadingStatus message={t("reservation.checkingAvailability")} />
            )}

            {!isCheckingAvailability && availability?.available && Object.keys(form.formState.errors).length === 0 && (
                <SuccessMessage message={t("reservation.tablesAvailable")} />
            )}

            {error && <SingleError message={error} />}

            <div>
                <Textarea
                    placeholder={t("reservation.additionalWishes")}
                    {...form.register("details")}
                    disabled={isSubmitting}
                />
                <p className="description max-w-[340px] text-[12px]">
                    {t("reservation.disclaimer")}
                </p>
            </div>

            <div className="flex flex-col justify-between gap-3 md:flex-row">
                <Button
                    type="submit"
                    variant="blue"
                    disabled={isSubmitDisabled}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {t("reservation.booking")}
                        </span>
                    ) : isCheckingAvailability ? (
                        t("reservation.checking")
                    ) : (
                        t("reservation.bookNow")
                    )}
                </Button>
            </div>
        </form>
    );
};
