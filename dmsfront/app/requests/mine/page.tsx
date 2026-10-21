import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { MyRequestsView } from '@/components/my-requests/MyRequestsView';

export const metadata: Metadata = {
  title: 'My Requests | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Track the status and approvals of your submitted requests.',
};

/**
 * Server Component page for /requests/mine
 * Client interactive logic lives in MyRequestsView.
 */
export default function MyRequestsPage() {
  return (
    <AppShell
      pageTitle="My Requests"
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Request Management', href: '/requests/mine' },
        { label: 'My Requests' },
      ]}
    >
      <MyRequestsView />
    </AppShell>
  );
}
