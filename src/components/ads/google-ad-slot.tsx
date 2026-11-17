"use client";

import { useEffect, useRef } from "react";
import { ADS_CONFIG } from "@/lib/config/ads";
import { Sparkles } from "lucide-react";

export type AdFormat = "horizontal-banner" | "sidebar-rect" | "in-feed" | "billboard";

interface GoogleAdSlotProps {
  format?: AdFormat;
  slotId?: string;
  className?: string;
  label?: string;
}

export function GoogleAdSlot({
  format = "horizontal-banner",
  slotId,
  className = "",
  label,
}: GoogleAdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only push to adsbygoogle in real production when client ID is provided
    if (!ADS_CONFIG.testMode && ADS_CONFIG.clientId && slotId) {
      try {
        const adsWindow = window as unknown as { adsbygoogle?: unknown[] };
        adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
        adsWindow.adsbygoogle.push({});
      } catch (err) {
        console.warn("Google AdSense push error:", err);
      }
    }
  }, [slotId]);

  if (!ADS_CONFIG.enabled) {
    return null;
  }

  // Dimension specs based on format to eliminate CLS (Cumulative Layout Shift)
  const formatClasses = {
    "horizontal-banner": "min-h-[100px] sm:min-h-[110px] md:min-h-[120px] w-full",
    "sidebar-rect": "min-h-[280px] w-full",
    "in-feed": "min-h-[320px] h-full w-full",
    billboard: "min-h-[250px] w-full",
  }[format];

  return (
    <aside
      aria-label="Advertisement"
      className={`relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#0c1322]/60 p-4 transition-all duration-200 ${formatClasses} ${className}`}
    >
      {/* Header Label */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {label || (format === "in-feed" ? "SPONSORED" : "ADVERTISEMENT")}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-600">
          <Sparkles className="h-2.5 w-2.5 text-emerald-500/70" />
          Google Ads
        </span>
      </div>

      {/* Real AdSense Slot or Clean Development Preview */}
      <div
        ref={adRef}
        className="flex h-full min-h-[70px] w-full items-center justify-center"
      >
        {!ADS_CONFIG.testMode && ADS_CONFIG.clientId && slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client={ADS_CONFIG.clientId}
            data-ad-slot={slotId}
            data-ad-format={format === "sidebar-rect" ? "rectangle" : "auto"}
            data-full-width-responsive="true"
          />
        ) : (
          /* Clean Non-Intrusive Placeholder */
          <div className="flex flex-col items-center justify-center text-center py-4 px-2 select-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-[#00DF8F] mb-1.5">
              <span>VoltBD Partner Network</span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {format === "horizontal-banner" && "Responsive Leaderboard (728×90 / 970×90)"}
              {format === "sidebar-rect" && "Square / Medium Rectangle (300×250)"}
              {format === "in-feed" && "Native In-Feed Sponsored Placement"}
              {format === "billboard" && "Premium Billboard (970×250)"}
            </p>
            <span className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">
              Targeted EV Charging, Import & Clean Energy Promotions
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
