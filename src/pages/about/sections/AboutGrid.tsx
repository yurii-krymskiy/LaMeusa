import { ButtonOpenReservation } from "../../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../../components/ui/Button";

export const AboutGrid = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="mb-10 flex flex-col items-center gap-5 lg:gap-15 lg:mb-24 lg:flex-row">
                    <img
                        src="/images/about/image-10.jpg"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[550px] xl:max-w-[620px] object-cover"
                    />
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Spanish Guitar Nights
                            </span>
                            <p className="section-description description mb-2.5">
                                Every Monday and Saturday, La Medusa plays the
                                best hits performed by masters of the Spanish
                                guitar. The atmosphere of the evening is filled
                                with the energy of live music and the ease of a
                                Mediterranean vacation.
                            </p>
                            <p className="section-description description">
                                This is the perfect time to enjoy signature
                                cocktails, beautiful views, and spend the
                                evening in exquisite company.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <ButtonOpenReservation variant="blue">
                                Reserve a Table
                            </ButtonOpenReservation>
                            <Button variant="blue-outline">
                                Discover Our Cocktails
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mb-10 flex flex-col items-center gap-5 lg:mb-24 lg:flex-row lg:gap-26">
                    <div className="max-w-full lg:max-w-[590px]">
                        <div className="mb-5 lg:mb-10">
                            <img
                                src="/images/about/image-7.jpg"
                                className="mb-5 max-w-full h-[215px] lg:h-auto lg:max-w-[515px] object-cover"
                            />
                            <span className="section-title title mb-7 inline-block">
                                Live Vocal Hits & Cocktails
                            </span>
                            <p className="section-description description mb-2.5">
                                Every Thursday and Friday, live vocal
                                performances with famous world hits await you.
                                The music creates a unique festive atmosphere,
                                and our bartenders treat you with unique
                                cocktails created especially for evening
                                gatherings.
                            </p>
                            <p className="section-description description">
                                Spend the end of the week with taste and rhythm
                                — at <b>La Medusa.</b>
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <Button variant="blue-outline">
                                Explore Our Drinks
                            </Button>
                        </div>
                    </div>

                    <img
                        src="/images/about/image-9.jpg"
                        className="max-w-full h-[400px] lg:h-[600px] lg:max-w-[690px] object-cover"
                    />
                </div>

                <div className="mb-10 flex flex-col items-center gap-5 lg:gap-15 lg:mb-24 lg:flex-row">
                    <img
                        src="/images/about/image-8.jpg"
                        className="max-w-full h-[270px] lg:h-auto lg:max-w-[620px] object-cover"
                    />
                    <div>
                        <div className="mb-5 lg:mb-10">
                            <span className="section-title title mb-7 inline-block">
                                Two Burgers for One
                            </span>
                            <p className="section-description description mb-2.5">
                                From Monday to Saturday from 14:30 to 18:00 we
                                have a special offer: two burgers for the price
                                of one. This is a great opportunity to meet with
                                friends or colleagues and enjoy the taste of our
                                signature burgers.
                            </p>
                            <p className="section-description description">
                                Juicy meat, fresh ingredients and unique sauces
                                are the perfect combination for an afternoon
                                break.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <Button variant="blue-outline">View Offer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
