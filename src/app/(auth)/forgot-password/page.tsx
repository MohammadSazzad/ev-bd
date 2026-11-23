"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not request a reset link");
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not request a reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-7 shadow-xl">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot password</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Enter your email and we’ll send a secure reset link if the account exists.</p>
          {message && <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-[#00DF8F]">{message}</p>}
          {error && <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
          <label className="mt-5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070b14] px-4 py-3 text-sm outline-none focus:border-[#00DF8F]" />
          <button type="submit" disabled={loading} className="mt-5 w-full rounded-xl bg-[#00DF8F] py-3 text-sm font-bold text-[#070b14] disabled:opacity-60 flex items-center justify-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send reset link
          </button>
          <Link href="/login" className="mt-5 block text-center text-sm font-semibold text-emerald-600 dark:text-[#00DF8F] hover:underline">Back to login</Link>
        </form>
      </main>
      <Footer />
    </div>
  );
}
