import { Button } from "../../../components/ui/Button";

export const HomeAboutUs = () => {
    return (
        <section className="section">
            <div className="container flex flex-col items-center gap-4 md:flex-row md:gap-15">
                <div>
                    <div className="mb-10">
                        <p className="decorative">About Us</p>
                        <p className="title section-title">
                            The Spirit of
                            <br />
                            La Medusa
                        </p>
                        <p className="description section-description mb-3.5 inline-block">
                            <b>La Medusa</b> is more than a restaurant. It is a
                            place where the ocean meets elegance: views of the
                            waves, service with soul, and an atmosphere that
                            invites you to linger.
                        </p>
                        <p className="description section-description inline-block">
                            At <b>La Medusa</b>, everything is important: from
                            the way the light falls on the tables to the music
                            played in the evening. We strive to make every guest
                            feel like they are not just a visitor, but part of
                            the restaurant's history.
                        </p>
                    </div>
                    <Button variant="blue-outline">Learn More</Button>
                </div>
                <img
                    src="/images/home/image-10.jpg"
                    alt="image"
                    className="max-w-[660px] object-cover"
                    loading="lazy"
                />
            </div>
        </section>
    );
};
