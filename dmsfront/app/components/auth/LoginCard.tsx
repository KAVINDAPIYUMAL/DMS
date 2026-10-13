'use client';

import React, { useState } from 'react';
import { Dictionary, Language } from '../../types';
import LanguageSelector from '../ui/LanguageSelector';

interface LoginCardProps {
  dict: Dictionary;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginSuccess: () => void;
}

const labels: Record<Language, { username: string; password: string; login: string; dept: string; system: string }> = {
  en: {
    dept: 'Department of Government Information',
    system: 'Document Tracking & Workflow System',
    username: 'Username',
    password: 'Password',
    login: 'Sign In',
  },
  si: {
    dept: 'රජයේ ප්‍රවෘත්ති දෙපාර්තමේන්තුව',
    system: 'ලේඛන ලුහුබැඳීමේ සහ කාර්ය ප්‍රවාහ පද්ධතිය',
    username: 'පරිශීලක නාමය',
    password: 'මුරපදය',
    login: 'ඇතුළු වන්න',
  },
  ta: {
    dept: 'அரச தகவல் திணைக்களம்',
    system: 'ஆவண கண்காணிப்பு & பணிப்பாய்வு முறைமை',
    username: 'பயனர்பெயர்',
    password: 'கடவுச்சொல்',
    login: 'உள்நுழைக',
  },
};

export default function LoginCard({
  currentLanguage,
  onLanguageChange,
  onLoginSuccess,
}: LoginCardProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = labels[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(currentLanguage === 'si'
        ? 'පරිශීලක නාමය සහ මුරපදය ඇතුළත් කරන්න.'
        : currentLanguage === 'ta'
        ? 'பயனர்பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.'
        : 'Please enter your username and password.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 900);
  };

  return (
    <div className="w-full max-w-sm">
      {/* Language Switcher */}
      <div className="flex justify-end mb-8">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          variant="pills"
        />
      </div>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-2">
          Government of Sri Lanka
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1">
          {t.dept}
        </h1>
        <div className="h-px w-12 bg-[#C5A059] my-4" />
        <p className="text-sm text-white/70 font-medium leading-relaxed">
          {t.system}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 px-4 py-3 rounded-lg bg-red-900/40 border border-red-500/40 text-red-300 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">
            {t.username}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#C5A059]/70 focus:ring-1 focus:ring-[#C5A059]/40 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">
            {t.password}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#C5A059]/70 focus:ring-1 focus:ring-[#C5A059]/40 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#C5A059] transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group bg-gradient-to-r from-[#1a2540] to-[#0d1526] hover:from-[#243352] hover:to-[#1a2540] text-white border border-[#C5A059]/40 hover:border-[#C5A059]/70 shadow-lg shadow-[#090d16]/50"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            {isLoading ? (
              <span className="flex items-center justify-center gap-2.5">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Authenticating…</span>
              </span>
            ) : (
              t.login
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
