import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { MyRequestsView } from '@/components/my-requests/MyRequestsView';

export const metadata: Metadata = {
  title: 'My Requests | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Track your submitted requests.',
};

/**
 * Alias route for /requests/mine — provides the same view at /my-requests.
 */
export default function MyRequestsAliasPage() {
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
