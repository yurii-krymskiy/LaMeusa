import { useForm } from "react-hook-form";
import { useBookingStore } from "./store";
import {
    BookConfirmSchemaPick,
    type BookConfirmSchemaPickType,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { createReservation } from "../../../lib/reservation.service";
import {
    sendReservationEmails,
    formatDateForEmail,
    formatTimeForEmail,
} from "../../../lib/email.service";
import { FormErrors, SingleError } from "../../ui/FormErrors";

export const TableConfirm = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"pending" | "sent" | "failed">("pending");

    const setStep = useBookingStore((state) => state.setStep);
    const guests = useBookingStore((state) => state.guests);
    const time = useBookingStore((state) => state.time);
    const date = useBookingStore((state) => state.date);
    const promo = useBookingStore((state) => state.promoCode);
    const details = useBookingStore((state) => state.details);
    const customerName = useBookingStore((state) => state.name);

    const setData = useBookingStore((state) => state.setData);
    const isSubmitting = useBookingStore((state) => state.isSubmitting);
    const setIsSubmitting = useBookingStore((state) => state.setIsSubmitting);
    const error = useBookingStore((state) => state.error);
    const setError = useBookingStore((state) => state.setError);
    const setReservationId = useBookingStore((state) => state.setReservationId);
    const reset = useBookingStore((state) => state.reset);

    const form = useForm<BookConfirmSchemaPickType>({
        resolver: zodResolver(BookConfirmSchemaPick),
        defaultValues: {
            name: customerName || "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (data: BookConfirmSchemaPickType) => {
        if (!guests || !time || !date) {
            setError("Missing reservation details");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createReservation({
                customer_name: data.name,
                number_of_guests: guests,
                reservation_time: time,
                reservation_date: date,
                promo_code: promo || undefined,
                email: data.email,
                phone: data.phone,
                additional_wishes: details || undefined,
            });

            if (result.success && result.reservationId) {
                setReservationId(result.reservationId);
                setData(data);
                setIsSuccess(true);

                // Send confirmation emails (non-blocking - don't fail reservation if email fails)
                if (data.email) {
                    try {
                        const emailResult = await sendReservationEmails({
                            customer_name: data.name,
                            email: data.email,
                            phone: data.phone,
                            number_of_guests: guests,
                            reservation_date: formatDateForEmail(date),
                            reservation_time: formatTimeForEmail(time),
                            additional_wishes: details,
                        });
                        setEmailStatus(emailResult.success ? "sent" : "failed");
                    } catch {
                        setEmailStatus("failed");
                    }
                } else {
                    setEmailStatus("sent"); // No email to send
                }
            } else {
                setError(result.error || "Failed to create reservation");
            }
        } catch (err) {
            console.error("Error creating reservation:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewReservation = () => {
        reset();
        setIsSuccess(false);
    };

    const handleGoHome = () => {
        reset();
        navigate("/");
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
        if (!date || !time || !guests) {
            setStep(0);
        }
    }, [navigate, date, time, guests, setStep]);

    // Success state
    if (isSuccess) {
        return (
            <div className="text-center">
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
                <h2 className="title mb-2 text-2xl font-semibold">
                    Reservation Confirmed!
                </h2>
                <p className="description mb-6">
                    Your table has been reserved for {guests} {calculateS(guests)} on{" "}
                    {calculateTime(date, time)}.
                </p>
                {emailStatus === "pending" && (
                    <p className="description mb-6 text-sm text-gray-500 flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Sending confirmation email...
                    </p>
                )}
                {emailStatus === "sent" && (
                    <p className="description mb-6 text-sm text-green-600 flex items-center justify-center gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Confirmation email sent successfully!
                    </p>
                )}
                {emailStatus === "failed" && (
                    <p className="description mb-6 text-sm text-amber-600">
                        Could not send confirmation email, but your reservation is confirmed.
                    </p>
                )}
                <div className="flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="blue"
                        className="!w-full"
                        onClick={handleGoHome}
                    >
                        Go to Home
                    </Button>
                    <Button
                        type="button"
                        variant="blue-outline"
                        className="!w-full"
                        onClick={handleNewReservation}
                    >
                        Make Another Reservation
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-5 md:mb-10 flex flex-wrap justify-between gap-5">
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

            {/* Form Validation Errors */}
            {Object.keys(form.formState.errors).length > 0 && (
                <div className="mb-5">
                    <FormErrors errors={form.formState.errors} />
                </div>
            )}

            {error && (
                <div className="mb-5">
                    <SingleError message={error} />
                </div>
            )}

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <div className="flex flex-col items-center gap-2 md:gap-5 md:flex-row">
                    <Input
                        type="email"
                        className="w-full"
                        placeholder="Email"
                        {...form.register("email")}
                        disabled={isSubmitting}
                    />
                    <Input
                        type="phone"
                        className="w-full"
                        placeholder="Phone Number"
                        {...form.register("phone")}
                        disabled={isSubmitting}
                    />
                </div>
                <Button
                    type="submit"
                    className="!w-full"
                    variant={"blue"}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Confirming...
                        </span>
                    ) : (
                        "Confirm"
                    )}
                </Button>
            </form>
        </div>
    );
};
