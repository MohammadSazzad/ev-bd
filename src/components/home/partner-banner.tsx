import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

export function PartnerBanner() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/showrooms?type=importer"
          className="group relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-[#091624] px-6 py-5 shadow-xl transition-all duration-300 hover:border-emerald-500/60 hover:bg-[#0c1c2e] hover:shadow-emerald-950/20"
        >
          {/* Left Icon & Text */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00DF8F] group-hover:scale-105 transition-transform">
              <Handshake className="h-6 w-6 text-[#00DF8F]" />
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-snug">
              <span className="font-bold text-white">Importing an EV?</span>{" "}
              Partner with verified importers on VoltBD for customs, tax, and registration clearance.
            </p>
          </div>

          {/* Right Action indicator */}
          <div className="flex shrink-0 items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00DF8F] group-hover:translate-x-1 transition-transform">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </section>
  );
}
