import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ariscanai_lang';
const SUPPORTED_LANGS = ['kk', 'ru'];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') {
      return 'kk';
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : 'kk';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const switchTo = (nextLang) => {
    if (SUPPORTED_LANGS.includes(nextLang)) {
      setLang(nextLang);
    }
  };

  const toggle = () => {
    setLang((prev) => (prev === 'kk' ? 'ru' : 'kk'));
  };

  const value = useMemo(
    () => ({ lang, switchTo, toggle, supported: SUPPORTED_LANGS }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
