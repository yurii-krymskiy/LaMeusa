import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { memo } from "react";

type Props = {
    slides: { src: string; alt: string }[];
};

const GallerySlider = memo(({ slides }: Props) => {
    const GAP = 24; // px (≈ gap-6)

    return (
        <div className="flex w-full justify-center">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={"auto"}
                centeredSlides
                allowTouchMove={false}
                loop={true}
                spaceBetween={GAP}
                breakpoints={{
                    200: {
                        spaceBetween: GAP / 3,
                    },
                    768: {
                        spaceBetween: GAP,
                    },
                }}
                autoplay={{ delay: 3000 }}
                speed={600}
            >
                {[...slides, ...slides].map((slide, i) => (
                    <SwiperSlide
                        key={`${slide.src}-${i}`}
                        style={{ width: "min(900px, 70vw)" }}
                    >
                        {({ isActive }) => (
                            <div className="flex items-center justify-center md:h-[500px]">
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    draggable={false}
                                    className={[
                                        "w-[900px] object-contain select-none",
                                        "transition-all duration-500 ease-in-out",
                                        isActive
                                            ? "scale-y-100 opacity-100"
                                            : "scale-y-[0.84] opacity-80",
                                    ].join(" ")}
                                />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});

export default GallerySlider;
