import { prisma } from "@/lib/db/prisma";

export class UserRepository {
  /**
   * Finds a user by their email address including their assigned roles
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        profileImage: true,
      },
    });
  }

  /**
   * Finds a user by their primary key ID including roles and media
   */
  async findById(id: bigint) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        profileImage: true,
      },
    });
  }

  /**
   * Creates a new user and assigns the default "USER" role
   */
  async createUser(data: { name: string; email: string; passwordHash: string }) {
    // Ensure default USER role exists
    let defaultRole = await prisma.role.findUnique({
      where: { name: "USER" },
    });

    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: {
          name: "USER",
          description: "Standard platform user",
        },
      });
    }

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        status: "ACTIVE",
        isEmailVerified: false,
        roles: {
          create: {
            roleId: defaultRole.id,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        profileImage: true,
      },
    });
  }

  /**
   * Marks a user's email as verified
   */
  async markEmailVerified(userId: bigint) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
  }

  /**
   * Updates user's password hash
   */
  async updatePassword(userId: bigint, passwordHash: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
      },
    });
  }

  /**
   * Updates last login timestamp
   */
  async updateLastLogin(userId: bigint) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }
}

export const userRepository = new UserRepository();
