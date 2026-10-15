

import type { Metadata } from "next";
import SubmitRequestForm from "@/components/request/SubmitRequestForm";
import SubmitRequestHeader from "@/components/request/SubmitRequestHeader";
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
        { label: "Request Management", href: "/request-management/submit-request" },
        { label: "Submit New Request" },
      ]}
    >
      <div className="space-y-6">
        <SubmitRequestHeader />

        <div>
          <SubmitRequestForm />
        </div>
      </div>
    </AppShell>
  );
}
