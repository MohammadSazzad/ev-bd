import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { categoryAdminSchema } from "@/lib/validations/admin";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid category ID"); return BigInt(value); };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR"]); const parsed = categoryAdminSchema.partial().safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid category data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.vehicleCategory.update({ where: { id: idOf((await params).id) }, data: parsed.data }), "Category updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update category", 400); } }
