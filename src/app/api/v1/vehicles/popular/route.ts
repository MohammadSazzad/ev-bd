import { apiSuccess } from "@/lib/utils/response";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const vehicles = await prisma.vehicle.findMany({ where: { status: "PUBLISHED", isPopular: true }, include: { brand: true, category: true, specs: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { updatedAt: "desc" } });
  return apiSuccess(vehicles, "Popular vehicles retrieved successfully");
}
