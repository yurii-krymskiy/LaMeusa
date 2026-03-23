import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import { BasicSwiper } from "../../../components/features/BasicSwiper";


export const ContactIG = () => {
    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto mb-5 lg:mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 size-[22px]"
                    />
                    <p className="title section-title">{t("contact.instagram.title")}</p>
                </div>

                <div className="hidden gap-5 xl:gap-10 lg:flex">
                    <div className="max-w-[560px] min-w-[315px] xl:min-w-[340px] min-h-[315px] xl:min-h-[340px]">
                        <img src="/images/contact/meat-vegetables-stew-black-pan.jpg" />
                    </div>
                    <div className="flex flex-col justify-between gap-3">
                        <div className="flex gap-5 xl:gap-10">
                            <div className="size-[315px] xl:size-[340px]">
                                <img src="/images/contact/vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-top-view-flat-lay.jpg" className="w-full h-full object-cover" />
                            </div>
                            <div className="size-[315px] xl:size-[340px]">
                                <img src="/images/contact/delicious-lobster-gourmet-seafood.jpg" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <a href="https://www.instagram.com/la_medusa_tenerife?igsh=MWRxa212a3N4aXlrdQ==" target="_blank" rel="noreferrer" className="title button button-blue-outline self-end">
                            {t("contact.instagram.button")}
                        </a>
                    </div>
                </div>

                <div className="block lg:hidden">
                    <div className="mb-5">
                        <BasicSwiper>
                            <SwiperSlide>
                                <img src="/images/contact/meat-vegetables-stew-black-pan.jpg" className="w-full h-[300px] object-cover" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/contact/vegetarian-buddha-bowl-raw-vegetables-baked-potatoes-bowl-vegan-meal-healthy-detox-food-concept-top-view-flat-lay.jpg" className="w-full h-[300px] object-cover" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/contact/delicious-lobster-gourmet-seafood.jpg" className="w-full h-[300px] object-cover" />
                            </SwiperSlide>
                        </BasicSwiper>
                    </div>
                    <a href="https://www.instagram.com/la_medusa_tenerife?igsh=MWRxa212a3N4aXlrdQ==" target="_blank" rel="noreferrer" className="title button button-blue-outline self-end">
                        {t("contact.instagram.button")}
                    </a>
                </div>
            </div>
        </section>
    );
};
