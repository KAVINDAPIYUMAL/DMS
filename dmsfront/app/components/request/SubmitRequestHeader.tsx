'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MyRequestsIcon } from '@/components/ui/Icons';

export function SubmitRequestHeader() {
  const { getLabel } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Department of Government Information
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-xs font-medium text-slate-500">Document Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {getLabel('Submit New Request', 'නව ඉල්ලීමක් ඉදිරිපත් කිරීම', 'புதிய கோரிக்கை சமர்ப்பிக்கவும்')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Register and dispatch official government documents, inquiries, and internal directives.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/requests/mine"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs hover:shadow transition-all"
        >
          <MyRequestsIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>{getLabel('View My Requests', 'මගේ ඉල්ලීම් බලන්න', 'எனது கோரிக்கைகள்')}</span>
        </Link>
      </div>
    </div>
  );
}

export default SubmitRequestHeader;
