'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SearchIcon,
  BellIcon,
  MenuIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@/components/ui/Icons';

interface HeaderProps {
  onOpenMobile: () => void;
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({
  onOpenMobile,
  pageTitle = 'Dashboard',
  breadcrumbs = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Request Management', href: '/requests/all' },
    { label: 'Dashboard' },
  ],
}: HeaderProps) {
  const { language, setLanguage, getLabel } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'New urgent assignment',
      desc: 'Ref # DGI-2026-0941 assigned by Ministry Office',
      time: '12m ago',
      urgent: true,
    },
    {
      id: 2,
      title: 'Gazette notice approved',
      desc: 'Ref # DGI-2026-0812 workflow completed',
      time: '1h ago',
      urgent: false,
    },
    {
      id: 3,
      title: 'Document review pending',
      desc: '3 assignments nearing 48h turnaround SLA',
      time: '3h ago',
      urgent: true,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--header-border)] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
          aria-label="Open navigation drawer"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Mobile Title */}
        <span className="sm:hidden font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
          {pageTitle}
        </span>

        {/* Breadcrumb Hierarchy */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-400 dark:text-slate-600">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium truncate max-w-[120px]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getLabel(
              'Search reference #, title or category...',
              'යොමු අංකය, මාතෘකාව හෝ වර්ගය සොයන්න...',
              'குறிப்பு எண், தலைப்பு அல்லது வகையைத் தேடுங்கள்...'
            )}
            className="w-full pl-9 pr-12 py-1.5 text-xs rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions: Trilingual Toggle + Notifications + User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Trilingual Switcher (English, Sinhala, Tamil) */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all ${
              language === 'en'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('si')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all ${
              language === 'si'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            සිං
          </button>
          <button
            onClick={() => setLanguage('ta')}
            className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all ${
              language === 'ta'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            த
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={toggleNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                  {getLabel('Pending Action Alerts', 'පැවරුම් දැනුම්දීම්', 'செயல் விழிப்பூட்டல்கள்')}
                </span>
                <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 items-start"
                  >
                    <span
                      className={`mt-0.5 p-1 rounded-full ${
                        item.urgent
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                          : 'bg-sky-100 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400'
                      }`}
                    >
                      {item.urgent ? (
                        <ExclamationCircleIcon className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 inline-block">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 px-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  href="/request-management/my-assignments"
                  className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {getLabel('View all 12 assignments →', 'සියලු පැවරුම් 12 බලන්න →', 'அனைத்தையும் காண்க →')}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu (Legacy 'Hi | SLT Admin' modernized) */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--slt-primary)] to-[var(--slt-secondary)] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
              SA
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                Hi, SLT Admin
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                Officer Level 1
              </span>
            </div>
            <svg
              className="w-3.5 h-3.5 text-slate-400 hidden md:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Popover Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  SLT Admin User
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  admin.dgi@slt.com.lk
                </p>
              </div>

              <div className="py-1 text-xs">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {getLabel('Edit Profile', 'පැතිකඩ සංස්කරණය', 'சுயவிவரத்தைத் திருத்து')}
                </Link>
                <Link
                  href="/request-management/my-assignments"
                  className="flex items-center justify-between px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{getLabel('My Assignments', 'මගේ පැවරුම්', 'எனது பணிகள்')}</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold rounded">
                    12
                  </span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {getLabel('Preferences', 'මනාපයන්', 'விருப்பங்கள்')}
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  {getLabel('Sign Out', 'පිටවීම', 'வெளியேறு')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
