import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/utils/response";
import { requireUser } from "@/lib/api/auth";
import { formatUserDTO } from "@/lib/auth/session";
import { userRepository } from "@/lib/repositories/user.repository";
import { z } from "zod";

const profileSchema = z.object({ name: z.string().trim().min(2).max(150) });

export async function GET() {
  try { return apiSuccess({ user: await requireUser() }, "User profile retrieved successfully"); } catch (e) { return apiError(e instanceof Error ? e.message : "Unauthorized", 401); }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = profileSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return apiError("Invalid profile data", 422, parsed.error.flatten().fieldErrors);
    const updated = await userRepository.updateProfile(BigInt(user.id), parsed.data);
    return apiSuccess({ user: formatUserDTO(updated) }, "Profile updated successfully");
  } catch (e) { return apiError(e instanceof Error ? e.message : "Failed to update profile", 400); }
}
