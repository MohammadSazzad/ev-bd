import Link from "next/link";
import { Zap } from "lucide-react";

export function SponsoredPartnerCard() {
  return (
    <div className="rounded-2xl border border-emerald-500/25 dark:border-emerald-500/20 bg-white dark:bg-[#0e1628] p-6 shadow-sm transition-colors relative overflow-hidden">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Zap className="h-3 w-3 fill-[#00DF8F] text-emerald-600 dark:text-[#00DF8F]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F]">
          SPONSORED PARTNER
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        Need Charging Installation?
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
        Get certified home AC charger setups backed by VoltBD utility compliance teams in Dhaka.
      </p>

      <Link
        href="/showrooms"
        className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-emerald-600 dark:text-[#00DF8F] hover:underline"
      >
        <span>Connect with certified installer</span>
        <span>→</span>
      </Link>
    </div>
  );
}
