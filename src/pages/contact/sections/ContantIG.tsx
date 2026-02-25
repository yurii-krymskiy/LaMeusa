import { SwiperSlide } from "swiper/react";
import { BasicSwiper } from "../../../components/features/BasicSwiper";
import { Button } from "../../../components/ui/Button";

export const ContactIG = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                    />
                    <p className="title section-title">Our instagram</p>
                </div>

                <div className="hidden gap-10 lg:flex">
                    <div className="max-w-[560px]">
                        <img src="/images/contact/meat-vegetables-stew-black-pan.jpg" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex gap-10">
                            <div className="max-w-[340px]">
                                <img src="/images/contact/vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-top-view-flat-lay.jpg" />
                            </div>
                            <div className="max-w-[340px]">
                                <img src="/images/contact/delicious-lobster-gourmet-seafood.jpg" />
                            </div>
                        </div>
                        <Button variant="blue-outline" className="self-end">
                            Follow us
                        </Button>
                    </div>
                </div>

                <div className="block lg:hidden">
                    <div className="mb-5">
                        <BasicSwiper>
                            <SwiperSlide>
                                <img src="/images/contact/meat-vegetables-stew-black-pan.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/contact/vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-top-view-flat-lay.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/contact/delicious-lobster-gourmet-seafood.jpg" />
                            </SwiperSlide>
                        </BasicSwiper>
                    </div>
                    <Button variant="blue-outline" className="self-end">
                        Follow us
                    </Button>
                </div>
            </div>
        </section>
    );
};
