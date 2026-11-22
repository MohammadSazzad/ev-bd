import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() { try { await requireRoles(["ADMIN"]); return apiSuccess(await prisma.user.findMany({ select: { id: true, name: true, email: true, status: true, isEmailVerified: true, lastLoginAt: true, createdAt: true, roles: { include: { role: true } } }, orderBy: { createdAt: "desc" } }), "Users retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve users", 403); } }
