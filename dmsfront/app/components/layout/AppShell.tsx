'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LanguageProvider } from '@/context/LanguageContext';
import { usePersistedState } from '@/context/usePersistedState';
import { useAuth } from '@/context/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({
  children,
  pageTitle = 'Dashboard',
  breadcrumbs,
}: AppShellProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [collapsedStr, setCollapsedStr] = usePersistedState('dms_sidebar_collapsed', 'false');
  const isCollapsed = collapsedStr === 'true';
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  const toggleCollapse = () => {
    setCollapsedStr(isCollapsed ? 'false' : 'true');
  };

  // Show loading state during auth hydration
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render the shell if not authenticated (redirect is in progress)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
        {/* Left-Side Navigation Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Main Content Layout Wrapper */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
            }`}
        >
          {/* Top Header */}
          <Header
            onOpenMobile={() => setIsMobileOpen(true)}
            pageTitle={pageTitle}
            breadcrumbs={breadcrumbs}
          />

          {/* Main Content Canvas */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Modern Enterprise Footer */}
          <footer className="mt-auto border-t border-[var(--surface-border)] bg-[var(--surface)]/70 backdrop-blur-xs px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  DGI DMS
                </span>
                <span>•</span>
                <span>Document Tracking and Workflow System</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[11px] font-medium border border-sky-200 dark:border-sky-800">
                  Powered by Sri Lanka Telecom
                </span>
                <span>v2.4 Enterprise</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LanguageProvider>
  );
}

