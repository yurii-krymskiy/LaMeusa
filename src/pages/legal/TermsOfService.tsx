import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { LegalLayout, Section, Paragraph, BulletList } from "./LegalLayout";

const TermsOfService = () => {
    const { t, i18n } = useTranslation();

    const exists = (key: string) => i18n.exists(key);
    const items = (key: string) => t(key, { returnObjects: true }) as string[];

    return (
        <LegalLayout
            title={t("terms.title")}
            subtitle={t("terms.subtitle")}
        >
            <SEO
                title={t("seo.termsOfService.title")}
                description={t("seo.termsOfService.description")}
                path="/terms-of-service"
            />
            {/* 1. Introduction */}
            <Section title={t("terms.s1.title")}>
                <Paragraph>{t("terms.s1.p1")}</Paragraph>
                <Paragraph>{t("terms.s1.p2")}</Paragraph>
                {exists("terms.s1.p3") && <Paragraph>{t("terms.s1.p3")}</Paragraph>}
            </Section>

            {/* 2. Restaurant Information */}
            <Section title={t("terms.s2.title")}>
                <div className="rounded-lg bg-gray-50 p-5 mb-4">
                    <p className="description text-base md:text-lg"><strong>{t("terms.s2.name")}</strong></p>
                    <p className="description text-base md:text-lg">{t("terms.s2.location")}</p>
                    <p className="description text-base md:text-lg">{t("terms.s2.website")}</p>
                </div>
                <Paragraph>{t("terms.s2.p1")}</Paragraph>
            </Section>

            {/* 3. Reservations */}
            <Section title={t("terms.s3.title")}>
                <Paragraph>{t("terms.s3.p1")}</Paragraph>
                <BulletList items={items("terms.s3.items")} />
                {exists("terms.s3.p2") && <Paragraph>{t("terms.s3.p2")}</Paragraph>}
                {exists("terms.s3.p3") && <Paragraph>{t("terms.s3.p3")}</Paragraph>}
                {exists("terms.s3.p4") && <Paragraph>{t("terms.s3.p4")}</Paragraph>}
            </Section>

            {/* 4. Deposits */}
            <Section title={t("terms.s4.title")}>
                <Paragraph>{t("terms.s4.p1")}</Paragraph>
                <BulletList items={items("terms.s4.items")} />
                {exists("terms.s4.p2") && <Paragraph>{t("terms.s4.p2")}</Paragraph>}
                {exists("terms.s4.p3") && <Paragraph>{t("terms.s4.p3")}</Paragraph>}
                {exists("terms.s4.p4") && <Paragraph>{t("terms.s4.p4")}</Paragraph>}
            </Section>

            {/* 5. Cancellation */}
            <Section title={t("terms.s5.title")}>
                <Paragraph>{t("terms.s5.p1")}</Paragraph>
                {exists("terms.s5.p2") && <Paragraph>{t("terms.s5.p2")}</Paragraph>}
                <BulletList items={items("terms.s5.items")} />
                {exists("terms.s5.p3") && <Paragraph>{t("terms.s5.p3")}</Paragraph>}
                {exists("terms.s5.items2") && <BulletList items={items("terms.s5.items2")} />}
            </Section>

            {/* 6. Prices */}
            <Section title={t("terms.s6.title")}>
                <Paragraph>{t("terms.s6.p1")}</Paragraph>
                {exists("terms.s6.p2") && <Paragraph>{t("terms.s6.p2")}</Paragraph>}
                {exists("terms.s6.p3") && <Paragraph>{t("terms.s6.p3")}</Paragraph>}
                {exists("terms.s6.items") && <BulletList items={items("terms.s6.items")} />}
                {exists("terms.s6.p4") && <Paragraph>{t("terms.s6.p4")}</Paragraph>}
            </Section>

            {/* 7. Conduct */}
            <Section title={t("terms.s7.title")}>
                <Paragraph>{t("terms.s7.p1")}</Paragraph>
                {exists("terms.s7.p2") && <Paragraph>{t("terms.s7.p2")}</Paragraph>}
                {exists("terms.s7.items") && <BulletList items={items("terms.s7.items")} />}
            </Section>

            {/* 8. Allergies */}
            <Section title={t("terms.s8.title")}>
                <Paragraph>{t("terms.s8.p1")}</Paragraph>
                {exists("terms.s8.p2") && <Paragraph>{t("terms.s8.p2")}</Paragraph>}
            </Section>

            {/* 9+: Conditional sections (varies by language) */}
            {exists("terms.s9.title") && (
                <Section title={t("terms.s9.title")}>
                    <Paragraph>{t("terms.s9.p1")}</Paragraph>
                    {exists("terms.s9.p2") && <Paragraph>{t("terms.s9.p2")}</Paragraph>}
                    {exists("terms.s9.items") && <BulletList items={items("terms.s9.items")} />}
                    {exists("terms.s9.p3") && <Paragraph>{t("terms.s9.p3")}</Paragraph>}
                </Section>
            )}

            {exists("terms.s10.title") && (
                <Section title={t("terms.s10.title")}>
                    <Paragraph>{t("terms.s10.p1")}</Paragraph>
                    {exists("terms.s10.p2") && <Paragraph>{t("terms.s10.p2")}</Paragraph>}
                    {exists("terms.s10.items") && <BulletList items={items("terms.s10.items")} />}
                    {exists("terms.s10.p3") && <Paragraph>{t("terms.s10.p3")}</Paragraph>}
                    {exists("terms.s10.p4") && <Paragraph>{t("terms.s10.p4")}</Paragraph>}
                    {exists("terms.s10.p5") && <Paragraph>{t("terms.s10.p5")}</Paragraph>}
                </Section>
            )}

            {exists("terms.s11.title") && (
                <Section title={t("terms.s11.title")}>
                    <Paragraph>{t("terms.s11.p1")}</Paragraph>
                    {exists("terms.s11.items") && <BulletList items={items("terms.s11.items")} />}
                    {exists("terms.s11.p2") && <Paragraph>{t("terms.s11.p2")}</Paragraph>}
                </Section>
            )}

            {exists("terms.s12.title") && (
                <Section title={t("terms.s12.title")}>
                    <Paragraph>{t("terms.s12.p1")}</Paragraph>
                    {exists("terms.s12.p2") && <Paragraph>{t("terms.s12.p2")}</Paragraph>}
                </Section>
            )}

            {exists("terms.s13.title") && (
                <Section title={t("terms.s13.title")}>
                    <Paragraph>{t("terms.s13.p1")}</Paragraph>
                    {exists("terms.s13.p2") && <Paragraph>{t("terms.s13.p2")}</Paragraph>}
                </Section>
            )}
        </LegalLayout>
    );
};

export default TermsOfService;
