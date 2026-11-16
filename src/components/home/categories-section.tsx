import Link from "next/link";
import { Car, Motorbike, Scooter, Bike } from "lucide-react";
import { CATEGORIES } from "@/lib/data/homepage";

export function CategoriesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "car":
        return <Car className="h-5 w-5 text-[#00DF8F]" />;
      case "bike":
        return <Motorbike className="h-5 w-5 text-[#00DF8F]" />;
      case "scooter":
        return <Scooter className="h-5 w-5 text-[#00DF8F]" />;
      case "cycle":
        return <Bike className="h-5 w-5 text-[#00DF8F]" />;
      default:
        return <Car className="h-5 w-5 text-[#00DF8F]" />;
    }
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Explore Categories
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Select a category to browse specific electric vehicle variants available in Bangladesh
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#0e1628]/90 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#111c33] hover:shadow-lg hover:shadow-black/40"
            >
              <div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[#00DF8F] mb-4 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all">
                  {getIcon(cat.icon)}
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#00DF8F] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
