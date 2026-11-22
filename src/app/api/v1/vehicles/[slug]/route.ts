import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { getVehicle } from "@/lib/repositories/catalog.repository";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const vehicle = await getVehicle((await params).slug);
  return vehicle ? apiSuccess(vehicle, "Vehicle retrieved successfully") : apiError("Vehicle not found", 404);
}
