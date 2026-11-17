import Link from "next/link";
import { VehicleDetail } from "@/lib/data/vehicle-details";

interface BatteryReliabilityCardProps {
  vehicle: VehicleDetail;
}

export function BatteryReliabilityCard({ vehicle }: BatteryReliabilityCardProps) {
  const { reliabilityIndex } = vehicle;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] p-6 shadow-sm transition-colors">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        Battery Reliability Index
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
        {reliabilityIndex.subtitle}
      </p>

      {/* Score & Health Status */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-[#00DF8F] shadow-[0_0_15px_rgba(0,223,143,0.2)]">
          <span className="text-base sm:text-lg font-black tracking-tight">
            {reliabilityIndex.score}%
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-emerald-600 dark:text-[#00DF8F]">
            {reliabilityIndex.rating}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {reliabilityIndex.note}
          </p>
        </div>
      </div>

      {/* Compare Action Button */}
      <Link
        href={`/compare?vehicles=${vehicle.id},${vehicle.id === "byd-atto-3" ? "mg-zs-ev" : "byd-atto-3"}`}
        className="flex w-full items-center justify-center rounded-xl bg-[#00DF8F] py-3 px-4 text-center text-sm font-bold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-[0.98] shadow-md shadow-emerald-500/20"
      >
        Compare with Similar Models
      </Link>
    </div>
  );
}
