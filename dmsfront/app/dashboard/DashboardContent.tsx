'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  SubmitRequestIcon,
  MyRequestsIcon,
  AssignmentsIcon,
  ViewAllIcon,
} from '@/components/ui/Icons';

export function DashboardContent() {
  const { getLabel } = useLanguage();

  const actionCards = [
    {
      id: 'submit',
      title: 'Submit New Request',
      titleSi: 'නව ඉල්ලීමක් ඉදිරිපත් කරන්න',
      titleTa: 'புதிய கோரிக்கையை சமர்ப்பிக்கவும்',
      description: 'Initiate a new document tracking or approval workflow',
      descriptionSi: 'නව ලේඛන ලුහුබැඳීමක් හෝ අනුමැතියක් ආරම්භ කරන්න',
      descriptionTa: 'புதிய ஆவண கண்காணிப்பு அல்லது ஒப்புதல் பணிப்பாய்வு தொடங்கவும்',
      href: '/request-management/submit-request',
      badge: 'Create',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: <SubmitRequestIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      accentColor: 'from-emerald-500/10 to-transparent hover:border-emerald-500/40',
    },
    {
      id: 'my-requests',
      title: 'My Requests',
      titleSi: 'මගේ ඉල්ලීම්',
      titleTa: 'எனது கோரிக்கைகள்',
      description: 'Track the status and approvals of documents you submitted',
      descriptionSi: 'ඔබ ඉදිරිපත් කළ ලේඛනවල තත්ත්වය සහ අනුමත කිරීම් නිරීක්ෂණය කරන්න',
      descriptionTa: 'நீங்கள் சமர்ப்பித்த ஆவணங்களின் நிலை மற்றும் ஒப்புதல்களைக் கண்காணிக்கவும்',
      href: '/requests/mine',
      badge: '5 Active',
      badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      icon: <MyRequestsIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      accentColor: 'from-sky-500/10 to-transparent hover:border-sky-500/40',
    },
    {
      id: 'assignments',
      title: 'My Assignments',
      titleSi: 'මගේ පැවරුම්',
      titleTa: 'எனது பணிகள்',
      description: 'Review and act on tasks awaiting your official decision',
      descriptionSi: 'ඔබේ නිල තීරණය අපේක්ෂාවෙන් ඇති කාර්යයන් සමාලෝචනය කර පියවර ගන්න',
      descriptionTa: 'உங்கள் அதிகாரப்பூர்வ முடிவுக்காக காத்திருக்கும் பணிகளை மதிப்பாய்வு செய்யவும்',
      href: '/request-management/my-assignments',
      badge: '12 Action Needed',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse',
      icon: <AssignmentsIcon className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      accentColor: 'from-rose-500/10 to-transparent hover:border-rose-500/40',
    },
    {
      id: 'view-requests',
      title: 'View Requests',
      titleSi: 'සියලු ඉල්ලීම් බැලීම',
      titleTa: 'அனைத்து கோரிக்கைகளையும் காண்க',
      description: 'Search repository records, departmental logs & archives',
      descriptionSi: 'දෙපාර්තමේන්තු ලේඛනාගාරය සහ වාර්තා සෙවීම',
      descriptionTa: 'திணைக்கள ஆவண காப்பகங்கள் மற்றும் பதிவுகளைத் தேடுங்கள்',
      href: '/requests/all',
      badge: 'Register',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      icon: <ViewAllIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      accentColor: 'from-indigo-500/10 to-transparent hover:border-indigo-500/40',
    },
  ];

  const recentTasks = [
    {
      ref: 'DGI-2026-0048',
      title: 'Press Accreditation Approval - National Media',
      category: 'Accreditation',
      requestFrom: 'K. M. Pathirana (Dept. Head)',
      created: 'Today, 09:30 AM',
      status: 'Pending Action',
      statusVariant: 'urgent',
    },
    {
      ref: 'DGI-2026-0042',
      title: 'Special Gazette Notification Publication',
      category: 'Gazette',
      requestFrom: 'M. Silva (Legal Officer)',
      created: 'Yesterday, 04:15 PM',
      status: 'Under Review',
      statusVariant: 'in-progress',
    },
    {
      ref: 'DGI-2026-0039',
      title: 'Inter-Departmental Document Dispatch',
      category: 'Dispatch',
      requestFrom: 'S. Jayawardena (Admin Officer)',
      created: '11 Oct 2026',
      status: 'Completed',
      statusVariant: 'approved',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--sidebar-bg)] via-[#0d1d3d] to-[var(--slt-primary)] p-6 sm:p-8 text-white shadow-xl border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-sky-300 mb-3 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Department of Government Information • Sri Lanka
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {getLabel(
              'Document Tracking & Workflow Dashboard',
              'ලේඛන ලුහුබැඳීමේ සහ කාර්ය ප්‍රවාහ ප්‍රධාන පුවරුව',
              'ஆவண கண்காணிப்பு மற்றும் பணிப்பாய்வு டாஷ்போர்டு'
            )}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {getLabel(
              'Welcome, SLT Admin. You have 12 assignments awaiting review and 5 outbound workflows currently active.',
              'ආයුබෝවන්, SLT Admin. ඔබේ සමාලෝචනය අපේක්ෂාවෙන් පැවරුම් 12ක් සහ ක්‍රියාකාරී ඉල්ලීම් 5ක් ඇත.',
              'வணக்கம், SLT Admin. உங்களிடம் 12 நிலுவையிலுள்ள பணிகளும் 5 செயல்பாட்டிலுள்ள கோரிக்கைகளும் உள்ளன.'
            )}
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-sky-400/10 to-transparent pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* 4 Core Action Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{getLabel('Quick Action Hub', 'ක්ෂණික ක්‍රියාකාරකම්', 'விரைவு நடவடிக்கை மையம்')}</span>
            <span className="text-xs font-normal text-slate-500">
              (Request Management)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-gradient-to-b ${card.accentColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {getLabel(card.title, card.titleSi, card.titleTa)}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {getLabel(card.description, card.descriptionSi, card.descriptionTa)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                <span>Open Module</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Priority Tasks Table Preview */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {getLabel('Recent Priority Tasks', 'මෑත ප්‍රමුඛතා කාර්යයන්', 'அண்மைய முன்னுரிமை பணிகள்')}
            </h3>
            <p className="text-xs text-slate-500">
              Tasks requiring your immediate review and sign-off
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/request-management/my-assignments"
              className="px-3 py-1.5 text-xs font-semibold rounded-xl text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 transition-colors"
            >
              View All Assignments (12) →
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Submitted By</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentTasks.map((task) => (
                <tr
                  key={task.ref}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-sky-700 dark:text-sky-400">
                    {task.ref}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                    {task.title}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{task.category}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {task.requestFrom}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{task.created}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${task.statusVariant === 'urgent'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                          : task.statusVariant === 'in-progress'
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${task.statusVariant === 'urgent'
                            ? 'bg-rose-500 animate-pulse'
                            : task.statusVariant === 'in-progress'
                              ? 'bg-sky-500'
                              : 'bg-emerald-500'
                          }`}
                      />
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--slt-primary)] text-white hover:bg-[var(--slt-primary-hover)] transition-colors shadow-2xs">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
