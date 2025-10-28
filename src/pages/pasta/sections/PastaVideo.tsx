import ScrollCircle from "../../../components/features/ScrollCircle";

export const PastVideo = () => {
    return (
        <>
            <section className="bg-[url('/images/pasta/image-8.webp')] grid items-center bg-cover bg-no-repeat py-9 md:py-[151px] px-4">
                <div className="mx-auto max-w-[850px] text-center flex-col flex items-center">
                    <span className="section-title title mb-7 text-white">
                        From Our Kitchen With Love
                    </span>
                    <p className="description section-description mb-14 inline-block text-white">
                        We believe that our guests feel our love for the
                        process. From kneading the dough to the final touch on
                        the plate, La Medusa pasta is created with soul.
                    </p>

                    <ScrollCircle />

                </div>
            </section>
        </>
    );
};
