import React from 'react';
import { Language } from '../../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  variant?: 'light' | 'maroon' | 'glass' | 'pills';
}

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'si', label: 'සිංහල', native: 'සිං' },
  { code: 'ta', label: 'தமிழ்', native: 'தமி' },
];

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  className = '',
  variant = 'light',
}: LanguageSelectorProps) {
  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-[#0a1628] border border-[#1e3a5f] ${className}`}>
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-200 cursor-pointer tracking-wide ${
                isActive
                  ? 'bg-[#1e40af] text-white border border-[#3b82f6]/50 shadow-sm shadow-[#2563eb]/20'
                  : 'text-[#64748b] hover:text-[#93c5fd]'
              }`}
              title={lang.label}
            >
              {lang.native}
            </button>
          );
        })}
      </div>
    );
  }

  const isGlass = variant === 'glass';
  const isMaroon = variant === 'maroon';

  return (
    <div className={`relative inline-block ${className}`}>
      <label htmlFor="language-select" className="sr-only">
        Select Language
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className={`appearance-none text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 pr-9 border shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] ${
          isGlass
            ? 'bg-black/30 text-[#FAF6F0] border-[#C5A059]/30 hover:border-[#C5A059] backdrop-blur-md'
            : isMaroon
            ? 'bg-[#0d1526] text-white border-[#1a2540] hover:bg-[#1a2540]'
            : 'bg-[#0d1526] text-white border-[#1a2540] hover:border-[#C5A059]'
        }`}
      >
        <option value="en" className="bg-[#0d1526] text-white">
          English (EN)
        </option>
        <option value="si" className="bg-[#0d1526] text-white">
          සිංහල (Sinhala)
        </option>
        <option value="ta" className="bg-[#0d1526] text-white">
          தமிழ் (Tamil)
        </option>
      </select>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 ${
          isGlass ? 'text-[#C5A059]' : isMaroon ? 'text-white' : 'text-white'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
