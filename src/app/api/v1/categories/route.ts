import { apiSuccess } from "@/lib/utils/response";
import { listCategories } from "@/lib/repositories/catalog.repository";

export async function GET() { return apiSuccess(await listCategories(), "Categories retrieved successfully"); }
