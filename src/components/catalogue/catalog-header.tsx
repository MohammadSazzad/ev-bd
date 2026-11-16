"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "highest-range" | "lowest-range" | "price-asc" | "price-desc";

interface CatalogHeaderProps {
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function CatalogHeader({
  totalCount,
  sortBy,
  onSortChange,
}: CatalogHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Electric Vehicles
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Showing {totalCount} electric model{totalCount === 1 ? "" : "s"} in Bangladesh
        </p>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0e1628] pl-3.5 pr-9 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none transition-all hover:border-slate-400 dark:hover:border-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 font-medium shadow-sm"
          >
            <option value="highest-range" className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              Sort by: Highest Range
            </option>
            <option value="lowest-range" className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              Sort by: Lowest Range
            </option>
            <option value="price-asc" className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              Sort by: Lowest Price
            </option>
            <option value="price-desc" className="bg-white dark:bg-[#0e1628] text-slate-900 dark:text-white">
              Sort by: Highest Price
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  );
}
