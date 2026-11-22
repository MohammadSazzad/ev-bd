import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { vehicleAdminSchema } from "@/lib/validations/admin";

export async function GET() {
  try {
    await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]);
    return apiSuccess(await prisma.vehicle.findMany({ include: { brand: true, category: true, specs: true }, orderBy: { updatedAt: "desc" } }), "Admin vehicles retrieved successfully");
  } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve vehicles", 403); }
}

export async function POST(request: NextRequest) {
  try {
    await requireRoles(["ADMIN", "EDITOR", "SHOWROOM"]);
    const parsed = vehicleAdminSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return apiError("Invalid vehicle data", 422, parsed.error.flatten().fieldErrors);
    const input = parsed.data;
    const vehicle = await prisma.vehicle.create({ data: { name: input.name, slug: input.slug, priceBdt: input.priceBdt, status: input.status, isFeatured: input.isFeatured, isPopular: input.isPopular, brand: { connect: { slug: input.brandSlug } }, category: { connect: { slug: input.categorySlug } }, ...(input.specs ? { specs: { create: input.specs } } : {}) }, include: { brand: true, category: true, specs: true } });
    return apiSuccess(vehicle, "Vehicle created successfully", 201);
  } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create vehicle", 400); }
}
