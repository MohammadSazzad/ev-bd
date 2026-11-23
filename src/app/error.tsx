"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1628] p-7 text-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The page could not be loaded. Please try again.</p>
        <button type="button" onClick={reset} className="mt-5 rounded-xl bg-[#00DF8F] px-5 py-2.5 text-sm font-bold text-[#070b14]">Try again</button>
      </div>
    </div>
  );
}
