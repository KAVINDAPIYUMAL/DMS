'use client';

import React from 'react';

interface ErrorBannerProps {
  /** Error message to display */
  message: string;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Visual variant */
  variant?: 'inline' | 'banner';
}

export function ErrorBanner({
  message,
  onRetry,
  variant = 'banner',
}: ErrorBannerProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-1 text-xs font-semibold underline hover:no-underline"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-800 dark:text-rose-200">
            Something went wrong
          </p>
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
            {message}
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
