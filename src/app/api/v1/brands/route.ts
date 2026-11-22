import { apiSuccess } from "@/lib/utils/response";
import { listBrands } from "@/lib/repositories/catalog.repository";

export async function GET() { return apiSuccess(await listBrands(), "Brands retrieved successfully"); }
