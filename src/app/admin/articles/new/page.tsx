import { prisma } from "@/lib/db/prisma";
import { ArticleForm } from "@/components/admin/article-form";

export default async function NewArticlePage() { const categories = await prisma.articleCategory.findMany({ where: { status: "ACTIVE" }, select: { slug: true, name: true }, orderBy: { name: "asc" } }); return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-semibold text-emerald-600">Editorial / Articles</p><h1 className="mt-1 text-2xl font-bold">Write article</h1><p className="mt-1 text-sm text-slate-500">Create a draft for review or publish directly when ready.</p></div><ArticleForm categories={categories} /></div>; }
