import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoSauces = () => {
    return (
        <>
            <SEO
                title="Sauces and Adds in Los Cristianos, Tenerife | La Medusa"
                description="Discover sauces and adds at La Medusa in Los Cristianos. Enhance your meal in Tenerife with carefully crafted sauces and flavourful additions."
                path="/sauces-adds-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        The Perfect Touch: Sauces and Adds
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, sauces and adds play an important role in
                        completing the flavour of every dish. These small yet
                        essential details allow guests to personalise their
                        meals and enjoy a richer culinary experience.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        Whether you are enhancing a main course or adding a
                        finishing touch, our sauces and adds bring balance,
                        aroma and character to every plate. Guests exploring
                        flavourful dining options in Los Cristianos often
                        appreciate the thoughtful selection of sauces and adds
                        available at La Medusa.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Sauces and Adds
                    </h2>
                    <p className="description section-description mb-4">
                        Great cuisine is often defined by its details. At La
                        Medusa, our sauces and adds are carefully prepared to
                        complement the natural flavours of each dish.
                    </p>
                    <p className="description section-description">
                        Every element is designed to enhance rather than
                        overpower. Our chefs believe that well-balanced sauces
                        and adds can transform a meal, adding depth and harmony
                        while maintaining the integrity of the ingredients.
                    </p>
                </div>
            </section>

            {/* Enhance Your Dining */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Personalise</p>
                    <h2 className="title section-title">
                        Enhance Your Dining Experience
                    </h2>
                    <p className="description section-description mb-4">
                        The right sauces and adds allow every guest to tailor
                        their meal to their personal taste. From subtle flavour
                        accents to richer combinations, these additions create
                        new layers of enjoyment.
                    </p>
                    <p className="description section-description">
                        Visitors dining in Los Cristianos often appreciate the
                        freedom to customise their plates with our selection of
                        sauces and adds, making each visit feel unique and
                        personal.
                    </p>
                </div>
            </section>

            {/* Why Choose */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Choose Sauces and Adds at La Medusa?
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, even the smallest components of a dish
                        receive special attention.
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Crafted with Care
                            </h3>
                            <p className="description section-description">
                                Our sauces and adds are prepared with quality
                                ingredients to ensure balanced and authentic
                                flavour.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Complementing Every Dish
                            </h3>
                            <p className="description section-description">
                                Each of our sauces and adds is designed to pair
                                perfectly with a variety of dishes across the
                                menu.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Attention to Detail
                            </h3>
                            <p className="description section-description">
                                We believe that thoughtful sauces and adds can
                                elevate a meal from enjoyable to unforgettable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Every Detail Matters</p>
                    <h2 className="title section-title">
                        A Small Detail with a Big Impact
                    </h2>
                    <p className="description section-description mb-4">
                        Though often overlooked, sauces and adds are essential
                        to a complete dining experience. At La Medusa, we ensure
                        these elements reflect the same level of care and
                        creativity as the main dishes.
                    </p>
                    <p className="description section-description">
                        Guests dining in Tenerife discover that our sauces and
                        adds add personality and depth to every plate.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Complete Your Meal at La Medusa
                    </h2>
                    <p className="description section-description mb-8">
                        Reserve your table and explore the flavours that
                        thoughtful sauces and adds can bring to your meal. At La
                        Medusa, every detail matters — from the main dish to the
                        carefully prepared sauces and adds that make each bite
                        memorable.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoSauces;
