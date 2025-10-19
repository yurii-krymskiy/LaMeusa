import { Button } from "../../../components/ui/Button";

export const HomeReserve = () => {
    return (
        <section className="section">
            <div className="container flex flex-col items-center md:flex-row">
                <img
                    src="/images/home/image-16.png"
                    alt="image"
                    className="max-w-[610px]"
                />

                <div className="md:-ml-10">
                    <div className="mb-10">
                        <span className="decorative mb-2.5">
                            Reserve a Table
                        </span>
                        <div className="title section-title">
                            Make your dinner special
                        </div>
                        <p className="description section-description mb-2">
                            Book a table and spend an evening in an atmosphere
                            of sophistication and inspiration.
                        </p>
                        <p className="description section-description">
                            Your evening at <b>La Medusa</b> will be a story you
                            will want to return to.
                        </p>
                    </div>
                    <Button variant="blue">Make a reservation</Button>
                </div>
            </div>
        </section>
    );
};
