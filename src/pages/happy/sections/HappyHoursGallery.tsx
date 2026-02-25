import GallerySlider from "../../../components/features/GallerySlider";

export const HappyHoursGallery = () => {
    const slides = [
        { src: "/images/happy-hours/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/happy-hours/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/happy-hours/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex flex-col items-center py-5 lg:py-15">
            <div className="container !max-w-[765px]">
                <span className="decorative mx-auto block text-center text-[34px]">
                    Gallery
                </span>
                <p className="title section-title my-6 text-center text-[48px]">
                    Good Vibes, Great Company
                </p>
                <p className="description section-description mb-10 text-center">
                    Happy Hours at <b>La Medusa</b> are more than just a
                    promotion. They are a time when people come together to
                    relax, enjoy the music, socialize, and atmosphere of our
                    restaurant.
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
