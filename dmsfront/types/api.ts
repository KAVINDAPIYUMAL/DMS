/**
 * API Response Types
 * Standard wrappers for backend API responses.
 */

/** Generic API success response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Generic API error response */
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/** Paginated list response */
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Login API request */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Login API response */
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
  };
}
