import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import { ContactHero } from "./sections/ContactHero";
import { ContactReserve } from "./sections/ContactReserve";
import { ContactUs } from "./sections/ContactUs";
import { ContactIG } from "./sections/ContantIG";

const Contact = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t("seo.contact.title")}
                description={t("seo.contact.description")}
                path="/contact"
            />
            <ContactHero />
            <ContactUs />
            <ContactIG />
            <ContactReserve />
        </>
    );
};

export default Contact;
