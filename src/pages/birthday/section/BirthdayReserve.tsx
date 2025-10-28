import { useBookingStore } from "../../../components/features/reservation-form/store";
import { TableBook } from "../../../components/features/reservation-form/TableBook";
import { TableConfirm } from "../../../components/features/reservation-form/TableConfirm";

export const BirthdayReserve = () => {
    const step = useBookingStore((state) => state.step);
    const setStep = useBookingStore((state) => state.setStep);
    const handleBack = () => {
        if (step > 0) {
            return setStep(step - 1);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-20 md:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/birthday/image-11.webp" />
                    </div>

                    <div className="flex-1">
                        {!!step && (
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
                        )}
                        <span className="decorative">Reserve a Table</span>
                        <div className="title section-title">
                            Plan Your Perfect Birthday
                        </div>
                        {step === 0 && <TableBook />}
                        {step === 1 && <TableConfirm />}
                    </div>
                </div>
            </div>
        </section>
    );
};
