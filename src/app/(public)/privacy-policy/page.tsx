import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>VoltBD uses account information to provide authentication, saved preferences, and EV directory features. We do not sell personal information.</p>
            <p>We store only the account and technical information necessary to operate the service and protect it from abuse. You may request account or data deletion by contacting the VoltBD support channel associated with your account.</p>
            <p>By using VoltBD, you agree to these privacy practices and applicable local data protection requirements.</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
