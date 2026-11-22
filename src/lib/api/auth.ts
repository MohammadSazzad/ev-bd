import { getCurrentUser } from "@/lib/auth/session";
import { ApiHttpError } from "./errors";
import type { UserDTO } from "@/types/auth";

export async function requireUser(): Promise<UserDTO> {
  const user = await getCurrentUser();
  if (!user) throw new ApiHttpError(401, "Authentication required");
  if (user.status !== "ACTIVE" || !user.isEmailVerified) {
    throw new ApiHttpError(403, "Your account is not allowed to perform this action");
  }
  return user;
}

export async function requireRoles(roles: string[]): Promise<UserDTO> {
  const user = await requireUser();
  if (!roles.some((role) => user.roles.includes(role))) {
    throw new ApiHttpError(403, "You do not have permission to access this resource");
  }
  return user;
}
