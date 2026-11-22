import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { VehicleForm } from "@/components/admin/vehicle-form";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  if (!/^\d+$/.test(id)) notFound();
  const [vehicle, brands, categories] = await Promise.all([prisma.vehicle.findUnique({ where: { id: BigInt(id) }, include: { brand: true, category: true, specs: true } }), prisma.brand.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, name: true }, orderBy: { name: "asc" } }), prisma.vehicleCategory.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, name: true }, orderBy: { name: "asc" } })]);
  if (!vehicle) notFound();
  const initial = { id: vehicle.id.toString(), name: vehicle.name, slug: vehicle.slug, priceBdt: vehicle.priceBdt.toString(), status: vehicle.status, isFeatured: vehicle.isFeatured, isPopular: vehicle.isPopular, brand: { slug: vehicle.brand.slug }, category: { slug: vehicle.category.slug }, specs: vehicle.specs ? { batteryCapacityKwh: vehicle.specs.batteryCapacityKwh?.toString(), realWorldRangeKm: vehicle.specs.realWorldRangeKm?.toString(), motorPowerKw: vehicle.specs.motorPowerKw?.toString(), topSpeedKmh: vehicle.specs.topSpeedKmh?.toString(), acChargingHours: vehicle.specs.acChargingHours?.toString(), dcChargingMinutes: vehicle.specs.dcChargingMinutes?.toString(), batteryChemistry: vehicle.specs.batteryChemistry } : null };
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-semibold text-emerald-600">Catalogue / Vehicles</p><h1 className="mt-1 text-2xl font-bold">Edit {vehicle.name}</h1><p className="mt-1 text-sm text-slate-500">Update technical information and publication state.</p></div><VehicleForm brands={brands} categories={categories} initial={initial} /></div>;
}
