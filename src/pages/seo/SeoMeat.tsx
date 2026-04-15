import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoMeat = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Meat in Los Cristianos, Tenerife | La Medusa"
                description="Discover exceptional meat in Los Cristianos at La Medusa. Enjoy premium meat in Tenerife, perfectly prepared in an elegant oceanfront setting."
                path="/meat-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            A Celebration of Meat
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, we believe that perfectly prepared meat is the foundation of an unforgettable dining experience. Our chefs focus on quality, technique and presentation to offer refined meat in Los Cristianos that satisfies even the most discerning guests.
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
                        <h2 className="title section-title">Why Choose Our Meat?</h2>
                        <p className="description hidden lg:inline-block section-description">
                            If you are searching for outstanding meat in Tenerife, La Medusa combines premium ingredients with Mediterranean flair and ocean views.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            If you are searching for outstanding meat in Tenerife, La Medusa combines premium ingredients with Mediterranean flair.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="A Celebration of Meat"
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
                                    Carefully Selected Cuts
                                </h3>
                                <p className="description md:text-lg">
                                    Our meat in Los Cristianos begins with premium-quality selections, chosen for their freshness and texture.
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
                                    Expert Preparation
                                </h3>
                                <p className="description md:text-lg">
                                    To serve exceptional meat in Tenerife, our chefs use balanced cooking techniques that enhance natural flavour and preserve juiciness.
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
                                    Mediterranean Inspiration
                                </h3>
                                <p className="description md:text-lg">
                                    Each plate of meat reflects the richness of Mediterranean cuisine, blending simplicity with sophistication.
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
                        Our Standards
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Tradition and Craftsmanship
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Cooking meat is an art that requires both experience and respect for the product. At La Medusa, we honour tradition while bringing a contemporary touch to every plate.
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
                            alt="Meat for Every Occasion"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Meat for Every Occasion
                                </h2>
                                <p className="section-description description">
                                    Guests looking for high-quality meat in Tenerife appreciate the balance of flavour, presentation and atmosphere that defines La Medusa. Every dish is thoughtfully prepared to create harmony between taste, texture and aroma.
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
                            Mastery & Respect
                        </span>
                        <h2 className="title section-title">
                            From Our Kitchen to Your Table
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
                                Each dish of meat is prepared with attention to detail — from seasoning to presentation.
                            </p>
                            <p className="section-description description mb-4">
                                When choosing La Medusa for meat in Los Cristianos, you are choosing quality, atmosphere and culinary expertise.
                            </p>
                            <p className="section-description description">
                                If you are exploring options for distinguished meat in Tenerife, our restaurant offers a memorable experience by the ocean.
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
                        A Premium Dining Experience
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        As a destination for premium meat in Los Cristianos, we combine classic culinary methods with modern elegance. Our commitment ensures that every portion of meat in Tenerife served at our restaurant delivers satisfaction and refinement.
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
                                Make Your Dinner Exceptional
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve your table and enjoy refined meat in Los Cristianos in an elegant seaside setting.
                            </p>
                            <p className="description section-description">
                                Your experience of premium meat in Tenerife at La Medusa will be one to remember — where flavour, hospitality and atmosphere come together beautifully.
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

export default SeoMeat;
