import nodemailer, { type Transporter } from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class MailService {
  private transporter: Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.initTransporter();
  }

  private initTransporter() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });
      this.isConfigured = true;
    } else {
      this.isConfigured = false;
    }
  }

  /**
   * Sends an email via SMTP or logs to console in development
   */
  async sendMail(options: SendMailOptions): Promise<void> {
    const from = process.env.SMTP_FROM || `"EV Bangladesh" <noreply@ev-bd.com>`;

    if (!this.isConfigured || !this.transporter) {
      console.log("\n=======================================================");
      console.log("⚠️  SMTP is not configured. Email preview (dev fallback):");
      console.log(`To: ${options.to}`);
      console.log(`From: ${from}`);
      console.log(`Subject: ${options.subject}`);
      console.log("Content:");
      console.log(options.text || options.html);
      console.log("=======================================================\n");
      return;
    }

    try {
      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
    } catch (error) {
      console.error("Failed to send email via SMTP:", error);
      // In development, log the error but do not crash the request
      if (process.env.NODE_ENV !== "production") {
        console.warn("Continuing despite mail failure in non-production environment.");
      } else {
        throw new Error("Failed to dispatch email. Please try again later.");
      }
    }
  }

  /**
   * Sends email verification link to user
   */
  async sendVerificationEmail(email: string, name: string, verificationUrl: string): Promise<void> {
    const subject = "Verify Your Email - EV Bangladesh";
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; }
    .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 32px 28px; line-height: 1.6; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { background: #059669; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2); }
    .alt-link { word-break: break-all; font-size: 13px; color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin-top: 16px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>EV Bangladesh</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; font-weight: 600; color: #111827;">Hello ${name},</p>
      <p>Thank you for signing up for EV Bangladesh, your premier platform for electric vehicle discovery, comparisons, and showrooms.</p>
      <p>Please verify your email address to activate your account and start exploring:</p>
      <div class="btn-container">
        <a href="${verificationUrl}" class="btn" target="_blank">Verify Email Address</a>
      </div>
      <p style="font-size: 14px; color: #4b5563;">This verification link will expire in <strong>24 hours</strong>.</p>
      <p style="font-size: 13px; color: #6b7280;">If you have trouble clicking the button above, copy and paste the URL below into your browser:</p>
      <div class="alt-link">${verificationUrl}</div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EV Bangladesh. All rights reserved.</p>
      <p>If you did not create an account with EV Bangladesh, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>
    `;

    const text = `Hello ${name},\n\nPlease verify your email address by visiting this link: ${verificationUrl}\n\nThis link will expire in 24 hours.\n\nEV Bangladesh Team`;

    await this.sendMail({
      to: email,
      subject,
      html,
      text,
    });
  }

  /**
   * Sends password reset email with token link
   */
  async sendPasswordResetEmail(email: string, name: string, resetUrl: string): Promise<void> {
    const subject = "Reset Your Password - EV Bangladesh";
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; }
    .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 32px 28px; line-height: 1.6; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { background: #059669; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2); }
    .alt-link { word-break: break-all; font-size: 13px; color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin-top: 16px; }
    .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #991b1b; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>EV Bangladesh</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; font-weight: 600; color: #111827;">Hello ${name},</p>
      <p>We received a request to reset your password for your EV Bangladesh account.</p>
      <p>Click the button below to set a new password:</p>
      <div class="btn-container">
        <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
      </div>
      <div class="warning">
        <strong>Security Notice:</strong> This password reset link will expire in <strong>1 hour</strong>. For your protection, never share this link with anyone.
      </div>
      <p style="font-size: 13px; color: #6b7280;">If you have trouble clicking the button, copy and paste the URL below into your browser:</p>
      <div class="alt-link">${resetUrl}</div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EV Bangladesh. All rights reserved.</p>
      <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    </div>
  </div>
</body>
</html>
    `;

    const text = `Hello ${name},\n\nYou requested to reset your password for EV Bangladesh. Use this link: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.`;

    await this.sendMail({
      to: email,
      subject,
      html,
      text,
    });
  }
}

export const mailService = new MailService();
