import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/auth";

/**
 * Recursively converts BigInt values to string representation
 * to prevent JSON.stringify BigInt serialization errors.
 */
export function serializeBigInt<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === "bigint") {
    return data.toString() as unknown as T;
  }

  if (data instanceof Date) {
    return data.toISOString() as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializeBigInt(item)) as unknown as T;
  }

  if (typeof data === "object") {
    const transformed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      transformed[key] = serializeBigInt(value);
    }
    return transformed as T;
  }

  return data;
}

/**
 * Standardized success response helper
 */
export function apiSuccess<T>(
  data?: T,
  message = "Operation successful",
  status = 200,
  headers?: HeadersInit
): NextResponse<ApiResponse<T>> {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined ? { data: serializeBigInt(data) } : {}),
  };

  return NextResponse.json(payload, {
    status,
    headers,
  });
}

/**
 * Standardized error response helper
 */
export function apiError(
  message = "An error occurred",
  status = 400,
  errors?: unknown,
  headers?: HeadersInit
): NextResponse<ApiResponse<never>> {
  const payload: ApiResponse<never> = {
    success: false,
    message,
    ...(errors !== undefined ? { errors: serializeBigInt(errors) } : {}),
  };

  return NextResponse.json(payload, {
    status,
    headers,
  });
}
