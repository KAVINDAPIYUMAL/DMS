'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { OfficerDirectoryItem } from '@/types/request';
import { SearchIcon } from '@/components/ui/Icons';

interface OfficerMultiSelectProps {
  officers: OfficerDirectoryItem[];
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
  label?: string;
}

export function OfficerMultiSelect({
  officers,
  selectedCodes,
  onChange,
  label = 'Assigned Officer',
}: OfficerMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOfficers = useMemo(() => {
    if (!search.trim()) return officers;
    const q = search.toLowerCase();
    return officers.filter(
      (off) =>
        off.code.toLowerCase().includes(q) ||
        off.designation.toLowerCase().includes(q) ||
        off.name.toLowerCase().includes(q) ||
        (off.division && off.division.toLowerCase().includes(q))
    );
  }, [officers, search]);

  const handleSelectAll = () => {
    const allFiltered = filteredOfficers.map((o) => o.code);
    const combined = Array.from(new Set([...selectedCodes, ...allFiltered]));
    onChange(combined);
  };

  const handleDeselectAll = () => {
    if (search.trim()) {
      const filteredSet = new Set(filteredOfficers.map((o) => o.code));
      onChange(selectedCodes.filter((c) => !filteredSet.has(c)));
    } else {
      onChange([]);
    }
  };

  const toggleOfficer = (code: string) => {
    if (selectedCodes.includes(code)) {
      onChange(selectedCodes.filter((c) => c !== code));
    } else {
      onChange([...selectedCodes, code]);
    }
  };

  // Label text matching legacy "Nothing selected"
  const getButtonText = () => {
    if (selectedCodes.length === 0) return 'Nothing selected';
    if (selectedCodes.length === officers.length) return 'All Officers selected';
    if (selectedCodes.length === 1) {
      const found = officers.find((o) => o.code === selectedCodes[0]);
      return found ? `${found.code} - ${found.designation}` : '1 Officer selected';
    }
    return `${selectedCodes.length} Officers selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
          {label}
        </label>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-colors shadow-2xs hover:bg-slate-100/70 dark:hover:bg-slate-700/60"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate text-slate-700 dark:text-slate-200">
          {getButtonText()}
        </span>
        <span className="text-slate-400 text-[10px] ml-2 shrink-0">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 sm:left-auto right-0 sm:right-auto sm:w-80 md:w-96 mt-1.5 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-40 animate-fade-in text-xs">
          {/* Search Input Box (matching legacy screenshot) */}
          <div className="relative mb-2">
            <SearchIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by NIC, code, designation..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
              autoFocus
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Row: Select All | Deselect All */}
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

          {/* Scrollable Checkbox List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            {filteredOfficers.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs italic">
                No officers found matching &quot;{search}&quot;
              </div>
            ) : (
              filteredOfficers.map((officer) => {
                const isSelected = selectedCodes.includes(officer.code);
                return (
                  <label
                    key={officer.code}
                    className={`flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-sky-50/80 dark:bg-sky-950/50 text-sky-950 dark:text-sky-200'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOfficer(officer.code)}
                      className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-[11px]">
                          {officer.code}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                          {officer.designation}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                        {officer.name} {officer.division ? `• ${officer.division}` : ''}
                      </p>
                    </div>
                  </label>
                );
              })
            )}
          </div>

          {/* Footer count */}
          <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>
              {selectedCodes.length} of {officers.length} selected
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
