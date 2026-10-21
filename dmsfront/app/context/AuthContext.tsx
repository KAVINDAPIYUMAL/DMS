'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

// ── Auth State ────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Storage Keys ──────────────────────────────────────────────

const TOKEN_KEY = 'dms_auth_token';
const USER_KEY = 'dms_user';

// ── Helper: Get initial state from localStorage ───────────────

function getStoredAuth(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') {
    return { user: null, token: null };
  }

  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? (JSON.parse(userJson) as User) : null;
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
}

// ── Auth Provider ─────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const { user, token } = getStoredAuth();
    setState({
      user,
      token,
      isAuthenticated: !!(user && token),
      isLoading: false,
    });
  }, []);

  /**
   * Login — currently mock, ready for real API.
   *
   * When the Postman API arrives, replace the mock block with:
   *   const res = await apiClient.post<LoginResponse>('/auth/login', { username, password });
   *   const { token, user } = res;
   */
  const login = useCallback(async (username: string, password: string) => {
    // ── Mock login (replace with real API call) ─────────────
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate a successful login response
    const mockUser: User = {
      id: '1',
      name: username || 'DGI Officer',
      email: `${username.toLowerCase().replace(/\s+/g, '.')}@dgi.gov.lk`,
      role: 'Officer',
      department: 'Department of Government Information',
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    // ── End mock ────────────────────────────────────────────

    // Persist to localStorage
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    setState({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  /**
   * Logout — clears stored credentials and redirects to login.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });

    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
