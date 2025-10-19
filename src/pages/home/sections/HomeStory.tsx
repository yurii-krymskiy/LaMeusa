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

                <div className="flex w-full flex-row items-start justify-center gap-10">
                    <img
                        src="/images/home/image-1.jpg"
                        alt="image"
                        className="max-w-[258px] object-cover"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-2.jpg"
                        alt="image"
                        className="max-w-[320px] object-cover"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-5.jpg"
                        alt="image"
                        className="max-w-[344px] self-end object-cover"
                        loading="lazy"
                    />
                    <img
                        src="/images/home/image-4.jpg"
                        alt="image"
                        className="max-w-[258px] object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};
