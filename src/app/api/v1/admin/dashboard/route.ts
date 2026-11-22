import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    await requireRoles(["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"]);
    const [vehicles, brands, categories, showrooms, articles, users, media, draftVehicles, draftArticles] = await Promise.all([
      prisma.vehicle.count(), prisma.brand.count(), prisma.vehicleCategory.count(), prisma.showroom.count(), prisma.article.count(), prisma.user.count(), prisma.mediaFile.count(),
      prisma.vehicle.count({ where: { status: "DRAFT" } }), prisma.article.count({ where: { status: "DRAFT" } }),
    ]);
    return apiSuccess({ counts: { vehicles, brands, categories, showrooms, articles, users, media }, attention: { draftVehicles, draftArticles } }, "Dashboard data retrieved successfully");
  } catch (error) { return apiError(error instanceof Error ? error.message : "Failed to retrieve dashboard", 403); }
}
