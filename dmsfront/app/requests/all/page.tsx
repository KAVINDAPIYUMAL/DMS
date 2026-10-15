'use client';

import React from 'react';
import { AppShell } from '@/app/components/layout/AppShell';
import { ViewAllRequestsView } from '@/app/components/requests-all/ViewAllRequestsView';

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
