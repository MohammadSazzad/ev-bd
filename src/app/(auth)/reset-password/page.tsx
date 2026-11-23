"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not reset password");
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-7 shadow-xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset password</h1>
      {!token && <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">The reset link is missing or invalid.</p>}
      {message && <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-[#00DF8F]">{message}</p>}
      {error && <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">New Password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 text-sm outline-none focus:border-[#00DF8F]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Confirm Password</label>
          <input type="password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 text-sm outline-none focus:border-[#00DF8F]" />
        </div>
      </div>
      <button type="submit" disabled={loading || !token} className="mt-5 w-full rounded-xl bg-[#00DF8F] py-3 text-sm font-bold text-[#070b14] disabled:opacity-60 flex items-center justify-center gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Reset password
      </button>
      <Link href="/login" className="mt-5 block text-center text-sm font-semibold text-emerald-600 dark:text-[#00DF8F] hover:underline">Back to login</Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="h-80 w-full max-w-md rounded-2xl bg-slate-100 dark:bg-[#0e1628] animate-pulse" />}>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
