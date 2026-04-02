import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { LegalLayout, Section, Paragraph, BulletList } from "./LegalLayout";

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <LegalLayout
            title={t("privacy.title")}
            subtitle={t("privacy.subtitle")}
        >
            <SEO
                title={t("seo.privacyPolicy.title")}
                description={t("seo.privacyPolicy.description")}
                path="/privacy-policy"
            />
            <Section title={t("privacy.s1.title")}>
                <Paragraph>{t("privacy.s1.p1")}</Paragraph>
                <Paragraph>{t("privacy.s1.p2")}</Paragraph>
                <Paragraph>{t("privacy.s1.p3")}</Paragraph>
                <Paragraph>{t("privacy.s1.p4")}</Paragraph>
            </Section>

            <Section title={t("privacy.s2.title")}>
                <Paragraph>{t("privacy.s2.p1")}</Paragraph>
                <div className="mb-4 rounded-lg bg-white p-5 shadow-sm">
                    <p className="description text-base md:text-lg font-semibold">{t("privacy.s2.name")}</p>
                    <p className="description text-base md:text-lg">{t("privacy.s2.location")}</p>
                    <p className="description text-base md:text-lg text-sky">{t("privacy.s2.website")}</p>
                </div>
                <Paragraph>{t("privacy.s2.p2")}</Paragraph>
            </Section>

            <Section title={t("privacy.s3.title")}>
                <h3 className="title text-lg mb-2">{t("privacy.s3.sub1")}</h3>
                <BulletList items={t("privacy.s3.items1", { returnObjects: true }) as string[]} />
                <h3 className="title text-lg mb-2 mt-4">{t("privacy.s3.sub2")}</h3>
                <BulletList items={t("privacy.s3.items2", { returnObjects: true }) as string[]} />
            </Section>

            <Section title={t("privacy.s4.title")}>
                <Paragraph>{t("privacy.s4.p1")}</Paragraph>
                <BulletList items={t("privacy.s4.items", { returnObjects: true }) as string[]} />
                <Paragraph>{t("privacy.s4.p2")}</Paragraph>
            </Section>

            <Section title={t("privacy.s5.title")}>
                <Paragraph>{t("privacy.s5.p1")}</Paragraph>
                <BulletList items={t("privacy.s5.items", { returnObjects: true }) as string[]} />
            </Section>

            <Section title={t("privacy.s6.title")}>
                <Paragraph>{t("privacy.s6.p1")}</Paragraph>
                <Paragraph>{t("privacy.s6.p2")}</Paragraph>
                <BulletList items={t("privacy.s6.items", { returnObjects: true }) as string[]} />
                <Paragraph>{t("privacy.s6.p3")}</Paragraph>
            </Section>

            <Section title={t("privacy.s7.title")}>
                <Paragraph>{t("privacy.s7.p1")}</Paragraph>
                <Paragraph>{t("privacy.s7.p2")}</Paragraph>
                <Paragraph>{t("privacy.s7.p3")}</Paragraph>
            </Section>

            <Section title={t("privacy.s8.title")}>
                <Paragraph>{t("privacy.s8.p1")}</Paragraph>
                <BulletList items={t("privacy.s8.items", { returnObjects: true }) as string[]} />
                <Paragraph>{t("privacy.s8.p2")}</Paragraph>
            </Section>

            <Section title={t("privacy.s9.title")}>
                <Paragraph>{t("privacy.s9.p1")}</Paragraph>
                <Paragraph>{t("privacy.s9.p2")}</Paragraph>
                <BulletList items={t("privacy.s9.items", { returnObjects: true }) as string[]} />
                <Paragraph>{t("privacy.s9.p3")}</Paragraph>
            </Section>

            <Section title={t("privacy.s10.title")}>
                <Paragraph>{t("privacy.s10.p1")}</Paragraph>
                <BulletList items={t("privacy.s10.items", { returnObjects: true }) as string[]} />
                <Paragraph>{t("privacy.s10.p2")}</Paragraph>
            </Section>

            <Section title={t("privacy.s11.title")}>
                <Paragraph>{t("privacy.s11.p1")}</Paragraph>
                <Paragraph>{t("privacy.s11.p2")}</Paragraph>
            </Section>

            <Section title={t("privacy.s12.title")}>
                <Paragraph>{t("privacy.s12.p1")}</Paragraph>
                <Paragraph>{t("privacy.s12.p2")}</Paragraph>
            </Section>
        </LegalLayout>
    );
};

export default PrivacyPolicy;
