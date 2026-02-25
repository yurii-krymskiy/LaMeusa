import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const SeafoodPhilosophy = () => {
    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="mx-auto mb-10 max-w-[850px] text-center">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-6 size-[22px]"
                    />
                    <p className="title section-title">
                        Our Philosophy of Seafood
                    </p>
                    <p className="description section-description">
                        We believe that the secret to a perfect meal is fresh
                        fish and seafood, carefully selected spices and a
                        balance of flavors. Our dishes combine simplicity,
                        authenticity and sophisticated presentation, so that
                        every bite gives the atmosphere of a seaside vacation.
                    </p>
                </div>

                <div className="mb-10 flex flex-col justify-between gap-14 md:flex-row">
                    <div className="">
                        <img src="/images/seafood/image-2.webp" />
                    </div>
                    <div className="">
                        <img src="/images/seafood/image-1.webp" />
                    </div>
                </div>

                <p className="description section-description mx-auto max-w-3xl mb-10 text-center">
                    Seafood at <b>La Medusa</b> is part of history and culture.
                    We want every meal to be more than just lunch or dinner, but
                    a moment to remember.
                </p>
                <div>
                    <img src="/images/seafood/image-3.webp" loading="lazy" />
                </div>
            </div>
        </section>
    );
};
