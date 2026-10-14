'use client';

import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  FilterIcon,
  CheckCircleIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@/app/components/ui/Icons';
import { ASSIGNMENT_FILTER_OPTIONS } from '@/mock/assignmentOptions';
import { getAssignments } from '@/services/assignment.service';
import type {
  AssignmentFilterValue,
  AssignmentItem,
  AssignmentActionType,
} from '@/types/assignment';

export function MyAssignmentsView() {
  const { getLabel } = useLanguage();

  // Filter & data states
  const [selectedStatus, setSelectedStatus] = useState<AssignmentFilterValue | ''>('');
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Fetch tasks on clicking "View Tasks"
  const handleViewTasks = async () => {
    if (!selectedStatus) {
      setValidationMessage('Please select an option before loading tasks.');
      return;
    }

    setValidationMessage(null);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await getAssignments(selectedStatus);
      setAssignments(data);
    } catch {
      showToast('Error loading assignments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder action handler
  const handleAction = (action: AssignmentActionType, reference: string) => {
    showToast(`${action} action triggered for ${reference} (Phase 2 placeholder)`);
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

      {/* Filter Control Card matching My Requests styling */}
      <section
        aria-labelledby="filter-heading"
        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs"
      >
        <div className="flex items-center gap-2 mb-3.5">
          <FilterIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2
            id="filter-heading"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Filter Tasks
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-3.5">
          <div className="flex-1 max-w-sm">
            <label
              htmlFor="assignment-status-filter"
              className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1"
            >
              Task Status
            </label>
            <div className="relative">
              <select
                id="assignment-status-filter"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as AssignmentFilterValue | '');
                  setValidationMessage(null);
                }}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              >
                <option value="">Nothing selected</option>
                {ASSIGNMENT_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleViewTasks}
              disabled={isLoading}
              className="w-full sm:w-auto py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>View Tasks</span>
              )}
            </button>
          </div>
        </div>

        {validationMessage && (
          <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{validationMessage}</span>
          </p>
        )}
      </section>

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
            {/* Table Header matching My Requests */}
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/90 dark:border-slate-800">
              <tr>
                <th scope="col" className="py-3.5 px-4 w-36">
                  Reference
                </th>
                <th scope="col" className="py-3.5 px-4 w-32">
                  Created
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[220px]">
                  Request From
                </th>
                <th scope="col" className="py-3.5 px-4 w-36">
                  Category
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-[160px]">
                  Current status
                </th>
                <th scope="col" className="py-3.5 px-4 text-center w-56">
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
                      <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                        <FilterIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Select an option and click View Tasks
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Choose a status from the filter card above to load assigned workflow tasks.
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
                      <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Loading tasks...
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* State 3: Empty State */}
              {hasSearched && !isLoading && assignments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <ExclamationCircleIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No tasks found
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        There are no task assignments matching your selected status filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* State 4: Loaded Rows */}
              {!isLoading &&
                assignments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Reference Column */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block font-mono font-bold px-2 py-0.5 rounded-md text-[11px] border bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700">
                        {item.reference}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300 font-medium">
                      {item.created}
                    </td>

                    {/* Request From */}
                    <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-semibold">
                      {item.requestFrom}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {item.category}
                      </span>
                    </td>

                    {/* Current Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDotClass(item.status)}`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Actions Column (3 small placeholder buttons) */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAction('View', item.reference)}
                          aria-label={`View assignment ${item.reference}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/60 transition-colors text-[11px] font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAction('Update status', item.reference)}
                          aria-label={`Update status for assignment ${item.reference}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-[11px] font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                        >
                          <ArrowPathIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>Update status</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAction('Forward', item.reference)}
                          aria-label={`Forward assignment ${item.reference}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors text-[11px] font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        >
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                          <span>Forward</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer info strip when tasks are shown */}
        {hasSearched && !isLoading && assignments.length > 0 && (
          <div className="p-4 px-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {assignments.length} task{assignments.length > 1 ? 's' : ''} for filter: &ldquo;
              <strong className="text-slate-700 dark:text-slate-300">{selectedStatus}</strong>&rdquo;
            </span>
            <span className="text-[11px] text-slate-400">Phase 1 Mock Dataset</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default MyAssignmentsView;
