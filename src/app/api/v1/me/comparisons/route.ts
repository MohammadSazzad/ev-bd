import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireUser } from "@/lib/api/auth";
import { savedComparisonSchema } from "@/lib/validations/api";
import { createSavedComparison, listSavedComparisons } from "@/lib/repositories/saved-comparison.repository";

export async function GET() {
  try { const user = await requireUser(); return apiSuccess(await listSavedComparisons(BigInt(user.id)), "Saved comparisons retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Unauthorized", 401); }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = savedComparisonSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return apiError("Invalid saved comparison", 422, parsed.error.flatten().fieldErrors);
    return apiSuccess(await createSavedComparison(BigInt(user.id), parsed.data.name, parsed.data.vehicleIds.map(BigInt)), "Comparison saved successfully", 201);
  } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to save comparison", 400); }
}
