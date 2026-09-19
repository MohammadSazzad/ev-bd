import { NextRequest } from "next/server";
import { resendVerificationSchema } from "@/lib/validations/auth";
import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = resendVerificationSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    await authService.resendVerification(parseResult.data.email);

    return apiSuccess(
      null,
      "If an account with that email exists and is not yet verified, a verification link has been sent.",
      200
    );
  } catch (error: unknown) {
    console.error("Resend verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to resend verification email";
    return apiError(message, 400);
  }
}
