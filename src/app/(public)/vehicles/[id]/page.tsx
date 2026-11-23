import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VehicleDetailsView } from "@/components/vehicle-details/vehicle-details-view";
import { getVehicleDetail, VEHICLE_DETAILS } from "@/lib/data/vehicle-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(VEHICLE_DETAILS).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicleDetail(id);
  if (!vehicle) {
    return { title: "Vehicle Not Found - VoltBD" };
  }

  return {
    title: `${vehicle.name} Price in Bangladesh, Specs & Battery Health - VoltBD`,
    description: `Explore full technical parameters, real-world range (${vehicle.keySpecs.realRange}), battery durability score (${vehicle.reliabilityIndex.score}%), and pricing for ${vehicle.name} in Bangladesh.`,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = getVehicleDetail(id);
  if (!vehicle) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <VehicleDetailsView vehicle={vehicle} />
      </main>

      <Footer />
    </div>
  );
}
