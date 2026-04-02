import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoSalads = () => {
    return (
        <>
            <SEO
                title="Best Salads in Los Cristianos, Tenerife | La Medusa"
                description="Discover salads in Los Cristianos at La Medusa – serving some of the best salads in Tenerife, fresh, vibrant and full of Mediterranean flavour."
                path="/best-salads-tenerife"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        A Symphony of Salads
                    </h1>
                    <p className="description hero-description">
                        Fresh, vibrant and full of Mediterranean character, our
                        salads are a celebration of flavour and simplicity. At La
                        Medusa, we proudly serve some of the best salads in
                        Tenerife, combining quality ingredients with refined
                        presentation.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        If you are searching for exceptional salads in Los
                        Cristianos, our kitchen creates dishes that balance
                        freshness, texture and colour. Each plate reflects the
                        spirit of the island and the elegance of our restaurant.
                    </p>
                </div>
            </section>

            {/* Why Our Salads */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">Why Our Salads?</h2>
                    <p className="description section-description mb-8">
                        At La Medusa, salads are not just a side dish — they are
                        a complete culinary experience. We believe the best
                        salads are built on freshness, balance and attention to
                        detail.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Fresh Every Day
                            </h3>
                            <p className="description section-description">
                                Our salads in Los Cristianos are prepared daily
                                using carefully selected seasonal ingredients.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Local Inspiration
                            </h3>
                            <p className="description section-description">
                                We prioritise local produce to ensure that our
                                guests enjoy some of the best salads in
                                Tenerife, inspired by Mediterranean tradition.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Creative Combinations
                            </h3>
                            <p className="description section-description">
                                Each of our salads is thoughtfully composed to
                                deliver harmony in flavour, colour and texture.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                For Every Taste
                            </h3>
                            <p className="description section-description">
                                Whether you prefer something light and
                                refreshing or rich and satisfying, our selection
                                of salads offers something for every mood.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality & Presentation */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        Among the many salads in Los Cristianos, La Medusa
                        stands out for quality and presentation. Our chefs focus
                        on balance — crisp textures, vibrant ingredients and
                        carefully chosen dressings that elevate every bite.
                    </p>
                    <p className="description section-description">
                        Guests often tell us that we serve the best salads in
                        Tenerife, thanks to our dedication to freshness and
                        flavour.
                    </p>
                </div>
            </section>

            {/* Freshness Meets Creativity */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Tradition & Innovation</p>
                    <h2 className="title section-title">
                        Freshness Meets Creativity
                    </h2>
                    <p className="description section-description mb-4">
                        Salads have long been a symbol of simplicity and natural
                        taste. At La Medusa, we reinterpret this tradition with
                        a modern touch, creating best salads that feel both
                        comforting and refined.
                    </p>
                    <p className="description section-description">
                        As a destination for premium salads in Los Cristianos,
                        we combine classic Mediterranean influences with
                        contemporary creativity. The result is a menu that
                        showcases some of the best salads in Tenerife, ideal for
                        lunch by the ocean or a light evening meal.
                    </p>
                </div>
            </section>

            {/* From Our Kitchen */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">With Passion</p>
                    <h2 className="title section-title">
                        From Our Kitchen With Love
                    </h2>
                    <p className="description section-description mb-4">
                        Every plate of our salads is prepared with care — from
                        selecting the freshest produce to the final
                        presentation. We believe that guests can feel the
                        passion behind what we create.
                    </p>
                    <p className="description section-description">
                        When looking for the best salads in Tenerife, La Medusa
                        offers not only flavour but atmosphere. Our salads in
                        Los Cristianos are designed to complement the ocean
                        views and elegant setting of the restaurant.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Meal Special
                    </h2>
                    <p className="description section-description mb-4">
                        Book a table and enjoy an unforgettable dining
                        experience featuring some of the best salads in
                        Tenerife.
                    </p>
                    <p className="description section-description mb-8">
                        Your visit to enjoy our salads in Los Cristianos will be
                        a moment of freshness, elegance and Mediterranean charm
                        — one you will want to return to again and again.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoSalads;
