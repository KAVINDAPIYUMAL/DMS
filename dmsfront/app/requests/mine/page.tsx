'use client';

import React from 'react';
import { AppShell } from '@/app/components/layout/AppShell';
import { MyRequestsView } from '@/app/components/my-requests/MyRequestsView';

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
