import { NextRequest } from "next/server";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = resetPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    await authService.resetPassword(parseResult.data);

    return apiSuccess(
      null,
      "Password has been reset successfully. You can now sign in with your new password.",
      200
    );
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    const message = error instanceof Error ? error.message : "Failed to reset password";
    return apiError(message, 400);
  }
}
