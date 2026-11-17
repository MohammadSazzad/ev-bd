"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { EV_BRANDS, EVBrand } from "@/lib/data/brands";
import { BrandCard } from "./brand-card";

export function BrandsView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands: EVBrand[] = useMemo(() => {
    if (!searchQuery.trim()) return EV_BRANDS;
    const q = searchQuery.toLowerCase();
    return EV_BRANDS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            EV Brands in Bangladesh
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Browse verified electric vehicle manufacturers, brand showrooms, and authorized logistics networks in local hubs
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manufacturer..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 shadow-sm"
          />
        </div>
      </div>

      {/* Main Brands Card Container */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] p-8 sm:p-12 shadow-2xl transition-colors duration-150">
        {filteredBrands.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No EV brands found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
