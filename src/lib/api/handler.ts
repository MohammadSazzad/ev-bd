import { apiError } from "@/lib/utils/response";
import { isApiHttpError } from "./errors";

export async function withApiErrorHandling<T>(handler: () => Promise<T>) {
  try {
    return await handler();
  } catch (error) {
    console.error("API request failed:", error);
    if (isApiHttpError(error)) return apiError(error.message, error.status, error.details);
    return apiError(error instanceof Error ? error.message : "Internal server error", 500);
  }
}
