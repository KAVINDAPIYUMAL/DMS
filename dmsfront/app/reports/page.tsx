import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Reports | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Reports and analytics.',
};

export default function ReportsPage() {
  return (
    <AppShell
      pageTitle="Reports"
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Reports' },
      ]}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          Reports Module
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          This module is under development. Audit trail reports, departmental analytics, and workflow summaries will be available here.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Coming Soon
        </span>
      </div>
    </AppShell>
  );
}
