import { Accordion } from "../../../components/ui/Accordion";


export const HomeQueries = () => {
    const queries = [
        {
            title: "Lorem lorem lorem lorem",
            content:
                "Sea, sun and soul - all this in every plate. We prefer local and fresh products, combined with delicate execution: this is the path to true taste.",
        },
        {
            title: "Lorem lorem lorem lorem",
            content:
                "Sea, sun and soul - all this in every plate. We prefer local and fresh products, combined with delicate execution: this is the path to true taste.",
        },
        {
            title: "Lorem lorem lorem lorem",
            content:
                "Sea, sun and soul - all this in every plate. We prefer local and fresh products, combined with delicate execution: this is the path to true taste.",
        },
        {
            title: "Lorem lorem lorem lorem",
            content:
                "Sea, sun and soul - all this in every plate. We prefer local and fresh products, combined with delicate execution: this is the path to true taste.",
        },
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="mb-4 lg:mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 lg:mb-6 h-[22px] w-[22px]"
                    />
                    <p className="title section-title !mb-5 lg:!mb-6 text-center text-[48px]">
                        Any Queries?
                    </p>
                </div>
                <div className="mx-auto max-w-[900px]">
                    <Accordion list={queries} />
                </div>
            </div>
        </section>
    );
};
