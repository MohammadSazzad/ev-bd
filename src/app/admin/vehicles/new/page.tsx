import { prisma } from "@/lib/db/prisma";
import { VehicleForm } from "@/components/admin/vehicle-form";

export default async function NewVehiclePage() {
  const [brands, categories] = await Promise.all([prisma.brand.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, name: true }, orderBy: { name: "asc" } }), prisma.vehicleCategory.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, name: true }, orderBy: { name: "asc" } })]);
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-semibold text-emerald-600">Catalogue / Vehicles</p><h1 className="mt-1 text-2xl font-bold">Add vehicle</h1><p className="mt-1 text-sm text-slate-500">Create a complete catalogue record.</p></div><VehicleForm brands={brands} categories={categories} /></div>;
}
