import { LiteForm } from "../../../components/features/lite-reservation-form/LiteForm";

export const ContactReserve = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-20 md:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/contact/Group 4.webp" />
                    </div>

                    <div className="flex-1">
                        <span className="decorative">Reserve a Table</span>
                        <div className="title section-title">Reservation</div>
                        <LiteForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
