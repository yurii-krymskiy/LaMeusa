import { LiteForm } from "../../../components/features/lite-reservation-form/LiteForm";

export const BirthdayReserve = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="flex flex-col gap-20 items-center lg:flex-row">
                    <div className="max-w-[588px]">
                        <img src="/images/birthday/image-11.webp" />
                    </div>

                    <div className="flex-1 w-full">
                        <span className="decorative">Reserve a Table</span>
                        <div className="title section-title">
                            Plan Your Perfect Birthday
                        </div>
                        <LiteForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
