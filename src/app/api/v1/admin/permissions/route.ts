import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireSuperAdmin } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() { try { await requireSuperAdmin(); return apiSuccess(await prisma.permission.findMany({ include: { _count: { select: { roles: true } } }, orderBy: { key: "asc" } }), "Permissions retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve permissions", 403); } }
