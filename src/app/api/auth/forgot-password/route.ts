import { NextRequest } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = forgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    await authService.requestPasswordReset(parseResult.data.email);

    return apiSuccess(
      null,
      "If an account with that email exists, a password reset link has been sent.",
      200
    );
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    const message = error instanceof Error ? error.message : "Failed to process forgot password request";
    return apiError(message, 400);
  }
}
