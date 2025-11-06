import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, getTranslation } from '../lib/i18n';

interface LanguageContextType {
  locale: Locale;
  t: ReturnType<typeof getTranslation>;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');
  
  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('sbl-locale') as Locale;
    if (saved === 'es' || saved === 'en') {
      setLocaleState(saved);
    }
  }, []);
  
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('sbl-locale', newLocale);
  };
  
  const t = getTranslation(locale);
  
  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
