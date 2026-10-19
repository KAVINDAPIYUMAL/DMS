/**
 * useAllRequests — Custom hook for departmental request register.
 *
 * Encapsulates:
 * - Data fetching via service layer
 * - Officer directory fetching
 * - Filter state (date range, categories, officers, statuses, search)
 * - Pagination state and computation
 * - Loading and error states
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { MyRequestItem, OfficerDirectoryItem } from '@/types/request';
import { getAllRequests, getOfficerDirectory } from '@/services/all-requests.service';

const ALL_CATEGORIES = ['Bills', 'Information', 'Policy Update', 'Circulars', 'Cabinet Papers'];
const ALL_STATUSES = ['Completed', 'Pending', 'Done'];

export function useAllRequests() {
  // ── Data state ────────────────────────────────────────────
  const [allData, setAllData] = useState<MyRequestItem[]>([]);
  const [officers, setOfficers] = useState<OfficerDirectoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Filter state ──────────────────────────────────────────
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2026-10-15');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOfficerCodes, setSelectedOfficerCodes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Pagination state ──────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Fetch data ────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [requestData, officerData] = await Promise.all([
        getAllRequests(),
        getOfficerDirectory(),
      ]);
      setAllData(requestData);
      setOfficers(officerData);
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

      if (selectedOfficerCodes.length > 0 && !selectedOfficerCodes.includes(item.assignTo.code)) {
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
  }, [allData, dateFrom, dateTo, selectedCategories, selectedOfficerCodes, selectedStatuses, searchQuery]);

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
  }, [dateFrom, dateTo, selectedCategories, selectedOfficerCodes, selectedStatuses, searchQuery]);

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
    officers,
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
    selectedOfficerCodes,
    setSelectedOfficerCodes,
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
  };
}
