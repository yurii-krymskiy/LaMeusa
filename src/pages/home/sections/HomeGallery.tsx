import GallerySlider from "../../../components/features/GallerySlider";

export const HomeGallery = () => {
    const slides = [
        { src: "/images/home/gallery-1.jpg", alt: "Gallery image 1" },
        { src: "/images/home/gallery-2.jpg", alt: "Gallery image 2" },
        { src: "/images/home/gallery-3.jpg", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex flex-col items-center py-15">
            <span className="decorative text-center text-[34px]">
                Our Gallery
            </span>
            <p className="title section-title my-6 text-center text-[48px]">
                Gallery of the restaurant
            </p>
            <p className="description section-description mb-10 text-center">
                Take a peek into our heart - browse the gallery and get a feel
                for La Medusa
                <br /> before you visit. From the interior to the food, every
                frame tells a story.
            </p>
            <GallerySlider slides={slides} />
        </section>
    );
};
