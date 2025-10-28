import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayGrid = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="mb-10 flex flex-col items-center gap-14 md:mb-24 md:flex-row">
                    <div>
                        <div className="mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Seafood Celebration Set
                            </span>
                            <p className="section-description description">
                                Seafood specialties: oysters, shrimp, grilled
                                salmon and a set of white wines. Ideal for those
                                who appreciate freshness and Mediterranean
                                cuisine.
                            </p>
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        src="/images/birthday/image-8.webp"
                        className="max-w-[620px]"
                    />
                </div>
                <div className="mb-10 flex flex-col items-center gap-14 md:mb-24 md:flex-row">
                    <img
                        loading="lazy"
                        src="/images/birthday/image-10.webp"
                        className="max-w-[620px]"
                    />
                    <div>
                        <div className="mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Pasta & Wine Evening
                            </span>
                            <p className="section-description description">
                                A variety of pasta (Carbonara, Vongole, Truffle
                                Tagliatelle) paired with Italian wine. The
                                atmosphere of a family dinner and the taste of
                                real Italy.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-10 flex flex-col items-center gap-14 md:mb-24 md:flex-row">
                    <div>
                        <div className="mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Sweet Birthday Table
                            </span>
                            <p className="section-description description">
                                An assortment of desserts from the chef:
                                birthday cake, delicate tiramisu, panna cotta
                                and a set with cocktails or coffee. A sweet
                                finale to your evening.
                            </p>
                        </div>
                    </div>
                    <img
                        loading="lazy"
                        src="/images/birthday/image-9.webp"
                        className="max-w-[620px]"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                    <ButtonOpenReservation variant="blue">
                        Reserve a Table
                    </ButtonOpenReservation>
                    <Button variant="blue-outline" to={Paths.menu}>
                        View Full Birthday Menu
                    </Button>
                </div>
            </div>
        </section>
    );
};
