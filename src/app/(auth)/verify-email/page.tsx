"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Loader2 } from "lucide-react";

function VerifyEmailResult() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(token ? "loading" : "error");
  const [message, setMessage] = useState(token ? "" : "The verification link is missing or invalid.");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => ({ res, data: await res.json() }))
      .then(({ res, data }) => {
        if (!res.ok) throw new Error(data.message || "Email verification failed");
        setStatus("success");
        setMessage(data.message);
      })
      .catch((err: unknown) => {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Email verification failed");
      });
  }, [token]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-7 text-center shadow-xl">
      {status === "loading" && <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#00DF8F]" />}
      {status !== "loading" && (
        <p className={`rounded-xl border p-4 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-[#00DF8F]" : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
          {message}
        </p>
      )}
      {status === "success" && (
        <Link href="/login" className="mt-5 inline-flex rounded-xl bg-[#00DF8F] px-5 py-2.5 text-sm font-bold text-[#070b14]">Continue to login</Link>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="h-40 w-full max-w-md rounded-2xl bg-slate-100 dark:bg-[#0e1628] animate-pulse" />}>
          <VerifyEmailResult />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
