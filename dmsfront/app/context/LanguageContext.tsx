'use client';

import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLabel: (en: string, si?: string, ta?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  getLabel: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dms_language') as Language;
      if (saved && (saved === 'en' || saved === 'si' || saved === 'ta')) {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dms_language', lang);
    }
  };

  const getLabel = (en: string, si?: string, ta?: string) => {
    if (language === 'si' && si) return si;
    if (language === 'ta' && ta) return ta;
    return en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLabel }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
