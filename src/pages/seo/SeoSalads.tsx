import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoSalads = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Best Salads in Los Cristianos, Tenerife | La Medusa"
                description="Discover salads in Los Cristianos at La Medusa – serving some of the best salads in Tenerife, fresh, vibrant and full of Mediterranean flavour."
                path="/best-salads-tenerife"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            A Symphony of Salads
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            Fresh, vibrant and full of Mediterranean character, our salads are a celebration of flavour and simplicity. At La Medusa, we proudly serve some of the best salads in Tenerife, combining quality ingredients with refined presentation.
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
                        <h2 className="title section-title">Why Our Salads?</h2>
                        <p className="description hidden lg:inline-block section-description">
                            If you are searching for exceptional salads in Los Cristianos, our kitchen creates dishes that balance freshness, texture and colour. Each plate reflects the spirit of the island and the elegance of our restaurant.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            If you are searching for exceptional salads in Los Cristianos, our kitchen creates dishes that balance freshness, texture and colour.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="A Symphony of Salads"
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
                                    Fresh Every Day
                                </h3>
                                <p className="description md:text-lg">
                                    Our salads in Los Cristianos are prepared daily using carefully selected seasonal ingredients.
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
                                    Local Inspiration
                                </h3>
                                <p className="description md:text-lg">
                                    We prioritise local produce to ensure that our guests enjoy some of the best salads in Tenerife, inspired by Mediterranean tradition.
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
                                    Creative Combinations
                                </h3>
                                <p className="description md:text-lg">
                                    Each of our salads is thoughtfully composed to deliver harmony in flavour, colour and texture.
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
                        Our Selection
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Freshness Meets Creativity
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Salads have long been a symbol of simplicity and natural taste. At La Medusa, we reinterpret this tradition with a modern touch, creating salads that feel both comforting and refined.
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
                            alt="Paired with the Perfect Moment"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Paired with the Perfect Moment
                                </h2>
                                <p className="section-description description">
                                    Among the many salads in Los Cristianos, La Medusa stands out for quality and presentation. Our chefs focus on balance — crisp textures, vibrant ingredients and carefully chosen dressings that elevate every bite.
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
                            Tradition & Innovation
                        </span>
                        <h2 className="title section-title">
                            From Our Kitchen With Love
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
                                Every plate of our salads is prepared with care — from selecting the freshest produce to the final presentation. We believe that guests can feel the passion behind what we create.
                            </p>
                            <p className="section-description description mb-4">
                                When looking for the best salads in Tenerife, La Medusa offers not only flavour but atmosphere.
                            </p>
                            <p className="section-description description">
                                Our salads in Los Cristianos are designed to complement the ocean views and elegant setting of the restaurant.
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
                        A Taste of the Mediterranean
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        Guests often tell us that we serve the best salads in Tenerife, thanks to our dedication to freshness and flavour. For every taste, for every occasion.
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
                                Make Your Meal Special
                            </h2>
                            <p className="description section-description mb-2">
                                Book a table and enjoy an unforgettable dining experience featuring some of the best salads in Tenerife.
                            </p>
                            <p className="description section-description">
                                Your visit to enjoy our salads in Los Cristianos will be a moment of freshness, elegance and Mediterranean charm — one you will want to return to again and again.
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

export default SeoSalads;
