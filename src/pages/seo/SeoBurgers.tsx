import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoBurgers = () => {
    return (
        <>
            <SEO
                title="Burgers in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy premium burgers in Los Cristianos at La Medusa. Discover flavourful burgers in Tenerife, freshly prepared and served by the ocean."
                path="/burgers-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">Burgers, Reimagined</h1>
                    <p className="description hero-description">
                        At La Medusa, burgers are prepared with care, balance
                        and attention to flavour. We transform a timeless
                        favourite into something refined yet satisfying.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        For guests searching for memorable burgers in Los
                        Cristianos, our restaurant offers a combination of
                        quality ingredients and elegant atmosphere.
                    </p>
                    <p className="description section-description">
                        If you are exploring the finest burgers in Tenerife, La
                        Medusa provides an experience that blends comfort with
                        sophistication.
                    </p>
                </div>
            </section>

            {/* What Makes Our Burgers Special */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Approach</p>
                    <h2 className="title section-title">
                        What Makes Our Burgers Special?
                    </h2>
                    <p className="description section-description mb-8">
                        Every one of our burgers is designed to deliver depth of
                        flavour and perfect texture.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Carefully Selected Ingredients
                            </h3>
                            <p className="description section-description">
                                Our burgers in Los Cristianos begin with
                                premium-quality components, chosen for freshness
                                and consistency.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Prepared to Order
                            </h3>
                            <p className="description section-description">
                                Each portion of our burgers is freshly made,
                                ensuring warmth, juiciness and balance in every
                                bite.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Harmony of Taste
                            </h3>
                            <p className="description section-description">
                                Those looking for standout burgers in Tenerife
                                appreciate our thoughtful combinations that
                                bring together richness, freshness and
                                presentation.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Burgers for Every Occasion
                            </h3>
                            <p className="description section-description">
                                Whether you are enjoying a relaxed lunch by the
                                sea or an evening meal with friends, our burgers
                                in Los Cristianos suit every mood.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        Among the many places serving burgers in Tenerife, La
                        Medusa stands apart for its refined setting and reliable
                        quality. Each dish reflects the same dedication found
                        across our menu.
                    </p>
                </div>
            </section>

            {/* Comfort with a Mediterranean Touch */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Heritage & Style</p>
                    <h2 className="title section-title">
                        Comfort with a Mediterranean Touch
                    </h2>
                    <p className="description section-description mb-4">
                        Although burgers are known as classic comfort food, at
                        La Medusa we introduce subtle Mediterranean influence.
                        Our chefs combine traditional preparation with modern
                        flair to create distinctive burgers in Los Cristianos.
                    </p>
                    <p className="description section-description">
                        If you are deciding where to enjoy premium burgers in
                        Tenerife, our oceanfront restaurant offers both relaxed
                        charm and elevated dining.
                    </p>
                </div>
            </section>

            {/* Crafted with Passion */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">With Passion</p>
                    <h2 className="title section-title">
                        Crafted with Passion
                    </h2>
                    <p className="description section-description">
                        From preparation to presentation, our burgers are
                        created with attention to detail. Choosing La Medusa for
                        burgers in Los Cristianos means enjoying quality cuisine
                        in an elegant coastal setting. For guests seeking
                        refined burgers in Tenerife, we promise flavour,
                        atmosphere and a memorable experience.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Visit Memorable
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve your table and discover exceptional burgers in
                        Los Cristianos at La Medusa.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of expertly prepared burgers in Tenerife
                        will be one worth repeating — where taste, hospitality
                        and seaside elegance meet.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoBurgers;
