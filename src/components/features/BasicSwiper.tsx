import { Swiper } from "swiper/react";

type Props = {
    children: React.ReactNode;
};

export const BasicSwiper = ({ children }: Props) => {
    return (
        <Swiper slidesPerView={1.2} centeredSlides={true} spaceBetween={20}>
            {children}
        </Swiper>
    );
};
