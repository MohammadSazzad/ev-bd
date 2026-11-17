import Link from "next/link";
import { EVBrand } from "@/lib/data/brands";
import { BrandBadge } from "./brand-badge";

interface BrandCardProps {
  brand: EVBrand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/vehicles?brand=${encodeURIComponent(brand.name)}`}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-transparent hover:border-slate-800/80 hover:bg-slate-900/40 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 text-center"
    >
      {/* Brand Circular Emblem */}
      <div className="mb-4 group-hover:scale-105 transition-transform duration-300">
        <BrandBadge type={brand.logoType} />
      </div>

      {/* Brand Title */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors tracking-tight">
        {brand.name}
      </h3>

      {/* Vehicle Count */}
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
        {brand.vehicleCount} Vehicles listed
      </p>
    </Link>
  );
}
