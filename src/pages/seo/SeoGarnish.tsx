import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoGarnish = () => {
    return (
        <>
            <SEO
                title="Garnish in Los Cristianos, Tenerife | La Medusa"
                description="Discover refined garnish at La Medusa in Los Cristianos. Elegant garnish in Tenerife that enhances flavour, presentation and the dining experience."
                path="/garnish-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">The Art of Garnish</h1>
                    <p className="description hero-description">
                        At La Medusa, garnish is more than decoration — it is an
                        essential element that completes every dish. Carefully
                        chosen ingredients and thoughtful presentation allow
                        each garnish to enhance both flavour and visual appeal.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        Guests dining in Los Cristianos often notice how every
                        garnish adds character and elegance to the plate.
                    </p>
                    <p className="description section-description">
                        For visitors exploring refined dining experiences in
                        Tenerife, La Medusa offers beautifully presented dishes
                        where garnish plays a meaningful role.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Garnish
                    </h2>
                    <p className="description section-description mb-4">
                        A well-prepared garnish should complement the dish
                        rather than overpower it. At La Medusa, our chefs
                        carefully design each garnish to highlight the natural
                        flavours and textures of the main ingredients.
                    </p>
                    <p className="description section-description">
                        This attention to detail ensures that every garnish
                        contributes to a balanced and harmonious culinary
                        experience.
                    </p>
                </div>
            </section>

            {/* Garnish as a Culinary Detail */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Subtle Elegance</p>
                    <h2 className="title section-title">
                        Garnish as a Culinary Detail
                    </h2>
                    <p className="description section-description mb-4">
                        While often subtle, garnish can transform a dish into
                        something memorable. At La Medusa, every garnish is
                        selected with purpose — to add freshness, colour and a
                        final touch of sophistication.
                    </p>
                    <p className="description section-description">
                        Guests enjoying meals in Los Cristianos appreciate the
                        way our garnish elevates both the appearance and the
                        flavour of each plate. In Tenerife's vibrant dining
                        scene, these small details help create a truly refined
                        experience.
                    </p>
                </div>
            </section>

            {/* Why Garnish Matters */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Every Detail Counts</p>
                    <h2 className="title section-title">
                        Why Garnish Matters at La Medusa
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, the smallest elements receive the same
                        level of attention as the main ingredients. Our approach
                        to garnish reflects our dedication to quality and
                        presentation.
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Thoughtful Presentation
                            </h3>
                            <p className="description section-description">
                                Each garnish is carefully placed to create a
                                visually appealing and balanced dish.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Fresh Ingredients
                            </h3>
                            <p className="description section-description">
                                We use fresh components to ensure that every
                                garnish contributes natural flavour and colour.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Culinary Harmony
                            </h3>
                            <p className="description section-description">
                                Our chefs design every garnish to complement the
                                dish and enhance the overall dining experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Creativity & Care</p>
                    <h2 className="title section-title">
                        A Detail That Completes the Dish
                    </h2>
                    <p className="description section-description mb-4">
                        At La Medusa, garnish is part of the story behind every
                        plate. It represents creativity, care and the pursuit of
                        culinary balance.
                    </p>
                    <p className="description section-description">
                        Guests dining in Tenerife discover that even the
                        smallest garnish can make a meaningful difference in
                        flavour, presentation and enjoyment.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Experience the Details at La Medusa
                    </h2>
                    <p className="description section-description mb-8">
                        Reserve a table and enjoy dishes where every garnish is
                        prepared with care and precision. At La Medusa in Los
                        Cristianos, every detail — including the garnish —
                        contributes to a dining experience defined by elegance,
                        flavour and Mediterranean inspiration.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoGarnish;
