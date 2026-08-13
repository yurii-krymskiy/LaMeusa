interface SeoKitchenSectionProps {
    decorative: string;
    title: string;
    image1: string;
    image2: string;
    paragraphs: string[];
}

export const SeoKitchenSection = ({
    decorative,
    title,
    image1,
    image2,
    paragraphs,
}: SeoKitchenSectionProps) => {
    return (
        <section className="section">
            <div className="container">
                <div className="mb-5 lg:mb-10 text-center">
                    <span className="decorative mb-2.5">{decorative}</span>
                    <h2 className="title section-title">{title}</h2>
                </div>

                <div className="flex flex-col gap-5 lg:gap-14 md:flex-row">
                    <div className="flex-2">
                        <img
                            src={image1}
                            alt=""
                            className="mb-6 max-h-[350px] object-cover"
                        />
                        {paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className={`section-description description ${index < paragraphs.length - 1 ? "mb-4" : ""}`}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="flex-1">
                        <img src={image2} className="h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};
