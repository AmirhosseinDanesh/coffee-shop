import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "../i18n/en"
import fa from "../i18n/fa"
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: en
      },
      fa: {
        translation: fa
      }
    },
    lng: "fa",
    fallbackLng: "fa",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });



