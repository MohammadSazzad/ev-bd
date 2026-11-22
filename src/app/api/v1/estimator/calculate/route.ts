import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { calculateSimulation } from "@/lib/data/estimator";
import { z } from "zod";

const schema = z.object({ modelId: z.string().min(1), chemistryId: z.string().min(1), dailyDistanceKm: z.number().min(1).max(1000), terrain: z.enum(["dhaka-flat", "chittagong-hilly"]) });

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid estimator input", 422, parsed.error.flatten().fieldErrors);
  return apiSuccess(calculateSimulation(parsed.data.modelId, parsed.data.chemistryId, parsed.data.dailyDistanceKm, parsed.data.terrain), "Battery estimate calculated successfully");
}
