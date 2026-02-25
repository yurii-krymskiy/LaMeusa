export const PastaMeets = () => {
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="mb-5 lg:mb-10 text-center">
                        <span className="decorative mb-2.5">
                            Reserve a Table
                        </span>
                        <div className="title section-title">
                            Tradition Meets Creativity
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:gap-14 md:flex-row">
                        <div className="max-w-[740px]">
                            <img
                                src="/images/pasta/image-6.webp"
                                alt=""
                                className="mb-6 min-h-[200px] object-cover"
                            />
                            <p className="section-description description mb-4">
                                Pasta is a dish that has passed through the
                                centuries and remains a symbol of comfort and
                                gastronomic culture. In Italy, each region has
                                its own recipes and secrets, and we are inspired
                                by these traditions to create our own
                                interpretations.
                            </p>
                            <p className="section-description description mb-4">
                                At <b>La Medusa</b>, we believe that pasta is
                                the language of emotions: it can be simple yet
                                sophisticated, quick yet full of flavor. Our
                                chefs combine classic cooking techniques with a
                                modern vision to offer guests dishes that evoke
                                warm memories and new discoveries.
                            </p>
                            <p className="section-description description">
                                For us, pasta is not just food, but a moment
                                when time stops and you enjoy the harmony of
                                taste, aroma, and atmosphere.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/images/pasta/image-7.webp"
                                className="h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
