import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uk from "./locales/uk.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { getLanguageFromPath } from "./lib/i18nRouting";

i18n.use(initReactI18next).init({
    resources: {
        uk: { translation: uk },
        en: { translation: en },
        es: { translation: es },
    },
    lng: getLanguageFromPath(window.location.pathname),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
