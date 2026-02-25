import {Button} from "../../../components/ui/Button";

export const HomeOurMenu = () => {
    return (
        <section className="bg-white-100 section">
            <div className="container flex flex-col gap-5 lg:gap-15 lg:flex-row">
                <img
                    src="/images/home/image-3.jpg"
                    alt="Image"
                    className="w-full object-cover h-[360px] md:h-[400px] lg:h-full lg:w-[530px]"
                    loading="lazy"
                />
                <div className="flex flex-col justify-between">
                    <div className="mb-3.5">
                        <div className="mb-5 lg:mb-10">
                            <p className="decorative">Our Menu</p>
                            <h3 className="title section-title">
                                Discover Our Menu
                            </h3>
                            <p className="description section-description mb-2.5">
                                Each of our dishes is a sophisticated
                                combination of fresh ingredients, ocean
                                freshness and unique flavors. Discover the menu,
                                created with love and inspiration, and let it
                                inspire you.
                            </p>
                            <p className="description section-description">
                                Our chefs create dishes from the freshest
                                ingredients. The basis is Mediterranean
                                tradition with an original accent.
                            </p>
                        </div>
                        <Button variant="blue">View Menu</Button>
                    </div>

                    <div className="no-scrollbar -mx-5 flex w-[calc(100%+40px)] flex-row gap-2 overflow-x-auto scroll-smooth px-5 pb-2 snap-x snap-mandatory md:mx-0 md:w-full md:overflow-visible md:px-0 md:pb-0">
                        <img
                            src="/images/home/image-6.jpg"
                            alt="img"
                            className="h-[140px] min-w-[180px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:h-[160px] md:min-w-0 md:w-full"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-7.jpg"
                            alt="img"
                            className="h-[140px] min-w-[180px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:h-[160px] md:min-w-0 md:w-full"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-8.jpg"
                            alt="img"
                            className="h-[140px] min-w-[180px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:h-[160px] md:min-w-0 md:w-full"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-9.jpg"
                            alt="img"
                            className="h-[140px] min-w-[180px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:h-[160px] md:min-w-0 md:w-full"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
