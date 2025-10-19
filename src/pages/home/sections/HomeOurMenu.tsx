import {Button} from "../../../components/ui/Button";

export const HomeOurMenu = () => {
    return (
        <section className="bg-white-100 section">
            <div className="container flex flex-col gap-15 md:flex-row">
                <img
                    src="/images/home/image-3.jpg"
                    alt="Image"
                    className="w-full object-cover md:w-[530px]"
                    loading="lazy"
                />
                <div className="flex flex-col justify-between">
                    <div className="mb-3.5">
                        <div className="mb-10">
                            <p className="decorative mb-2.5">Our Menu</p>
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

                    <div className="flex w-full flex-row gap-2">
                        <img
                            src="/images/home/image-6.jpg"
                            alt="img"
                            className="h-[160px] w-full object-cover"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-7.jpg"
                            alt="img"
                            className="h-[160px] w-full object-cover"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-8.jpg"
                            alt="img"
                            className="h-[160px] w-full object-cover"
                            loading="lazy"
                        />
                        <img
                            src="/images/home/image-9.jpg"
                            alt="img"
                            className="h-[160px] w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
