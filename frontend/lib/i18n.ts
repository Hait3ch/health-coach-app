import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import enGB from "./locales/en-GB/translation.json"
import fiFI from "./locales/fi-FI/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "fi-FI",
    fallbackLng: "en-GB",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      "en-GB": { translation: enGB },
      "fi-FI": { translation: fiFI },
    },
  })

export default i18n
