import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoGarnish = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Garnish in Los Cristianos, Tenerife | La Medusa"
                description="Discover refined garnish at La Medusa in Los Cristianos. Elegant garnish in Tenerife that enhances flavour, presentation and the dining experience."
                path="/garnish-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            The Art of Garnish
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, garnish is more than decoration — it is an essential element that completes every dish. Carefully chosen ingredients and thoughtful presentation allow each garnish to enhance both flavour and visual appeal.
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
                        <h2 className="title section-title">Our Philosophy of Garnish</h2>
                        <p className="description hidden lg:inline-block section-description">
                            Guests dining in Los Cristianos often notice how every garnish adds character and elegance to the plate. For visitors exploring refined dining experiences in Tenerife, La Medusa offers beautifully presented dishes where garnish plays a meaningful role.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            Guests dining in Los Cristianos often notice how every garnish adds character and elegance to the plate.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="The Art of Garnish"
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
                                    Thoughtful Presentation
                                </h3>
                                <p className="description md:text-lg">
                                    Each garnish is carefully placed to create a visually appealing and balanced dish.
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
                                    Fresh Ingredients
                                </h3>
                                <p className="description md:text-lg">
                                    We use fresh components to ensure that every garnish contributes natural flavour and colour.
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
                                    Culinary Harmony
                                </h3>
                                <p className="description md:text-lg">
                                    Our chefs design every garnish to complement the dish and enhance the overall dining experience.
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
                        Subtle Elegance
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Garnish as a Culinary Detail
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        While often subtle, garnish can transform a dish into something memorable. At La Medusa, every garnish is selected with purpose — to add freshness, colour and a final touch of sophistication.
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
                            alt="Every Detail Counts"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Every Detail Counts
                                </h2>
                                <p className="section-description description">
                                    A well-prepared garnish should complement the dish rather than overpower it. At La Medusa, our chefs carefully design each garnish to highlight the natural flavours and textures of the main ingredients.
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
                            Creativity & Care
                        </span>
                        <h2 className="title section-title">
                            A Detail That Completes the Dish
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
                                At La Medusa, garnish is part of the story behind every plate. It represents creativity, care and the pursuit of culinary balance.
                            </p>
                            <p className="section-description description mb-4">
                                Guests enjoying meals in Los Cristianos appreciate the way our garnish elevates both the appearance and the flavour of each plate.
                            </p>
                            <p className="section-description description">
                                Guests dining in Tenerife discover that even the smallest garnish can make a meaningful difference in flavour, presentation and enjoyment.
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
                        The Beauty of Attention to Detail
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        In Tenerife's vibrant dining scene, these small details help create a truly refined experience. At La Medusa, the smallest elements receive the same level of attention as the main ingredients.
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
                                Experience the Details at La Medusa
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve a table and enjoy dishes where every garnish is prepared with care and precision.
                            </p>
                            <p className="description section-description">
                                At La Medusa in Los Cristianos, every detail — including the garnish — contributes to a dining experience defined by elegance, flavour and Mediterranean inspiration.
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

export default SeoGarnish;
