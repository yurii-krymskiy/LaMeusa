import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoSauces = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Sauces and Adds in Los Cristianos, Tenerife | La Medusa"
                description="Discover sauces and adds at La Medusa in Los Cristianos. Enhance your meal in Tenerife with carefully crafted sauces and flavourful additions."
                path="/sauces-adds-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            The Perfect Touch: Sauces and Adds
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, sauces and adds play an important role in completing the flavour of every dish. These small yet essential details allow guests to personalise their meals and enjoy a richer culinary experience.
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
                        <h2 className="title section-title">Our Philosophy of Sauces and Adds</h2>
                        <p className="description hidden lg:inline-block section-description">
                            Whether you are enhancing a main course or adding a finishing touch, our sauces and adds bring balance, aroma and character to every plate. Guests exploring flavourful dining options in Los Cristianos often appreciate the thoughtful selection available at La Medusa.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            Whether you are enhancing a main course or adding a finishing touch, our sauces and adds bring balance, aroma and character to every plate.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="The Perfect Touch: Sauces and Adds"
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
                                    Crafted with Care
                                </h3>
                                <p className="description md:text-lg">
                                    Our sauces and adds are prepared with quality ingredients to ensure balanced and authentic flavour.
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
                                    Complementing Every Dish
                                </h3>
                                <p className="description md:text-lg">
                                    Each of our sauces and adds is designed to pair perfectly with a variety of dishes across the menu.
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
                                    Attention to Detail
                                </h3>
                                <p className="description md:text-lg">
                                    We believe that thoughtful sauces and adds can elevate a meal from enjoyable to unforgettable.
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
                        Personalise
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Enhance Your Dining Experience
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        The right sauces and adds allow every guest to tailor their meal to their personal taste. From subtle flavour accents to richer combinations, these additions create new layers of enjoyment.
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
                            alt="A Small Detail with a Big Impact"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    A Small Detail with a Big Impact
                                </h2>
                                <p className="section-description description">
                                    Though often overlooked, sauces and adds are essential to a complete dining experience. At La Medusa, we ensure these elements reflect the same level of care and creativity as the main dishes.
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
                            Every Detail Matters
                        </span>
                        <h2 className="title section-title">
                            Flavour That Completes the Meal
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
                                Great cuisine is often defined by its details. At La Medusa, our sauces and adds are carefully prepared to complement the natural flavours of each dish.
                            </p>
                            <p className="section-description description mb-4">
                                Every element is designed to enhance rather than overpower. Our chefs believe that well-balanced sauces and adds can transform a meal.
                            </p>
                            <p className="section-description description">
                                Guests dining in Tenerife discover that our sauces and adds add personality and depth to every plate.
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
                        The Finishing Touch
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        Visitors dining in Los Cristianos often appreciate the freedom to customise their plates with our selection of sauces and adds, making each visit feel unique and personal.
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
                                Complete Your Meal at La Medusa
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve your table and explore the flavours that thoughtful sauces and adds can bring to your meal.
                            </p>
                            <p className="description section-description">
                                At La Medusa, every detail matters — from the main dish to the carefully prepared sauces and adds that make each bite memorable.
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

export default SeoSauces;
