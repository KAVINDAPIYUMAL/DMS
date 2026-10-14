'use client';

import React, { useState } from 'react';
import { MyRequestItem } from '@/app/data/myRequestsData';
import { XMarkIcon, PlusIcon, CheckIcon } from '@/app/components/ui/Icons';

interface RequestActionModalProps {
  request: MyRequestItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function RequestActionModal({
  request,
  isOpen,
  onClose,
  onSuccess,
}: RequestActionModalProps) {
  const [actionType, setActionType] = useState<'reminder' | 'note' | 'reassign'>('reminder');
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(
        actionType === 'reminder'
          ? `Urgent nudge sent to ${request.assignTo.name}`
          : actionType === 'note'
          ? `Internal memo logged on ${request.reference}`
          : `Reassignment request queued for ${request.reference}`
      );
      onClose();
      setNoteText('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--slt-primary)] text-white">
              <PlusIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Action on Request
              </h3>
              <p className="text-xs font-mono text-sky-600 dark:text-sky-400">
                {request.reference}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Action Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'reminder', label: 'Send Nudge', desc: 'Urgent reminder' },
                { id: 'note', label: 'Add Memo', desc: 'Audit note' },
                { id: 'reassign', label: 'Escalate', desc: 'Direct review' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActionType(opt.id as 'reminder' | 'note' | 'reassign')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    actionType === opt.id
                      ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <p className="text-xs font-bold">{opt.label}</p>
                  <p className="text-[11px] opacity-75">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400">Current Recipient: </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {request.assignTo.designation}
            </span>
            <span className="text-slate-400 block mt-0.5 font-mono text-[11px]">
              ID: {request.assignTo.code}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Remarks or Instructions
            </label>
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter official remark or instructions for the assigned officer..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--slt-primary)] text-white hover:bg-[var(--slt-primary-hover)] transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CheckIcon className="w-3.5 h-3.5" />
                  Confirm Action
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
