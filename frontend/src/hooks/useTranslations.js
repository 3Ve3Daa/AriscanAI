import { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

export const useTranslations = () => {
  const { lang } = useLanguage();

  return useMemo(() => translations[lang] || translations.kk, [lang]);
};
