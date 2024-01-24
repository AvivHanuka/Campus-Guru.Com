import i18n from "i18next";
import { initReactI18next } from "react-i18next"
import * as enTran from "@/translations/locales/en";
import * as heTran from "@/translations/locales/he";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "he",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          common: enTran.common,
          homePage: enTran.home,
          vision: enTran.vision,
          privacy: enTran.privacy,
          terms: enTran.terms,
          contact: enTran.contact,
          result: enTran.result,
          resultDetails: enTran.resultDetails,
          professor: enTran.professor,
        },
      },
      he: {
        translation: {
          common: heTran.common,
          homePage: heTran.home,
          vision: heTran.vision,
          privacy: heTran.privacy,
          terms: heTran.terms,
          contact: heTran.contact,
          result: heTran.result,
          resultDetails: heTran.resultDetails,
          professor: heTran.professor,
        },
      },
    },
  });
