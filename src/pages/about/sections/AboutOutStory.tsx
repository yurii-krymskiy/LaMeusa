export const AboutOutStory = () => {
    return (
        <section className="section">
            <div className="container flex flex-col items-end gap-10 md:flex-row">
                <img
                    src="/images/about/image-3.webp"
                    className="max-w-[610px] self-stretch object-cover"
                />

                <div>
                    <span className="decorative">The Team</span>
                    <div className="title section-title">Our Story</div>
                    <p className="description section-description mb-3">
                        <b>La Medusa</b> was born from the idea of creating a
                        place where gastronomy and the sea come together in one
                        atmosphere. We have always believed that a restaurant is
                        not only about food, but also a space that conveys
                        emotions and gives a sense of the specialness of the
                        moment.
                    </p>
                    <p className="description section-description mb-3">
                        From the very beginning, we chose the path of
                        sophistication: fresh ingredients, thoughtful recipes,
                        and service that begins before you even arrive. The
                        panoramic ocean view was our inspiration - every evening
                        here turns into a story that you want to repeat.
                    </p>

                    <div className="flex gap-3.5 py-3">
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-5.jpg" />
                        </div>
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-6.jpg" />
                        </div>
                        <div className="max-w-[190px]">
                            <img src="/images/about/image-4.jpg" />
                        </div>
                    </div>
                    <p className="description section-description">
                        <b>La Medusa</b> is a team of people in love with
                        cooking and hospitality. We strive to make each of our
                        guests feel like they are not just a visitor, but a part
                        of the story we are writing together.
                    </p>
                </div>
            </div>
        </section>
    );
};
