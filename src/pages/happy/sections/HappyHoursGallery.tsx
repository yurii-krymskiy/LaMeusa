import { useTranslation } from "react-i18next";
import GallerySlider from "../../../components/features/GallerySlider";

export const HappyHoursGallery = () => {
    const { t } = useTranslation();
    const slides = [
        { src: "/images/happy-hours/image-2.webp", alt: "Gallery image 1" },
        { src: "/images/happy-hours/image-3.webp", alt: "Gallery image 2" },
        { src: "/images/happy-hours/image-4.webp", alt: "Gallery image 3" },
    ];

    return (
        <section className="flex flex-col items-center py-5 lg:py-15">
            <div className="container !max-w-[765px]">
                <span className="decorative mx-auto block text-center text-[34px]">
                    {t("happy.gallery.decorative")}
                </span>
                <h2 className="title section-title lg:my-6 mt-[5px] mb-[15px] text-center text-[48px]">
                    {t("happy.gallery.title")}
                </h2>
                <p className="description section-description mb-5 lg:mb-10 text-center">
                    {t("happy.gallery.description")}
                </p>
            </div>
            <GallerySlider slides={slides} />
        </section>
    );
};
