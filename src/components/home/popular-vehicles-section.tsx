"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POPULAR_VEHICLES } from "@/lib/data/homepage";

export function PopularVehiclesSection() {
  const [selectedId, setSelectedId] = useState(POPULAR_VEHICLES[0].id);
  const activeVehicle =
    POPULAR_VEHICLES.find((v) => v.id === selectedId) || POPULAR_VEHICLES[0];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Quick Switchers */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Popular Electric Vehicles
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              The most searched and highly-rated electric vehicles on roads in Dhaka and wider Bangladesh
            </p>
          </div>

          {/* Vehicle selector pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {POPULAR_VEHICLES.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setSelectedId(vehicle.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedId === vehicle.id
                    ? "bg-emerald-950/60 text-[#00DF8F] border border-emerald-500/40"
                    : "text-slate-400 hover:text-white bg-slate-900/40 border border-transparent"
                }`}
              >
                {vehicle.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Vehicle Wide Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0e1628] shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
          {/* Vehicle Image Banner */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
            <Image
              src={activeVehicle.imageUrl}
              alt={activeVehicle.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              priority
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-[#0e1628]/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-md bg-[#070b14]/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00DF8F] backdrop-blur-md border border-emerald-500/20">
                {activeVehicle.category}
              </span>
            </div>
          </div>

          {/* Vehicle Details Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-7 gap-6 border-t border-slate-800/60 bg-[#0e1628]">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                {activeVehicle.name}
                <Link
                  href={`/catalogue?vehicle=${activeVehicle.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#00DF8F]"
                  aria-label={`View ${activeVehicle.name} details`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </h3>
              <p className="mt-1 text-xl font-bold text-[#00DF8F]">
                {activeVehicle.formattedPrice}
              </p>
            </div>

            {/* Spec Metrics Row */}
            <div className="flex items-center gap-8 sm:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  RANGE
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-white">
                  {activeVehicle.range}
                </p>
              </div>

              <div className="h-9 w-px bg-slate-800" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  BATTERY
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-white">
                  {activeVehicle.battery}
                </p>
              </div>

              <div className="hidden md:block h-9 w-px bg-slate-800" />

              <div className="hidden md:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  TOP SPEED
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-white">
                  {activeVehicle.topSpeed}
                </p>
              </div>

              <div>
                <Link
                  href={`/catalogue?vehicle=${activeVehicle.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-[#00DF8F] hover:text-[#070b14] border border-slate-700/60 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 transition-all shadow-sm"
                >
                  View Specs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
