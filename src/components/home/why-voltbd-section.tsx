import Link from "next/link";
import { SlidersHorizontal, BatteryCharging, MapPin, ArrowRight } from "lucide-react";
import { WHY_FEATURES } from "@/lib/data/homepage";

export function WhyVoltBDSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "compare":
        return <SlidersHorizontal className="h-6 w-6 text-[#00DF8F]" />;
      case "battery":
        return <BatteryCharging className="h-6 w-6 text-[#00DF8F]" />;
      case "showroom":
        return <MapPin className="h-6 w-6 text-[#00DF8F]" />;
      default:
        return <SlidersHorizontal className="h-6 w-6 text-[#00DF8F]" />;
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Why Use VoltBD?
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Engineered with localized battery analytics and regional spec tracking specifically for Bangladesh
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_FEATURES.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0e1628]/90 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#111c33] hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                {/* Feature Icon Container */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[#00DF8F] mb-5 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all">
                  {getIcon(feature.icon)}
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#00DF8F] transition-colors">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore tool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
