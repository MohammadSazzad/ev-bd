"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  ESTIMATOR_MODELS,
  BATTERY_CHEMISTRIES,
  TerrainVector,
} from "@/lib/data/estimator";

interface EstimatorInputsProps {
  modelId: string;
  setModelId: (id: string) => void;
  chemistryId: string;
  setChemistryId: (id: string) => void;
  dailyDistance: number;
  setDailyDistance: (km: number) => void;
  terrain: TerrainVector;
  setTerrain: (t: TerrainVector) => void;
  onSimulate: () => void;
}

export function EstimatorInputs({
  modelId,
  setModelId,
  chemistryId,
  setChemistryId,
  dailyDistance,
  setDailyDistance,
  terrain,
  setTerrain,
  onSimulate,
}: EstimatorInputsProps) {
  const [isEditingDistance, setIsEditingDistance] = useState(false);
  const [tempDistance, setTempDistance] = useState(dailyDistance.toString());

  const handleModelChange = (id: string) => {
    setModelId(id);
    const selected = ESTIMATOR_MODELS.find((m) => m.id === id);
    if (selected) {
      setChemistryId(selected.defaultChemistry);
    }
  };

  const handleDistanceSubmit = () => {
    const val = parseInt(tempDistance, 10);
    if (!isNaN(val) && val > 0 && val <= 500) {
      setDailyDistance(val);
    } else {
      setTempDistance(dailyDistance.toString());
    }
    setIsEditingDistance(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1322] p-6 shadow-sm transition-colors">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Simulation Inputs
      </h2>

      <div className="space-y-6">
        {/* Field 1: EV Model */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F] mb-2">
            Select EV Model
          </label>
          <div className="relative">
            <select
              value={modelId}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3.5 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00DF8F]/40 focus:border-[#00DF8F] transition-all cursor-pointer"
            >
              {ESTIMATOR_MODELS.map((model) => (
                <option
                  key={model.id}
                  value={model.id}
                  className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-white py-2"
                >
                  {model.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Field 2: Battery Chemistry */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F] mb-2">
            Battery Chemistry Type
          </label>
          <div className="relative">
            <select
              value={chemistryId}
              onChange={(e) => setChemistryId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3.5 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00DF8F]/40 focus:border-[#00DF8F] transition-all cursor-pointer"
            >
              {BATTERY_CHEMISTRIES.map((chem) => (
                <option
                  key={chem.id}
                  value={chem.id}
                  className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-white py-2"
                >
                  {chem.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Field 3: Daily Average Distance */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F] mb-2">
            Daily Average Distance
          </label>
          <div className="flex items-center justify-between rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 transition-all">
            {isEditingDistance ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={tempDistance}
                  onChange={(e) => setTempDistance(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleDistanceSubmit();
                  }}
                  autoFocus
                  className="w-24 bg-white dark:bg-[#0c1322] border border-emerald-500 rounded px-2 py-1 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
                />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  km / day
                </span>
                <button
                  type="button"
                  onClick={handleDistanceSubmit}
                  className="ml-auto inline-flex items-center gap-1 rounded bg-[#00DF8F] px-2.5 py-1 text-xs font-bold text-[#070b14] hover:bg-[#00DF8F]/90"
                >
                  <Check className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            ) : (
              <>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {dailyDistance} km / day
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTempDistance(dailyDistance.toString());
                    setIsEditingDistance(true);
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-500 dark:hover:text-[#00DF8F] transition-colors"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        {/* Field 4: Terrain & Climate Vector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F] mb-2">
            Terrain & Climate Vector
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTerrain("dhaka-flat")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs sm:text-sm font-medium transition-all ${
                terrain === "dhaka-flat"
                  ? "border-emerald-500/80 bg-emerald-500/10 text-slate-900 dark:text-white shadow-sm shadow-emerald-500/10"
                  : "border-slate-300 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  terrain === "dhaka-flat"
                    ? "bg-[#00DF8F] shadow-[0_0_8px_#00DF8F]"
                    : "bg-slate-400 dark:bg-slate-600"
                }`}
              />
              Dhaka Flat Traffic
            </button>

            <button
              type="button"
              onClick={() => setTerrain("chittagong-hilly")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs sm:text-sm font-medium transition-all ${
                terrain === "chittagong-hilly"
                  ? "border-emerald-500/80 bg-emerald-500/10 text-slate-900 dark:text-white shadow-sm shadow-emerald-500/10"
                  : "border-slate-300 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  terrain === "chittagong-hilly"
                    ? "bg-[#00DF8F] shadow-[0_0_8px_#00DF8F]"
                    : "bg-slate-400 dark:bg-slate-600"
                }`}
              />
              Chittagong Hilly
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onSimulate}
          className="w-full mt-2 rounded-xl bg-[#00DF8F] py-3.5 px-4 text-sm font-bold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-[0.98] shadow-md shadow-emerald-500/20"
        >
          Simulate Degradation & Output
        </button>
      </div>
    </div>
  );
}
