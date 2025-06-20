import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend) // JSON 파일에서 번역 로드
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next)
  .init({
      lng: 'ko',
      fallbackLng: 'en',
      debug: true,
      interpolation: { escapeValue: false },
      backend: { loadPath: '/locales/{{lng}}/translation.json' },
  })
  .then()

export default i18n
