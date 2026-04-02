import { BookingTable } from "./sections/BookingTable";
import { BookingConfirm } from "./sections/BookingConfirm";
import { useBookingStore } from "../../components/features/reservation-form/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";

export const Booking = () => {
    const { t } = useTranslation();
    const setStep = useBookingStore((state) => state.setStep);
    const step = useBookingStore((state) => state.step);
    const navigate = useNavigate();

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="m-0 bg-white h-screen">
            <SEO
                title={t("seo.booking.title")}
                description={t("seo.booking.description")}
                path="/booking"
                preloadImages={["/images/restoran.jpg"]}
            />
            <div className="flex h-full flex-col md:flex-row">
                <div className="relative w-full md:w-[50%] grid h-[300px] place-content-center bg-[url('/images/restoran.jpg')] bg-cover bg-top px-24 py-14 md:h-auto">
                    <img
                        src="/icons/logo-white.svg"
                        className="w-[100%]"
                    />

                    <div className="text-center">
                        <span className="decorative text-2xl text-white md:text-6xl">
                            {t("booking.decorative")}
                        </span>
                        <span className="title block text-2xl font-semibold text-white md:text-6xl">
                            {t("booking.title")}
                        </span>
                    </div>
                </div>

                <div className="w-full md:w-[50%] p-5 flex flex-col items-center justify-center">
                    <button
                        onClick={handleBack}
                        className="text-royal-blue self-start mb-5 flex cursor-pointer items-center gap-2 md:text-lg"
                    >
                        <img
                            src="/icons/arrow-lang.svg"
                            className="rotate-90"
                        />
                        {t("booking.back")}
                    </button>
                    {step === 0 && <BookingTable />}
                    {step === 1 && <BookingConfirm />}
                </div>
            </div>
        </div>
    );
};
