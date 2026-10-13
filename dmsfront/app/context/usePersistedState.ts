'use client';

import { useSyncExternalStore } from 'react';

/**
 * Custom hook to safely sync client-side persistent storage (localStorage)
 * without triggering Next.js / React SSR hydration mismatches.
 *
 * During SSR and hydration, it uses `getServerSnapshot` (the default value).
 * Once hydrated, React synchronizes with `getSnapshot` (client value).
 */
export function usePersistedState(
  key: string,
  defaultValue: string
): [string, (val: string) => void] {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('storage', callback);
    window.addEventListener(`dms-store-${key}`, callback);
    return () => {
      window.removeEventListener('storage', callback);
      window.removeEventListener(`dms-store-${key}`, callback);
    };
  };

  const getSnapshot = () => {
    try {
      return localStorage.getItem(key) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const getServerSnapshot = () => defaultValue;

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = (val: string) => {
    try {
      localStorage.setItem(key, val);
      window.dispatchEvent(new Event(`dms-store-${key}`));
    } catch (err) {
      console.error(err);
    }
  };

  return [rawValue, setValue];
}
