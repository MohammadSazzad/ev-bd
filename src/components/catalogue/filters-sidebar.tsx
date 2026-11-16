"use client";

import { Check, ChevronDown } from "lucide-react";
import { ALL_BRANDS, ALL_CATEGORIES } from "@/lib/data/vehicles";

export interface FilterState {
  categories: string[];
  brand: string;
  maxPrice: number;
  minRange: number;
}

interface FiltersSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset?: () => void;
}

export function FiltersSidebar({
  filters,
  onChange,
  onReset,
}: FiltersSidebarProps) {
  const toggleCategory = (cat: string) => {
    const nextCategories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: nextCategories });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, brand: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, minRange: Number(e.target.value) });
  };

  return (
    <aside className="w-full rounded-2xl border border-slate-800/80 bg-[#0e1628] p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
        <h3 className="text-lg font-bold text-white tracking-tight">Filters</h3>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-slate-400 hover:text-[#00DF8F] transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-6 pt-5">
        {/* VEHICLE CATEGORY */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00DF8F] mb-3">
            VEHICLE CATEGORY
          </h4>
          <div className="space-y-2.5">
            {ALL_CATEGORIES.map((cat) => {
              const isChecked = filters.categories.includes(cat);
              return (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <div
                    onClick={() => toggleCategory(cat)}
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                      isChecked
                        ? "bg-[#00DF8F] border-[#00DF8F] text-[#070b14]"
                        : "border-slate-700 bg-slate-900/60 group-hover:border-slate-500"
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <span
                    onClick={() => toggleCategory(cat)}
                    className={`text-sm transition-colors ${
                      isChecked
                        ? "text-white font-medium"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* BRAND */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00DF8F] mb-3">
            BRAND
          </h4>
          <div className="relative">
            <select
              value={filters.brand}
              onChange={handleBrandChange}
              className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0a101f] px-3.5 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
            >
              {ALL_BRANDS.map((brand) => (
                <option key={brand} value={brand} className="bg-[#0e1628] text-white">
                  {brand}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* PRICE RANGE (BDT) */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00DF8F] mb-3">
            PRICE RANGE (BDT)
          </h4>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>৳100K</span>
            <span>
              {filters.maxPrice >= 10000000
                ? "৳10M"
                : `৳${(filters.maxPrice / 100000).toFixed(1)}L`}
            </span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="50000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full accent-slider cursor-pointer"
          />
        </div>

        {/* REAL-WORLD RANGE */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00DF8F] mb-3">
            REAL-WORLD RANGE
          </h4>
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Min: {filters.minRange} km
          </div>
          <input
            type="range"
            min="30"
            max="500"
            step="10"
            value={filters.minRange}
            onChange={handleRangeChange}
            className="w-full accent-slider cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
}
