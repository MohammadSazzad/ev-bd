import { prisma } from "@/lib/db/prisma";
import { TokenType } from "@/generated/prisma/enums";

export class TokenRepository {
  /**
   * Creates or replaces an auth token (e.g. email verification or password reset)
   */
  async createToken(userId: bigint, token: string, type: TokenType, expiresAt: Date) {
    // Delete any existing tokens for this user and type to keep the table clean
    await prisma.verificationToken.deleteMany({
      where: {
        userId,
        type,
      },
    });

    return prisma.verificationToken.create({
      data: {
        userId,
        token,
        type,
        expiresAt,
      },
    });
  }

  /**
   * Finds a valid, non-expired token by token string and type
   */
  async findValidToken(token: string, type: TokenType) {
    return prisma.verificationToken.findFirst({
      where: {
        token,
        type,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Deletes a token after it has been used
   */
  async deleteToken(token: string) {
    return prisma.verificationToken.deleteMany({
      where: { token },
    });
  }

  /**
   * Deletes all tokens for a user with specific type
   */
  async deleteTokensByUserAndType(userId: bigint, type: TokenType) {
    return prisma.verificationToken.deleteMany({
      where: {
        userId,
        type,
      },
    });
  }
}

export const tokenRepository = new TokenRepository();
