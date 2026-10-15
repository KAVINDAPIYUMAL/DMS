'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_REQUESTS_MOCK, DGI_OFFICERS_DIRECTORY } from '@/app/data/allRequestsData';
import { MyRequestItem } from '@/app/data/myRequestsData';
import { useLanguage } from '@/app/context/LanguageContext';
import { RequestDetailModal } from '@/app/components/my-requests/RequestDetailModal';
import { RequestActionModal } from '@/app/components/my-requests/RequestActionModal';
import { OfficerMultiSelect } from './OfficerMultiSelect';
import {
  SearchIcon,
  CopyIcon,
  DownloadIcon,
  PrinterIcon,
  EyeIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@/app/components/ui/Icons';

export function ViewAllRequestsView() {
  const { getLabel } = useLanguage();

  // ── Filters State (Matching Legacy System) ────────────────────────
  const [dateFrom, setDateFrom] = useState<string>('2025-01-01');
  const [dateTo, setDateTo] = useState<string>('2026-10-15');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOfficerCodes, setSelectedOfficerCodes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dropdown Open States
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Pagination & Modals State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState<MyRequestItem | null>(null);
  const [modalMode, setModalMode] = useState<'overview' | 'timeline' | 'attachments'>('overview');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionTargetRequest, setActionTargetRequest] = useState<MyRequestItem | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const allCategories = ['Bills', 'Information', 'Policy Update', 'Circulars', 'Cabinet Papers'];
  const allStatuses = ['Completed', 'Pending', 'Done'];

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Status
  const toggleStatus = (st: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  // ── Filtered Data Calculation ──────────────────────────────────────
  const filteredData = useMemo(() => {
    return ALL_REQUESTS_MOCK.filter((item) => {
      // Date filter
      const itemDate = item.created.replaceAll('/', '-');
      if (dateFrom && itemDate < dateFrom) return false;
      if (dateTo && itemDate > dateTo) return false;

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.mainCategory)
      ) {
        return false;
      }

      // Officer / Assignee filter
      if (
        selectedOfficerCodes.length > 0 &&
        !selectedOfficerCodes.includes(item.assignTo.code)
      ) {
        return false;
      }

      // Status filter
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(item.status)
      ) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRef = item.reference.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCategory = item.mainCategory.toLowerCase().includes(q);
        const matchesAssignTo =
          item.assignTo.designation.toLowerCase().includes(q) ||
          item.assignTo.code.toLowerCase().includes(q) ||
          item.assignTo.name.toLowerCase().includes(q);
        const matchesAssignFrom =
          item.assignFrom.designation.toLowerCase().includes(q) ||
          item.assignFrom.code.toLowerCase().includes(q) ||
          item.assignFrom.name.toLowerCase().includes(q);
        const matchesStatus = item.turnaroundText.toLowerCase().includes(q);

        return (
          matchesRef ||
          matchesTitle ||
          matchesCategory ||
          matchesAssignTo ||
          matchesAssignFrom ||
          matchesStatus
        );
      }

      return true;
    });
  }, [dateFrom, dateTo, selectedCategories, selectedOfficerCodes, selectedStatuses, searchQuery]);

  // Pagination calculation
  const totalEntries = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // KPI Statistics across all requests
  const totalCount = ALL_REQUESTS_MOCK.length;
  const completedCount = ALL_REQUESTS_MOCK.filter(
    (i) => i.status === 'Completed' || i.status === 'Done'
  ).length;
  const pendingCount = ALL_REQUESTS_MOCK.filter((i) => i.status === 'Pending').length;
  const overdueCount = ALL_REQUESTS_MOCK.filter((i) => i.isOverdue).length;

  // ── Export Handlers ─────────────────────────────────────────────────
  const handleCopyTable = () => {
    const headers = ['Reference', 'Created', 'Assign To', 'Category', 'Assign From', 'Status'];
    const rows = filteredData.map((d) => [
      d.reference,
      d.created,
      `${d.assignTo.designation} (${d.assignTo.code})`,
      d.mainCategory,
      `${d.assignFrom.designation} (${d.assignFrom.code})`,
      d.turnaroundText,
    ]);
    const text = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
    showToast('Table copied to clipboard!');
  };

  const handleExportCSV = () => {
    const headers = ['Reference,Created,Assign To,Main Category,Assign From,Current Status'];
    const rows = filteredData.map(
      (d) =>
        `"${d.reference}","${d.created}","${d.assignTo.designation} (${d.assignTo.code})","${d.mainCategory}","${d.assignFrom.designation} (${d.assignFrom.code})","${d.turnaroundText}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `all_requests_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV file downloaded successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  // Reset Filters
  const handleResetFilters = () => {
    setDateFrom('2025-01-01');
    setDateTo('2026-10-15');
    setSelectedCategories([]);
    setSelectedOfficerCodes([]);
    setSelectedStatuses([]);
    setSearchQuery('');
    setCurrentPage(1);
    showToast('All filters reset');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Department of Government Information
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-medium text-slate-500">Central Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {getLabel('View All Requests', 'සියලු ඉල්ලීම් බැලීම', 'அனைத்து கோரிக்கைகளையும் காண்க')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive departmental repository to search, track, and audit all workflow tasks and submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
          <Link
            href="/request-management/submit-request"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--slt-primary)] hover:bg-[var(--slt-primary-hover)] text-white text-xs font-bold shadow-sm hover:shadow transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Submit New Request</span>
          </Link>
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
          <div className="text-xs font-medium text-slate-500">Overdue SLA</div>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
            {overdueCount}
          </div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
            Attention needed
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

      {/* ── Main Filter Bar (Faithfully Replicating Legacy Screen) ──── */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {getLabel('Search & Filter Repository', 'ලේඛනාගාර පෙරහන', 'தேடல் மற்றும் வடிகட்டி')}
          </h2>
          <span className="text-xs text-slate-400">
            {filteredData.length} records matching current criteria
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
          {/* 1. Date From */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Date From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          {/* 2. Date To */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Date To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          {/* 3. Category Multi-select */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Main Category
            </label>
            <button
              type="button"
              onClick={() => {
                setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-sky-500/40 shadow-2xs"
            >
              <span className="truncate">
                {selectedCategories.length === 0
                  ? 'Nothing selected'
                  : `${selectedCategories.length} Categories`}
              </span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-56 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-30 space-y-1">
                <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([...allCategories])}
                    className="text-sky-600 hover:underline"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([])}
                    className="text-rose-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                {allCategories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 4. Assigned Officer Multi-select (From Screenshot) */}
          <div>
            <OfficerMultiSelect
              officers={DGI_OFFICERS_DIRECTORY}
              selectedCodes={selectedOfficerCodes}
              onChange={setSelectedOfficerCodes}
              label="Assigned Officer"
            />
          </div>

          {/* 5. Status Multi-select */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Current Status
            </label>
            <button
              type="button"
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsCategoryDropdownOpen(false);
              }}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-sky-500/40 shadow-2xs"
            >
              <span className="truncate">
                {selectedStatuses.length === 0
                  ? 'Nothing selected'
                  : `${selectedStatuses.length} Statuses`}
              </span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-30 space-y-1">
                {allStatuses.map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(st)}
                      onChange={() => toggleStatus(st)}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{st}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 6. View Tasks Trigger Button (Matching Legacy Green Button) */}
          <div>
            <button
              type="button"
              onClick={() => {
                setIsCategoryDropdownOpen(false);
                setIsStatusDropdownOpen(false);
                setCurrentPage(1);
                showToast(`Filtered: ${filteredData.length} records found`);
              }}
              className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Tasks</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-800/60 text-[11px]">
                {filteredData.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Table Toolbar (Export Tools & Search) ────────────────── */}
      <div className="p-3.5 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Export Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
            Export:
          </span>
          <button
            onClick={handleCopyTable}
            title="Copy Table to Clipboard"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700"
          >
            <CopyIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy</span>
          </button>
          <button
            onClick={handleExportCSV}
            title="Export as CSV"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportCSV}
            title="Export as Excel"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Excel</span>
          </button>
          <button
            onClick={handlePrint}
            title="Print or Export as PDF"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-200/70 dark:border-slate-700"
          >
            <PrinterIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>
        </div>

        {/* Live Search Box */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
            Search:
          </label>
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search reference, officer, category..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Data Table Card ──────────────────────────────────── */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/90 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-32">Reference</th>
                <th className="py-3.5 px-4 w-28">Created</th>
                <th className="py-3.5 px-4 min-w-[220px]">Assign To</th>
                <th className="py-3.5 px-4 w-32">Main Category</th>
                <th className="py-3.5 px-4 min-w-[200px]">Assign From</th>
                <th className="py-3.5 px-4 min-w-[180px]">Current Status</th>
                <th className="py-3.5 px-4 text-center w-28">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No records match your filter criteria</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const isCompleted = item.statusVariant === 'completed';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Reference Column */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block font-mono font-bold px-2 py-0.5 rounded-md text-[11px] border ${
                            isCompleted
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

                      {/* Assign To */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setSelectedRequest(item);
                            setModalMode('overview');
                            setIsDetailModalOpen(true);
                          }}
                          className="text-left group/link"
                        >
                          <p className="text-sky-700 dark:text-sky-400 font-semibold hover:underline line-clamp-1">
                            {item.assignTo.designation}
                          </p>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            ({item.assignTo.code}) • {item.assignTo.name}
                          </p>
                        </button>
                      </td>

                      {/* Main Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.mainCategory}
                        </span>
                      </td>

                      {/* Assign From */}
                      <td className="py-3.5 px-4">
                        <p className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1">
                          {item.assignFrom.designation}
                        </p>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          ({item.assignFrom.code})
                        </p>
                      </td>

                      {/* Current Status */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span
                              className={
                                isCompleted
                                  ? 'text-emerald-700 dark:text-emerald-400'
                                  : 'text-rose-700 dark:text-rose-400'
                              }
                            >
                              {item.turnaroundText}
                            </span>
                          </div>
                          {/* Turnaround Progress Bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-emerald-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 3 Action Buttons */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* 1. View Details (Eye) */}
                          <button
                            onClick={() => {
                              setSelectedRequest(item);
                              setModalMode('overview');
                              setIsDetailModalOpen(true);
                            }}
                            title="View Request Details"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors shadow-2xs cursor-pointer"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>

                          {/* 2. Timeline / Audit (Clock) */}
                          <button
                            onClick={() => {
                              setSelectedRequest(item);
                              setModalMode('timeline');
                              setIsDetailModalOpen(true);
                            }}
                            title="Audit Trail & History"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                          >
                            <ClockIcon className="w-3.5 h-3.5" />
                          </button>

                          {/* 3. Action / Forward (+) */}
                          <button
                            onClick={() => {
                              setActionTargetRequest(item);
                              setIsActionModalOpen(true);
                            }}
                            title="Forward or Nudge Officer"
                            className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shadow-2xs cursor-pointer"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer & Pagination ─────────────────────────────── */}
        <div className="p-4 px-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    currentPage === p
                      ? 'bg-[var(--slt-primary)] text-white'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RequestDetailModal
        request={selectedRequest}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        defaultTab={modalMode}
      />

      <RequestActionModal
        request={actionTargetRequest}
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />
    </div>
  );
}
