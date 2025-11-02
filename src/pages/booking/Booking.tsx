import Modal from "react-modal";
import { BookingTable } from "./sections/BookingTable";
import { BookingConfirm } from "./sections/BookingConfirm";
import { useBookingStore } from "../../components/features/reservation-form/store";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

export const Booking = () => {
    const isOpen = useBookingStore((state) => state.isOpen);
    const setIsOpen = useBookingStore((state) => state.setIsOpen);
    const setStep = useBookingStore((state) => state.setStep);
    const step = useBookingStore((state) => state.step);
    const [animate, setAnimate] = useState(false);

    const handleBack = () => {
        if (step > 0) {
            return setStep(step - 1);
        } else {
            return closeModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setAnimate(true));
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const closeModal = () => {
        setAnimate(false);
        setTimeout(() => setIsOpen(false), 200);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick
            closeTimeoutMS={200}
            // 1) Прибираємо дефолтні inline-стилі content
            style={{
                content: {
                    inset: "unset",
                    position: "static",
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    overflow: "visible",
                },
            }}
            bodyOpenClassName="overflow-hidden touch-none"
            overlayClassName={`fixed inset-0 z-50 transition-opacity duration-200
        ${animate ? "opacity-100" : "opacity-0"}
        bg-black/50 overflow-y-auto overscroll-contain`}
            className={`mx-auto my-0 w-full max-w-[1440px] transition-all duration-200 ease-out ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            <div className="m-0 bg-white md:my-16 md:px-4">
                <div className="flex h-full flex-col md:flex-row">
                    <div className="relative grid h-[300px] place-content-center bg-[url('/images/restoran.jpg')] bg-cover bg-top px-24 py-14 md:h-auto">
                        <img
                            src="/icons/logo-white.svg"
                            className="absolute top-8 left-1/2 mx-auto w-[150px] max-w-[320px] -translate-x-1/2 md:top-20 md:w-full"
                        />

                        <div className="text-center">
                            <span className="decorative text-2xl text-white md:text-6xl">
                                Book a Table
                            </span>
                            <span className="title block text-2xl font-semibold text-white md:text-6xl">
                                Reservation
                            </span>
                        </div>
                    </div>

                    <div className="w-full p-5">
                        <button
                            onClick={handleBack}
                            className="text-royal-blue mb-5 flex cursor-pointer items-center gap-2 md:text-lg"
                        >
                            <img
                                src="/icons/arrow-lang.svg"
                                className="rotate-90"
                            />
                            Back
                        </button>
                        {step === 0 && <BookingTable />}
                        {step === 1 && <BookingConfirm />}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
