import { Button } from "../../../components/ui/Button";

export const HomeMeets = () => {
    return (
        <>
            <section className="section decorative-line">
                <div className="container">
                    <div className="text-center">
                        <span className="decorative mb-2.5 text-[34px]">
                            Taste and atmosphere with an ocean view
                        </span>
                        <p className="title section-title mb-6 text-[48px]">
                            Where the sea meets taste
                        </p>
                    </div>
                    <div className="flex flex-col gap-16 lg:flex-row">
                        <div className="max-w-[730px]">
                            <img
                                src="/images/home/image-14.jpg"
                                alt=""
                                className="mb-6"
                            />

                            <p className="description section-description mb-2.5">
                                <b>La Medusa</b> is more than a restaurant. It
                                is a place where panoramic ocean views combine
                                with exquisite Mediterranean cuisine. We create
                                an atmosphere where taste and aesthetics become
                                a single experience.
                            </p>

                            <p className="description section-description mb-10">
                                We strive to make every dinner at La Medusa an
                                event you'll want to remember again.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="blue">View Menu</Button>
                                <Button variant="blue-outline">
                                    Reserve a Table
                                </Button>
                            </div>
                        </div>

                        <img
                            src="/images/home/image-15.jpg"
                            alt=""
                            className="max-w-[530px]"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
