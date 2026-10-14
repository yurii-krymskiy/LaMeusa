import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ControlledSwiper } from "../../../components/features/ControlledSwiper";

import { SwiperSlide } from "swiper/react";
import type Swiper from "swiper";

export const AboutOutTeam = () => {
    const { t } = useTranslation();
    const swiperRef = useRef<Swiper | null>(null);

    const handlePrev = () => {
        if (!swiperRef.current) return;

        swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (!swiperRef.current) return;

        swiperRef.current.slideNext();
    };

    const team = [
        {
            src: "/images/about/teamate-1.webp",
            name: "Ruslan",
            role: "Manager",
        },
        {
            src: "/images/about/teamate-2.webp",
            name: "Tanya",
            role: "Waitress",
        },
        {
            src: "/images/about/teamate-3.webp",
            name: "Anton",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-4.webp",
            name: "Helen",
            role: "Manager",
        },
        {
            src: "/images/about/teamate-5.webp",
            name: "Oleh",
            role: "Cook",
        },
        {
            src: "/images/about/teamate-6.webp",
            name: "Mary",
            role: "Waitress",
        },
        {
            src: "/images/about/teamate-7.webp",
            name: "Aisha",
            role: "Bartender",
        },
        {
            src: "/images/about/teamate-8.webp",
            name: "Andrew",
            role: "Cook",
        },
        {
            src: "/images/about/teamate-9.webp",
            name: "Stan",
            role: "Piar",
        },
    ];
    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-10 max-w-[720px] text-center">
                    <h2 className="title section-title">{t("about.ourTeam.title")}</h2>
                    <p className="description section-description inline-block">
                        {t("about.ourTeam.description")}
                    </p>
                </div>

                <div className="">
                    <div className="mb-8 lg:mb-14">
                        <ControlledSwiper ref={swiperRef}>
                            {team.map((member, index) => (
                                <SwiperSlide key={index}>
                                    <img src={member.src} alt={member.name} className="h-[370px] object-cover" />
                                    <div className="text-center m-2.5" >
                                        <span className="title text-xl normal-case">{member.name}</span>
                                        <p className="description">{member.role}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </ControlledSwiper>
                    </div>
                    <div className="flex justify-center gap-14">
                        <button
                            onClick={handlePrev}
                            className="cursor-pointer select-none"
                        >
                            <img
                                src="/icons/arrow-active-slider.svg"
                                className="size-8 rotate-180 md:size-10"
                                width={44}
                                height={24}
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="cursor-pointer select-none"
                        >
                            <img
                                src="/icons/arrow-active-slider.svg"
                                className="size-8 md:size-10"
                                width={44}
                                height={24}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
