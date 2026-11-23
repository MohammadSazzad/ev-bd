import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>VoltBD provides vehicle specifications, comparison tools, battery estimates, and showroom information for general reference.</p>
            <p>Prices, availability, range, warranty, and charging estimates may change. Confirm final specifications with an authorized dealer before purchase.</p>
            <p>Do not misuse the platform, attempt unauthorized access, or submit fraudulent account or listing information.</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
