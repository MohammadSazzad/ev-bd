"use client";

import { VehicleDetail } from "@/lib/data/vehicle-details";
import { VehicleGallery } from "./vehicle-gallery";
import { BatteryReliabilityCard } from "./battery-reliability-card";
import { SponsoredPartnerCard } from "./sponsored-partner-card";
import { KeySpecsGrid } from "./key-specs-grid";
import { DetailedParameters } from "./detailed-parameters";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

interface VehicleDetailsViewProps {
  vehicle: VehicleDetail;
}

export function VehicleDetailsView({ vehicle }: VehicleDetailsViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Vehicle Info Header */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-[#00DF8F] mb-1.5">
          {vehicle.brandSubtitle}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {vehicle.name}
        </h1>
        <p className="mt-2 text-xl sm:text-2xl font-bold text-emerald-600 dark:text-[#00DF8F]">
          {vehicle.formattedPrice}
        </p>
      </div>

      {/* Main Top Grid: Gallery on Left (8 cols) + Cards on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Interactive Image Gallery */}
        <div className="lg:col-span-8">
          <VehicleGallery vehicleName={vehicle.name} images={vehicle.images} />
        </div>

        {/* Right Column: Battery Reliability & Sponsored Partner */}
        <div className="lg:col-span-4 space-y-5">
          <BatteryReliabilityCard vehicle={vehicle} />
          <SponsoredPartnerCard />
        </div>
      </div>

      {/* Key Technical Specifications (4 Horizontal Cards) */}
      <KeySpecsGrid specs={vehicle.keySpecs} />

      {/* Detailed Parameters (3 Structured Specification Cards) */}
      <DetailedParameters parameters={vehicle.detailedParameters} />

      {/* Non-intrusive Leaderboard Ad Slot */}
      <div className="mt-12 sm:mt-16">
        <GoogleAdSlot
          format="horizontal-banner"
          slotId={ADS_CONFIG.slots.homeLeaderboard}
        />
      </div>
    </div>
  );
}
