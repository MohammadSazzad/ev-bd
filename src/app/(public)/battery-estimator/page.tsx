import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EstimatorView } from "@/components/estimator/estimator-view";

export const metadata: Metadata = {
  title: "Battery Health & Performance Estimator - VoltBD",
  description:
    "Simulate physical battery state predictions, range depletion vectors, and lifetime amortization models for electric vehicles in Bangladesh.",
};

export default function BatteryEstimatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <EstimatorView />
      </main>

      <Footer />
    </div>
  );
}
