import { create } from "zustand";

import type { BookTableTypeSchema } from "./schema";

type BookingState = Partial<BookTableTypeSchema> & {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    step: number;
    setStep: (step: number) => void;
    setData: (data: Partial<BookTableTypeSchema>) => void;
};

export const useBookingStore = create<BookingState>()((set) => ({
    isOpen: false,
    step: 0,
    setIsOpen: (isOpen) => set({ isOpen }),
    setStep: (step) => set({ step }),
    setData: (data) => set(data),
}));
