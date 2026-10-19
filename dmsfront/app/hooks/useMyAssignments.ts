/**
 * useMyAssignments — Custom hook for task assignment management.
 *
 * Encapsulates:
 * - Data fetching via service layer
 * - Category filter state (multi-select)
 * - Table search and pagination
 * - Loading and error states
 */

import { useState, useMemo, useCallback } from 'react';
import type { AssignmentItem, AssignmentActionType } from '@/types/assignment';
import { ASSIGNMENT_CATEGORIES } from '@/mock/assignmentOptions';
import { getAssignments } from '@/services/assignment.service';

export function useMyAssignments() {
  // ── Category filter state ─────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dropdownSearch, setDropdownSearch] = useState('');

  // ── Data state ────────────────────────────────────────────
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // ── Table search & pagination ─────────────────────────────
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ── Filtered categories in dropdown ───────────────────────
  const filteredCategories = useMemo(() => {
    if (!dropdownSearch.trim()) return ASSIGNMENT_CATEGORIES;
    return ASSIGNMENT_CATEGORIES.filter((cat) =>
      cat.toLowerCase().includes(dropdownSearch.toLowerCase().trim())
    );
  }, [dropdownSearch]);

  // ── Category toggle handlers ──────────────────────────────
  const handleToggleCategory = useCallback((cat: string) => {
    setValidationMessage(null);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setValidationMessage(null);
    setSelectedCategories((prev) => {
      const unique = Array.from(new Set([...prev, ...ASSIGNMENT_CATEGORIES]));
      return unique;
    });
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  // ── Fetch assignments ─────────────────────────────────────
  const handleViewTasks = useCallback(async () => {
    if (selectedCategories.length === 0) {
      setValidationMessage('Please select an option before loading tasks.');
      return;
    }

    setValidationMessage(null);
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentPage(1);

    try {
      const data = await getAssignments(selectedCategories);
      setAssignments(data);
    } catch {
      setError('Error loading assignments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategories]);

  // ── Live filter by table search ───────────────────────────
  const filteredAssignments = useMemo(() => {
    if (!tableSearch.trim()) return assignments;
    const q = tableSearch.toLowerCase().trim();
    return assignments.filter(
      (item) =>
        item.reference.toLowerCase().includes(q) ||
        item.created.toLowerCase().includes(q) ||
        item.requestFrom.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
    );
  }, [assignments, tableSearch]);

  // ── Pagination ────────────────────────────────────────────
  const totalEntries = filteredAssignments.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAssignments.slice(start, start + pageSize);
  }, [filteredAssignments, currentPage, pageSize]);

  // ── Action handler ────────────────────────────────────────
  const handleAction = useCallback((action: AssignmentActionType, reference: string) => {
    // TODO: Replace with real API call
    console.log(`${action} action triggered for ${reference}`);
    return `${action} action triggered for ${reference}`;
  }, []);

  return {
    // Data
    assignments,
    filteredAssignments,
    paginatedData,
    isLoading,
    error,
    hasSearched,
    validationMessage,

    // Category filter
    selectedCategories,
    filteredCategories,
    dropdownSearch,
    setDropdownSearch,
    handleToggleCategory,
    handleSelectAll,
    handleDeselectAll,

    // Actions
    handleViewTasks,
    handleAction,

    // Table search & pagination
    tableSearch,
    setTableSearch,
    currentPage,
    setCurrentPage,
    pageSize,
    totalEntries,
    totalPages,
  };
}
