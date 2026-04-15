import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoTapas = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Tapas and Appetizers in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy tapas and appetizers in Los Cristianos at La Medusa. Discover refined tapas and appetizers in Tenerife with Mediterranean flavours and ocean views."
                path="/tapas-appetizers-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            Discover the Flavour of Tapas and Appetizers
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, tapas and appetizers are the perfect way to begin your culinary journey. Inspired by Mediterranean traditions, our small plates bring together fresh ingredients, vibrant flavours and elegant presentation.
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
                        <h2 className="title section-title">Our Philosophy of Tapas and Appetizers</h2>
                        <p className="description hidden lg:inline-block section-description">
                            If you are looking for memorable tapas and appetizers in Los Cristianos, our oceanfront restaurant offers a relaxed yet refined experience. For guests exploring exceptional tapas and appetizers in Tenerife, La Medusa creates dishes that celebrate the spirit of sharing and discovery.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            If you are looking for memorable tapas and appetizers in Los Cristianos, our oceanfront restaurant offers a relaxed yet refined experience.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="Discover the Flavour of Tapas and Appetizers"
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
                                    Fresh Ingredients
                                </h3>
                                <p className="description md:text-lg">
                                    Our tapas and appetizers in Los Cristianos are prepared using high-quality seasonal products to ensure freshness and flavour.
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
                                    Oceanfront Atmosphere
                                </h3>
                                <p className="description md:text-lg">
                                    As a destination for tapas and appetizers in Tenerife, our restaurant offers beautiful sea views that make every bite more memorable.
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
                                    Warm Hospitality
                                </h3>
                                <p className="description md:text-lg">
                                    Our team takes care of every detail, ensuring your experience with tapas and appetizers in Los Cristianos is welcoming, relaxed and enjoyable.
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
                        Sharing & Discovery
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Small Plates, Big Experience
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Great tapas and appetizers are designed to be shared and enjoyed slowly. Whether you are starting a meal or enjoying a light evening by the sea, our selection offers variety and elegance.
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
                            alt="A Taste of Mediterranean Culture"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    A Taste of Mediterranean Culture
                                </h2>
                                <p className="section-description description">
                                    We believe that the best tapas and appetizers are simple, fresh and full of character. At La Medusa, each plate is carefully prepared to highlight natural ingredients and balanced flavours.
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
                            Our Philosophy
                        </span>
                        <h2 className="title section-title">
                            Flavour, Atmosphere and Hospitality
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
                                Our approach to tapas and appetizers in Los Cristianos blends Mediterranean inspiration with contemporary creativity.
                            </p>
                            <p className="section-description description mb-4">
                                Among the many places serving tapas and appetizers in Tenerife, La Medusa stands out for its atmosphere, presentation and attention to detail.
                            </p>
                            <p className="section-description description">
                                For guests exploring tapas and appetizers in Tenerife, our restaurant offers a place where flavour, atmosphere and hospitality meet.
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
                        Mediterranean Spirit on Every Plate
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        Sharing tapas and appetizers is part of Mediterranean lifestyle and tradition. At La Medusa, we bring that culture to life in every plate.
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
                                Begin Your Evening at La Medusa
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve your table and enjoy refined tapas and appetizers in Los Cristianos in an elegant seaside setting.
                            </p>
                            <p className="description section-description">
                                Your experience of tapas and appetizers in Tenerife at La Medusa will be a moment of flavour, conversation and Mediterranean charm you will want to return to again.
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

export default SeoTapas;
