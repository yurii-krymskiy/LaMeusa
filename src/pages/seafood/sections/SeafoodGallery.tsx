import GallerySlider from "../../../components/features/GallerySlider";

export const SeafoodGallery = () => {
    const slides = [
        { src: "/images/seafood/gallary-1.webp", alt: "Gallery image 1" },
        { src: "/images/seafood/gallary-2.webp", alt: "Gallery image 2" },
        { src: "/images/seafood/gallary-1.webp", alt: "Gallery image 3" },
        { src: "/images/seafood/gallary-2.webp", alt: "Gallery image 2" },
    ];

    return (
        <section className="flex flex-col items-center py-15">
            <div className="container">
                <div className="mx-auto max-w-[768px]">
                    <span className="decorative block text-center text-[34px]">
                        Gallery
                    </span>
                    <p className="title section-title my-6 text-center text-[48px]">
                        More Than Just a Dish
                    </p>
                    <p className="description section-description mb-10 text-center">
                        Seafood at <b>La Medusa</b> is part of history and
                        culture. We want every meal to be more than just lunch
                        or dinner, but a moment to remember.
                    </p>
                </div>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
