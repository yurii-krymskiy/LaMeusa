import GallerySlider from "../../../components/features/GallerySlider";

export const BirthdayGallery = () => {
    const slides = [
        { src: "/images/birthday/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/birthday/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/birthday/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex section flex-col items-center py-15">
            <div className="container !max-w-[730px]">
                <p className="title section-title my-6 text-center text-[48px]">
                    A Place to Remember
                </p>
                <p className="description section-description mb-10 text-center">
                    Our restaurant creates the perfect combination of exquisite
                    cuisine and panoramic views. This is a place where a
                    birthday becomes more than a celebration - it is an
                    unforgettable experience.
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
