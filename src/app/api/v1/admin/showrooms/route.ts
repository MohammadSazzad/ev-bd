import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { showroomAdminSchema } from "@/lib/validations/admin";

const include = { brands: { include: { brand: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } } };
export async function GET() { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]); return apiSuccess(await prisma.showroom.findMany({ include, orderBy: { updatedAt: "desc" } }), "Showrooms retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve showrooms", 403); } }
export async function POST(request: NextRequest) { try { await requireRoles(["ADMIN", "EDITOR", "SHOWROOM"]); const parsed = showroomAdminSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid showroom data", 422, parsed.error.flatten().fieldErrors); const { brandSlugs, ...data } = parsed.data; const brands = brandSlugs.length ? await prisma.brand.findMany({ where: { slug: { in: brandSlugs } }, select: { id: true } }) : []; return apiSuccess(await prisma.showroom.create({ data: { ...data, brands: { create: brands.map((brand) => ({ brandId: brand.id })) } }, include }), "Showroom created successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create showroom", 400); } }
