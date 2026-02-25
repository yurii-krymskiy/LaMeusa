import { useRef } from "react";
import { ControlledSwiper } from "../../../components/features/ControlledSwiper";

import { SwiperSlide } from "swiper/react";
import type Swiper from "swiper";

export const AboutOutTeam = () => {
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
            src: "/images/about/teamate-1.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-2.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-3.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-4.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-1.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-2.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-3.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
        {
            src: "/images/about/teamate-4.png",
            name: "Tahmina Rumi",
            role: "Chef",
        },
    ];
    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-10 max-w-[720px] text-center">
                    <p className="title section-title">Our team</p>
                    <p className="description section-description inline-block">
                        We are a group of people in love with gastronomy and the
                        sea. From the chef to the waiter, everyone contributes a
                        piece of themselves to the experience you get at{" "}
                        <b>La Medusa.</b>
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
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="cursor-pointer select-none"
                        >
                            <img
                                src="/icons/arrow-active-slider.svg"
                                className="size-8 md:size-10"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
