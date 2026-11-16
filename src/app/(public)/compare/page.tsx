import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ComparisonView } from "@/components/comparison/comparison-view";

export const metadata: Metadata = {
  title: "Compare Electric Vehicles in Bangladesh - VoltBD",
  description:
    "Evaluate side-by-side technical parameters to determine the best performance matrix for your budget.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-500">
              Loading vehicle comparison...
            </div>
          }
        >
          <ComparisonView />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
