import { useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ButtonOpenReservation } from "../../components/features/reservation-form/ButtonOpenReservation";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import GallerySlider from "../../components/features/GallerySlider";
import ScrollCircle from "../../components/features/ScrollCircle";
import { MenuDelicios } from "../menu/sections/MenuDelicios";
import { Paths } from "../../router";

const SeoDessert = () => {
    const navigate = useNavigate();

    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <>
            <SEO
                title="Dessert in Los Cristianos, Tenerife | La Medusa"
                description="Enjoy elegant dessert at La Medusa in Los Cristianos. Discover refined dessert in Tenerife, crafted with care and served in a beautiful seaside setting."
                path="/dessert-los-cristianos"
            />

            {/* Hero */}
            <main className="hero happy-hours-hero">
                <div className="container">
                    <div className="mb-10 max-w-[800px]">
                        <h1 className="title hero-title md:!text-left">
                            The Art of Dessert
                        </h1>
                        <p className="description hero-description !ml-0 md:!text-left">
                            At La Medusa, dessert is more than the final course — it is the perfect ending to a memorable dining experience. Our kitchen creates each dessert with attention to flavour, texture and presentation, turning sweet moments into lasting memories.
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
                        <h2 className="title section-title">Our Philosophy of Dessert</h2>
                        <p className="description hidden lg:inline-block section-description">
                            Guests looking for an exceptional dessert in Los Cristianos will find elegance and creativity in every plate. If you are exploring refined dessert in Tenerife, La Medusa offers a sweet experience that complements the beauty of the oceanfront setting.
                        </p>
                        <p className="description lg:hidden section-description inline-block">
                            Guests looking for an exceptional dessert in Los Cristianos will find elegance and creativity in every plate.
                        </p>
                    </div>
                    <img
                        src="/images/pasta/image-1.webp"
                        alt="The Art of Dessert"
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
                                    Every dessert is prepared with fresh ingredients chosen for their natural sweetness and balance.
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
                                    Mediterranean Inspiration
                                </h3>
                                <p className="description md:text-lg">
                                    Guests enjoying dessert in Tenerife will notice subtle Mediterranean influences that make our creations unique.
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
                                    The Perfect Ending
                                </h3>
                                <p className="description md:text-lg">
                                    Across the Mediterranean, dessert represents celebration and shared joy. At La Medusa, we embrace this tradition by offering sweet creations designed to complete your dining experience beautifully.
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
                        Sweet Moments
                    </span>
                    <h2 className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                        A Sweet Moment to Remember
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        A well-prepared dessert has the power to transform a meal into a celebration. Whether enjoyed after dinner or as a special treat, our dessert in Los Cristianos offers the perfect finishing touch.
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
                            alt="Atmosphere by the Ocean"
                            className="max-w-[620px]"
                        />

                        <div>
                            <div className="mb-5 lg:mb-10">
                                <h2 className="section-title title mb-7 inline-block">
                                    Atmosphere by the Ocean
                                </h2>
                                <p className="section-description description">
                                    Among the many places serving dessert in Tenerife, La Medusa stands out for its elegant atmosphere and dedication to quality. Every dessert is carefully presented to delight both the eyes and the palate.
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
                            Our Promise
                        </span>
                        <h2 className="title section-title">
                            Sweetness with Sophistication
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
                                Great dessert begins with balance. At La Medusa, we combine quality ingredients with thoughtful preparation to create flavours that feel both rich and delicate.
                            </p>
                            <p className="section-description description mb-4">
                                Each dessert reflects the spirit of Mediterranean cuisine — simple yet refined. Visitors searching for memorable dessert in Los Cristianos often discover that our creations bring together tradition and modern presentation.
                            </p>
                            <p className="section-description description">
                                For those enjoying dessert in Tenerife, La Medusa offers sweetness that feels sophisticated rather than overwhelming.
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
                        The Sweetest Finale
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        For guests discovering dessert in Tenerife, our restaurant provides a moment of indulgence where flavour, atmosphere and hospitality come together.
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
                                Finish Your Evening in Style
                            </h2>
                            <p className="description section-description mb-2">
                                Reserve your table and enjoy an unforgettable dessert in Los Cristianos at La Medusa.
                            </p>
                            <p className="description section-description">
                                Your experience of elegant dessert in Tenerife will be a moment you will want to relive — where sweetness, atmosphere and Mediterranean charm create the perfect ending to your meal.
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

export default SeoDessert;
