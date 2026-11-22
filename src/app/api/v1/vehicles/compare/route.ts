import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") || "").split(",").map((id) => id.trim()).filter(Boolean);
  if (!ids.length || ids.length > 3) return apiError("Provide one to three vehicle IDs", 422);
  const numericIds = ids.filter((id) => /^\d+$/.test(id)).map(BigInt);
  const vehicles = await prisma.vehicle.findMany({ where: { status: "PUBLISHED", OR: [{ slug: { in: ids } }, ...(numericIds.length ? [{ id: { in: numericIds } }] : [])] }, include: { brand: true, category: true, specs: true, details: true, media: { include: { media: true }, orderBy: { sortOrder: "asc" } } } });
  return apiSuccess(vehicles, "Vehicles retrieved for comparison");
}
