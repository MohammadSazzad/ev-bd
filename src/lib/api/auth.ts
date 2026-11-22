import { getCurrentUser } from "@/lib/auth/session";
import { ApiHttpError } from "./errors";
import type { UserDTO } from "@/types/auth";
import { prisma } from "@/lib/db/prisma";

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
  // ADMIN is the Super Admin role and is intentionally unrestricted.
  if (user.roles.includes("ADMIN")) return user;
  if (!roles.some((role) => user.roles.includes(role))) {
    throw new ApiHttpError(403, "You do not have permission to access this resource");
  }
  return user;
}

export async function requireSuperAdmin(): Promise<UserDTO> {
  const user = await requireUser();
  if (!user.roles.includes("ADMIN")) throw new ApiHttpError(403, "Super Admin privileges required");
  return user;
}

export async function requirePermission(permissionKey: string): Promise<UserDTO> {
  const user = await requireUser();
  if (user.roles.includes("ADMIN")) return user;
  const permission = await prisma.permission.findFirst({ where: { key: permissionKey, roles: { some: { role: { users: { some: { userId: BigInt(user.id) } } } } } } });
  if (!permission) throw new ApiHttpError(403, "You do not have permission to perform this action");
  return user;
}
