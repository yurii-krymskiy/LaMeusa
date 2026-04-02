import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoPaella = () => {
    return (
        <>
            <SEO
                title="Paella in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy authentic paella in Los Cristianos at La Medusa. Discover rich, flavourful paella in Tenerife served in an elegant oceanfront setting."
                path="/paella-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        A True Taste of Paella
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, paella is more than a dish — it is a
                        celebration of Mediterranean tradition. Prepared with
                        care and respect for authentic techniques, our paella in
                        Los Cristianos captures the warmth and richness of
                        coastal cuisine.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        If you are looking for unforgettable paella in Tenerife,
                        our restaurant offers the perfect setting to enjoy this
                        iconic speciality by the ocean.
                    </p>
                </div>
            </section>

            {/* Why Our Paella Stands Out */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Craft</p>
                    <h2 className="title section-title">
                        Why Our Paella Stands Out
                    </h2>
                    <p className="description section-description mb-8">
                        Creating exceptional paella requires patience, balance
                        and quality ingredients. At La Medusa, we focus on
                        flavour, texture and presentation to ensure every dish
                        leaves a lasting impression.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Carefully Selected Ingredients
                            </h3>
                            <p className="description section-description">
                                Our paella in Los Cristianos is prepared using
                                fresh, high-quality ingredients that reflect
                                Mediterranean character.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Traditional Technique
                            </h3>
                            <p className="description section-description">
                                To serve outstanding paella in Tenerife, we
                                follow time-honoured methods that allow flavours
                                to develop naturally.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Rich, Balanced Flavour
                            </h3>
                            <p className="description section-description">
                                Each portion of our paella delivers harmony —
                                tender textures, aromatic rice and a depth of
                                flavour that feels both comforting and refined.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Paella for Memorable Moments
                            </h3>
                            <p className="description section-description">
                                Sharing paella in Los Cristianos is an
                                experience meant to be enjoyed slowly, in good
                                company and with beautiful ocean views.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        Among the many options for paella in Tenerife, La Medusa
                        offers a refined atmosphere that enhances every bite.
                        Whether for lunch in the sunshine or dinner at sunset,
                        our paella turns a meal into an occasion.
                    </p>
                </div>
            </section>

            {/* Tradition with a Modern Touch */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Heritage & Elegance</p>
                    <h2 className="title section-title">
                        Tradition with a Modern Touch
                    </h2>
                    <p className="description section-description mb-4">
                        Paella has long been a symbol of Spanish and
                        Mediterranean culinary heritage. At La Medusa, we
                        honour that tradition while adding our own elegant
                        presentation and contemporary flair.
                    </p>
                    <p className="description section-description">
                        Guests searching for authentic yet elevated paella in
                        Los Cristianos will find a perfect balance of comfort
                        and sophistication. For those exploring the best paella
                        in Tenerife, our oceanfront restaurant offers both
                        flavour and atmosphere.
                    </p>
                </div>
            </section>

            {/* An Oceanfront Experience */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">By the Sea</p>
                    <h2 className="title section-title">
                        An Oceanfront Experience
                    </h2>
                    <p className="description section-description mb-4">
                        Enjoying paella in Los Cristianos at La Medusa means
                        dining where sea views and Mediterranean cuisine come
                        together seamlessly.
                    </p>
                    <p className="description section-description">
                        When choosing paella in Tenerife, we invite you to
                        experience La Medusa — where flavour, hospitality and
                        seaside elegance create moments you will want to relive
                        again and again.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Share a Special Moment
                    </h2>
                    <p className="description section-description mb-8">
                        Reserve your table and enjoy authentic paella in Los
                        Cristianos in an elegant seaside setting at La Medusa.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoPaella;
