import { useTranslation } from "react-i18next";
import GallerySlider from "../../../components/features/GallerySlider";

export const SeafoodGallery = () => {
    const { t } = useTranslation();
    const slides = [
        { src: "/images/seafood/gallary-1.webp", alt: "Gallery image 1" },
        { src: "/images/seafood/gallary-2.webp", alt: "Gallery image 2" },
        { src: "/images/seafood/gallary-1.webp", alt: "Gallery image 3" },
        { src: "/images/seafood/gallary-2.webp", alt: "Gallery image 2" },
    ];

    return (
        <section className="flex flex-col items-center py-10 lg:py-15">
            <div className="container">
                <div className="mx-auto max-w-[768px]">
                    <span className="decorative block text-center text-[34px]">
                        {t("seafood.gallery.decorative")}
                    </span>
                    <h2 className="title section-title my-6 text-center text-[48px]">
                        {t("seafood.gallery.title")}
                    </h2>
                    <p className="description section-description mb-5 lg:mb-10 text-center">
                        {t("seafood.gallery.description")}
                    </p>
                </div>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
