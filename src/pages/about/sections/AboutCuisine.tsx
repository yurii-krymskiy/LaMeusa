
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Button } from "../../../components/ui/Button";

export const AboutCuisine = () => {
    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-15">
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
                    </div>
                    <img
                        src="/images/about/image-1.jpg"
                        alt="image"
                        className="max-w-full h-[400px] lg:h-auto lg:max-w-[660px] object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};
