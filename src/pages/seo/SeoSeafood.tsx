import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoSeafood = () => {
    return (
        <>
            <SEO
                title="Fish and Seafood in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy premium fish and seafood in Los Cristianos at La Medusa. Discover refined fish and seafood in Tenerife, served fresh with ocean views."
                path="/fish-seafood-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        Discover the Taste of the Ocean
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, fish and seafood are at the heart of our
                        culinary identity. Freshly delivered each day and
                        prepared using our chefs' original techniques, our
                        dishes reflect the richness of the Mediterranean coast.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        If you are searching for exceptional fish and seafood in
                        Los Cristianos, our oceanfront restaurant offers a
                        refined yet authentic experience.
                    </p>
                    <p className="description section-description">
                        For guests exploring the finest fish and seafood in
                        Tenerife, La Medusa delivers flavour, freshness and
                        elegance in every plate.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Philosophy</p>
                    <h2 className="title section-title">
                        Our Philosophy of Fish and Seafood
                    </h2>
                    <p className="description section-description mb-4">
                        We believe that the secret to a perfect meal lies in
                        outstanding fish and seafood, thoughtfully selected
                        spices and a precise balance of flavours.
                    </p>
                    <p className="description section-description mb-4">
                        Our approach to fish and seafood in Los Cristianos
                        combines simplicity with sophisticated presentation,
                        ensuring every bite captures the feeling of a seaside
                        escape.
                    </p>
                    <p className="description section-description">
                        When choosing fish and seafood in Tenerife, quality and
                        authenticity make all the difference — and this is
                        exactly what we promise at La Medusa.
                    </p>
                </div>
            </section>

            {/* Freshness Inspired by the Sea */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">From the Ocean</p>
                    <h2 className="title section-title">
                        Freshness Inspired by the Sea
                    </h2>
                    <p className="description section-description mb-4">
                        The essence of great fish and seafood begins with
                        freshness. At La Medusa, we carefully source ingredients
                        to ensure natural flavour and delicate texture.
                    </p>
                    <p className="description section-description">
                        Guests looking for memorable fish and seafood in Los
                        Cristianos appreciate our dedication to quality. Among
                        the many restaurants offering fish and seafood in
                        Tenerife, we stand out for our commitment to
                        consistency, elegance and culinary craftsmanship.
                    </p>
                </div>
            </section>

            {/* Why Choose */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Choose Fish and Seafood at La Medusa?
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, every ingredient and every flavour is a
                        respectful embodiment of Mediterranean tradition. Our
                        chefs ensure that each plate of fish and seafood becomes
                        more than just food — it becomes an experience to
                        remember.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Taste and Quality
                            </h3>
                            <p className="description section-description">
                                We use carefully selected local and imported
                                ingredients to prepare outstanding fish and
                                seafood in Los Cristianos, paying close
                                attention to flavour balance and refinement.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Atmosphere with Ocean Views
                            </h3>
                            <p className="description section-description">
                                As a leading destination for fish and seafood in
                                Tenerife, our restaurant offers panoramic sea
                                views where light, space and flavour blend
                                seamlessly.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Service with Soul
                            </h3>
                            <p className="description section-description">
                                Our team welcomes every guest with warmth and
                                attention to detail, enhancing your experience
                                of fish and seafood in Los Cristianos from the
                                first moment to the last.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                More Than Just a Dish
                            </h3>
                            <p className="description section-description">
                                For us, fish and seafood represent history,
                                culture and coastal tradition. Dining on fish
                                and seafood in Tenerife should feel special — a
                                pause in time where flavour, atmosphere and
                                company come together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memory */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        At La Medusa, enjoying fish and seafood in Los
                        Cristianos is not simply lunch or dinner; it is a memory
                        in the making.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Make Your Dinner Special
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve your table and experience exceptional fish and
                        seafood in Los Cristianos in an elegant seaside setting.
                    </p>
                    <p className="description section-description mb-8">
                        Your evening enjoying premium fish and seafood in
                        Tenerife at La Medusa will be a story you will wish to
                        relive — where flavour, hospitality and the ocean
                        create something truly unforgettable.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoSeafood;
