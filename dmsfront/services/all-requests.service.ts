/**
 * All Requests Service
 * Provides data access for the departmental request register.
 * TODO: Replace mock implementation with real API calls when backend is ready.
 */

import type { MyRequestItem, OfficerDirectoryItem } from '@/types/request';
import { ALL_REQUESTS_MOCK, DGI_OFFICERS_DIRECTORY } from '@/app/data/allRequestsData';
// import { apiClient } from './api-client';

export interface AllRequestsFilters {
  dateFrom?: string;
  dateTo?: string;
  categories?: string[];
  officerCodes?: string[];
  statuses?: string[];
  searchQuery?: string;
}

/**
 * Fetch all departmental requests.
 * TODO: Replace with `apiClient.get<ApiResponse<MyRequestItem[]>>('/requests/all', { params: filters })`
 */
export async function getAllRequests(
  filters?: AllRequestsFilters
): Promise<MyRequestItem[]> {
  // Simulated network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 400));

  let data = [...ALL_REQUESTS_MOCK];

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
        filters.officerCodes &&
        filters.officerCodes.length > 0 &&
        !filters.officerCodes.includes(item.assignTo.code)
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
 * Fetch the officer directory for the filter dropdown.
 * TODO: Replace with `apiClient.get<ApiResponse<OfficerDirectoryItem[]>>('/officers')`
 */
export async function getOfficerDirectory(): Promise<OfficerDirectoryItem[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 100));
  return [...DGI_OFFICERS_DIRECTORY];
}
