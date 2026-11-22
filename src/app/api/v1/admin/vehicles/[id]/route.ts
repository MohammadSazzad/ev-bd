import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { vehicleAdminSchema } from "@/lib/validations/admin";

function parseId(value: string) { if (!/^\d+$/.test(value)) throw new Error("Invalid vehicle ID"); return BigInt(value); }

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRoles(["ADMIN", "EDITOR", "SHOWROOM"]);
    const parsed = vehicleAdminSchema.partial().safeParse(await request.json().catch(() => null));
    if (!parsed.success) return apiError("Invalid vehicle data", 422, parsed.error.flatten().fieldErrors);
    const input = parsed.data; const id = parseId((await params).id);
    const vehicle = await prisma.vehicle.update({ where: { id }, data: { ...(input.name !== undefined && { name: input.name }), ...(input.slug !== undefined && { slug: input.slug }), ...(input.priceBdt !== undefined && { priceBdt: input.priceBdt }), ...(input.status !== undefined && { status: input.status }), ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }), ...(input.isPopular !== undefined && { isPopular: input.isPopular }), ...(input.brandSlug !== undefined && { brand: { connect: { slug: input.brandSlug } } }), ...(input.categorySlug !== undefined && { category: { connect: { slug: input.categorySlug } } }), ...(input.specs !== undefined && { specs: { upsert: { create: input.specs, update: input.specs } } }) }, include: { brand: true, category: true, specs: true } });
    return apiSuccess(vehicle, "Vehicle updated successfully");
  } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update vehicle", 400); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireRoles(["ADMIN"]); await prisma.vehicle.update({ where: { id: parseId((await params).id) }, data: { status: "ARCHIVED" } }); return apiSuccess(null, "Vehicle archived successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to archive vehicle", 400); }
}
