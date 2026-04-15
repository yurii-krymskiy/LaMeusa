import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoChildrenMenu = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Children Menu in Los Cristianos, Tenerife | La Medusa"
                description="Discover our children menu at La Medusa in Los Cristianos. A thoughtful children menu in Tenerife designed for young guests and relaxed family dining."
                path="/children-menu-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            A Special Children Menu for Young Guests
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, we believe that every guest should feel welcome — including the youngest ones. Our carefully designed children menu offers simple, delicious options that children enjoy while parents relax and savour the atmosphere.
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
                        <h2 className="title section-title">Our Philosophy of the Children Menu</h2>
                        <p className="description hidden lg:inline-block section-description">
                            Families looking for a welcoming children menu in Los Cristianos will find the perfect balance between quality ingredients, familiar flavours and comfortable dining. For those exploring restaurants with a thoughtful children menu in Tenerife, La Medusa provides a warm and family-friendly experience by the ocean.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            Families looking for a welcoming children menu in Los Cristianos will find the perfect balance between quality ingredients, familiar flavours and comfortable dining.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="A Special Children Menu for Young Guests"
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
                                    Simple and Tasty Dishes
                                </h3>
                                <p className="description md:text-lg">
                                    Our children menu focuses on flavours that young guests enjoy while maintaining freshness and quality.
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
                                    Relaxed Oceanfront Atmosphere
                                </h3>
                                <p className="description md:text-lg">
                                    Families enjoying the children menu in Los Cristianos can relax in a beautiful seaside setting with plenty of space and light.
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
                                    Friendly Service
                                </h3>
                                <p className="description md:text-lg">
                                    Our team makes sure that guests exploring restaurants with a children menu in Tenerife feel welcomed and well cared for.
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
                        For Families
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        A Comfortable Dining Experience
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        Dining out with children should be relaxed and enjoyable. Our children menu helps create a welcoming atmosphere where families can spend quality time together.
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
                            alt="A Place Where Families Feel Welcome"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    A Place Where Families Feel Welcome
                                </h2>
                                <p className="section-description description">
                                    Guests searching for a family-friendly children menu in Los Cristianos often choose La Medusa because we combine great food with a calm seaside setting. Among restaurants offering a children menu in Tenerife, we aim to make every visit comfortable for both parents and children.
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
                            Relax & Enjoy
                        </span>
                        <h2 className="title section-title">
                            Quality for Every Age
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
                                A great children menu should be both enjoyable and carefully prepared. At La Medusa, we focus on freshness, quality and flavours that appeal to young guests while maintaining the same high standards as the rest of our menu.
                            </p>
                            <p className="section-description description mb-4">
                                Our children menu in Los Cristianos is designed to offer balanced dishes that are satisfying and easy to enjoy.
                            </p>
                            <p className="section-description description">
                                For families discovering restaurants with a children menu in Tenerife, La Medusa offers a warm environment where children and adults alike can enjoy a pleasant meal by the sea.
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
                        Family Moments by the Sea
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        A thoughtful children menu is an important part of a comfortable family dining experience. At La Medusa, we want every visit to feel relaxed, enjoyable and memorable for guests of all ages.
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
                                Enjoy Family Dining at La Medusa
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve a table and experience a welcoming children menu in Los Cristianos at La Medusa.
                            </p>
                            <p className="description section-description">
                                Your visit to enjoy our children menu in Tenerife will be a relaxed and enjoyable moment — where good food, beautiful views and family time come together perfectly.
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

export default SeoChildrenMenu;
