'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_SECTIONS, NavItem } from './navigationData';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  DashboardIcon,
  SubmitRequestIcon,
  MyRequestsIcon,
  AssignmentsIcon,
  ViewAllIcon,
  ReportsIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui/Icons';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const { getLabel } = useLanguage();
  const { user } = useAuth();

  const renderIcon = (iconName: NavItem['iconName']) => {
    const props = { className: 'w-5 h-5 flex-shrink-0 transition-transform duration-200' };
    switch (iconName) {
      case 'dashboard':
        return <DashboardIcon {...props} />;
      case 'submit':
        return <SubmitRequestIcon {...props} />;
      case 'my-requests':
        return <MyRequestsIcon {...props} />;
      case 'assignments':
        return <AssignmentsIcon {...props} />;
      case 'view-all':
        return <ViewAllIcon {...props} />;
      case 'reports':
        return <ReportsIcon {...props} />;
      case 'settings':
        return <SettingsIcon {...props} />;
      default:
        return <DashboardIcon {...props} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out
          bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] text-[var(--sidebar-fg)]
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--sidebar-border)]">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 overflow-hidden group focus:outline-hidden"
          >
            {/* DGI Crest Emblem Avatar */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 via-rose-950 to-slate-900 border border-amber-500/40 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-amber-400 font-serif font-black text-xs tracking-wider">
                DGI
              </span>
            </div>

            {/* Brand Title (hidden when collapsed) */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-white truncate">
                    DGI | DMS
                  </span>
                  <span className="px-1.5 py-0.2 text-[10px] font-semibold tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 rounded">
                    SLT
                  </span>
                </div>
                <span className="text-[11px] text-[var(--sidebar-muted)] truncate">
                  Workflow & Tracking
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800">
          {NAVIGATION_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {/* Section Header (hidden when collapsed) */}
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
                  {getLabel(section.title, section.titleSi, section.titleTa)}
                </div>
              )}

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname.startsWith(item.href));

                  const itemLabel = getLabel(item.label, item.labelSi, item.labelTa);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onCloseMobile}
                      title={isCollapsed ? itemLabel : undefined}
                      className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-[var(--slt-primary)]/80 to-[var(--slt-secondary)]/50 text-white shadow-xs shadow-sky-950 border border-sky-500/30 font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-white/6'
                        }
                        ${isCollapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && !isCollapsed && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-sky-400 rounded-r-full" />
                      )}

                      {/* Icon */}
                      <span
                        className={`${
                          isActive
                            ? 'text-sky-300'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {renderIcon(item.iconName)}
                      </span>

                      {/* Label & Badge */}
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <span className="truncate text-[13px]">{itemLabel}</span>

                          {item.badge !== undefined && (
                            <span
                              className={`px-2 py-0.5 text-[11px] font-bold rounded-full transition-transform group-hover:scale-105 ${
                                item.badgeVariant === 'urgent'
                                  ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 animate-pulse'
                                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Collapsed Badge Pill indicator */}
                      {isCollapsed && item.badge !== undefined && (
                        <span
                          className={`absolute top-1.5 right-2 w-2 h-2 rounded-full ${
                            item.badgeVariant === 'urgent'
                              ? 'bg-rose-500 ring-2 ring-rose-900 animate-ping'
                              : 'bg-sky-400'
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card / SLT Footer in Sidebar */}
        <div className="p-3 border-t border-[var(--sidebar-border)] bg-black/20">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-white/4 border border-white/6 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            {/* SLT Avatar */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-xs flex-shrink-0">
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-100 truncate">
                  {user?.name || 'User'}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • DGI Portal
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
