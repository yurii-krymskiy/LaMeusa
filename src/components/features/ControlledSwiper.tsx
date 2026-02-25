import type SwiperType from "swiper";
import { Swiper } from "swiper/react";

type Props = {
    children: React.ReactNode;
    ref?: React.RefObject<SwiperType | null>;
};

export const ControlledSwiper = ({ children, ref }: Props) => {
    return (
        <Swiper
            breakpoints={{
                200: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 4,
                },
            }}
            loop={true}
            spaceBetween={20}
            onSwiper={(swiper) => {
                if (!ref) return;
                ref.current = swiper;
            }}
        >
            {children}
        </Swiper>
    );
};
