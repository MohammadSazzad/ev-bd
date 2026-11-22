import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const mediaSchema = z.object({ altText: z.string().max(255).nullable() });
export async function GET() { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]); return apiSuccess(await prisma.mediaFile.findMany({ orderBy: { createdAt: "desc" }, take: 200 }), "Media retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve media", 403); } }
export async function POST(request: NextRequest) { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]); const parsed = mediaSchema.extend({ originalName: z.string().min(1).max(255), filePath: z.string().url().max(500), mediaType: z.enum(["PROFILE_IMAGE", "VEHICLE_IMAGE", "SHOWROOM_IMAGE", "BATTERY_IMAGE", "BRAND_LOGO", "SPONSORED_LISTING_IMAGE", "ARTICLE_IMAGE", "ARTICLE_INLINE_IMAGE"]), mimeType: z.string().max(100), size: z.coerce.bigint().nonnegative() }).safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid media data", 422, parsed.error.flatten().fieldErrors); return apiSuccess(await prisma.mediaFile.create({ data: { ...parsed.data, fileName: parsed.data.originalName, disk: "remote", extension: parsed.data.originalName.split(".").pop() ?? null } }), "Media registered successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to register media", 400); } }
