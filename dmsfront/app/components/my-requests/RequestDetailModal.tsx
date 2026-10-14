'use client';

import React from 'react';
import { MyRequestItem } from '@/app/data/myRequestsData';
import {
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
  PrinterIcon,
} from '@/app/components/ui/Icons';

interface RequestDetailModalProps {
  request: MyRequestItem | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'overview' | 'timeline' | 'attachments';
}

export function RequestDetailModal({
  request,
  isOpen,
  onClose,
  defaultTab = 'overview',
}: RequestDetailModalProps) {
  const [userTab, setUserTab] = React.useState<'overview' | 'timeline' | 'attachments' | null>(null);
  const activeTab = userTab ?? defaultTab;

  const handleClose = () => {
    setUserTab(null);
    onClose();
  };

  if (!isOpen || !request) return null;

  const isCompleted = request.statusVariant === 'completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      {/* Modal Dialog Card */}
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                {request.reference}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompleted ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                  }`}
                />
                {request.status} • {request.turnaroundText}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Category: {request.mainCategory}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2 line-clamp-2">
              {request.title}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/20 dark:bg-slate-900">
          <button
            onClick={() => setUserTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Overview & Details
          </button>
          <button
            onClick={() => setUserTab('timeline')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            Audit Trail & History ({request.timeline.length})
          </button>
          <button
            onClick={() => setUserTab('attachments')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'attachments'
                ? 'border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <DownloadIcon className="w-4 h-4" />
            Attachments ({request.attachments.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Request Summary
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {request.description}
                </p>
              </div>

              {/* Assignment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Assign To */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    Assign To
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {request.assignTo.designation}
                    </p>
                    <p className="text-xs font-mono text-sky-600 dark:text-sky-400 mt-0.5">
                      {request.assignTo.code}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Designated Officer: {request.assignTo.name}
                    </p>
                  </div>
                </div>

                {/* Assign From */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Assign From (Originator)
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {request.assignFrom.designation}
                    </p>
                    <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {request.assignFrom.code}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Initiated by: {request.assignFrom.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Progress Metrics */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">
                    Turnaround Progress
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">
                    {request.progress}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-rose-500 to-amber-400'
                    }`}
                    style={{ width: `${request.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Created: {request.created}</span>
                  <span>Turnaround: {request.turnaroundText}</span>
                  <span>Priority: {request.priority}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Chronological Workflow Signoffs
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {request.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center ${
                        step.status === 'completed'
                          ? 'border-emerald-500 text-emerald-500'
                          : step.status === 'current'
                          ? 'border-sky-500 text-sky-500 animate-pulse'
                          : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {step.stage}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                        Action by: {step.actor}
                      </p>
                      {step.notes && (
                        <p className="text-xs text-slate-500 mt-1.5 italic bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700/60">
                          &ldquo;{step.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Uploaded Records & Official Annexes
              </h4>
              <div className="space-y-2.5">
                {request.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-sky-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase">
                        {file.type}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${file.name}...`)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/40 hover:text-sky-600 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <PrinterIcon className="w-4 h-4" />
            Print Record
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
