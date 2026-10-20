'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

const THEME_KEY = 'dms_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
        applyThemeClass(stored);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial: Theme = prefersDark ? 'dark' : 'light';
        setThemeState(initial);
        applyThemeClass(initial);
      }
    } catch {
      // Storage access blocked or unavailable
    }
    setMounted(true);
  }, []);

  const applyThemeClass = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
      window.dispatchEvent(new Event(`dms-store-${THEME_KEY}`));
    } catch (e) {
      console.error('Failed to persist theme preference:', e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Synchronize across tabs / windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent | Event) => {
      try {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        if (stored === 'light' || stored === 'dark') {
          setThemeState(stored);
          applyThemeClass(stored);
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(`dms-store-${THEME_KEY}`, handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(`dms-store-${THEME_KEY}`, handleStorage);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
