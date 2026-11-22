import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireUser } from "@/lib/api/auth";
import { savedComparisonSchema } from "@/lib/validations/api";
import { deleteSavedComparison, getSavedComparison, updateSavedComparison } from "@/lib/repositories/saved-comparison.repository";

async function context(params: Promise<{ id: string }>) { const id = (await params).id; if (!/^\d+$/.test(id)) throw new Error("Invalid comparison ID"); return BigInt(id); }

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { const user = await requireUser(); const comparison = await getSavedComparison(BigInt(user.id), await context(params)); return comparison ? apiSuccess(comparison, "Saved comparison retrieved successfully") : apiError("Saved comparison not found", 404); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to retrieve comparison", 400); }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { const user = await requireUser(); const parsed = savedComparisonSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return apiError("Invalid saved comparison", 422, parsed.error.flatten().fieldErrors); const result = await updateSavedComparison(BigInt(user.id), await context(params), parsed.data.name, parsed.data.vehicleIds.map(BigInt)); return result ? apiSuccess(result, "Saved comparison updated successfully") : apiError("Saved comparison not found", 404); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update comparison", 400); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { const user = await requireUser(); const result = await deleteSavedComparison(BigInt(user.id), await context(params)); return result.count ? apiSuccess(null, "Saved comparison deleted successfully") : apiError("Saved comparison not found", 404); } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to delete comparison", 400); }
}
