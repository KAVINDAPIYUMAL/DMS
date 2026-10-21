'use client';

import React, { useState, useRef, useEffect, useMemo, useId } from 'react';
import type { SelectOption } from '@/types/request';

export interface SearchableSelectProps {
  id?: string;
  name?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  className?: string;
  triggerClassName?: string;
  ariaLabel?: string;
}

export function SearchableSelect({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  placeholder = 'Select option',
  searchPlaceholder = '',
  disabled = false,
  required = false,
  error = false,
  className = '',
  triggerClassName = '',
  ariaLabel,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;

  // Filter options based on typed search query
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const query = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, search]);

  // Selected option object
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Focus the search input when opened
  useEffect(() => {
    if (isOpen) {
      const initialIdx = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(initialIdx >= 0 ? initialIdx : 0);
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setSearch('');
      setHighlightedIndex(-1);
    }
  }, [isOpen, options, value]);

  // Close if disabled
  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          onBlur?.();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onBlur]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li[role="option"]');
      const item = items[highlightedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
    triggerButtonRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerButtonRef.current?.focus();
      onBlur?.();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredOptions.length === 0) return;
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredOptions.length === 0) return;
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length === 0) return;
      const targetOption =
        highlightedIndex >= 0 && highlightedIndex < filteredOptions.length
          ? filteredOptions[highlightedIndex]
          : filteredOptions[0];
      if (targetOption) {
        handleSelect(targetOption.value);
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {/* Hidden input for form integration */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Main Trigger Button matching user's photo */}
      <button
        ref={triggerButtonRef}
        id={selectId}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-required={required}
        aria-invalid={error}
        className={`w-full rounded-md px-3 py-2 text-sm flex items-center justify-between text-left transition-colors cursor-pointer border ${
          error
            ? 'border-red-500 ring-1 ring-red-500'
            : 'border-slate-300 dark:border-slate-600'
        } ${
          disabled
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-70'
            : 'bg-[#dce2e6] hover:bg-[#d2d9df] dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
        } ${triggerClassName}`}
      >
        <span className={`truncate font-normal ${!selectedOption ? 'text-slate-500 dark:text-slate-400' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className="ml-2 shrink-0 text-[10px] text-slate-700 dark:text-slate-300 select-none"
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-50 overflow-hidden"
          style={{ minWidth: '100%' }}
        >
          {/* Top Search / Typing Area matching photo */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              aria-label="Search options"
              className="w-full px-3 py-1.5 text-sm rounded border border-[#66afe9] ring-2 ring-[#66afe9]/30 dark:ring-blue-500/40 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Options List */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            className="max-h-56 overflow-y-auto py-1 scrollbar-thin"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3.5 py-2.5 text-xs text-slate-400 dark:text-slate-500 text-center italic">
                No matching options
              </li>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = opt.value === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-3.5 py-2 text-sm flex items-center justify-between cursor-pointer select-none transition-colors ${
                      isSelected
                        ? 'bg-[#007bff] text-white font-medium hover:bg-[#0069d9]'
                        : isHighlighted
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-white shrink-0 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
