import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { articleListQuerySchema } from "@/lib/validations/api";
import { listArticles } from "@/lib/repositories/catalog.repository";

export async function GET(request: NextRequest) {
  const parsed = articleListQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid article query", 422, parsed.error.flatten().fieldErrors);
  return apiSuccess(await listArticles({ ...parsed.data, featured: parsed.data.featured === "true" ? true : parsed.data.featured === "false" ? false : undefined }), "Articles retrieved successfully");
}
