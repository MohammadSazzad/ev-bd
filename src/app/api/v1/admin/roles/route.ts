import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireSuperAdmin } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const createRoleSchema = z.object({ name: z.string().trim().min(2).max(50).regex(/^[A-Z][A-Z0-9_]*$/), description: z.string().max(255).optional(), permissionKeys: z.array(z.string()).default([]) });
export async function GET() { try { await requireSuperAdmin(); return apiSuccess(await prisma.role.findMany({ include: { _count: { select: { users: true } }, permissions: { include: { permission: true } } }, orderBy: { name: "asc" } }), "Roles retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve roles", 403); } }
export async function POST(request: NextRequest) { try { await requireSuperAdmin(); const parsed = createRoleSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid role data", 422, parsed.error.flatten().fieldErrors); const permissions = await prisma.permission.findMany({ where: { key: { in: parsed.data.permissionKeys } }, select: { id: true } }); const role = await prisma.role.create({ data: { name: parsed.data.name, description: parsed.data.description, permissions: { create: permissions.map((permission) => ({ permissionId: permission.id })) } }, include: { permissions: { include: { permission: true } } } }); return apiSuccess(role, "Role created successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create role", 400); } }
