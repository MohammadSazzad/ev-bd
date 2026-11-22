import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { vehicleListQuerySchema } from "@/lib/validations/api";
import { listVehicles } from "@/lib/repositories/catalog.repository";

export async function GET(request: NextRequest) {
  const parsed = vehicleListQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return apiError("Invalid vehicle query", 422, parsed.error.flatten().fieldErrors);
  return apiSuccess(await listVehicles(parsed.data), "Vehicles retrieved successfully");
}
