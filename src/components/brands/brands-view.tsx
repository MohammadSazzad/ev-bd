"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import type { EVBrand } from "@/lib/data/brands";
import { BrandCard } from "./brand-card";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

type ApiBrand = { slug: string; name: string; origin?: string | null; category?: string | null; description?: string | null; _count?: { vehicles: number } };

export function BrandsView() {
  const [brands, setBrands] = useState<EVBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/v1/brands")
      .then((response) => response.json())
      .then((response) => setBrands((response.data ?? []).map((brand: ApiBrand) => ({
        id: brand.slug,
        name: brand.name,
        slug: brand.slug,
        vehicleCount: brand._count?.vehicles ?? 0,
        origin: brand.origin ?? "",
        category: brand.category ?? "Electric Vehicles",
        description: brand.description ?? "",
        logoType: brand.slug as EVBrand["logoType"],
      }))))
      .catch(() => setBrands([]))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredBrands: EVBrand[] = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const q = searchQuery.toLowerCase();
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q)
    );
  }, [searchQuery, brands]);

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
        {isLoading ? (
          <div className="py-16 text-center text-slate-500">Loading brands...</div>
        ) : filteredBrands.length === 0 ? (
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

      {/* Bottom Leaderboard Ad Slot */}
      <div className="mt-10 sm:mt-12">
        <GoogleAdSlot
          format="horizontal-banner"
          slotId={ADS_CONFIG.slots.brandsBottom}
        />
      </div>
    </div>
  );
}
