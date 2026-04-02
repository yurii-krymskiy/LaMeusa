import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoDessert = () => {
    return (
        <>
            <SEO
                title="Dessert in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy elegant dessert at La Medusa in Los Cristianos. Discover refined dessert in Tenerife, crafted with care and served in a beautiful seaside setting."
                path="/dessert-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">The Art of Dessert</h1>
                    <p className="description hero-description">
                        At La Medusa, dessert is more than the final course — it
                        is the perfect ending to a memorable dining experience.
                        Our kitchen creates each dessert with attention to
                        flavour, texture and presentation, turning sweet moments
                        into lasting memories.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        Guests looking for an exceptional dessert in Los
                        Cristianos will find elegance and creativity in every
                        plate.
                    </p>
                    <p className="description section-description">
                        If you are exploring refined dessert in Tenerife, La
                        Medusa offers a sweet experience that complements the
                        beauty of the oceanfront setting.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Dessert
                    </h2>
                    <p className="description section-description mb-4">
                        Great dessert begins with balance. At La Medusa, we
                        combine quality ingredients with thoughtful preparation
                        to create flavours that feel both rich and delicate.
                    </p>
                    <p className="description section-description mb-4">
                        Each dessert reflects the spirit of Mediterranean
                        cuisine — simple yet refined. Visitors searching for
                        memorable dessert in Los Cristianos often discover that
                        our creations bring together tradition and modern
                        presentation.
                    </p>
                    <p className="description section-description">
                        For those enjoying dessert in Tenerife, La Medusa offers
                        sweetness that feels sophisticated rather than
                        overwhelming.
                    </p>
                </div>
            </section>

            {/* A Sweet Moment */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Sweet Moments</p>
                    <h2 className="title section-title">
                        A Sweet Moment to Remember
                    </h2>
                    <p className="description section-description mb-4">
                        A well-prepared dessert has the power to transform a
                        meal into a celebration. Whether enjoyed after dinner or
                        as a special treat, our dessert in Los Cristianos offers
                        the perfect finishing touch.
                    </p>
                    <p className="description section-description">
                        Among the many places serving dessert in Tenerife, La
                        Medusa stands out for its elegant atmosphere and
                        dedication to quality. Every dessert is carefully
                        presented to delight both the eyes and the palate.
                    </p>
                </div>
            </section>

            {/* Why Dessert at La Medusa */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Dessert at La Medusa?
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, each dessert reflects our commitment to
                        flavour, craftsmanship and hospitality.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Carefully Selected Ingredients
                            </h3>
                            <p className="description section-description">
                                Every dessert is prepared with fresh ingredients
                                chosen for their natural sweetness and balance.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Mediterranean Inspiration
                            </h3>
                            <p className="description section-description">
                                Guests enjoying dessert in Tenerife will notice
                                subtle Mediterranean influences that make our
                                creations unique.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Atmosphere by the Ocean
                            </h3>
                            <p className="description section-description">
                                Experiencing dessert in Los Cristianos becomes
                                even more special when enjoyed in our seaside
                                setting with panoramic views.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                The Perfect Ending
                            </h3>
                            <p className="description section-description">
                                Across the Mediterranean, dessert represents
                                celebration and shared joy. At La Medusa, we
                                embrace this tradition by offering sweet
                                creations designed to complete your dining
                                experience beautifully.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        For guests discovering dessert in Tenerife, our
                        restaurant provides a moment of indulgence where
                        flavour, atmosphere and hospitality come together.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Finish Your Evening in Style
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve your table and enjoy an unforgettable dessert in
                        Los Cristianos at La Medusa.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of elegant dessert in Tenerife will be a
                        moment you will want to relive — where sweetness,
                        atmosphere and Mediterranean charm create the perfect
                        ending to your meal.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoDessert;
