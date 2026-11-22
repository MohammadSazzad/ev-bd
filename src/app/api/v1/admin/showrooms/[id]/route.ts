import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { showroomAdminSchema } from "@/lib/validations/admin";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid showroom ID"); return BigInt(value); };
const include = { brands: { include: { brand: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } } };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR", "SHOWROOM"]); const parsed = showroomAdminSchema.partial().safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid showroom data", 422, parsed.error.flatten().fieldErrors); const { brandSlugs, ...data } = parsed.data; const id = idOf((await params).id); const result = await prisma.$transaction(async (tx) => { if (brandSlugs) { const brands = await tx.brand.findMany({ where: { slug: { in: brandSlugs } }, select: { id: true } }); await tx.showroomBrand.deleteMany({ where: { showroomId: id } }); await tx.showroomBrand.createMany({ data: brands.map((brand) => ({ showroomId: id, brandId: brand.id })), skipDuplicates: true }); } return tx.showroom.update({ where: { id }, data, include }); }); return apiSuccess(result, "Showroom updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update showroom", 400); } }
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN"]); return apiSuccess(await prisma.showroom.update({ where: { id: idOf((await params).id) }, data: { status: "ARCHIVED" }, include }), "Showroom archived successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to archive showroom", 400); } }
