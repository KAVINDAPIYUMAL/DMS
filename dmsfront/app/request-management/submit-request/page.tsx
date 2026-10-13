

import type { Metadata } from "next";
import Link from "next/link";
import SubmitRequestForm from "@/components/request/SubmitRequestForm";

export const metadata: Metadata = {
  title: "Submit New Request | DGI DMS",
  description:
    "Submit a new document management request to DGI DMS — powered by Sri Lanka Telecom.",
};

export default function SubmitRequestPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main>
        <div className="bg-[var(--surface)] border-b border-[var(--surface-border)] shadow-xs">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
            <nav aria-label="Breadcrumb" className="mb-1">
              <ol className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <li>
                  <Link href="/" className="hover:text-[var(--slt-primary)] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span>Request Management</span>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-[var(--slt-primary)] font-medium">
                  Submit new request
                </li>
              </ol>
            </nav>

            <h1 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
              Add new request
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6">
          <SubmitRequestForm />
        </div>
      </main>
    </div>
  );
}
