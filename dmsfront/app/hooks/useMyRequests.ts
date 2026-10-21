/**
 * useMyRequests — Custom hook for My Requests data management.
 *
 * Encapsulates:
 * - Data fetching via service layer
 * - Filter state (date range, categories, statuses, search)
 * - Pagination state and computation
 * - Loading and error states
 * - Summary statistics
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { MyRequestItem } from '@/types/request';
import { getMyRequests, getMyRequestsStats } from '@/services/my-requests.service';

const ALL_CATEGORIES = ['Bills', 'Information', 'Policy Update', 'Circulars', 'Cabinet Papers'];
const ALL_STATUSES = ['Completed', 'Pending', 'Done'];

export function useMyRequests() {
  // ── Data state ────────────────────────────────────────────
  const [allData, setAllData] = useState<MyRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Filter state ──────────────────────────────────────────
  const [dateFrom, setDateFrom] = useState('2025-03-10');
  const [dateTo, setDateTo] = useState('2026-10-14');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Bills',
    'Information',
    'Policy Update',
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'Completed',
    'Pending',
    'Done',
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Pagination state ──────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // ── Fetch data ────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyRequests();
      setAllData(data);
    } catch {
      setError('Failed to load requests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Client-side filtering ─────────────────────────────────
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const itemDate = item.created.replaceAll('/', '-');
      if (dateFrom && itemDate < dateFrom) return false;
      if (dateTo && itemDate > dateTo) return false;

      if (selectedCategories.length > 0 && !selectedCategories.includes(item.mainCategory)) {
        return false;
      }

      if (selectedStatuses.length > 0 && !selectedStatuses.includes(item.status)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
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
  }, [allData, dateFrom, dateTo, selectedCategories, selectedStatuses, searchQuery]);

  // ── Pagination ────────────────────────────────────────────
  const totalEntries = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [dateFrom, dateTo, selectedCategories, selectedStatuses, searchQuery]);

  // ── Statistics ────────────────────────────────────────────
  const stats = useMemo(() => getMyRequestsStats(allData), [allData]);

  // ── Filter toggles ───────────────────────────────────────
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const toggleStatus = useCallback((st: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  }, []);

  return {
    // Data
    filteredData,
    paginatedData,
    isLoading,
    error,
    refetch: fetchData,

    // Filters
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    selectedStatuses,
    setSelectedStatuses,
    toggleStatus,
    searchQuery,
    setSearchQuery,
    allCategories: ALL_CATEGORIES,
    allStatuses: ALL_STATUSES,

    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalEntries,
    totalPages,

    // Stats
    stats,
  };
}
