import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid media ID"); return BigInt(value); };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]); const parsed = z.object({ altText: z.string().max(255).nullable() }).safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid media data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.mediaFile.update({ where: { id: idOf((await params).id) }, data: parsed.data }), "Media updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update media", 400); } }
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN"]); const id = idOf((await params).id); const media = await prisma.mediaFile.findUnique({ where: { id }, include: { brandLogo: true, vehicleMedia: true, showroomMedia: true, articleMedia: true, profileUser: true } }); if (!media || media.brandLogo || media.vehicleMedia.length || media.showroomMedia.length || media.articleMedia.length || media.profileUser) return apiError("Media is still attached and cannot be deleted", 409); await prisma.mediaFile.delete({ where: { id } }); return apiSuccess(null, "Media deleted successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to delete media", 400); } }
