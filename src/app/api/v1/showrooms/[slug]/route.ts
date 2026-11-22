import { apiError, apiSuccess } from "@/lib/utils/response";
import { getShowroom } from "@/lib/repositories/catalog.repository";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const showroom = await getShowroom((await params).slug);
  return showroom ? apiSuccess(showroom, "Showroom retrieved successfully") : apiError("Showroom not found", 404);
}
