import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import our 4 language files
import en from './locales/en.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import mwr from './locales/mwr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            hi: { translation: hi },
            kn: { translation: kn },
            mwr: { translation: mwr }
        },
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false 
        }
    });

export default i18n;