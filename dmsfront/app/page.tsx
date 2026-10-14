'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginCard from './components/auth/LoginCard';
import { dictionaries } from './data/mockData';
import { Language } from './types';

export default function Home() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const dict = dictionaries[currentLanguage];

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen w-full bg-[#090d16] flex flex-col">
      {/* Full-screen login layout */}
      <div className="flex-1 flex relative overflow-hidden">

        {/* ── Left decorative column ──────────────────────────────── */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 bg-gradient-to-br from-[#0d1526] via-[#090d16] to-[#090d16]">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#243352]/25 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#C5A059]/10 blur-[100px]" />
          </div>

          {/* Fine dot grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(197,160,89,0.18) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Top label */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-6 bg-gradient-to-b from-[#C5A059] to-[#8C6A30] rounded-full" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#C5A059]">
                Democratic Socialist Republic of Sri Lanka
              </span>
            </div>
          </div>

          {/* Centre block */}
          <div className="relative z-10 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C5A059]/70">
                Official Government Portal
              </p>
              <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
                Document<br />
                <span className="text-[#C5A059]">Tracking &</span><br />
                Workflow
              </h2>
            </div>

            <p className="text-sm text-[#D5C7B0]/55 leading-relaxed max-w-xs">
              Secure executive portal for departmental document routing,
              clearance management, and workflow authorisation.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C5A059]/40 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />
            </div>

            {/* Three feature lines */}
            <ul className="space-y-3">
              {[
                'Multi-stage document approval workflows',
                'Real-time tracking & audit trail',
                'Role-based access control',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[13px] text-[#D5C7B0]/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/70 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom spacer */}
          <div className="relative z-10" />
        </div>

        {/* Vertical divider line */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#C5A059]/25 to-transparent" />

        {/* ── Right login panel ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 bg-[#090d16] relative">
          {/* Subtle right-panel glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#1a2540]/20 blur-[130px]" />
          </div>

          <div className="relative z-10 w-full max-w-sm">
            <LoginCard
              dict={dict}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>

          {/* Bottom copyright (mobile visible) */}
          <p className="relative z-10 mt-10 text-[11px] text-[#D5C7B0]/25 font-mono text-center">
            &copy; 2026 Department of Government Information, Sri Lanka
          </p>
        </div>
      </div>
    </main>
  );
}
