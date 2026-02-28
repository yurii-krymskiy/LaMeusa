import { create } from "zustand";

import type { BookTableTypeSchema } from "./schema";

type BookingState = Partial<BookTableTypeSchema> & {
    step: number;
    setStep: (step: number) => void;
    setData: (data: Partial<BookTableTypeSchema>) => void;
};

export const useBookingStore = create<BookingState>()((set) => ({
    step: 0,
    setStep: (step) => set({ step }),
    setData: (data) => set(data),
}));
