import { create } from "zustand";

import type { BookTableTypeSchema } from "./schema";
import type { AvailabilityResponse } from "../../../lib/database.types";

type BookingState = Partial<BookTableTypeSchema> & {
    step: number;
    setStep: (step: number) => void;
    setData: (data: Partial<BookTableTypeSchema>) => void;

    // Availability state
    availability: AvailabilityResponse | null;
    setAvailability: (availability: AvailabilityResponse | null) => void;

    // Loading and error states
    isCheckingAvailability: boolean;
    setIsCheckingAvailability: (loading: boolean) => void;
    isSubmitting: boolean;
    setIsSubmitting: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;

    // Reservation result
    reservationId: number | null;
    setReservationId: (id: number | null) => void;

    // Reset store
    reset: () => void;
};

const initialState = {
    step: 0,
    name: undefined,
    guests: undefined,
    time: undefined,
    date: undefined,
    promoCode: undefined,
    email: undefined,
    phone: undefined,
    details: undefined,
    availability: null,
    isCheckingAvailability: false,
    isSubmitting: false,
    error: null,
    successMessage: null,
    reservationId: null,
};

export const useBookingStore = create<BookingState>()((set) => ({
    ...initialState,
    setStep: (step) => set({ step }),
    setData: (data) => set(data),
    setAvailability: (availability) => set({ availability }),
    setIsCheckingAvailability: (isCheckingAvailability) =>
        set({ isCheckingAvailability }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    setError: (error) => set({ error }),
    setSuccessMessage: (successMessage) => set({ successMessage }),
    setReservationId: (reservationId) => set({ reservationId }),
    reset: () => set(initialState),
}));
