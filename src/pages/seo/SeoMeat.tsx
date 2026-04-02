import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoMeat = () => {
    return (
        <>
            <SEO
                title="Meat in Los Cristianos, Tenerife | La Medusa"
                description="Discover exceptional meat in Los Cristianos at La Medusa. Enjoy premium meat in Tenerife, perfectly prepared in an elegant oceanfront setting."
                path="/meat-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        A Celebration of Meat
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, we believe that perfectly prepared meat is
                        the foundation of an unforgettable dining experience.
                        Our chefs focus on quality, technique and presentation
                        to offer refined meat in Los Cristianos that satisfies
                        even the most discerning guests.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        If you are searching for outstanding meat in Tenerife,
                        La Medusa combines premium ingredients with
                        Mediterranean flair and ocean views.
                    </p>
                </div>
            </section>

            {/* Why Choose Our Meat */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Standards</p>
                    <h2 className="title section-title">
                        Why Choose Our Meat?
                    </h2>
                    <p className="description section-description mb-8">
                        Every cut of meat is selected with care and prepared
                        with precision to ensure depth of flavour and
                        tenderness.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Carefully Selected Cuts
                            </h3>
                            <p className="description section-description">
                                Our meat in Los Cristianos begins with
                                premium-quality selections, chosen for their
                                freshness and texture.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Expert Preparation
                            </h3>
                            <p className="description section-description">
                                To serve exceptional meat in Tenerife, our chefs
                                use balanced cooking techniques that enhance
                                natural flavour and preserve juiciness.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Mediterranean Inspiration
                            </h3>
                            <p className="description section-description">
                                Each plate of meat reflects the richness of
                                Mediterranean cuisine, blending simplicity with
                                sophistication.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Meat for Every Occasion
                            </h3>
                            <p className="description section-description">
                                Whether you are planning a relaxed lunch or an
                                elegant evening meal, our meat in Los Cristianos
                                offers a refined option for every setting.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        Guests looking for high-quality meat in Tenerife
                        appreciate the balance of flavour, presentation and
                        atmosphere that defines La Medusa. Every dish is
                        thoughtfully prepared to create harmony between taste,
                        texture and aroma.
                    </p>
                </div>
            </section>

            {/* Tradition and Craftsmanship */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Mastery & Respect</p>
                    <h2 className="title section-title">
                        Tradition and Craftsmanship
                    </h2>
                    <p className="description section-description mb-4">
                        Cooking meat is an art that requires both experience and
                        respect for the product. At La Medusa, we honour
                        tradition while bringing a contemporary touch to every
                        plate.
                    </p>
                    <p className="description section-description">
                        As a destination for premium meat in Los Cristianos, we
                        combine classic culinary methods with modern elegance.
                        Our commitment ensures that every portion of meat in
                        Tenerife served at our restaurant delivers satisfaction
                        and refinement.
                    </p>
                </div>
            </section>

            {/* From Our Kitchen */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">With Dedication</p>
                    <h2 className="title section-title">
                        From Our Kitchen to Your Table
                    </h2>
                    <p className="description section-description mb-4">
                        Each dish of meat is prepared with attention to detail —
                        from seasoning to presentation.
                    </p>
                    <p className="description section-description">
                        When choosing La Medusa for meat in Los Cristianos, you
                        are choosing quality, atmosphere and culinary expertise.
                        If you are exploring options for distinguished meat in
                        Tenerife, our restaurant offers a memorable experience
                        by the ocean.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Dinner Exceptional
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve your table and enjoy refined meat in Los
                        Cristianos in an elegant seaside setting.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of premium meat in Tenerife at La
                        Medusa will be one to remember — where flavour,
                        hospitality and atmosphere come together beautifully.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoMeat;
