import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoBurgers = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Burgers in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy premium burgers in Los Cristianos at La Medusa. Discover flavourful burgers in Tenerife, freshly prepared and served by the ocean."
                path="/burgers-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            Burgers, Reimagined
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, burgers are prepared with care, balance and attention to flavour. We transform a timeless favourite into something refined yet satisfying.
                        </p>
                    </div>
                    <div className="mb-20 flex gap-3 flex-wrap">
                        <Button variant="white-outline" onClick={() => navigate("/menu")}>
                            Explore Menu
                        </Button>
                        <ButtonOpenReservation
                            variant="default"
                            className="!text-white"
                        >
                            <span>Reserve a Table</span>
                            <img src="/icons/arrow-right.svg" className="size-7" />
                        </ButtonOpenReservation>
                    </div>
                </div>
            </main>

            {/* Why Section */}
            <section className="section-breadcrumb">
                <div className="container">
                    <Breadcrumb />
                    <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                        <img
                            src="/icons/star.svg"
                            alt="star"
                            className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                        />
                        <h2 className="title section-title">What Makes Our Burgers Special?</h2>
                        <p className="description hidden lg:inline-block section-description">
                            For guests searching for memorable burgers in Los Cristianos, our restaurant offers a combination of quality ingredients and elegant atmosphere. If you are exploring the finest burgers in Tenerife, La Medusa provides an experience that blends comfort with sophistication.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            For guests searching for memorable burgers in Los Cristianos, our restaurant offers a combination of quality ingredients and elegant atmosphere.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="Burgers, Reimagined"
                        className="mb-5 lg:mb-10 min-h-[225px] object-cover"
                    />

                    <div className="mb-5 lg:mb-10 flex flex-col gap-5 lg:gap-14 md:flex-row">
                        <div className="text-center">
                            <img
                                src="/icons/fruit.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    Carefully Selected Ingredients
                                </h3>
                                <p className="description md:text-lg">
                                    Our burgers in Los Cristianos begin with premium-quality components, chosen for freshness and consistency.
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <img
                                src="/icons/flour.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    Prepared to Order
                                </h3>
                                <p className="description md:text-lg">
                                    Each portion of our burgers is freshly made, ensuring warmth, juiciness and balance in every bite.
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <img
                                src="/icons/marinara-sauce.svg"
                                className="mx-auto mb-2.5 size-[100px]"
                            />
                            <div>
                                <h3 className="title mb-2.5 inline-block text-lg md:text-xl">
                                    Harmony of Taste
                                </h3>
                                <p className="description md:text-lg">
                                    Those looking for standout burgers in Tenerife appreciate our thoughtful combinations that bring together richness, freshness and presentation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                        <ButtonOpenReservation variant="blue">
                            Reserve a Table
                        </ButtonOpenReservation>
                        <Button variant="blue-outline" to={Paths.contact}>
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="flex flex-col items-center py-10 lg:py-15">
                <div className="container !max-w-[765px]">
                    <span className="decorative mx-auto block text-center text-[34px]">
                        Our Approach
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Comfort with a Mediterranean Touch
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Although burgers are known as classic comfort food, at La Medusa we introduce subtle Mediterranean influence. Our chefs combine traditional preparation with modern flair.
                    </p>
                </div>
                <GallerySlider slides={slides} />
            </section>

            {/* Hours */}
            <section className="section">
                <div className="container">
                    <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-24">
                        <img
                            src="/images/pasta/image-5.webp"
                            loading="lazy"
                            alt="Burgers for Every Occasion"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Burgers for Every Occasion
                                </h2>
                                <p className="section-description description">
                                    Among the many places serving burgers in Tenerife, La Medusa stands apart for its refined setting and reliable quality. Each dish reflects the same dedication found across our menu.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <Button to="/happy-hours" variant="blue">View Happy Hours</Button>
                                <ButtonOpenReservation variant="blue-outline">
                                    Book Now
                                </ButtonOpenReservation>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu */}
            <MenuDelicios />

            {/* Meets */}
            <section className="section">
                <div className="container">
                    <div className="mb-5 lg:mb-10 text-center">
                        <span className="decorative mb-2.5">
                            Heritage & Style
                        </span>
                        <h2 className="title section-title">
                            Crafted with Passion
                        </h2>
                    </div>

                    <div className="flex flex-col gap-5 lg:gap-14 md:flex-row">
                        <div className="max-w-[740px]">
                            <img
                                src="/images/pasta/image-6.webp"
                                alt=""
                                className="mb-6 min-h-[200px] object-cover"
                            />
                            <p className="section-description description mb-4">
                                From preparation to presentation, our burgers are created with attention to detail.
                            </p>
                            <p className="section-description description mb-4">
                                Choosing La Medusa for burgers in Los Cristianos means enjoying quality cuisine in an elegant coastal setting.
                            </p>
                            <p className="section-description description">
                                For guests seeking refined burgers in Tenerife, we promise flavour, atmosphere and a memorable experience.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/images/pasta/image-7.webp"
                                className="h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Video */}
            <section className="bg-[url('/images/pasta/image-8.webp')] grid items-center bg-cover bg-no-repeat py-9 md:py-[151px] px-4">
                <div className="mx-auto max-w-[850px] text-center flex-col flex items-center">
                    <h2 className="section-title title mb-7 text-white">
                        An Elevated Classic
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        If you are deciding where to enjoy premium burgers in Tenerife, our oceanfront restaurant offers both relaxed charm and elevated dining.
                    </p>

                    <ScrollCircle />
                </div>
            </section>

            {/* Reserve */}
            <section className="section">
                <div className="container flex flex-col items-center lg:flex-row">
                    <img
                        src="/images/seafood/image-6.webp"
                        alt="image"
                        className="max-w-[610px]"
                    />

                    <div className="lg:-ml-10">
                        <div className="mb-5 lg:mb-10">
                            <span className="decorative mb-2.5">
                                Join Us
                            </span>
                            <h2 className="title section-title">
                                Make Your Visit Memorable
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve your table and discover exceptional burgers in Los Cristianos at La Medusa.
                            </p>
                            <p className="description section-description">
                                Your experience of expertly prepared burgers in Tenerife will be one worth repeating — where taste, hospitality and seaside elegance meet.
                            </p>
                        </div>
                        <ButtonOpenReservation variant="blue">
                            Book a Table
                        </ButtonOpenReservation>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeoBurgers;
