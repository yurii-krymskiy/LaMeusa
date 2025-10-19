import { Button } from "../../../components/ui/Button";

export const AboutCuisine = () => {
    return (
        <section className="section">
            <div className="container flex flex-col items-center gap-4 md:flex-row md:gap-15">
                <div className="">
                    <div className="mb-10">
                        <p className="decorative">Food Story</p>
                        <p className="title section-title">Our Cuisine</p>
                        <p className="description section-description mb-3.5 inline-block">
                            <b>La Medusa</b> dishes are a combination of
                            Mediterranean tradition with a modern vision. We
                            prepare so that each dish is a story: textures,
                            flavors, aromas - everything is felt.
                        </p>
                        <p className="description section-description inline-block">
                            Our chef experiments with accompaniments to the sea,
                            using local products and recipes that have been
                            enriched over the years.
                        </p>
                    </div>
                    <Button variant="blue">View Menu</Button>
                    <Button variant="default">
                        Watch Video{" "}
                        <img src="/icons/play.svg" className="size-[50px]" />
                    </Button>
                </div>
                <img
                    src="/images/about/image-1.jpg"
                    alt="image"
                    className="max-w-[660px]  object-cover"
                    loading="lazy"
                />
            </div>
        </section>
    );
};
