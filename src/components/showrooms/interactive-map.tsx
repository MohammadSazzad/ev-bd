"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Plus, Minus, Navigation, MapPin } from "lucide-react";
import { Showroom } from "@/lib/data/showrooms";

interface InteractiveMapProps {
  showrooms: Showroom[];
  selectedId: string | null;
  onSelectPin: (id: string) => void;
}

export function InteractiveMap({
  showrooms,
  selectedId,
  onSelectPin,
}: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeShowroom = showrooms.find(
    (s) => s.id === (hoveredId || selectedId)
  );

  // Render high-detail cyberpunk city cartography on canvas
  const renderMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // 1. Deep Midnight Base
    const bgGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      50,
      width / 2,
      height / 2,
      width / 1.2
    );
    bgGradient.addColorStop(0, "#081324");
    bgGradient.addColorStop(1, "#040812");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. City Block Subdivisions (Grid of dark buildings / blocks)
    ctx.strokeStyle = "rgba(0, 223, 143, 0.04)";
    ctx.lineWidth = 0.5;
    const blockSize = 24;

    for (let x = 0; x < width; x += blockSize) {
      for (let y = 0; y < height; y += blockSize) {
        // Pseudo-random building block opacity
        const seed = Math.sin(x * 12.9898 + y * 78.233);
        if (seed > 0.2) {
          ctx.fillStyle = `rgba(14, 165, 233, ${Math.abs(seed) * 0.03})`;
          ctx.fillRect(x + 2, y + 2, blockSize - 4, blockSize - 4);
        }
      }
    }

    // 3. Dense Local Streets Network (Fine grid lines)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
    ctx.lineWidth = 0.7;
    for (let x = 0; x < width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 4. Major Roads & Arterial Highways (Dhaka Corridors)
    const drawHighway = (
      points: [number, number][],
      color: string,
      lineWidth: number,
      glow = false
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      if (glow) {
        ctx.shadowColor = "rgba(0, 223, 143, 0.5)";
        ctx.shadowBlur = 10;
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.restore();
    };

    // Mohakhali / Tejgaon Expressway
    drawHighway(
      [
        [width * 0.15, 0],
        [width * 0.26, height * 0.45],
        [width * 0.32, height * 0.75],
        [width * 0.35, height],
      ],
      "rgba(0, 223, 143, 0.35)",
      2.5,
      true
    );

    // Gulshan Avenue
    drawHighway(
      [
        [width * 0.52, 0],
        [width * 0.54, height * 0.35],
        [width * 0.5, height * 0.65],
        [width * 0.45, height],
      ],
      "rgba(0, 223, 143, 0.4)",
      2.5,
      true
    );

    // Pragati Sarani / Baridhara link
    drawHighway(
      [
        [width * 0.82, 0],
        [width * 0.78, height * 0.4],
        [width * 0.72, height * 0.8],
        [width * 0.7, height],
      ],
      "rgba(14, 165, 233, 0.35)",
      2,
      true
    );

    // East-West Connectors (Kemal Ataturk, Tejgaon-Gulshan link)
    drawHighway(
      [
        [0, height * 0.3],
        [width * 0.3, height * 0.32],
        [width * 0.6, height * 0.38],
        [width, height * 0.34],
      ],
      "rgba(0, 223, 143, 0.3)",
      2
    );

    drawHighway(
      [
        [0, height * 0.55],
        [width * 0.35, height * 0.52],
        [width * 0.7, height * 0.58],
        [width, height * 0.62],
      ],
      "rgba(14, 165, 233, 0.3)",
      2
    );

    // 5. Water Bodies (Hatirjheel & Gulshan Lake)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(width * 0.62, 0);
    ctx.bezierCurveTo(
      width * 0.64,
      height * 0.25,
      width * 0.56,
      height * 0.42,
      width * 0.53,
      height * 0.52
    );
    ctx.bezierCurveTo(
      width * 0.5,
      height * 0.62,
      width * 0.44,
      height * 0.72,
      width * 0.38,
      height
    );

    ctx.strokeStyle = "rgba(14, 165, 233, 0.75)";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(14, 165, 233, 0.8)";
    ctx.shadowBlur = 16;
    ctx.stroke();

    // Inner bright core of lake
    ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
    ctx.lineWidth = 4;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();

    // Hatirjheel West Branch curve
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(width * 0.53, height * 0.52);
    ctx.bezierCurveTo(
      width * 0.42,
      height * 0.56,
      width * 0.32,
      height * 0.58,
      width * 0.2,
      height * 0.65
    );
    ctx.strokeStyle = "rgba(14, 165, 233, 0.65)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(14, 165, 233, 0.6)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    // 6. Bridges crossing the lake
    const drawBridge = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-12, -2, 24, 4);
      ctx.restore();
    };

    drawBridge(width * 0.57, height * 0.36, 0.4);
    drawBridge(width * 0.51, height * 0.58, -0.3);

    // 7. Perspective Radar Lines (Cybernetic feel matching screenshot)
    ctx.strokeStyle = "rgba(0, 223, 143, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width * 0.48, height * 0.5, width * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width * 0.48, height * 0.5, width * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  useEffect(() => {
    renderMap();
  }, [renderMap, zoomLevel]);

  return (
    <div className="relative h-[480px] lg:h-[540px] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-[#070c17] shadow-2xl transition-all duration-300">
      {/* City Map Canvas */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <canvas
          ref={canvasRef}
          width={1000}
          height={700}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Atmospheric Edge Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(7,11,20,0.85)_100%)]" />

      {/* Telemetry Badge Top Right */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-[#070b14]/85 px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DF8F]" />
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
          LIVE MAP • DHAKA CENTRAL
        </span>
      </div>

      {/* Interactive Location Pins */}
      {showrooms.map((showroom) => {
        const isSelected = showroom.id === selectedId;
        const isHovered = showroom.id === hoveredId;
        const isTarget = isSelected || isHovered;

        return (
          <div
            key={showroom.id}
            onClick={() => onSelectPin(showroom.id)}
            onMouseEnter={() => setHoveredId(showroom.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-110"
            style={{
              left: `${showroom.mapCoords.x}%`,
              top: `${showroom.mapCoords.y}%`,
            }}
          >
            {/* Pulsing Radar Ring on Target Pin */}
            {isTarget && (
              <span className="absolute -inset-4 rounded-full bg-[#00DF8F]/25 animate-ping pointer-events-none" />
            )}

            {/* Circular Glassmorphic Pin Badge */}
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all shadow-xl ${
                isTarget
                  ? "bg-[#00DF8F] text-[#070b14] ring-4 ring-emerald-500/50 scale-110 shadow-emerald-500/50"
                  : "bg-[#0a1826]/90 text-[#00DF8F] border border-emerald-500/40 backdrop-blur-md hover:border-emerald-400 shadow-black/60"
              }`}
            >
              <MapPin className="h-5 w-5 fill-current" />
            </div>

            {/* Area Label Tag Under Pin */}
            <div className="mt-1.5 flex justify-center">
              <span
                className={`whitespace-nowrap rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm transition-all shadow-md ${
                  isTarget
                    ? "bg-[#00DF8F] text-[#070b14] border border-[#00DF8F]"
                    : "bg-[#070b14]/90 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {showroom.mapLabel}
              </span>
            </div>
          </div>
        );
      })}

      {/* Selected Showroom Info Card in Top Left */}
      {activeShowroom && (
        <div className="absolute top-4 left-4 z-30 rounded-2xl border border-emerald-500/40 bg-[#070b14]/90 p-4 text-xs backdrop-blur-md shadow-2xl max-w-xs animate-in fade-in duration-150">
          <p className="font-bold text-white text-sm">{activeShowroom.name}</p>
          <p className="mt-1 text-slate-300">{activeShowroom.address}</p>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-semibold">
            <span>{activeShowroom.distance} away</span>
            <span className="text-slate-400 font-normal">{activeShowroom.phone}</span>
          </div>
        </div>
      )}

      {/* Map Zoom & Recenter Controls in Bottom Right */}
      <div className="absolute bottom-5 right-5 z-30 flex flex-col gap-1.5 rounded-xl border border-slate-800 bg-[#070b14]/90 p-1.5 backdrop-blur-md shadow-xl">
        <button
          type="button"
          onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel(1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-400 hover:bg-slate-800 transition-colors"
          title="Reset View"
          aria-label="Reset View"
        >
          <Navigation className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
