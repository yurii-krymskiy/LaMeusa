import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";

const SeoChildrenMenu = () => {
    return (
        <>
            <SEO
                title="Children Menu in Los Cristianos, Tenerife | La Medusa"
                description="Discover our children menu at La Medusa in Los Cristianos. A thoughtful children menu in Tenerife designed for young guests and relaxed family dining."
                path="/children-menu-los-cristianos"
            />

            {/* Hero */}
            <section className="hero about-hero">
                <div className="max-w-6xl">
                    <h1 className="title hero-title">
                        A Special Children Menu for Young Guests
                    </h1>
                    <p className="description hero-description">
                        At La Medusa, we believe that every guest should feel
                        welcome — including the youngest ones. Our carefully
                        designed children menu offers simple, delicious options
                        that children enjoy while parents relax and savour the
                        atmosphere.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description mb-4">
                        Families looking for a welcoming children menu in Los
                        Cristianos will find the perfect balance between quality
                        ingredients, familiar flavours and comfortable dining.
                    </p>
                    <p className="description section-description">
                        For those exploring restaurants with a thoughtful
                        children menu in Tenerife, La Medusa provides a warm and
                        family-friendly experience by the ocean.
                    </p>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">For Families</p>
                    <h2 className="title section-title">
                        Our Philosophy of the Children Menu
                    </h2>
                    <p className="description section-description mb-4">
                        A great children menu should be both enjoyable and
                        carefully prepared. At La Medusa, we focus on freshness,
                        quality and flavours that appeal to young guests while
                        maintaining the same high standards as the rest of our
                        menu.
                    </p>
                    <p className="description section-description">
                        Our children menu in Los Cristianos is designed to offer
                        balanced dishes that are satisfying and easy to enjoy.
                        Families discovering restaurants with a children menu in
                        Tenerife appreciate the attention we give to comfort,
                        taste and presentation.
                    </p>
                </div>
            </section>

            {/* Comfortable Dining */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="decorative">Relax & Enjoy</p>
                    <h2 className="title section-title">
                        A Comfortable Dining Experience for Families
                    </h2>
                    <p className="description section-description mb-4">
                        Dining out with children should be relaxed and
                        enjoyable. Our children menu helps create a welcoming
                        atmosphere where families can spend quality time
                        together.
                    </p>
                    <p className="description section-description">
                        Guests searching for a family-friendly children menu in
                        Los Cristianos often choose La Medusa because we combine
                        great food with a calm seaside setting. Among
                        restaurants offering a children menu in Tenerife, we aim
                        to make every visit comfortable for both parents and
                        children.
                    </p>
                </div>
            </section>

            {/* Why Families Choose */}
            <section className="section bg-white-100">
                <div className="container max-w-4xl">
                    <p className="decorative">Our Promise</p>
                    <h2 className="title section-title">
                        Why Families Choose Our Children Menu
                    </h2>
                    <p className="description section-description mb-8">
                        At La Medusa, our children menu reflects the same
                        dedication to quality and hospitality that defines our
                        entire restaurant.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Simple and Tasty Dishes
                            </h3>
                            <p className="description section-description">
                                Our children menu focuses on flavours that young
                                guests enjoy while maintaining freshness and
                                quality.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Relaxed Oceanfront Atmosphere
                            </h3>
                            <p className="description section-description">
                                Families enjoying the children menu in Los
                                Cristianos can relax in a beautiful seaside
                                setting with plenty of space and light.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                Friendly Service
                            </h3>
                            <p className="description section-description">
                                Our team makes sure that guests exploring
                                restaurants with a children menu in Tenerife
                                feel welcomed and well cared for.
                            </p>
                        </div>
                        <div>
                            <h3 className="title mb-2 text-xl">
                                A Place Where Families Feel Welcome
                            </h3>
                            <p className="description section-description">
                                A thoughtful children menu is an important part
                                of a comfortable family dining experience. At La
                                Medusa, we want every visit to feel relaxed,
                                enjoyable and memorable for guests of all ages.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="section">
                <div className="container max-w-4xl">
                    <p className="description section-description">
                        For families discovering restaurants with a children
                        menu in Tenerife, La Medusa offers a warm environment
                        where children and adults alike can enjoy a pleasant
                        meal by the sea.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white-100">
                <div className="container flex max-w-4xl flex-col items-center text-center">
                    <p className="decorative">Join Us</p>
                    <h2 className="title section-title">
                        Enjoy Family Dining at La Medusa
                    </h2>
                    <p className="description section-description mb-4">
                        Reserve a table and experience a welcoming children menu
                        in Los Cristianos at La Medusa.
                    </p>
                    <p className="description section-description mb-8">
                        Your visit to enjoy our children menu in Tenerife will
                        be a relaxed and enjoyable moment — where good food,
                        beautiful views and family time come together perfectly.
                    </p>
                    <ButtonOpenReservation variant="blue">
                        Book a Table
                    </ButtonOpenReservation>
                </div>
            </section>
        </>
    );
};

export default SeoChildrenMenu;
