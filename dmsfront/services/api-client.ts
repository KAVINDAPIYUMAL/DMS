/**
 * API Client — Centralized HTTP Client
 *
 * Provides a typed fetch wrapper with:
 * - Base URL from environment variable
 * - Automatic auth token injection (Bearer)
 * - Standardized error handling
 * - JSON request/response serialization
 *
 * Usage:
 *   import { apiClient } from '@/services/api-client';
 *   const data = await apiClient.get<MyType>('/endpoint');
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/** Custom error class for API failures */
export class ApiClientError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

/** Get the stored auth token (client-side only) */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('dms_auth_token');
}

/** Build headers with optional auth token */
function buildHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...customHeaders,
  });

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

/** Parse API response and handle errors */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    let code: string | undefined;

    try {
      const errorBody = await response.json();
      message = errorBody.message || message;
      code = errorBody.code;
    } catch {
      // Response body is not JSON — use the default message
    }

    // Handle 401 — auto-redirect to login
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dms_auth_token');
        localStorage.removeItem('dms_user');
        window.location.href = '/';
      }
    }

    throw new ApiClientError(message, response.status, code);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Centralized API client for all backend calls.
 */
export const apiClient = {
  /** GET request */
  async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: buildHeaders(customHeaders),
    });
    return handleResponse<T>(response);
  },

  /** POST request */
  async post<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(customHeaders),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  /** PUT request */
  async put<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(customHeaders),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  /** PATCH request */
  async patch<T>(endpoint: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: buildHeaders(customHeaders),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  /** DELETE request */
  async delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: buildHeaders(customHeaders),
    });
    return handleResponse<T>(response);
  },

  /** POST with FormData (for file uploads — no Content-Type header) */
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers = new Headers();
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    // Do NOT set Content-Type — browser sets it with boundary for multipart

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return handleResponse<T>(response);
  },
};
