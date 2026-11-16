"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/vehicles?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/vehicles");
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      {/* Radial Ambient Backdrop Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -z-10 h-[380px] w-[650px] max-w-full rounded-full opacity-35 dark:opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,223,143,0.35) 0%, rgba(16,185,129,0.15) 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Find Your Perfect{" "}
          <span className="text-emerald-600 dark:text-[#00DF8F] drop-shadow-[0_0_24px_rgba(0,223,143,0.25)]">
            Electric Vehicle
          </span>
          <br className="hidden sm:inline" /> in Bangladesh
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Compare electric cars, bikes, scooters, and cycles. Track range metrics,
          verify battery health specifications, and locate showrooms near you.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 max-w-2xl"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-[#0d1527]/90 px-3 py-2 shadow-xl shadow-slate-200/50 dark:shadow-black/50 backdrop-blur-md transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <div className="pl-2 text-slate-400">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search BYD, Yadea, MG, Niu or specific EV models..."
              className="w-full bg-transparent px-2 py-1.5 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
            />

            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#00DF8F] px-5 py-2 text-sm font-semibold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-95 shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
