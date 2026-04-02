import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoPasta = () => {
    return (
        <>
            <SEO
                title="Pasta in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy authentic pasta at La Medusa in Los Cristianos. Discover fresh pasta in Tenerife with Mediterranean flavour and elegant oceanfront dining."
                path="/pasta-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">The Art of Pasta</h1>
                    <p className="description hero-description">
                        At La Medusa, pasta is more than a traditional dish — it
                        is a culinary craft that celebrates flavour, simplicity
                        and Mediterranean heritage. Our chefs prepare every
                        plate of pasta with care, creating a balance of texture,
                        aroma and presentation.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        Guests searching for exceptional pasta in Los Cristianos
                        will find a refined dining experience where quality
                        ingredients meet elegant atmosphere.
                    </p>
                    <p className="description section-description">
                        For those exploring memorable pasta in Tenerife, La
                        Medusa offers the perfect blend of comfort and
                        sophistication.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Pasta
                    </h2>
                    <p className="description section-description mb-4">
                        Great pasta begins with quality ingredients and
                        thoughtful preparation. At La Medusa, we focus on
                        freshness, authenticity and harmony of flavour.
                    </p>
                    <p className="description section-description">
                        Each portion of pasta reflects Mediterranean culinary
                        traditions while embracing modern creativity. This
                        approach makes our restaurant a destination for guests
                        looking for outstanding pasta in Tenerife and flavourful
                        pasta in Los Cristianos.
                    </p>
                </div>
            </section>

            {/* Fresh Pasta, Timeless Flavour */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Tradition & Taste</p>
                    <h2 className="title section-title">
                        Fresh Pasta, Timeless Flavour
                    </h2>
                    <p className="description section-description mb-4">
                        The beauty of pasta lies in its simplicity. Carefully
                        prepared ingredients allow natural flavours to shine,
                        creating dishes that feel both comforting and refined.
                    </p>
                    <p className="description section-description">
                        Visitors searching for memorable pasta in Los Cristianos
                        appreciate the balance we achieve between tradition and
                        elegance. Among the many places serving pasta in
                        Tenerife, La Medusa stands out for its attention to
                        detail and quality.
                    </p>
                </div>
            </section>

            {/* Why Pasta at La Medusa */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Pasta at La Medusa?
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, every plate of pasta reflects our
                        dedication to culinary excellence and Mediterranean
                        hospitality.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Fresh Ingredients
                            </h3>
                            <p className="description section-description">
                                Our pasta is prepared with carefully selected
                                ingredients to ensure rich flavour and
                                satisfying texture.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Inspired by Mediterranean Cuisine
                            </h3>
                            <p className="description section-description">
                                Guests enjoying pasta in Tenerife will notice
                                the subtle Mediterranean influence that defines
                                our dishes.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Elegant Oceanfront Setting
                            </h3>
                            <p className="description section-description">
                                Dining on pasta in Los Cristianos becomes even
                                more special when accompanied by beautiful ocean
                                views and a welcoming atmosphere.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                A Dish That Brings People Together
                            </h3>
                            <p className="description section-description">
                                Across the Mediterranean, pasta represents
                                comfort, tradition and shared moments around the
                                table. At La Medusa, we celebrate this tradition
                                by offering refined dishes that create lasting
                                memories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        For guests discovering pasta in Tenerife, our restaurant
                        provides an experience where flavour, atmosphere and
                        hospitality come together beautifully.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Dinner Memorable
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve a table and enjoy exceptional pasta in Los
                        Cristianos at La Medusa.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of authentic pasta in Tenerife will be
                        one you will want to revisit — where Mediterranean
                        taste, elegant surroundings and warm service create a
                        perfect evening.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoPasta;
