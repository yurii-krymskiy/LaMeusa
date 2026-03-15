import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import { BasicSwiper } from "../../../components/features/BasicSwiper";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HappyHoursSpecial = () => {
    const { t } = useTranslation();
    const specials = [
        {
            src: "/images/home/special-1.jpg",
            title: t("home.special.deal1Title"),
            description: t("home.special.deal1Desc"),
        },
        {
            src: "/images/home/special-2.jpg",
            title: t("home.special.deal2Title"),
            description: t("home.special.deal2Desc"),
        },
        {
            src: "/images/home/special-3.jpg",
            title: t("home.special.deal3Title"),
            description: t("home.special.deal3Desc"),
        },
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="mb-5 lg:mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto lg:mb-6 h-[22px] w-[22px]"
                    />
                    <p className="title section-title mb-6 text-center text-[48px]">
                        {t("happy.special.title")}
                    </p>
                </div>
                <div className="block md:hidden">
                    <BasicSwiper>
                        {specials.map((item, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={item.src}
                                    alt="image"
                                    className="mb-3.5 object-cover"
                                    loading="lazy"
                                />
                                <div className="text-center">
                                    <span className="title mb-2 inline-block text-2xl font-bold capitalize">
                                        {item.title}
                                    </span>
                                    <p className="description section-description">
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </BasicSwiper>
                    <div>
                        <Button variant="blue" to={Paths.menu} className="mt-5">
                            {t("happy.special.discoverMenu")}
                        </Button>
                    </div>
                </div>
                <div className="hidden grid-cols-3 gap-14 md:grid">
                    {specials.map((item, i) => (
                        <div key={i}>
                            <img
                                src={item.src}
                                alt="image"
                                className="mb-3.5 object-cover"
                                loading="lazy"
                            />
                            <div className="mb-7 text-center">
                                <span className="title mb-2 inline-block text-2xl font-bold capitalize">
                                    {item.title}
                                </span>
                                <p className="description md:text-lg">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
