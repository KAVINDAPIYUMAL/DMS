

import type { Metadata } from "next";
import Link from "next/link";
import SubmitRequestForm from "@/components/request/SubmitRequestForm";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Submit New Request | DGI DMS",
  description:
    "Submit a new document management request to DGI DMS — powered by Sri Lanka Telecom.",
};

export default function SubmitRequestPage() {
  return (
    <AppShell
      pageTitle="Submit New Request"
      breadcrumbs={[
        { label: "Home", href: "/dashboard" },
        { label: "Request Management", href: "/requests/all" },
        { label: "Submit New Request" },
      ]}
    >
      <div className="space-y-6">
        <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-5 shadow-xs">
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Department of Government Information
            </span>
            <span className="text-slate-300 dark:text-slate-700 mx-2">•</span>
            <span className="text-xs font-medium text-slate-500">Document Intake</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            Add New Request
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Initiate official document registration, workflow routing, and multi-stage executive approval.
          </p>
        </div>

        <SubmitRequestForm />
      </div>
    </AppShell>
  );
}
