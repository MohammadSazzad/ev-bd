import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "@/types/auth";

const DEFAULT_JWT_SECRET = "ev-bd-super-secret-jwt-key-min-32-chars-for-dev";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
    console.warn("WARNING: JWT_SECRET environment variable is not defined in production!");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Signs a JWT with the given user payload
 */
export async function signAuthToken(
  payload: JWTPayload,
  expiresIn = process.env.JWT_EXPIRES_IN || "7d"
): Promise<string> {
  const secretKey = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject(payload.sub)
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verifies a JWT and returns the typed payload or null if invalid/expired
 */
export async function verifyAuthToken(token: string): Promise<JWTPayload | null> {
  try {
    const secretKey = getJwtSecret();
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
