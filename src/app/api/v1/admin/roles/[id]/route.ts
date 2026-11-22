import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireSuperAdmin } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { rolePermissionSchema } from "@/lib/validations/admin";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid role ID"); return BigInt(value); };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireSuperAdmin(); const parsed = rolePermissionSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid role permissions", 422, parsed.error.flatten().fieldErrors); const roleId = idOf((await params).id); const permissions = await prisma.permission.findMany({ where: { key: { in: parsed.data.permissionKeys } }, select: { id: true } }); const role = await prisma.$transaction(async (tx) => { await tx.role.update({ where: { id: roleId }, data: { description: parsed.data.description } }); await tx.rolePermission.deleteMany({ where: { roleId } }); if (permissions.length) await tx.rolePermission.createMany({ data: permissions.map((permission) => ({ roleId, permissionId: permission.id })) }); return tx.role.findUnique({ where: { id: roleId }, include: { permissions: { include: { permission: true } }, _count: { select: { users: true } } } }); }); return apiSuccess(role, "Role permissions updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update role permissions", 400); } }
