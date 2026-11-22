import { prisma } from "@/lib/db/prisma";

const include = { vehicles: { include: { vehicle: { include: { brand: true, category: true, specs: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } } } } }, orderBy: { sortOrder: "asc" as const } } };

export function listSavedComparisons(userId: bigint) {
  return prisma.savedComparison.findMany({ where: { userId }, include, orderBy: { updatedAt: "desc" } });
}

export function getSavedComparison(userId: bigint, id: bigint) {
  return prisma.savedComparison.findFirst({ where: { id, userId }, include });
}

export async function createSavedComparison(userId: bigint, name: string, vehicleIds: bigint[]) {
  const vehicles = await prisma.vehicle.findMany({ where: { id: { in: vehicleIds }, status: "PUBLISHED" }, select: { id: true } });
  if (vehicles.length !== vehicleIds.length) throw new Error("One or more vehicles were not found");
  return prisma.savedComparison.create({ data: { userId, name, vehicles: { create: vehicleIds.map((vehicleId, sortOrder) => ({ vehicleId, sortOrder })) } }, include });
}

export async function updateSavedComparison(userId: bigint, id: bigint, name: string, vehicleIds: bigint[]) {
  const vehicles = await prisma.vehicle.findMany({ where: { id: { in: vehicleIds }, status: "PUBLISHED" }, select: { id: true } });
  if (vehicles.length !== vehicleIds.length) throw new Error("One or more vehicles were not found");
  return prisma.$transaction(async (tx) => {
    const existing = await tx.savedComparison.findFirst({ where: { id, userId }, select: { id: true } });
    if (!existing) return null;
    await tx.savedComparisonVehicle.deleteMany({ where: { comparisonId: id } });
    return tx.savedComparison.update({ where: { id }, data: { name, vehicles: { create: vehicleIds.map((vehicleId, sortOrder) => ({ vehicleId, sortOrder })) } }, include });
  });
}

export function deleteSavedComparison(userId: bigint, id: bigint) {
  return prisma.savedComparison.deleteMany({ where: { id, userId } });
}
