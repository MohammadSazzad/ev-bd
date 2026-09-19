import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST() {
  try {
    await authService.signoutUser();
    return apiSuccess(null, "Signed out successfully", 200);
  } catch (error: unknown) {
    console.error("Signout error:", error);
    const message = error instanceof Error ? error.message : "Failed to sign out";
    return apiError(message, 500);
  }
}
