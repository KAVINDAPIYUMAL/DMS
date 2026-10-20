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
      <div className={`inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-white/[0.05] border border-white/10 ${className}`}>
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-200 cursor-pointer tracking-wide ${
                isActive
                  ? 'bg-[#7A0C0C] text-white border border-[#C5A059]/40 shadow-sm'
                  : 'text-[#D5C7B0]/50 hover:text-[#D5C7B0]'
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
            ? 'bg-[#500000] text-[#FAF6F0] border-[#8C0B0B] hover:bg-[#6B0000]'
            : 'bg-[#FDFBF7] text-[#6B0000] border-[#E8DEC8] hover:border-[#6B0000]'
        }`}
      >
        <option value="en" className="bg-[#1F0808] text-[#FAF6F0]">
          English (EN)
        </option>
        <option value="si" className="bg-[#1F0808] text-[#FAF6F0]">
          සිංහල (Sinhala)
        </option>
        <option value="ta" className="bg-[#1F0808] text-[#FAF6F0]">
          தமிழ் (Tamil)
        </option>
      </select>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 ${
          isGlass ? 'text-[#C5A059]' : isMaroon ? 'text-[#FAF6F0]' : 'text-[#6B0000]'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

