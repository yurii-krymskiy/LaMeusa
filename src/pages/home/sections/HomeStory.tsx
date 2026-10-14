import { useTranslation } from "react-i18next";

export const HomeStory = () => {
    const { t } = useTranslation();

    return (
        <section className="section decorative-line">
            <div className="container">
                <div className="mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-2 lg:mb-6 h-[22px] w-[22px]"
                        width={22}
                        height={22}
                    />
                    <h2 className="title section-title mb-6 text-center text-[48px]">
                        {t("home.story.title")}
                    </h2>
                    <p className="description section-description text-center">
                        {t("home.story.description")}
                    </p>
                </div>

                <div className="no-scrollbar flex w-full flex-row items-start gap-4 overflow-x-auto scroll-smooth px-4 pb-4 snap-x snap-mandatory md:gap-10 md:justify-center md:overflow-visible md:px-0 md:pb-0">
                    <img
                        src="/images/home/image-2.webp"
                        alt="image"
                        className="min-w-[200px] h-[258px] max-w-[200px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[258px]"
                        loading="lazy"
                        width={800}
                        height={1200}
                    />
                    <img
                        src="/images/home/image-4.webp"
                        alt="image"
                        className="min-w-[240px] h-[293px] max-w-[240px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[320px]"
                        loading="lazy"
                        width={800}
                        height={1200}
                    />
                    <img
                        src="/images/home/image-1.webp"
                        alt="image"
                        className="min-w-[260px] h-[205px] max-w-[260px] snap-center self-end object-cover object-center transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[344px]"
                        loading="lazy"
                        width={800}
                        height={1200}
                    />
                    <img
                        src="/images/home/image-5.webp"
                        alt="image"
                        className="min-w-[200px] h-[258px] max-w-[200px] snap-center object-cover transition-transform duration-300 hover:scale-[1.02] md:min-w-0 md:max-w-[258px]"
                        loading="lazy"
                        width={809}
                        height={1200}
                    />
                </div>
            </div>
        </section>
    );
};
