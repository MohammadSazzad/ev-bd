"use client";

import { useEffect, useRef, useState } from "react";
import {
  calculateSimulation,
  TerrainVector,
  SimulationResult,
} from "@/lib/data/estimator";
import { EstimatorInputs } from "./estimator-inputs";
import { EstimatorResults } from "./estimator-results";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";
import { ESTIMATOR_MODELS } from "@/lib/data/estimator";

export function EstimatorView() {
  const [modelId, setModelId] = useState("byd-atto-3");
  const [chemistryId, setChemistryId] = useState("LFP");
  const [dailyDistance, setDailyDistance] = useState(40);
  const [terrain, setTerrain] = useState<TerrainVector>("dhaka-flat");
  const [isSimulating, setIsSimulating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [result, setResult] = useState<SimulationResult>(() =>
    calculateSimulation("byd-atto-3", "LFP", 40, "dhaka-flat")
  );

  const handleSimulate = (
    m = modelId,
    c = chemistryId,
    d = dailyDistance,
    t = terrain
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSimulating(true);
    timerRef.current = setTimeout(() => {
      setResult(calculateSimulation(m, c, d, t));
      setIsSimulating(false);
      timerRef.current = null;
    }, 150);
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleModelChange = (newModelId: string) => {
    const selected = ESTIMATOR_MODELS.find((model) => model.id === newModelId);
    const nextChemistry = selected?.defaultChemistry || chemistryId;
    setModelId(newModelId);
    setChemistryId(nextChemistry);
    handleSimulate(newModelId, nextChemistry, dailyDistance, terrain);
  };

  const handleChemistryChange = (newChemId: string) => {
    setChemistryId(newChemId);
    handleSimulate(modelId, newChemId, dailyDistance, terrain);
  };

  const handleDistanceChange = (newDistance: number) => {
    setDailyDistance(newDistance);
    handleSimulate(modelId, chemistryId, newDistance, terrain);
  };

  const handleTerrainChange = (newTerrain: TerrainVector) => {
    setTerrain(newTerrain);
    handleSimulate(modelId, chemistryId, dailyDistance, newTerrain);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Battery Health & Performance Estimator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Simulate physical battery state predictions, range depletion vectors, and lifetime amortization models
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5">
            <EstimatorInputs
              modelId={modelId}
              setModelId={handleModelChange}
              chemistryId={chemistryId}
              setChemistryId={handleChemistryChange}
              dailyDistance={dailyDistance}
              setDailyDistance={handleDistanceChange}
              terrain={terrain}
              setTerrain={handleTerrainChange}
              onSimulate={() => handleSimulate()}
              isSimulating={isSimulating}
            />
          </div>

          {/* Right Column: Stat Cards + Curve Model */}
          <div className="lg:col-span-7">
            <EstimatorResults result={result} isSimulating={isSimulating} />
          </div>
        </div>

        {/* Bottom Leaderboard Ad Slot */}
        <div className="mt-10 sm:mt-12">
          <GoogleAdSlot
            format="horizontal-banner"
            slotId={ADS_CONFIG.slots.estimatorBottom}
          />
        </div>
      </div>
    </div>
  );
}
