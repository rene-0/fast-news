import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en.json'
import ptBrTranslation from './ptbr.json'

const i18nConfigs: InitOptions = {
  compatibilityJSON: 'v3',
  debug: false,
  resources: {
    en: enTranslation,
    ptBr: ptBrTranslation,
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  defaultNS: 'common',
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init(i18nConfigs)
}
