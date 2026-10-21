/**
 * My Requests Service
 * Provides data access for the current user's submitted requests.
 * TODO: Replace mock implementation with real API calls when backend is ready.
 */

import type { MyRequestItem } from '@/types/request';
import { MY_REQUESTS_MOCK } from '@/app/data/myRequestsData';
// import { apiClient } from './api-client';

export interface MyRequestsFilters {
  dateFrom?: string;
  dateTo?: string;
  categories?: string[];
  statuses?: string[];
  searchQuery?: string;
}

/**
 * Fetch the current user's requests.
 * TODO: Replace with `apiClient.get<ApiResponse<MyRequestItem[]>>('/requests/mine', { params: filters })`
 */
export async function getMyRequests(
  filters?: MyRequestsFilters
): Promise<MyRequestItem[]> {
  // Simulated network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 400));

  let data = [...MY_REQUESTS_MOCK];

  if (filters) {
    data = data.filter((item) => {
      const itemDate = item.created.replaceAll('/', '-');
      if (filters.dateFrom && itemDate < filters.dateFrom) return false;
      if (filters.dateTo && itemDate > filters.dateTo) return false;

      if (
        filters.categories &&
        filters.categories.length > 0 &&
        !filters.categories.includes(item.mainCategory)
      ) {
        return false;
      }

      if (
        filters.statuses &&
        filters.statuses.length > 0 &&
        !filters.statuses.includes(item.status)
      ) {
        return false;
      }

      if (filters.searchQuery?.trim()) {
        const q = filters.searchQuery.toLowerCase();
        return (
          item.reference.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.mainCategory.toLowerCase().includes(q) ||
          item.assignTo.designation.toLowerCase().includes(q) ||
          item.assignTo.code.toLowerCase().includes(q) ||
          item.assignTo.name.toLowerCase().includes(q) ||
          item.assignFrom.designation.toLowerCase().includes(q) ||
          item.assignFrom.code.toLowerCase().includes(q) ||
          item.assignFrom.name.toLowerCase().includes(q) ||
          item.turnaroundText.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }

  return data;
}

/**
 * Get summary statistics for the current user's requests.
 */
export function getMyRequestsStats(data: MyRequestItem[]) {
  return {
    totalCount: data.length,
    completedCount: data.filter((i) => i.status === 'Completed' || i.status === 'Done').length,
    pendingCount: data.filter((i) => i.status === 'Pending').length,
    overdueCount: data.filter((i) => i.isOverdue).length,
  };
}
