import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { ViewAllRequestsView } from '@/components/requests-all/ViewAllRequestsView';

export const metadata: Metadata = {
  title: 'View All Requests | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Full departmental request register and search.',
};

/**
 * Server Component page for /requests/all
 * Client interactive logic lives in ViewAllRequestsView.
 */
export default function ViewAllRequestsPage() {
  return (
    <AppShell
      pageTitle="View All Requests"
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'Request Management', href: '/requests/all' },
        { label: 'View All Requests' },
      ]}
    >
      <ViewAllRequestsView />
    </AppShell>
  );
}
