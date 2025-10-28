import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const HappyHoursWhy = () => {
    return (
        <section className="section">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-24">
                    <div>
                        <div className="mb-10">
                            <span className="decorative mb-2.5 block">
                                Happy Hours
                            </span>
                            <span className="section-title title mb-7 inline-block">
                                Why You’ll Love Our Happy Hours
                            </span>
                            <p className="section-description description mb-2.5">
                                At this time, <b>La Medusa</b> turns into a place with
                                a special atmosphere. We welcome not only
                                profitable offers, but also a chance to try
                                signature cocktails, signature dishes and enjoy
                                live music.
                            </p>
                            <p className="section-description description">
                                Happy Hours are not only about saving money, but
                                also about new emotions.
                            </p>
                        </div>
                    </div>

                    <img
                        src="/images/happy-hours/image-1.webp"
                        className="max-w-[620px]"
                    />
                </div>
            </div>
        </section>
    );
};
