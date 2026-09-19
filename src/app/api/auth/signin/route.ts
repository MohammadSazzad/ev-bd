import { NextRequest } from "next/server";
import { signinSchema } from "@/lib/validations/auth";
import { authService, EmailNotVerifiedError } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = signinSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    const result = await authService.signinUser(parseResult.data);

    return apiSuccess(result, "Signed in successfully", 200);
  } catch (error: unknown) {
    if (error instanceof EmailNotVerifiedError) {
      return apiError(error.message, 403, {
        requiresEmailVerification: true,
        email: error.email,
      });
    }

    const message = error instanceof Error ? error.message : "Failed to sign in";
    const status = message.includes("Invalid email or password") ? 401 : 400;
    return apiError(message, status);
  }
}
