
import ScrollCircle from "../../../components/features/ScrollCircle";
import { Button } from "../../../components/ui/Button";

export const HomeHero = () => {
    return (
        <main className="hero home-hero">
            <div className="mb-10 max-w-6xl">
                <h2 className="title hero-title">
                    A Morning by the Ocean, A Dinner with Elegance
                </h2>
                <p className="description hero-description">
                    Experience the taste of Mediterranean cuisine against the
                    backdrop of the Atlantic Ocean. At La <b>Medusa</b>, we
                    create an atmosphere where every moment is a pleasure and
                    every dish is a story.
                </p>
            </div>
            <Button
                variant="white-outline"
                className="mb-20"
            >Book Now</Button>
            <ScrollCircle />
        </main>
    );
};
