import GallerySlider from "../../../components/features/GallerySlider";

export const PastaGallery = () => {
    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex flex-col items-center py-15">
            <div className="max-w-[765px]">
                <span className="decorative mx-auto block text-center text-[34px]">
                    Gallery
                </span>
                <p className="title section-title my-6 text-center text-[48px]">
                    For Every Taste
                </p>
                <p className="description section-description mb-10 text-center">
                    Delicate tagliatelle, aromatic penne, exquisite ravioli or
                    classic spaghetti - our menu has a pasta for every mood. See
                    how we create real magic on your plate.
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
