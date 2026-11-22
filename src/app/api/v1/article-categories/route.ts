import { apiSuccess } from "@/lib/utils/response";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  return apiSuccess(await prisma.articleCategory.findMany({ where: { status: "ACTIVE" }, orderBy: { name: "asc" } }), "Article categories retrieved successfully");
}
