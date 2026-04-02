import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoPizza = () => {
    return (
        <>
            <SEO
                title="Pizza in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy authentic pizza in Los Cristianos at La Medusa. Discover fresh, oven-baked pizza in Tenerife with Mediterranean flavour and ocean views."
                path="/pizza-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        A Celebration of Pizza
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, we believe that great pizza is more than a
                        dish — it is an experience. Our kitchen brings together
                        Mediterranean inspiration and traditional techniques to
                        create exceptional pizza in Los Cristianos.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        If you are looking for unforgettable pizza in Tenerife,
                        our restaurant offers the perfect combination of
                        flavour, atmosphere and ocean views.
                    </p>
                </div>
            </section>

            {/* Why Our Pizza */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Craft</p>
                    <h2 className="title section-title">Why Our Pizza?</h2>
                    <p className="description section-description mb-8">
                        Every pizza we prepare is crafted with care, quality
                        ingredients and attention to detail.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Freshly Prepared Dough
                            </h3>
                            <p className="description section-description">
                                Our pizza in Los Cristianos begins with
                                carefully prepared dough, made to achieve the
                                perfect balance of crispness and softness.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Quality Ingredients
                            </h3>
                            <p className="description section-description">
                                For authentic pizza in Tenerife, we select fresh
                                produce and premium toppings that enhance every
                                bite.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Mediterranean Touch
                            </h3>
                            <p className="description section-description">
                                Each pizza reflects the warmth and richness of
                                Mediterranean cuisine, offering a harmonious
                                blend of flavours.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Pizza for Every Taste
                            </h3>
                            <p className="description section-description">
                                Whether you prefer a classic style or something
                                with a creative twist, our menu features pizza
                                in Los Cristianos to suit every preference.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        Guests searching for premium pizza in Tenerife often
                        choose La Medusa for its refined setting and consistent
                        quality. Each pizza is oven-baked to perfection,
                        delivering rich aroma, balanced texture and satisfying
                        flavour.
                    </p>
                </div>
            </section>

            {/* Tradition Meets Modern Flair */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Heritage & Style</p>
                    <h2 className="title section-title">
                        Tradition Meets Modern Flair
                    </h2>
                    <p className="description section-description mb-4">
                        Pizza has long been a symbol of comfort and shared
                        moments. At La Medusa, we honour this tradition while
                        adding our own elegant touch.
                    </p>
                    <p className="description section-description">
                        As a destination for quality pizza in Los Cristianos, we
                        combine time-tested techniques with contemporary
                        presentation. Our approach ensures that every pizza in
                        Tenerife served at our restaurant feels both authentic
                        and distinctive.
                    </p>
                </div>
            </section>

            {/* From Our Oven */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">With Passion</p>
                    <h2 className="title section-title">
                        From Our Oven to Your Table
                    </h2>
                    <p className="description section-description mb-4">
                        Every pizza is prepared with passion — from stretching
                        the dough to the final finishing touches before serving.
                    </p>
                    <p className="description section-description">
                        When you choose La Medusa for pizza in Los Cristianos,
                        you are choosing flavour, atmosphere and attention to
                        detail. If you are exploring options for excellent pizza
                        in Tenerife, our restaurant promises a memorable dining
                        experience by the sea.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Evening Special
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve a table and enjoy refined pizza in Los
                        Cristianos in an elegant coastal setting.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of pizza in Tenerife at La Medusa will
                        be one you will wish to revisit — a perfect blend of
                        taste, comfort and Mediterranean charm.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoPizza;
