"use client";

import { useState, useMemo, useEffect } from "react";
import type { Showroom } from "@/lib/data/showrooms";
import { ShowroomFilters } from "./showroom-filters";
import { ShowroomCard } from "./showroom-card";
import { InteractiveMap } from "./interactive-map";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

type ApiShowroom = { slug: string; name: string; address: string; phone?: string | null; division?: string | null; area?: string | null; mapLabel?: string | null; brands: Array<{ brand: { name: string } }> };

export function ShowroomsView() {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState("Dhaka Division");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [activeTag, setActiveTag] = useState<string | null>("Dhaka Central");
  const [selectedShowroomId, setSelectedShowroomId] = useState<string | null>(
    "byd-tejgaon"
  );

  useEffect(() => {
    const params = new URLSearchParams({ pageSize: "50", division: selectedDivision });
    if (selectedBrand !== "All Brands") params.set("brand", selectedBrand.toLowerCase().replaceAll(" ", "-"));
    fetch(`/api/v1/showrooms?${params}`)
      .then((response) => response.json())
      .then((response) => setShowrooms((response.data?.items ?? []).map((showroom: ApiShowroom) => ({
        id: showroom.slug,
        name: showroom.name,
        distance: "",
        address: showroom.address,
        phone: showroom.phone ?? "",
        brands: showroom.brands.map((item) => item.brand.name).join(", "),
        division: showroom.division ?? "",
        area: showroom.area ?? "",
        mapLabel: showroom.mapLabel ?? showroom.area ?? showroom.name,
        mapCoords: { x: 50, y: 50 },
      }))))
      .catch(() => setShowrooms([]))
      .finally(() => setIsLoading(false));
  }, [selectedDivision, selectedBrand]);

  const filteredShowrooms: Showroom[] = useMemo(() => {
    return showrooms.filter((s) => {
      if (selectedDivision && s.division !== selectedDivision) {
        return false;
      }
      if (selectedBrand !== "All Brands" && !s.brands.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [showrooms, selectedDivision, selectedBrand]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Find EV Showrooms Near You
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Locate verified electric vehicle showrooms, Importers, and official dealerships in Bangladesh.
        </p>
      </div>

      {/* Filter Dropdowns & Tag */}
      <ShowroomFilters
        selectedDivision={selectedDivision}
        selectedBrand={selectedBrand}
        activeTag={activeTag}
        onSelectDivision={setSelectedDivision}
        onSelectBrand={setSelectedBrand}
        onClearTag={() => setActiveTag(null)}
      />

      {/* 2-Column Layout: Cards on Left, Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Verified Showrooms List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            VERIFIED SHOWROOMS ({filteredShowrooms.length} RESULTS)
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-8 text-center text-slate-500">Loading showrooms...</div>
          ) : filteredShowrooms.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-8 text-center text-slate-500">
              No showrooms found for this selection.
            </div>
          ) : (
            filteredShowrooms.map((showroom) => (
              <ShowroomCard
                key={showroom.id}
                showroom={showroom}
                isSelected={selectedShowroomId === showroom.id}
                onSelect={setSelectedShowroomId}
              />
            ))
          )}
        </div>

        {/* Right Column: Interactive Map */}
        <div className="lg:col-span-7 sticky top-24">
          <InteractiveMap
            showrooms={filteredShowrooms}
            selectedId={selectedShowroomId}
            onSelectPin={setSelectedShowroomId}
          />
        </div>
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
