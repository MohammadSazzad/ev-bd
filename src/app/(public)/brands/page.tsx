import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandsView } from "@/components/brands/brands-view";

export const metadata: Metadata = {
  title: "EV Brands in Bangladesh - VoltBD",
  description:
    "Browse verified electric vehicle manufacturers, brand showrooms, and authorized logistics networks in local hubs in Bangladesh.",
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <BrandsView />
      </main>

      <Footer />
    </div>
  );
}
