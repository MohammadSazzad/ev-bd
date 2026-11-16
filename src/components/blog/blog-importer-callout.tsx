import Link from "next/link";
import { Handshake } from "lucide-react";

export function BlogImporterCallout() {
  return (
    <div className="my-8">
      <Link
        href="/showrooms?type=importer"
        className="group flex flex-col sm:flex-row items-center justify-center gap-3.5 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-50/50 dark:bg-[#091624]/70 px-6 py-4 text-center sm:text-left transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-100/40 dark:hover:bg-[#0c1e30]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-[#00DF8F] group-hover:scale-105 transition-transform">
          <Handshake className="h-5 w-5 text-emerald-700 dark:text-[#00DF8F]" />
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">VoltBD verified importers</span>{" "}
          guarantee tax clearance and smooth customs for all imported EV models. Contact verified agents today.
        </p>
      </Link>
    </div>
  );
}
