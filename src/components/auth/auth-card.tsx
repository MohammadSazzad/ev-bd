"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, XCircle } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface AuthCardProps {
  initialTab?: "login" | "register";
}

export function AuthCard({ initialTab = "login" }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams.get("redirect") || searchParams.get("callbackUrl");
  const redirectUrl = requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
    ? requestedRedirect
    : "/dashboard";

  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to sign in");
        }

        setSuccessMessage("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh();
        }, 800);
      } else {
        // Registration
        if (!name.trim()) {
          throw new Error("Full name is required");
        }
        if (!termsAccepted) {
          throw new Error("Please agree to the Terms of Service");
        }

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to create account");
        }

        setSuccessMessage("Account created successfully! Please check your email to verify.");
        setTimeout(() => {
          setActiveTab("login");
        }, 1500);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] p-7 sm:p-9 shadow-2xl shadow-black/30 transition-colors">
      {/* Tabs Row matching the reference screenshot */}
      <div className="relative flex border-b border-slate-200 dark:border-slate-800 mb-7">
        <button
          type="button"
          onClick={() => {
            setActiveTab("login");
            setErrorMessage(null);
          }}
          className={`flex-1 pb-3 text-center text-sm sm:text-base font-semibold transition-all relative ${
            activeTab === "login"
              ? "text-emerald-600 dark:text-[#00DF8F]"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Login
          {activeTab === "login" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00DF8F] shadow-[0_0_8px_#00DF8F]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("register");
            setErrorMessage(null);
          }}
          className={`flex-1 pb-3 text-center text-sm sm:text-base font-semibold transition-all relative ${
            activeTab === "register"
              ? "text-emerald-600 dark:text-[#00DF8F]"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          Register
          {activeTab === "register" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00DF8F] shadow-[0_0_8px_#00DF8F]" />
          )}
        </button>
      </div>

      {/* Feedback Messages */}
      {errorMessage && (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-[#00DF8F]">
          {successMessage}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name field (Register only) */}
        {activeTab === "register" && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#00DF8F] focus:ring-1 focus:ring-[#00DF8F]/30 transition-all"
            />
          </div>
        )}

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#00DF8F] focus:ring-1 focus:ring-[#00DF8F]/30 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={activeTab === "login" ? "••••••••" : "Create a password (min 8 chars)"}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 pr-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#00DF8F] focus:ring-1 focus:ring-[#00DF8F]/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password row */}
        {activeTab === "login" ? (
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#070b14] text-[#00DF8F] focus:ring-[#00DF8F]/30 cursor-pointer accent-[#00DF8F]"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-emerald-600 dark:text-[#00DF8F] hover:underline font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        ) : (
          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#070b14] text-[#00DF8F] focus:ring-[#00DF8F]/30 mt-0.5 cursor-pointer accent-[#00DF8F]"
            />
            <label htmlFor="terms" className="cursor-pointer select-none">
              I agree to the{" "}
              <Link href="/terms" className="text-emerald-600 dark:text-[#00DF8F] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-emerald-600 dark:text-[#00DF8F] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#00DF8F] py-3.5 px-4 text-sm sm:text-base font-bold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-[0.98] shadow-lg shadow-emerald-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-[#070b14]" />}
            {activeTab === "login" ? "Login to VoltBD" : "Create VoltBD Account"}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-center">
          <span className="bg-white dark:bg-[#0e1628] px-3 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Logins matching the exact icons from the screenshot */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            router.push("/api/auth/signin?provider=google");
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14]/50 py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
        >
          {/* Circular X icon matching screenshot */}
          <XCircle className="h-4 w-4 text-slate-700 dark:text-slate-200 stroke-[1.8]" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => {
            router.push("/api/auth/signin?provider=facebook");
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14]/50 py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
        >
          {/* Facebook Icon matching screenshot */}
          <FacebookIcon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
          <span>Facebook</span>
        </button>
      </div>

      {/* Bottom Switcher */}
      <div className="mt-6 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {activeTab === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMessage(null);
              }}
              className="text-emerald-600 dark:text-[#00DF8F] font-semibold hover:underline transition-colors"
            >
              Register here
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMessage(null);
              }}
              className="text-emerald-600 dark:text-[#00DF8F] font-semibold hover:underline transition-colors"
            >
              Login here
            </button>
          </>
        )}
      </div>
    </div>
  );
}
