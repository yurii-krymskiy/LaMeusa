import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoPizza = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Pizza in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy authentic pizza in Los Cristianos at La Medusa. Discover fresh, oven-baked pizza in Tenerife with Mediterranean flavour and ocean views."
                path="/pizza-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            A Celebration of Pizza
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, we believe that great pizza is more than a dish — it is an experience. Our kitchen brings together Mediterranean inspiration and traditional techniques to create exceptional pizza in Los Cristianos.
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
                        <h2 className="title section-title">Why Our Pizza?</h2>
                        <p className="description hidden lg:inline-block section-description">
                            If you are looking for unforgettable pizza in Tenerife, our restaurant offers the perfect combination of flavour, atmosphere and ocean views.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            If you are looking for unforgettable pizza in Tenerife, our restaurant offers the perfect combination of flavour and atmosphere.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="A Celebration of Pizza"
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
                                    Freshly Prepared Dough
                                </h3>
                                <p className="description md:text-lg">
                                    Our pizza in Los Cristianos begins with carefully prepared dough, made to achieve the perfect balance of crispness and softness.
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
                                    Quality Ingredients
                                </h3>
                                <p className="description md:text-lg">
                                    For authentic pizza in Tenerife, we select fresh produce and premium toppings that enhance every bite.
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
                                    Mediterranean Touch
                                </h3>
                                <p className="description md:text-lg">
                                    Each pizza reflects the warmth and richness of Mediterranean cuisine, offering a harmonious blend of flavours.
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
                        Our Craft
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        Tradition Meets Modern Flair
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Pizza has long been a symbol of comfort and shared moments. At La Medusa, we honour this tradition while adding our own elegant touch.
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
                            alt="Pizza for Every Taste"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Pizza for Every Taste
                                </h2>
                                <p className="section-description description">
                                    Guests searching for premium pizza in Tenerife often choose La Medusa for its refined setting and consistent quality. Each pizza is oven-baked to perfection, delivering rich aroma, balanced texture and satisfying flavour.
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
                            From Our Oven to Your Table
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
                                Every pizza is prepared with passion — from stretching the dough to the final finishing touches before serving.
                            </p>
                            <p className="section-description description mb-4">
                                When you choose La Medusa for pizza in Los Cristianos, you are choosing flavour, atmosphere and attention to detail.
                            </p>
                            <p className="section-description description">
                                If you are exploring options for excellent pizza in Tenerife, our restaurant promises a memorable dining experience by the sea.
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
                        A Taste of Tradition
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        As a destination for quality pizza in Los Cristianos, we combine time-tested techniques with contemporary presentation. Our approach ensures that every pizza in Tenerife served at our restaurant feels both authentic and distinctive.
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
                                Make Your Evening Special
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve a table and enjoy refined pizza in Los Cristianos in an elegant coastal setting.
                            </p>
                            <p className="description section-description">
                                Your experience of pizza in Tenerife at La Medusa will be one you will wish to revisit — a perfect blend of taste, comfort and Mediterranean charm.
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

export default SeoPizza;
