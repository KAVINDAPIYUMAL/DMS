import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { MyAssignmentsView } from '@/components/request/MyAssignmentsView';

export const metadata: Metadata = {
  title: 'My Assignments | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Task and assignment management portal.',
};

/**
 * Server Component page for /request-management/my-assignments
 * Client interactive logic lives in MyAssignmentsView.
 */
export default function MyAssignmentsPage() {
  return (
    <AppShell
      pageTitle="My Assignments"
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Request Management', href: '/request-management/my-assignments' },
        { label: 'My Assignments' },
      ]}
    >
      <MyAssignmentsView />
    </AppShell>
  );
}
