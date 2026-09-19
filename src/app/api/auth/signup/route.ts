import { NextRequest } from "next/server";
import { signupSchema } from "@/lib/validations/auth";
import { authService } from "@/lib/services/auth.service";
import { apiSuccess, apiError } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = signupSchema.safeParse(body);

    if (!parseResult.success) {
      return apiError(
        "Validation failed",
        422,
        parseResult.error.flatten().fieldErrors
      );
    }

    const result = await authService.signupUser(parseResult.data);

    return apiSuccess(
      result,
      "Account created successfully. Please check your email to verify your account.",
      201
    );
  } catch (error: unknown) {
    console.error("Signup error:", error);
    const message = error instanceof Error ? error.message : "Failed to create account";
    return apiError(message, 400);
  }
}
