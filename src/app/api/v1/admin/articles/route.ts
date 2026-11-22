import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { articleAdminSchema } from "@/lib/validations/admin";

const include = { category: true, author: { select: { name: true, email: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } } };
export async function GET() { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR"]); return apiSuccess(await prisma.article.findMany({ include, orderBy: { updatedAt: "desc" } }), "Articles retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve articles", 403); } }
export async function POST(request: NextRequest) { try { const user = await requireRoles(["ADMIN", "EDITOR"]); const parsed = articleAdminSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid article data", 422, parsed.error.flatten().fieldErrors); const { categorySlug, ...data } = parsed.data; return apiSuccess(await prisma.article.create({ data: { ...data, author: { connect: { id: BigInt(user.id) } }, category: { connect: { slug: categorySlug } }, ...(data.status === "PUBLISHED" ? { publishedAt: new Date() } : {}) }, include }), "Article created successfully", 201); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to create article", 400); } }
