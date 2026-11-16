import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CatalogView } from "@/components/catalogue/catalog-view";

export const metadata: Metadata = {
  title: "Electric Vehicles in Bangladesh - VoltBD",
  description:
    "Browse electric cars, bikes, scooters, and cycles available in Bangladesh with verified specs, real BDT prices, and battery metrics.",
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <CatalogView />
      </main>

      <Footer />
    </div>
  );
}
