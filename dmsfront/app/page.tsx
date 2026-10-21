'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginCard from './components/auth/LoginCard';
import { dictionaries } from './data/mockData';
import { Language } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const dict = dictionaries[currentLanguage];

  const handleLoginSuccess = async (username: string, password: string) => {
    await login(username, password);
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen w-full bg-[#040a18] flex flex-col">
      {/* Full-screen login layout */}
      <div className="flex-1 flex relative overflow-hidden">

        {/* ── Left decorative column ──────────────────────────────── */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 bg-gradient-to-br from-[#061225] via-[#040a18] to-[#071630]">
          {/* Ambient glow — deep blue & teal */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#0a4da0]/20 blur-[140px] animate-pulse-glow" />
            <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-[#1e90ff]/8 blur-[120px]" />
            <div className="absolute top-10 right-1/3 w-[200px] h-[200px] rounded-full bg-[#38bdf8]/6 blur-[80px] animate-float-slow" />
          </div>

          {/* Industrial grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56,189,248,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56,189,248,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Diagonal accent lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent rotate-[35deg]" />
            <div className="absolute bottom-40 -right-10 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/20 to-transparent rotate-[-25deg]" />
          </div>

          {/* Top label */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-gradient-to-b from-[#38bdf8] to-[#1d4ed8] rounded-full" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#60a5fa]">
                Democratic Socialist Republic of Sri Lanka
              </span>
            </div>
          </div>

          {/* Centre block */}
          <div className="relative z-10 space-y-7">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#38bdf8]/70">
                Official Government Portal
              </p>
              <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
                Document<br />
                <span className="bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent">Tracking &</span><br />
                Workflow
              </h2>
            </div>

            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xs">
              Secure executive portal for departmental document routing,
              clearance management, and workflow authorisation.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#2563eb]/50 to-transparent" />
              <div className="w-2 h-2 rounded-sm bg-[#38bdf8]/60 rotate-45" />
              <div className="h-px w-8 bg-[#1d4ed8]/30" />
            </div>

            {/* Three feature lines with industrial icons */}
            <ul className="space-y-3.5">
              {[
                { icon: '◆', text: 'Multi-stage document approval workflows' },
                { icon: '◆', text: 'Real-time tracking & audit trail' },
                { icon: '◆', text: 'Role-based access control' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-[13px] text-[#94a3b8]/80 group">
                  <span className="text-[8px] text-[#38bdf8]/70 group-hover:text-[#38bdf8] transition-colors">{item.icon}</span>
                  <span className="group-hover:text-[#cbd5e1] transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Industrial data readout decoration */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-mono text-[#22c55e]/70 tracking-wider uppercase">System Online</span>
              </div>
              <div className="h-3 w-px bg-[#1e3a5f]" />
              <span className="text-[10px] font-mono text-[#475569] tracking-wider">SEC-LEVEL: AUTHORIZED</span>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="relative z-10" />
        </div>

        {/* Vertical divider line — blue gradient */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#2563eb]/30 to-transparent" />

        {/* ── Right login panel ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 bg-[#040a18] relative">
          {/* Subtle right-panel glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#0c2d6b]/15 blur-[140px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-[#1e40af]/8 blur-[100px]" />
          </div>

          {/* Hex grid subtle pattern on right */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 w-full max-w-sm">
            <LoginCard
              dict={dict}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>

          {/* Bottom copyright (mobile visible) */}
          <p className="relative z-10 mt-10 text-[11px] text-[#475569] font-mono text-center tracking-wide">
            &copy; 2026 Department of Government Information, Sri Lanka
          </p>
        </div>
      </div>
    </main>
  );
}
