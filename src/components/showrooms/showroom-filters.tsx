"use client";

import { ChevronDown, X } from "lucide-react";
import { SHOWROOM_DIVISIONS, SHOWROOM_BRANDS } from "@/lib/data/showrooms";

interface ShowroomFiltersProps {
  selectedDivision: string;
  selectedBrand: string;
  activeTag: string | null;
  onSelectDivision: (div: string) => void;
  onSelectBrand: (brand: string) => void;
  onClearTag: () => void;
}

export function ShowroomFilters({
  selectedDivision,
  selectedBrand,
  activeTag,
  onSelectDivision,
  onSelectBrand,
  onClearTag,
}: ShowroomFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Division Selector */}
      <div className="relative">
        <select
          value={selectedDivision}
          onChange={(e) => onSelectDivision(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0e1628] pl-3.5 pr-9 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 font-medium shadow-sm"
        >
          {SHOWROOM_DIVISIONS.map((div) => (
            <option key={div} value={div} className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              {div}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Brand Selector */}
      <div className="relative">
        <select
          value={selectedBrand}
          onChange={(e) => onSelectBrand(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0e1628] pl-3.5 pr-9 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 font-medium shadow-sm"
        >
          {SHOWROOM_BRANDS.map((brand) => (
            <option key={brand} value={brand} className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              {brand}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Active Area / Filter Tag */}
      {activeTag && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-[#00DF8F] shadow-sm">
          <span>{activeTag}</span>
          <button
            type="button"
            onClick={onClearTag}
            className="rounded-full hover:bg-emerald-200/60 dark:hover:bg-emerald-900/60 p-0.5 transition-colors"
            aria-label="Remove filter"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
