import GallerySlider from "../../../components/features/GallerySlider";

export const PastaGallery = () => {
    const slides = [
        { src: "/images/pasta/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/pasta/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/pasta/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex flex-col items-center py-10 lg:py-15">
            <div className="container !max-w-[765px]">
                <span className="decorative mx-auto block text-center text-[34px]">
                    Gallery
                </span>
                <p className="title section-title lg:my-6 mt-1 mb-3 text-center text-[48px]">
                    For Every Taste
                </p>
                <p className="description section-description mb-5 lg:mb-10 text-center">
                    Delicate tagliatelle, aromatic penne, exquisite ravioli or
                    classic spaghetti - our menu has a pasta for every mood. See
                    how we create real magic on your plate.
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
