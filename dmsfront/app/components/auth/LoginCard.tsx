'use client';

import React, { useState } from 'react';
import { Dictionary, Language } from '@/types';
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
        <div className="flex items-center gap-2 mb-3">
          {/* Industrial shield icon */}
          <svg className="w-5 h-5 text-[#38bdf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#38bdf8]">
            Secure Access
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1">
          {t.dept}
        </h1>
        <div className="flex items-center gap-2 my-4">
          <div className="h-px w-10 bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" />
          <div className="w-1.5 h-1.5 rounded-sm bg-[#38bdf8] rotate-45" />
          <div className="h-px w-6 bg-[#1e3a5f]" />
        </div>
        <p className="text-sm text-[#94a3b8] font-medium leading-relaxed">
          {t.system}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 px-4 py-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label htmlFor="username" className="flex items-center gap-1.5 text-xs font-semibold text-[#60a5fa] mb-2 tracking-wide uppercase">
            <svg className="w-3.5 h-3.5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t.username}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-full px-4 py-3 rounded-lg bg-[#0a1628] border border-[#1e3a5f] text-white placeholder-[#334155] text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/40 focus:bg-[#0c1e3a] transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="flex items-center gap-1.5 text-xs font-semibold text-[#60a5fa] mb-2 tracking-wide uppercase">
            <svg className="w-3.5 h-3.5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {t.password}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-11 rounded-lg bg-[#0a1628] border border-[#1e3a5f] text-white placeholder-[#334155] text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/40 focus:bg-[#0c1e3a] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#38bdf8] transition-colors cursor-pointer"
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
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group bg-gradient-to-r from-[#1e40af] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white border border-[#3b82f6]/40 hover:border-[#60a5fa]/70 shadow-lg shadow-[#1e3a8a]/30 hover:shadow-[#2563eb]/40"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {/* Scan line animation */}
            <span className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/60 to-transparent animate-scan-line" />
            </span>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2.5 relative z-10">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Authenticating…</span>
              </span>
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                {t.login}
              </span>
            )}
          </button>
        </div>

        {/* Security notice */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <svg className="w-3 h-3 text-[#22c55e]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[10px] font-mono text-[#475569] tracking-wider uppercase">
            256-bit SSL Encrypted Connection
          </span>
        </div>
      </form>
    </div>
  );
}
