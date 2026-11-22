import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { categoryAdminSchema } from "@/lib/validations/admin";

export async function GET() { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR"]); return apiSuccess(await prisma.vehicleCategory.findMany({ include: { _count: { select: { vehicles: true } } }, orderBy: { name: "asc" } }), "Categories retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve categories", 403); } }
export async function POST(request: NextRequest) { try { await requireRoles(["ADMIN", "EDITOR"]); const parsed = categoryAdminSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid category data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.vehicleCategory.create({ data: parsed.data }), "Category created successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create category", 400); } }
