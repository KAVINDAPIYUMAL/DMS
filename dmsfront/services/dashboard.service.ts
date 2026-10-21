/**
 * Dashboard Service
 * Provides data access for the executive dashboard summary.
 * TODO: Replace mock implementation with real API calls when backend is ready.
 */

// import { apiClient } from './api-client';

export interface DashboardSummary {
  activeRequests: number;
  pendingAssignments: number;
  completedThisMonth: number;
  overdueItems: number;
}

export interface RecentTask {
  ref: string;
  title: string;
  category: string;
  requestFrom: string;
  created: string;
  status: string;
  statusVariant: 'urgent' | 'in-progress' | 'approved';
}

/**
 * Fetch dashboard summary statistics.
 * TODO: Replace with `apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary')`
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  return {
    activeRequests: 5,
    pendingAssignments: 12,
    completedThisMonth: 34,
    overdueItems: 3,
  };
}

/**
 * Fetch recent priority tasks for the dashboard table.
 * TODO: Replace with `apiClient.get<ApiResponse<RecentTask[]>>('/dashboard/recent-tasks')`
 */
export async function getRecentTasks(): Promise<RecentTask[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  return [
    {
      ref: 'DGI-2026-0048',
      title: 'Press Accreditation Approval - National Media',
      category: 'Accreditation',
      requestFrom: 'K. M. Pathirana (Dept. Head)',
      created: 'Today, 09:30 AM',
      status: 'Pending Action',
      statusVariant: 'urgent',
    },
    {
      ref: 'DGI-2026-0042',
      title: 'Special Gazette Notification Publication',
      category: 'Gazette',
      requestFrom: 'M. Silva (Legal Officer)',
      created: 'Yesterday, 04:15 PM',
      status: 'Under Review',
      statusVariant: 'in-progress',
    },
    {
      ref: 'DGI-2026-0039',
      title: 'Inter-Departmental Document Dispatch',
      category: 'Dispatch',
      requestFrom: 'S. Jayawardena (Admin Officer)',
      created: '11 Oct 2026',
      status: 'Completed',
      statusVariant: 'approved',
    },
  ];
}
