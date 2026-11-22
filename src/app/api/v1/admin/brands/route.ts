import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { brandAdminSchema } from "@/lib/validations/admin";

export async function GET() { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR"]); return apiSuccess(await prisma.brand.findMany({ include: { logoMedia: true, _count: { select: { vehicles: true } } }, orderBy: { updatedAt: "desc" } }), "Brands retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve brands", 403); } }
export async function POST(request: NextRequest) { try { await requireRoles(["ADMIN", "EDITOR"]); const parsed = brandAdminSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid brand data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.brand.create({ data: parsed.data, include: { logoMedia: true } }), "Brand created successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create brand", 400); } }
