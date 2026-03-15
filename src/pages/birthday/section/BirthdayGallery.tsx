import { useTranslation } from "react-i18next";
import GallerySlider from "../../../components/features/GallerySlider";

export const BirthdayGallery = () => {
    const { t } = useTranslation();

    const slides = [
        { src: "/images/birthday/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/birthday/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/birthday/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex section flex-col items-center py-15">
            <div className="container !max-w-[730px]">
                <p className="title section-title lg:my-6 text-center text-[48px]">
                    {t("birthday.gallery.title")}
                </p>
                <p className="description section-description mb-5 lg:mb-10 text-center">
                    {t("birthday.gallery.description")}
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
