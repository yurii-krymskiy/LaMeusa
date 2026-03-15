import { Accordion } from "../../../components/ui/Accordion";
import { useTranslation } from "react-i18next";


export const HomeQueries = () => {
    const { t } = useTranslation();

    const queries = [
        {
            title: t("home.queries.q1"),
            content: t("home.queries.a1"),
        },
        {
            title: t("home.queries.q2"),
            content: t("home.queries.a2"),
        },
        {
            title: t("home.queries.q3"),
            content: t("home.queries.a3"),
        },
        {
            title: t("home.queries.q4"),
            content: t("home.queries.a4"),
        },
        {
            title: t("home.queries.q5"),
            content: t("home.queries.a5"),
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
                        {t("home.queries.title")}
                    </p>
                </div>
                <div className="mx-auto max-w-[900px]">
                    <Accordion list={queries} />
                </div>
            </div>
        </section>
    );
};
