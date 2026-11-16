"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import {
  COMPARISON_VEHICLES,
  COMPARISON_METRIC_ROWS,
  ComparisonVehicle,
} from "@/lib/data/comparison";

interface ComparisonMatrixProps {
  initialVehicleIds?: string[];
}

export function ComparisonMatrix({
  initialVehicleIds = ["byd-atto-3", "mg-zs-ev"],
}: ComparisonMatrixProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialVehicleIds);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const selectedVehicles: ComparisonVehicle[] = selectedIds
    .map((id) => COMPARISON_VEHICLES[id])
    .filter(Boolean);

  const availableToAdd = Object.values(COMPARISON_VEHICLES).filter(
    (v) => !selectedIds.includes(v.id)
  );

  const handleAddVehicle = (id: string) => {
    if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    } else {
      // Replace last vehicle if 3 are already selected
      setSelectedIds([selectedIds[0], selectedIds[1], id]);
    }
    setIsAddModalOpen(false);
  };

  const handleRemoveVehicle = (id: string) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  return (
    <div className="relative">
      {/* Spec Matrix Main Card */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] shadow-2xl transition-colors duration-150">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          {/* Table Header: Vehicle Cards Row */}
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0a1120]/60">
              <th className="w-1/4 p-6 sm:p-7 align-top">
                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Spec Matrix
                </span>
              </th>

              {/* Vehicle 1 & Vehicle 2 Columns */}
              {selectedVehicles.map((vehicle) => (
                <th
                  key={vehicle.id}
                  className="w-1/4 p-6 sm:p-7 align-top border-l border-slate-200 dark:border-slate-800/60"
                >
                  <div className="relative group flex items-center gap-4">
                    {/* Thumbnail Image */}
                    <div className="relative h-20 w-24 sm:h-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <Image
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        fill
                        className="object-cover object-center"
                        sizes="120px"
                      />
                    </div>

                    {/* Brand & Name */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00DF8F]">
                        {vehicle.brand}
                      </span>
                      <h3 className="mt-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {vehicle.name}
                      </h3>
                    </div>

                    {/* Remove button if more than 1 vehicle */}
                    {selectedVehicles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                        className="absolute -top-2 -right-2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm"
                        aria-label={`Remove ${vehicle.name}`}
                        title="Remove vehicle"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </th>
              ))}

              {/* Empty / Add Vehicle Column */}
              {selectedVehicles.length < 3 && (
                <th className="w-1/4 p-6 sm:p-7 align-middle border-l border-slate-200 dark:border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="group flex flex-col items-center justify-center w-full h-24 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-500 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-all cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-[#00DF8F] mb-1.5 group-hover:scale-110 transition-transform">
                      <Plus className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-[#00DF8F]">
                      Add Vehicle
                    </span>
                  </button>
                </th>
              )}

              {/* Fill remaining space if less than 2 vehicles */}
              {Array.from({ length: Math.max(0, 2 - selectedVehicles.length) }).map(
                (_, i) => (
                  <th
                    key={i}
                    className="w-1/4 p-6 border-l border-slate-200 dark:border-slate-800/60 text-slate-400"
                  >
                    —
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body: Spec Rows */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {COMPARISON_METRIC_ROWS.map((row) => (
              <tr
                key={row.key}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors"
              >
                {/* Metric Label */}
                <td className="py-4 px-6 sm:px-7 font-medium text-slate-600 dark:text-slate-400">
                  {row.label}
                </td>

                {/* Values for each selected vehicle */}
                {selectedVehicles.map((vehicle) => {
                  const val = vehicle[row.key as keyof ComparisonVehicle];
                  const isHighlightedPrice = row.key === "priceBdt" && vehicle.isBestPrice;
                  const isHighlightedRange = row.key === "realWorldRange" && vehicle.isBestRange;

                  return (
                    <td
                      key={vehicle.id}
                      className="py-4 px-6 sm:px-7 border-l border-slate-100 dark:border-slate-800/60"
                    >
                      <span
                        className={`text-sm ${
                          isHighlightedPrice || isHighlightedRange
                            ? "font-bold text-emerald-700 dark:text-[#00DF8F]"
                            : row.key === "priceBdt" || row.key === "realWorldRange"
                            ? "font-bold text-slate-900 dark:text-white"
                            : "font-medium text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {String(val)}
                      </span>
                    </td>
                  );
                })}

                {/* Empty / 3rd Column Placeholder */}
                {selectedVehicles.length < 3 && (
                  <td className="py-4 px-6 sm:px-7 border-l border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-600">
                    —
                  </td>
                )}

                {/* Fill empty cells if fewer than 2 */}
                {Array.from({ length: Math.max(0, 2 - selectedVehicles.length) }).map(
                  (_, i) => (
                    <td
                      key={i}
                      className="py-4 px-6 border-l border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-600"
                    >
                      —
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vehicle Modal / Selector */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Select Vehicle to Compare
              </h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
              {availableToAdd.length === 0 ? (
                <p className="text-sm text-slate-500 py-6 text-center">
                  All available vehicles are already in comparison.
                </p>
              ) : (
                availableToAdd.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleAddVehicle(v.id)}
                    className="flex w-full items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-all text-left group"
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                      <Image
                        src={v.imageUrl}
                        alt={v.name}
                        fill
                        className="object-cover object-center"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00DF8F]">
                        {v.brand}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors">
                        {v.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {v.priceBdt} • {v.realWorldRange}
                      </p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00DF8F] text-[#070b14] font-bold text-xs shadow-sm">
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
