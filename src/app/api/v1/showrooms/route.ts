import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { showroomListQuerySchema } from "@/lib/validations/api";
import { listShowrooms } from "@/lib/repositories/catalog.repository";

export async function GET(request: NextRequest) {
  const parsed = showroomListQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid showroom query", 422, parsed.error.flatten().fieldErrors);
  return apiSuccess(await listShowrooms(parsed.data), "Showrooms retrieved successfully");
}
