import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Profile | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. User profile management.',
};

export default function ProfilePage() {
  return (
    <AppShell
      pageTitle="Edit Profile"
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Edit Profile' },
      ]}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          User Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Profile management, password changes, and personal preferences will be available here once the backend API is connected.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Coming Soon
        </span>
      </div>
    </AppShell>
  );
}
