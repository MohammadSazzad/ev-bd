"use client";

import { useState } from "react";
import { SimulationResult } from "@/lib/data/estimator";

interface EstimatorResultsProps {
  result: SimulationResult;
  isSimulating?: boolean;
}

export function EstimatorResults({
  result,
  isSimulating = false,
}: EstimatorResultsProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const p0 = result.curvePoints[0]?.sohPercent ?? 100;
  const p1 = result.curvePoints[1]?.sohPercent ?? 96;
  const p2 = result.curvePoints[2]?.sohPercent ?? 92;
  const p3 = result.curvePoints[3]?.sohPercent ?? 88;
  const p4 = result.curvePoints[4]?.sohPercent ?? 83;
  const p5 = result.curvePoints[5]?.sohPercent ?? 78;

  // ViewBox: 0 0 680 180
  // Coordinates mapping
  const points = [
    { year: 0, x: 60, soh: p0, label: "Year 0" },
    { year: 1, x: 168, soh: p1, label: "Year 1" },
    { year: 2, x: 276, soh: p2, label: "Year 2" },
    { year: 3, x: 384, soh: p3, label: "Year 3" },
    { year: 4, x: 492, soh: p4, label: "Year 4" },
    { year: 5, x: 600, soh: p5, label: "Year 5" },
  ];

  // Map SoH% (100% -> 70%) to Y coordinate (30 -> 138)
  const getY = (soh: number) => {
    const minSoh = 68;
    const maxSoh = 100;
    const clamped = Math.max(minSoh, Math.min(maxSoh, soh));
    const ratio = (maxSoh - clamped) / (maxSoh - minSoh);
    return Math.round(32 + ratio * 105);
  };

  const coords = points.map((pt) => ({
    ...pt,
    y: getY(pt.soh),
  }));

  // Build a smooth cubic bezier SVG path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const cp1x = curr.x + (next.x - curr.x) * 0.45;
    const cp1y = curr.y;
    const cp2x = curr.x + (next.x - curr.x) * 0.55;
    const cp2y = next.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  // Closed area under the curve
  const areaD = `${pathD} L ${coords[coords.length - 1].x} 150 L ${coords[0].x} 150 Z`;

  return (
    <div
      className={`space-y-6 transition-all duration-300 ${
        isSimulating ? "opacity-60 scale-[0.99]" : "opacity-100 scale-100"
      }`}
    >
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Card 1: Predicted Real-World Range */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1322] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F]">
              PREDICTED REAL-WORLD RANGE
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {result.predictedRangeKm}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white ml-1">
                km
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {result.penaltyDescription}
          </p>
        </div>

        {/* Card 2: Estimated Battery Life */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1322] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F]">
              ESTIMATED BATTERY LIFE
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {result.estimatedLifeYears}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white ml-1">
                Years
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Estimated duration before nominal capacity drops below 70% State of Health
          </p>
        </div>
      </div>

      {/* Bottom Card: Degradation Curve Model */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1322] p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Degradation Curve Model (3-5 Years)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Nominal State of Health (SoH) trajectory modeled over vehicle runtime mileage
            </p>
          </div>

          {/* Interactive hover tooltip status */}
          {activeYear !== null && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-[#00DF8F] self-start sm:self-auto">
              <span>Year {activeYear}:</span>
              <span>{coords[activeYear]?.soh}% SoH</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">
                ~{Math.round((result.predictedRangeKm * (coords[activeYear]?.soh ?? 100)) / 100)} km range
              </span>
            </div>
          )}
        </div>

        {/* Inner chart framed canvas */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070b14]/70 p-4 sm:p-6">
          <div className="relative w-full h-44 sm:h-52">
            <svg
              viewBox="0 0 680 180"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="4"
                    floodColor="#00DF8F"
                    floodOpacity="0.5"
                  />
                </filter>

                {/* Shaded Area Under Curve */}
                <linearGradient id="curve-area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00DF8F" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#00DF8F" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#00DF8F" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Grid Lines */}
              <line
                x1="50"
                y1="32"
                x2="610"
                y2="32"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800/60"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="85"
                x2="610"
                y2="85"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800/60"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="137"
                x2="610"
                y2="137"
                stroke="currentColor"
                className="text-slate-300 dark:text-slate-800"
                strokeDasharray="2 4"
                strokeWidth="1"
              />

              {/* Area Gradient Fill */}
              <path
                d={areaD}
                fill="url(#curve-area-gradient)"
                className="transition-all duration-500 ease-out"
              />

              {/* Main Smooth Continuous Curve */}
              <path
                d={pathD}
                fill="none"
                stroke="#00DF8F"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#neon-glow)"
                className="transition-all duration-500 ease-out"
              />

              {/* Milestones Point Markers */}
              {coords.map((pt) => {
                const isKey = pt.year === 0 || pt.year === 3 || pt.year === 5;
                const isHovered = activeYear === pt.year;

                return (
                  <g
                    key={pt.year}
                    className="cursor-pointer group"
                    onMouseEnter={() => setActiveYear(pt.year)}
                    onMouseLeave={() => setActiveYear(null)}
                  >
                    {/* Pulsing halo on key markers */}
                    {isKey && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 12 : 8}
                        fill="#00DF8F"
                        className="opacity-25 transition-all duration-200"
                      />
                    )}

                    {/* Point Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : isKey ? 4.5 : 3.5}
                      fill={isKey || isHovered ? "#00DF8F" : "#10b981"}
                      stroke="#070b14"
                      strokeWidth={isKey || isHovered ? "2.5" : "1.5"}
                      className="transition-all duration-150"
                    />

                    {/* Floating Percentage Badge above key points */}
                    {isKey && (
                      <g className="transition-transform duration-200">
                        <rect
                          x={pt.x - 22}
                          y={pt.y - 28}
                          width="44"
                          height="18"
                          rx="9"
                          className="fill-slate-900 dark:fill-[#0c1322] stroke-emerald-500 dark:stroke-[#00DF8F] opacity-95"
                          strokeWidth="1"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 16}
                          textAnchor="middle"
                          className="fill-emerald-400 dark:fill-[#00DF8F]"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {pt.soh}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-Axis Percentage & Year Indicators */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-200 dark:border-slate-800/60 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>{p0}% (Year 0)</span>
            <span>{p3}% (Year 3)</span>
            <span>{p5}% (Year 5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
