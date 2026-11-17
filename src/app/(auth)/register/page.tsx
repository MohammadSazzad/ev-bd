import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Register - VoltBD",
  description: "Create an account on VoltBD to track EV battery health, save vehicle comparisons, and connect with importers.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 dark:bg-emerald-500/[0.04] blur-3xl pointer-events-none rounded-full" />

        {/* Centered Brand Logo matching reference screenshot */}
        <div className="flex flex-col items-center mb-6 text-center relative z-10">
          <Link href="/" className="group flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-[#00DF8F] mb-3 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,223,143,0.15)]">
              <Zap className="h-6 w-6 fill-[#00DF8F] text-emerald-600 dark:text-[#00DF8F]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Volt<span className="text-emerald-600 dark:text-[#00DF8F]">BD</span>
            </span>
          </Link>
        </div>

        {/* Auth Card with Register Active */}
        <div className="relative z-10 w-full flex justify-center">
          <Suspense
            fallback={
              <div className="w-full max-w-[460px] h-[520px] rounded-2xl bg-slate-100 dark:bg-[#0e1628] animate-pulse" />
            }
          >
            <AuthCard initialTab="register" />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
