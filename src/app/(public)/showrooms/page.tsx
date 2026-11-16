import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShowroomsView } from "@/components/showrooms/showrooms-view";

export const metadata: Metadata = {
  title: "EV Showrooms & Importers in Bangladesh - VoltBD",
  description:
    "Locate verified electric vehicle showrooms, importers, and official dealerships across Dhaka, Chittagong, and Bangladesh.",
};

export default function ShowroomsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <ShowroomsView />
      </main>

      <Footer />
    </div>
  );
}
