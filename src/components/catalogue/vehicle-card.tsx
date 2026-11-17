"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { CatalogVehicle } from "@/lib/data/vehicles";

interface VehicleCardProps {
  vehicle: CatalogVehicle;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
}

export function VehicleCard({
  vehicle,
  isCompared = false,
  onToggleCompare,
}: VehicleCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = vehicle.images.length > 0 ? vehicle.images : ["/images/vehicles/placeholder.jpg"];
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] shadow-lg dark:shadow-2xl transition-all duration-300 hover:border-emerald-500/40">
      {/* Vehicle Image Banner - Clickable link to details */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="absolute inset-0 z-0 block cursor-pointer"
          aria-label={`View ${vehicle.name} details`}
        >
          <Image
            src={currentImage}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
            priority
          />

          {/* Ambient Dark Gradient on bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-[#0e1628] dark:via-[#0e1628]/20" />
        </Link>

        {/* Pagination Pills [ 1 ] [ 2 ] [ 3 ] */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.slice(0, 3).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImageIndex(idx);
              }}
              className={`flex h-7 min-w-[28px] px-2 items-center justify-center rounded-md text-xs font-bold transition-all shadow-md ${
                activeImageIndex === idx
                  ? "bg-[#00DF8F] text-[#070b14] ring-2 ring-emerald-500/50"
                  : "bg-white/90 text-slate-800 hover:text-black border border-slate-300/80 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:text-white dark:border-slate-700/80 backdrop-blur-sm"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <Link href={`/vehicles/${vehicle.id}`} className="block group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00DF8F]">
            {vehicle.brand}
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {vehicle.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {vehicle.formattedPrice}
          </p>
        </Link>

        {/* Bottom Spec Row */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-semibold text-slate-500 dark:text-slate-400">R:</span>{" "}
            <span className="font-bold text-slate-900 dark:text-white">{vehicle.rangeKm} km</span>
          </div>

          {/* Compare Specs Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <div
              onClick={() => onToggleCompare && onToggleCompare(vehicle.id)}
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                isCompared
                  ? "bg-[#00DF8F] border-[#00DF8F] text-[#070b14]"
                  : "border-slate-300 bg-slate-50 hover:border-emerald-500 dark:border-slate-600 dark:bg-slate-900/80 dark:hover:border-emerald-400"
              }`}
            >
              {isCompared && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <span
              onClick={() => onToggleCompare && onToggleCompare(vehicle.id)}
              className="text-xs font-medium"
            >
              Compare Specs
            </span>
          </label>

          <div>
            <span className="font-semibold text-slate-500 dark:text-slate-400">B:</span>{" "}
            <span className="font-bold text-slate-900 dark:text-white">{vehicle.batteryKwh} kWh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
