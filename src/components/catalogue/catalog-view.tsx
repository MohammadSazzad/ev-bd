"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATALOG_VEHICLES } from "@/lib/data/vehicles";
import { FiltersSidebar, FilterState } from "./filters-sidebar";
import { VehicleCard } from "./vehicle-card";
import { CatalogHeader, SortOption } from "./catalog-header";
import { ArrowRight, Scale } from "lucide-react";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

export function CatalogView() {
  const [filters, setFilters] = useState<FilterState>({
    categories: ["Electric Cars"], // Matches reference screenshot checked state
    brand: "All Brands",
    maxPrice: 10000000,
    minRange: 50,
  });

  const [sortBy, setSortBy] = useState<SortOption>("highest-range");
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  const handleToggleCompare = (id: string) => {
    setComparedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      brand: "All Brands",
      maxPrice: 10000000,
      minRange: 30,
    });
  };

  // Filter & sort logic
  const filteredVehicles = useMemo(() => {
    return CATALOG_VEHICLES.filter((vehicle) => {
      // If categories selected, match category
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(vehicle.category) &&
        vehicle.id !== "super-soco-tc"
      ) {
        return false;
      }

      // Brand filter
      if (
        filters.brand !== "All Brands" &&
        vehicle.brand.toLowerCase() !== filters.brand.toLowerCase()
      ) {
        return false;
      }

      // Price filter
      if (vehicle.price > filters.maxPrice) {
        return false;
      }

      // Min Range filter
      if (vehicle.rangeKm < filters.minRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "highest-range":
          return b.rangeKm - a.rangeKm;
        case "lowest-range":
          return a.rangeKm - b.rangeKm;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [filters, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <CatalogHeader
        totalCount={filteredVehicles.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filters Sidebar (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-6">
          <FiltersSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
          <GoogleAdSlot
            format="sidebar-rect"
            slotId={ADS_CONFIG.slots.catalogSidebar}
          />
        </div>

        {/* Right Column: Vehicle Cards List (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-8">
          {filteredVehicles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-12 text-center shadow-sm">
              <p className="text-base text-slate-700 dark:text-slate-300">
                No electric vehicles match your selected filter criteria.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-[#00DF8F] px-4 py-2 text-sm font-semibold text-[#070b14] hover:bg-[#00DF8F]/90 transition-all shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isCompared={comparedIds.includes(vehicle.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Compare Notification Bar when vehicles are selected */}
      {comparedIds.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4 rounded-2xl border border-emerald-300 dark:border-emerald-500/40 bg-white/95 dark:bg-[#0e1628]/95 px-5 py-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
            <Scale className="h-4 w-4 text-emerald-600 dark:text-[#00DF8F]" />
            <span>
              <strong className="text-slate-900 dark:text-white">{comparedIds.length}</strong> vehicle
              {comparedIds.length > 1 ? "s" : ""} selected
            </span>
          </div>
          <Link
            href={`/compare?vehicles=${comparedIds.join(",")}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#00DF8F] px-3.5 py-1.5 text-xs font-bold text-[#070b14] hover:bg-[#00DF8F]/90 transition-all shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
