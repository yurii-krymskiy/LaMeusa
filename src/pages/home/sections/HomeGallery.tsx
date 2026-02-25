import GallerySlider from "../../../components/features/GallerySlider";

export const HomeGallery = () => {
    const slides = [
        { src: "/images/home/gallery-1.jpg", alt: "Gallery image 1" },
        { src: "/images/home/gallery-2.jpg", alt: "Gallery image 2" },
        { src: "/images/home/gallery-3.jpg", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex section flex-col items-center py-15">
            <div className="container">
                <img
                    src="/icons/star.svg"
                    alt="star"
                    className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                />
                <p className="title section-title my-3.5 lg:my-6 mt-1.5 lg:mt-0 text-center text-[48px]">
                    Gallery of the restaurant
                </p>
                <p className="description section-description mb-5 lg:mb-10 text-center">
                    Take a peek into our heart - browse the gallery and get a
                    feel for <strong>La Medusa</strong>
                    <br /> before you visit. From the interior to the food,
                    every frame tells a story.
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
