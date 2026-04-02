import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoTapas = () => {
    return (
        <>
            <SEO
                title="Tapas and Appetizers in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy tapas and appetizers in Los Cristianos at La Medusa. Discover refined tapas and appetizers in Tenerife with Mediterranean flavours and ocean views."
                path="/tapas-appetizers-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        Discover the Flavour of Tapas and Appetizers
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, tapas and appetizers are the perfect way
                        to begin your culinary journey. Inspired by
                        Mediterranean traditions, our small plates bring
                        together fresh ingredients, vibrant flavours and elegant
                        presentation.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        If you are looking for memorable tapas and appetizers in
                        Los Cristianos, our oceanfront restaurant offers a
                        relaxed yet refined experience.
                    </p>
                    <p className="description section-description">
                        For guests exploring exceptional tapas and appetizers in
                        Tenerife, La Medusa creates dishes that celebrate the
                        spirit of sharing and discovery.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Tapas and Appetizers
                    </h2>
                    <p className="description section-description mb-4">
                        We believe that the best tapas and appetizers are
                        simple, fresh and full of character. At La Medusa, each
                        plate is carefully prepared to highlight natural
                        ingredients and balanced flavours.
                    </p>
                    <p className="description section-description">
                        Our approach to tapas and appetizers in Los Cristianos
                        blends Mediterranean inspiration with contemporary
                        creativity. For those searching for refined tapas and
                        appetizers in Tenerife, our menu offers a perfect
                        introduction to the flavours of the coast.
                    </p>
                </div>
            </section>

            {/* Small Plates, Big Experience */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Sharing & Discovery</p>
                    <h2 className="title section-title">
                        Small Plates, Big Experience
                    </h2>
                    <p className="description section-description mb-4">
                        Great tapas and appetizers are designed to be shared and
                        enjoyed slowly. Whether you are starting a meal or
                        enjoying a light evening by the sea, our selection of
                        tapas and appetizers in Los Cristianos offers variety and
                        elegance.
                    </p>
                    <p className="description section-description">
                        Among the many places serving tapas and appetizers in
                        Tenerife, La Medusa stands out for its atmosphere,
                        presentation and attention to detail.
                    </p>
                </div>
            </section>

            {/* Why Tapas at La Medusa */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Tapas and Appetizers at La Medusa?
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, every ingredient and every flavour
                        reflects Mediterranean hospitality and culinary
                        tradition. Our chefs ensure that each plate of tapas and
                        appetizers delivers both simplicity and sophistication.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Fresh Ingredients
                            </h3>
                            <p className="description section-description">
                                Our tapas and appetizers in Los Cristianos are
                                prepared using high-quality seasonal products to
                                ensure freshness and flavour.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Oceanfront Atmosphere
                            </h3>
                            <p className="description section-description">
                                As a destination for tapas and appetizers in
                                Tenerife, our restaurant offers beautiful sea
                                views that make every bite more memorable.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Warm Hospitality
                            </h3>
                            <p className="description section-description">
                                Our team takes care of every detail, ensuring
                                your experience with tapas and appetizers in Los
                                Cristianos is welcoming, relaxed and enjoyable.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                A Taste of Mediterranean Culture
                            </h3>
                            <p className="description section-description">
                                Sharing tapas and appetizers is part of
                                Mediterranean lifestyle and tradition. At La
                                Medusa, we bring that culture to life in every
                                plate.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Culture */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        For guests exploring tapas and appetizers in Tenerife,
                        our restaurant offers a place where flavour, atmosphere
                        and hospitality meet.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Begin Your Evening at La Medusa
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve your table and enjoy refined tapas and
                        appetizers in Los Cristianos in an elegant seaside
                        setting.
                    </p>
                    <p className="description section-description mb-8">
                        Your experience of tapas and appetizers in Tenerife at
                        La Medusa will be a moment of flavour, conversation and
                        Mediterranean charm you will want to return to again.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoTapas;
