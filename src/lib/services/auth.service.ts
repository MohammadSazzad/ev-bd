import crypto from "crypto";
import { userRepository } from "@/lib/repositories/user.repository";
import { tokenRepository } from "@/lib/repositories/token.repository";
import { hashPassword, comparePassword } from "@/lib/auth/password";
import { signAuthToken } from "@/lib/auth/jwt";
import { setAuthCookie, clearAuthCookie } from "@/lib/auth/cookies";
import { formatUserDTO } from "@/lib/auth/session";
import { mailService } from "./mail.service";
import { TokenType } from "@/generated/prisma/enums";
import {
  SignupInput,
  SigninInput,
  ResetPasswordInput,
} from "@/lib/validations/auth";
import { UserDTO } from "@/types/auth";

export class EmailNotVerifiedError extends Error {
  email: string;
  code = "EMAIL_NOT_VERIFIED";

  constructor(message: string, email: string) {
    super(message);
    this.name = "EmailNotVerifiedError";
    this.email = email;
  }
}

export class AuthService {
  /**
   * Registers a new user account, creates verification token, and dispatches SMTP verification email
   */
  async signupUser(input: SignupInput): Promise<{ user: UserDTO; verificationSent: boolean }> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("A user with this email address already exists.");
    }

    const passwordHash = await hashPassword(input.password);
    const user = await userRepository.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    // Generate secure random verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await tokenRepository.createToken(user.id, rawToken, TokenType.EMAIL_VERIFICATION, expiresAt);

    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${rawToken}`;

    // Send verification email
    await mailService.sendVerificationEmail(user.email, user.name, verificationUrl);

    return {
      user: formatUserDTO(user),
      verificationSent: true,
    };
  }

  /**
   * Authenticates user credentials, validates account status & email verification,
   * issues JWT and sets secure HttpOnly cookie.
   */
  async signinUser(input: SigninInput): Promise<{ user: UserDTO; token: string }> {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await comparePassword(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    if (user.status === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support.");
    }

    if (!user.isEmailVerified) {
      throw new EmailNotVerifiedError(
        "Please verify your email address before signing in.",
        user.email
      );
    }

    // Update last login timestamp
    await userRepository.updateLastLogin(user.id);

    // Generate JWT
    const roles = user.roles.map((r) => r.role.name);
    const token = await signAuthToken({
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
      roles,
    });

    // Set HttpOnly cookie
    await setAuthCookie(token);

    return {
      user: formatUserDTO(user),
      token,
    };
  }

  /**
   * Logs out the user by clearing the auth cookie
   */
  async signoutUser(): Promise<void> {
    await clearAuthCookie();
  }

  /**
   * Verifies an email address using the provided token
   */
  async verifyEmail(token: string): Promise<UserDTO> {
    const validToken = await tokenRepository.findValidToken(token, TokenType.EMAIL_VERIFICATION);
    if (!validToken) {
      throw new Error("Invalid or expired verification token.");
    }

    const user = await userRepository.markEmailVerified(validToken.userId);
    await tokenRepository.deleteToken(token);

    const fullUser = await userRepository.findById(user.id);
    if (!fullUser) {
      throw new Error("User associated with token could not be found.");
    }

    return formatUserDTO(fullUser);
  }

  /**
   * Resends verification email for unverified user accounts
   */
  async resendVerification(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Return cleanly to avoid user enumeration
      return;
    }

    if (user.isEmailVerified) {
      throw new Error("This email is already verified.");
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await tokenRepository.createToken(user.id, rawToken, TokenType.EMAIL_VERIFICATION, expiresAt);

    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${rawToken}`;

    await mailService.sendVerificationEmail(user.email, user.name, verificationUrl);
  }

  /**
   * Generates a password reset token and sends a reset email
   */
  async requestPasswordReset(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    if (!user || user.status === "BLOCKED") {
      // Don't leak user existence
      return;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await tokenRepository.createToken(user.id, rawToken, TokenType.PASSWORD_RESET, expiresAt);

    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    await mailService.sendPasswordResetEmail(user.email, user.name, resetUrl);
  }

  /**
   * Resets user password after verifying the reset token
   */
  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const validToken = await tokenRepository.findValidToken(input.token, TokenType.PASSWORD_RESET);
    if (!validToken) {
      throw new Error("Invalid or expired password reset token.");
    }

    const passwordHash = await hashPassword(input.password);
    await userRepository.updatePassword(validToken.userId, passwordHash);
    await tokenRepository.deleteToken(input.token);
  }
}

export const authService = new AuthService();
