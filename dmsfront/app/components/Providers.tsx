'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

/**
 * Providers — Client component that wraps the app with all context providers.
 * Used by the root layout (Server Component) to inject client-side state.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
