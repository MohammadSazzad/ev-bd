import { apiError, apiSuccess } from "@/lib/utils/response";
import { getArticle } from "@/lib/repositories/catalog.repository";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  return article ? apiSuccess(article, "Article retrieved successfully") : apiError("Article not found", 404);
}
