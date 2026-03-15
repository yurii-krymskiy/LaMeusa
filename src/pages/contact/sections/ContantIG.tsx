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
                        <a href="https://www.instagram.com/la_medusa_tenerife?igsh=MWRxa212a3N4aXlrdQ==" target="_blank" rel="noreferrer" className="title button button-blue-outline self-end">
                            {t("contact.instagram.button")}
                        </a>
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
                    <a href="https://www.instagram.com/la_medusa_tenerife?igsh=MWRxa212a3N4aXlrdQ==" target="_blank" rel="noreferrer" className="title button button-blue-outline self-end">
                        {t("contact.instagram.button")}
                    </a>
                </div>
            </div>
        </section>
    );
};
