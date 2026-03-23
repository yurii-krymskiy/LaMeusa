import { useTranslation } from "react-i18next";
import { LegalLayout, Section, Paragraph, BulletList } from "./LegalLayout";

const CookiesSettings = () => {
    const { t, i18n } = useTranslation();

    const exists = (key: string) => i18n.exists(key);
    const items = (key: string) => t(key, { returnObjects: true }) as string[];

    return (
        <LegalLayout
            title={t("cookies.title")}
            subtitle={t("cookies.subtitle")}
        >
            {/* 1. What Are Cookies */}
            <Section title={t("cookies.s1.title")}>
                <Paragraph>{t("cookies.s1.p1")}</Paragraph>
                {exists("cookies.s1.p2") && <Paragraph>{t("cookies.s1.p2")}</Paragraph>}
            </Section>

            {/* 2. How We Use Cookies */}
            <Section title={t("cookies.s2.title")}>
                <Paragraph>{t("cookies.s2.p1")}</Paragraph>
                {exists("cookies.s2.items") && <BulletList items={items("cookies.s2.items")} />}
                {exists("cookies.s2.p2") && <Paragraph>{t("cookies.s2.p2")}</Paragraph>}
            </Section>

            {/* 3. Types of Cookies */}
            <Section title={t("cookies.s3.title")}>
                <div className="space-y-5">
                    <div className="rounded-lg bg-gray-50 p-5">
                        <h3 className="title text-lg mb-2">{t("cookies.s3.type1")}</h3>
                        <p className="description text-base md:text-lg">{t("cookies.s3.type1Desc")}</p>
                        {exists("cookies.s3.type1Examples") && (
                            <p className="description text-base md:text-lg mt-2">{t("cookies.s3.type1Examples")}</p>
                        )}
                        {exists("cookies.s3.type1Items") && <BulletList items={items("cookies.s3.type1Items")} />}
                        {exists("cookies.s3.type1Note") && (
                            <p className="description text-base md:text-lg mt-2 font-medium">{t("cookies.s3.type1Note")}</p>
                        )}
                    </div>
                    <div className="rounded-lg bg-gray-50 p-5">
                        <h3 className="title text-lg mb-2">{t("cookies.s3.type2")}</h3>
                        <p className="description text-base md:text-lg">{t("cookies.s3.type2Desc")}</p>
                        {exists("cookies.s3.type2Info") && (
                            <p className="description text-base md:text-lg mt-2">{t("cookies.s3.type2Info")}</p>
                        )}
                        {exists("cookies.s3.type2Items") && <BulletList items={items("cookies.s3.type2Items")} />}
                        {exists("cookies.s3.type2Note") && (
                            <p className="description text-base md:text-lg mt-2">{t("cookies.s3.type2Note")}</p>
                        )}
                    </div>
                    <div className="rounded-lg bg-gray-50 p-5">
                        <h3 className="title text-lg mb-2">{t("cookies.s3.type3")}</h3>
                        <p className="description text-base md:text-lg">{t("cookies.s3.type3Desc")}</p>
                    </div>
                </div>
            </Section>

            {/* 4. Third-Party Cookies */}
            <Section title={t("cookies.s4.title")}>
                <Paragraph>{t("cookies.s4.p1")}</Paragraph>
                {exists("cookies.s4.p2") && <Paragraph>{t("cookies.s4.p2")}</Paragraph>}
                {exists("cookies.s4.items") && <BulletList items={items("cookies.s4.items")} />}
                {exists("cookies.s4.p3") && <Paragraph>{t("cookies.s4.p3")}</Paragraph>}
            </Section>

            {/* 5. Managing Cookies */}
            <Section title={t("cookies.s5.title")}>
                <Paragraph>{t("cookies.s5.p1")}</Paragraph>
                {exists("cookies.s5.p2") && <Paragraph>{t("cookies.s5.p2")}</Paragraph>}
                {exists("cookies.s5.items1") && <BulletList items={items("cookies.s5.items1")} />}
                {exists("cookies.s5.p3") && <Paragraph>{t("cookies.s5.p3")}</Paragraph>}
                {exists("cookies.s5.p4") && <Paragraph>{t("cookies.s5.p4")}</Paragraph>}
                {exists("cookies.s5.items2") && <BulletList items={items("cookies.s5.items2")} />}
                {exists("cookies.s5.p5") && <Paragraph>{t("cookies.s5.p5")}</Paragraph>}
            </Section>

            {/* 6. Legal Basis */}
            {exists("cookies.s6.title") && (
                <Section title={t("cookies.s6.title")}>
                    <Paragraph>{t("cookies.s6.p1")}</Paragraph>
                    {exists("cookies.s6.items") && <BulletList items={items("cookies.s6.items")} />}
                    {exists("cookies.s6.p2") && <Paragraph>{t("cookies.s6.p2")}</Paragraph>}
                </Section>
            )}

            {/* 7. Updates */}
            {exists("cookies.s7.title") && (
                <Section title={t("cookies.s7.title")}>
                    <Paragraph>{t("cookies.s7.p1")}</Paragraph>
                    {exists("cookies.s7.p2") && <Paragraph>{t("cookies.s7.p2")}</Paragraph>}
                </Section>
            )}
        </LegalLayout>
    );
};

export default CookiesSettings;
