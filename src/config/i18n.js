import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translations.json';
import translationES from './locales/es/translations.json';
import detertor from './detertor';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(detertor);

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en',
  });

export default i18n;
