import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireRoles } from "@/lib/api/auth";
import { articleAdminSchema } from "@/lib/validations/admin";

const idOf = (value: string) => { if (!/^\d+$/.test(value)) throw new Error("Invalid article ID"); return BigInt(value); };
const include = { category: true, author: { select: { name: true, email: true } }, media: { include: { media: true }, orderBy: { sortOrder: "asc" as const } } };
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR", "MODERATOR"]); const parsed = articleAdminSchema.partial().safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid article data", 422, parsed.error.flatten().fieldErrors); const { categorySlug, ...data } = parsed.data; return apiSuccess(await prisma.article.update({ where: { id: idOf((await params).id) }, data: { ...data, ...(categorySlug ? { category: { connect: { slug: categorySlug } } } : {}), ...(data.status === "PUBLISHED" ? { publishedAt: new Date() } : {}) }, include }), "Article updated successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update article", 400); } }
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) { try { await requireRoles(["ADMIN", "EDITOR"]); return apiSuccess(await prisma.article.update({ where: { id: idOf((await params).id) }, data: { status: "ARCHIVED" }, include }), "Article archived successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to archive article", 400); } }
