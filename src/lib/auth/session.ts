import { getAuthCookie } from "./cookies";
import { verifyAuthToken } from "./jwt";
import { prisma } from "@/lib/db/prisma";
import { UserDTO } from "@/types/auth";

/**
 * Maps a Prisma User entity to a clean, client-safe UserDTO
 */
export function formatUserDTO(user: {
  id: bigint;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isEmailVerified: boolean;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  roles?: Array<{ role: { name: string } }>;
  profileImage?: { id: bigint; filePath: string; originalName: string } | null;
}): UserDTO {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    status: user.status,
    isEmailVerified: user.isEmailVerified,
    emailVerifiedAt: user.emailVerifiedAt ? user.emailVerifiedAt.toISOString() : null,
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
    createdAt: user.createdAt.toISOString(),
    roles: user.roles ? user.roles.map((r) => r.role.name) : [],
    profileImage: user.profileImage
      ? {
          id: user.profileImage.id.toString(),
          filePath: user.profileImage.filePath,
          originalName: user.profileImage.originalName,
        }
      : null,
  };
}

/**
 * Gets the current authenticated user from cookie JWT
 */
export async function getCurrentUser(): Promise<UserDTO | null> {
  const token = await getAuthCookie();
  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  if (!payload || !payload.sub) {
    return null;
  }

  try {
    const userId = BigInt(payload.sub);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        profileImage: true,
      },
    });

    if (!user || user.status === "BLOCKED") {
      return null;
    }

    return formatUserDTO(user);
  } catch (error) {
    console.error("Failed to fetch user session:", error);
    return null;
  }
}
