export const HomeStory = () => {
    return (
        <section className="section decorative-line">
            <div className="container">
                <div className="mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-6 h-[22px] w-[22px]"
                    />
                    <p className="title section-title mb-6 text-center text-[48px]">
                        Every dish tells a story
                    </p>
                    <p className="description section-description text-center">
                        At La Medusa, every ingredient, every flavor is a
                        grateful embodiment of Mediterranean
                        <br /> tradition. Our chefs strive for each dish to be
                        not just food, but an emotion that stays with you.
                    </p>
                </div>

                <div className="no-scrollbar flex w-full flex-row items-start gap-4 overflow-x-auto scroll-smooth px-4 pb-4 snap-x snap-mandatory md:gap-10 md:justify-center md:overflow-visible md:px-0 md:pb-0">
                    <img
                        src="/images/home/image-1.jpg"
                        alt="image"
                        className="min-w-[200px] max-w-[200px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[258px]"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-2.jpg"
                        alt="image"
                        className="min-w-[240px] max-w-[240px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[320px]"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-5.jpg"
                        alt="image"
                        className="min-w-[260px] max-w-[260px] snap-center self-end object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[344px]"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-4.jpg"
                        alt="image"
                        className="min-w-[200px] max-w-[200px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[258px]"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};
