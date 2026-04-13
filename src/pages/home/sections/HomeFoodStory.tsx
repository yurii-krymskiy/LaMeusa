import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

const sliderImages = [
    { src: "/images/home-slider/img9.jpeg", alt: "Restaurant interior 1" },
    { src: "/images/home-slider/img10.jpeg", alt: "Restaurant interior 2" },
    { src: "/images/home-slider/img11.jpeg", alt: "Restaurant interior 3" },
    { src: "/images/home-slider/img12.jpeg", alt: "Restaurant interior 4" },
];

export const HomeFoodStory = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="section bg-white-100">
                <div className="decorative-line container flex flex-col-reverse gap-5 md:gap-16 lg:flex-row">
                    <div className="grid grid-cols-2 gap-[15px] lg:gap-6 lg:grid-cols-[336px_309px]">
                        <img
                            src="/images/home/image-11.jpg"
                            alt="image"
                            className="h-auto w-full object-contain lg:object-cover"
                            loading="lazy"
                        />
                        <div className="flex flex-col gap-[15px] lg:gap-6 self-end">
                            <img
                                src="/images/home/image-12.jpg"
                                alt="image"
                                className="mt-10 h-auto w-full object-contain"
                                loading="lazy"
                            />
                            <img
                                src="/images/home/image-13.jpg"
                                alt="image"
                                className="h-auto w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="max-w-[590px] self-center">
                        <p className="decorative">
                            {t("home.foodStory.decorative")}
                        </p>
                        <h2 className="title section-title !mb-5 !lg:mb-6 text-[48px]">
                            {t("home.foodStory.title")}
                        </h2>
                        <p className="description section-description mb-2.5">
                            {t("home.foodStory.p1")}
                        </p>
                        <p className="description section-description mb-2.5">
                            {t("home.foodStory.p2")}
                        </p>
                        <p className="description section-description">
                            {t("home.foodStory.p3")}
                        </p>
                    </div>
                </div>
            </section>
            <div className="food-story-slider">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    speed={600}
                    className="h-[320px] lg:h-[700px]"
                >
                    {sliderImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover brightness-70"
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
