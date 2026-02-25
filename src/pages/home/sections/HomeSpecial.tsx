import { SwiperSlide } from "swiper/react";
import { BasicSwiper } from "../../../components/features/BasicSwiper";
import { ButtonArrow } from "../../../components/ui/ButtonArrow";
import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const HomeSpecial = () => {
    const specials = [
        {
            src: "/images/home/special-1.jpg",
            title: "Two Burgers for One",
            description: (
                <>
                    From <b>2:30 PM</b> to <b>6 PM</b>, get two burgers for the
                    price of one.
                </>
            ),
        },
        {
            src: "/images/home/special-2.jpg",
            title: "Pasta Lovers Hour",
            description: (
                <>
                    Every <b>Tuesday</b> and <b>Wednesday</b> from{" "}
                    <b>2:00 PM</b> to <b>5:00 PM</b>, a glass of wine as a gift
                    with any pasta.
                </>
            ),
        },
        {
            src: "/images/home/special-3.jpg",
            title: "Seafood Set + Wine",
            description: (
                <>
                    Daily from <b>3:00 PM</b> to <b>5:00 PM</b>, when ordering a
                    seafood set, a glass of white wine is free.
                </>
            ),
        },
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="mb-4 lg:mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 h-[22px] w-[22px]"
                    />
                    <p className="title section-title !mb-5 lg:!mb-6 text-center text-[48px]">
                        Special Deals
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
                            Discover Full Menu
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
                            <div className="mb-7 text-left">
                                <span className="title mb-2 inline-block text-2xl font-bold capitalize">
                                    {item.title}
                                </span>
                                <p className="description md:text-lg">
                                    {item.description}
                                </p>
                            </div>
                            <ButtonArrow>Reserve a Table</ButtonArrow>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
