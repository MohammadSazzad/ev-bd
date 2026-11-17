"use client";

import { useSearchParams } from "next/navigation";
import { ComparisonMatrix } from "./comparison-matrix";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

export function ComparisonView() {
  const searchParams = useSearchParams();
  const vehiclesParam = searchParams.get("vehicles");

  const initialVehicleIds = vehiclesParam
    ? vehiclesParam.split(",").filter(Boolean)
    : ["byd-atto-3", "mg-zs-ev"];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Compare Electric Vehicles
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Evaluate side-by-side technical parameters to determine the best performance matrix for your budget
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <ComparisonMatrix initialVehicleIds={initialVehicleIds} />

      {/* Bottom Leaderboard Ad Slot */}
      <div className="mt-10 sm:mt-12">
        <GoogleAdSlot
          format="horizontal-banner"
          slotId={ADS_CONFIG.slots.compareBottom}
        />
      </div>
    </div>
  );
}
