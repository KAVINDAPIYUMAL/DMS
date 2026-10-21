'use client';

import React, { createContext, useContext } from 'react';
import type { Language } from '@/types';
import { usePersistedState } from './usePersistedState';

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
  const [langStr, setLangStr] = usePersistedState('dms_language', 'en');
  const language: Language =
    langStr === 'si' || langStr === 'ta' ? (langStr as Language) : 'en';

  const setLanguage = (lang: Language) => {
    setLangStr(lang);
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
