import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { brandAdminSchema } from "@/lib/validations/admin";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid brand ID"); return BigInt(value); };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR"]); const parsed = brandAdminSchema.partial().safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid brand data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.brand.update({ where: { id: idOf((await params).id) }, data: parsed.data, include: { logoMedia: true } }), "Brand updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update brand", 400); } }
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN"]); return apiSuccess(await prisma.brand.update({ where: { id: idOf((await params).id) }, data: { status: "ARCHIVED" } }), "Brand archived successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to archive brand", 400); } }
