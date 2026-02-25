import { Swiper } from "swiper/react";

type Props = {
    children: React.ReactNode;
};

export const BasicSwiper = ({ children }: Props) => {
    return (
        <Swiper slidesPerView={1.1} centeredSlides={false} spaceBetween={20}>
            {children}
        </Swiper>
    );
};
