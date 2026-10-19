import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardContent } from './DashboardContent';

export const metadata: Metadata = {
  title: 'Executive Dashboard | DGI DMS',
  description:
    'Document Tracking & Workflow System — Department of Government Information, Sri Lanka. Executive overview and quick action hub.',
};

/**
 * Server Component page for /dashboard
 * Client interactive logic lives in DashboardContent.
 */
export default function DashboardPage() {
  return (
    <AppShell pageTitle="Executive Dashboard">
      <DashboardContent />
    </AppShell>
  );
}
