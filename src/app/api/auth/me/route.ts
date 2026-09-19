import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { userRepository } from "@/lib/repositories/user.repository";
import { formatUserDTO } from "@/lib/auth/session";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    // 1. Try session from cookie
    let user = await getCurrentUser();

    // 2. Fallback to Authorization: Bearer <token>
    if (!user) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const payload = await verifyAuthToken(token);
        if (payload?.sub) {
          const dbUser = await userRepository.findById(BigInt(payload.sub));
          if (dbUser && dbUser.status !== "BLOCKED") {
            user = formatUserDTO(dbUser);
          }
        }
      }
    }

    if (!user) {
      return apiError("Unauthorized", 401);
    }

    return apiSuccess({ user }, "User profile retrieved successfully", 200);
  } catch (error: unknown) {
    console.error("Get current user error:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve user profile";
    return apiError(message, 500);
  }
}
