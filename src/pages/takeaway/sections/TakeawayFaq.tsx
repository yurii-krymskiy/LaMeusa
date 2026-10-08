import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Accordion } from "../../../components/ui/Accordion";

const faqKeys = ["q1", "q2", "q3", "q4", "q5"];

export const TakeawayFaq = () => {
    const { t } = useTranslation();

    const items = faqKeys.map((key) => ({
        title: t(`takeaway.faq.items.${key}.question`),
        content: t(`takeaway.faq.items.${key}.answer`),
    }));

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: { "@type": "Answer", text: item.content },
        })),
    };

    return (
        <section className="section">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqJsonLd)}
                </script>
            </Helmet>
            <div className="container">
                <div className="mb-4 lg:mb-9">
                    <img
                        src="/icons/star.svg"
                        alt="star"
                        className="mx-auto mb-1.5 h-[22px] w-[22px] lg:mb-6"
                    />
                    <h2 className="title section-title !mb-5 text-center lg:!mb-6">
                        {t("takeaway.faq.title")}
                    </h2>
                </div>
                <div className="mx-auto max-w-[900px]">
                    <Accordion list={items} />
                </div>
            </div>
        </section>
    );
};
