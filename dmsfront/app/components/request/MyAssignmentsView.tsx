'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMyAssignments } from '@/hooks/useMyAssignments';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorBanner } from '@/components/common/ErrorBanner';
import {
  FilterIcon,
  CheckCircleIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  CopyIcon,
  DownloadIcon,
  PrinterIcon,
  SearchIcon,
  ClockIcon,
  PlusIcon,
} from '@/components/ui/Icons';
import type {
  AssignmentItem,
  AssignmentActionType,
} from '@/types/assignment';

export function MyAssignmentsView() {
  const { getLabel } = useLanguage();
  const {
    filteredAssignments,
    paginatedData,
    isLoading,
    error,
    hasSearched,
    validationMessage,
    selectedCategories,
    filteredCategories,
    dropdownSearch,
    setDropdownSearch,
    handleToggleCategory,
    handleSelectAll,
    handleDeselectAll,
    handleViewTasks,
    handleAction,
    tableSearch,
    setTableSearch,
    currentPage,
    setCurrentPage,
    pageSize,
    totalEntries,
    totalPages,
  } = useMyAssignments();

  // UI-only state (stays in component)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Export Handlers
  const handleCopyTable = () => {
    if (filteredAssignments.length === 0) {
      showToast('No data available to copy');
      return;
    }
    const headers = ['Reference', 'Created', 'Request From', 'Category', 'Current Status'];
    const rows = filteredAssignments.map((d) => [
      d.reference,
      d.created,
      d.requestFrom,
      d.category,
      d.status,
    ]);
    const text = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
    showToast('Table copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    if (filteredAssignments.length === 0) {
      showToast('No data available to export');
      return;
    }
    const headers = ['Reference,Created,Request From,Category,Current Status'];
    const rows = filteredAssignments.map(
      (d) =>
        `"${d.reference}","${d.created}","${d.requestFrom}","${d.category}","${d.status}"`
    );
    const csvContent = (isExcel ? '\uFEFF' : '') + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my_assignments_${isExcel ? 'excel_' : ''}${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`${isExcel ? 'Excel' : 'CSV'} downloaded successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  // Status Badge Class resolver matching My Requests color scheme
  const getStatusBadgeClass = (status: AssignmentItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-700';
      case 'In Progress':
        return 'bg-sky-100/90 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300/80 dark:border-sky-700';
      case 'Pending':
      default:
        return 'bg-amber-100/90 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300/80 dark:border-amber-700';
    }
  };

  const getStatusDotClass = (status: AssignmentItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500';
      case 'In Progress':
        return 'bg-sky-500';
      case 'Pending':
      default:
        return 'bg-amber-500';
    }
  };

  // Dropdown button display text
  const dropdownLabel = useMemo(() => {
    if (selectedCategories.length === 0) return 'Nothing selected';
    if (selectedCategories.length === 1) return selectedCategories[0];
    if (selectedCategories.length === filteredCategories.length) return 'All Categories';
    return `${selectedCategories.length} items selected`;
  }, [selectedCategories]);

  // KPI Statistics across assignments
  const totalCount = filteredAssignments.length;
  const pendingCount = filteredAssignments.filter((i) => i.status === 'Pending').length;
  const inProgressCount = filteredAssignments.filter((i) => i.status === 'In Progress').length;
  const completedCount = filteredAssignments.filter((i) => i.status === 'Completed').length;
  // Turnaround & Status Info helper matching View All Requests styling
  const getStatusInfo = (item: AssignmentItem) => {
    if (item.status === 'Completed') {
      const days = Math.abs(item.reference.charCodeAt(item.reference.length - 1) % 6);
      return {
        text: `completed in ${days}`,
        progress: 100,
        isCompleted: true,
      };
    }
    if (item.status === 'In Progress') {
      const days = (item.reference.charCodeAt(item.reference.length - 1) % 4) + 1;
      return {
        text: `${days} days in turnaround`,
        progress: 60,
        isCompleted: false,
      };
    }
    // Pending
    const days = item.reference.charCodeAt(item.reference.length - 1) % 8;
    return {
      text: `${days} days pending`,
      progress: Math.min(100, Math.max(20, days * 12.5)),
      isCompleted: false,
    };
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in"
        >
          <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Page Header matching My Requests styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Department of Government Information
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-medium text-slate-500">Task Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {getLabel('My Assignments', 'මගේ පැවරුම්', 'எனது பணிகள்')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review, manage, and action departmental workflow tasks assigned to your desk.
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Total In Registry</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {totalCount}
          </div>
          <div className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold mt-1">
            All divisions combined
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Action Pending</div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {pendingCount}
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
            Awaiting clearance
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">In Progress</div>
          <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
            {inProgressCount}
          </div>
          <div className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold mt-1">
            Under active review
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Completed & Filed</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {completedCount}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Officially endorsed
          </div>
        </div>
      </div>

      {/* Filter Control Card with Searchable Multi-Select Dropdown */}
      <section
        aria-labelledby="filter-heading"
        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Custom Searchable Multi-Select Dropdown */}
          <div className="relative w-full sm:w-80" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-between text-left hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors shadow-2xs cursor-pointer"
            >
              <span
                className={`truncate ${
                  selectedCategories.length === 0
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-800 dark:text-slate-200 font-semibold'
                }`}
              >
                {dropdownLabel}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full left-0 mt-1.5 w-full sm:w-80 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-40 space-y-2 animate-fade-in"
              >
                {/* Search input inside dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    value={dropdownSearch}
                    onChange={(e) => setDropdownSearch(e.target.value)}
                    placeholder="Search category..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                  <SearchIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                </div>

                {/* Select All / Deselect All Bar */}
                <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>

                {/* Category Options List */}
                <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
                  {filteredCategories.length === 0 ? (
                    <div className="py-3 text-center text-xs text-slate-400">
                      No matching categories
                    </div>
                  ) : (
                    filteredCategories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      return (
                        <label
                          key={cat}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer text-xs transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleCategory(cat)}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span
                            className={`text-slate-700 dark:text-slate-300 ${
                              isChecked ? 'font-semibold text-slate-900 dark:text-white' : ''
                            }`}
                          >
                            {cat}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* View Tasks Button (Green outline style from screenshot) */}
          <button
            type="button"
            onClick={handleViewTasks}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border-2 border-emerald-600 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>View Tasks</span>
            )}
          </button>
        </div>

        {validationMessage && (
          <p className="mt-3 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{validationMessage}</span>
          </p>
        )}
      </section>

      {/* ── Table Toolbar Strip (Copy, CSV, Excel, PDF, Print & Search) ── */}
      <div className="p-3.5 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Export Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={handleCopyTable}
            title="Copy Table to Clipboard"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700 cursor-pointer shadow-2xs"
          >
            <CopyIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy</span>
          </button>
          <button
            type="button"
            onClick={() => handleExportCSV(false)}
            title="Export as CSV"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700 cursor-pointer shadow-2xs"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>CSV</span>
          </button>
          <button
            type="button"
            onClick={() => handleExportCSV(true)}
            title="Export as Excel"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700 cursor-pointer shadow-2xs"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Excel</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            title="Export as PDF"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700 cursor-pointer shadow-2xs"
          >
            <PrinterIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>PDF</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            title="Print Table"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700 cursor-pointer shadow-2xs"
          >
            <PrinterIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>
        </div>

        {/* Live Search Box matching legacy Search: [ ] */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="table-search-input"
            className="text-xs font-semibold text-slate-600 dark:text-slate-400"
          >
            Search:
          </label>
          <div className="relative">
            <input
              id="table-search-input"
              type="text"
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search table..."
              className="w-48 sm:w-60 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
            {tableSearch && (
              <button
                type="button"
                onClick={() => setTableSearch('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Data Table Card */}
      <section
        aria-label="Assignments List"
        className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden"
      >
        <div
          className="overflow-x-auto focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Assignments data table"
        >
          <table className="w-full text-left text-xs whitespace-nowrap min-w-[760px]">
            {/* Table Header matching View All Requests */}
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/90 dark:border-slate-800">
              <tr>
                <th scope="col" className="py-3.5 px-4 w-32">
                  Reference
                </th>
                <th scope="col" className="py-3.5 px-4 w-28">
                  Created
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[220px]">
                  Request From
                </th>
                <th scope="col" className="py-3.5 px-4 w-32">
                  Main Category
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[180px]">
                  Current Status
                </th>
                <th scope="col" className="py-3.5 px-4 text-center w-28">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body States */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {/* State 1: Initial Prompt */}
              {!hasSearched && !isLoading && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                        <FilterIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Select an option and click View Tasks
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Choose categories from the filter above to load assigned workflow tasks.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* State 2: Loading State */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center"
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Loading tasks...
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* State 3: Empty State (Matching "No data available in table") */}
              {hasSearched && !isLoading && paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium"
                  >
                    No data available in table
                  </td>
                </tr>
              )}

              {/* State 4: Loaded Rows matching View All Requests styling */}
              {!isLoading &&
                paginatedData.map((item) => {
                  const statusInfo = getStatusInfo(item);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Reference Column */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block font-mono font-bold px-2 py-0.5 rounded-md text-[11px] border ${
                            statusInfo.isCompleted
                              ? 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-700'
                              : 'bg-rose-100/80 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300/80 dark:border-rose-700'
                          }`}
                        >
                          {item.reference}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300 font-medium">
                        {item.created}
                      </td>

                      {/* Request From */}
                      <td className="py-3.5 px-4">
                        <p className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1">
                          {item.requestFrom}
                        </p>
                      </td>

                      {/* Main Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>

                      {/* Current Status with Turnaround Bar */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span
                              className={
                                statusInfo.isCompleted
                                  ? 'text-emerald-700 dark:text-emerald-400'
                                  : item.status === 'In Progress'
                                  ? 'text-sky-700 dark:text-sky-400'
                                  : 'text-rose-700 dark:text-rose-400'
                              }
                            >
                              {statusInfo.text}
                            </span>
                          </div>
                          {/* Turnaround Progress Bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                statusInfo.isCompleted
                                  ? 'bg-emerald-500'
                                  : item.status === 'In Progress'
                                  ? 'bg-sky-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${statusInfo.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 3 Action Buttons matching View All Page */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* 1. View Details (Eye) */}
                          <button
                            type="button"
                            onClick={() => handleAction('View', item.reference)}
                            title="View Task Details"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors shadow-2xs cursor-pointer"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Timeline / Audit (Clock) */}
                          <button
                            type="button"
                            onClick={() => handleAction('Update status', item.reference)}
                            title="Audit Trail / Update Status"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                          >
                            <ClockIcon className="w-3.5 h-3.5" />
                          </button>

                          {/* 3. Action / Forward (+) */}
                          <button
                            type="button"
                            onClick={() => handleAction('Forward', item.reference)}
                            title="Forward Task"
                            className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shadow-2xs cursor-pointer"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer & Pagination (Matching Legacy Screenshot) ── */}
        <div className="p-3.5 px-5 border-t border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            {totalEntries === 0 ? (
              <span>Showing 0 to 0 of 0 entries</span>
            ) : (
              <span>
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
                {tableSearch && ` (filtered from ${filteredAssignments.length} total entries)`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1 || totalEntries === 0}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Previous
            </button>
            {totalPages > 1 &&
              Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === i + 1
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            <button
              type="button"
              disabled={currentPage >= totalPages || totalEntries === 0}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors shadow-2xs cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyAssignmentsView;
