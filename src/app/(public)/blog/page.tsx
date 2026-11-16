import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogView } from "@/components/blog/blog-view";

export const metadata: Metadata = {
  title: "EV News & Guides - VoltBD Bangladesh",
  description:
    "Keep up with electric vehicle infrastructure developments, policy updates, and expert battery maintenance tips in Bangladesh.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <BlogView />
      </main>

      <Footer />
    </div>
  );
}
