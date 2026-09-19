import { NextRequest } from "next/server";
import { verifyEmailSchema } from "@/lib/validations/auth";
import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = verifyEmailSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    const user = await authService.verifyEmail(parseResult.data.token);

    return apiSuccess(
      { user },
      "Email address has been successfully verified. You can now sign in.",
      200
    );
  } catch (error: unknown) {
    console.error("Verify email error:", error);
    const message = error instanceof Error ? error.message : "Email verification failed";
    return apiError(message, 400);
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return apiError("Verification token is missing", 400);
    }

    const user = await authService.verifyEmail(token);

    return apiSuccess(
      { user },
      "Email address has been successfully verified. You can now sign in.",
      200
    );
  } catch (error: unknown) {
    console.error("Verify email error:", error);
    const message = error instanceof Error ? error.message : "Email verification failed";
    return apiError(message, 400);
  }
}
