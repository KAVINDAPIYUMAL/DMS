'use client';

import React from 'react';

interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional message below the spinner */
  message?: string;
  /** If true, renders full-page centered. Otherwise inline. */
  fullPage?: boolean;
}

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

export function LoadingSpinner({
  size = 'md',
  message,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} border-sky-200 dark:border-sky-800 border-t-sky-600 dark:border-t-sky-400 rounded-full animate-spin`}
      />
      {message && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          {message}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center py-24">
        {spinner}
      </div>
    );
  }

  return spinner;
}
