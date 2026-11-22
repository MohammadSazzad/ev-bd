import { apiError, apiSuccess } from "@/lib/utils/response";
import { getBrand } from "@/lib/repositories/catalog.repository";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const brand = await getBrand((await params).slug);
  return brand ? apiSuccess(brand, "Brand retrieved successfully") : apiError("Brand not found", 404);
}
