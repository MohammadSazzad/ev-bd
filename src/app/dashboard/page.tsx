import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/dashboard");

  if (user.roles.some((role) => ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"].includes(role))) {
    redirect("/admin");
  }

  const roles = user.roles;
  const isAdmin = roles.includes("ADMIN");
  const isContentStaff = isAdmin || roles.includes("EDITOR") || roles.includes("MODERATOR");
  const isShowroomStaff = isAdmin || roles.includes("SHOWROOM");

  const [vehicles, brands, showrooms, articles] = await Promise.all([
    isShowroomStaff ? prisma.vehicle.count() : Promise.resolve(null),
    isAdmin || roles.includes("EDITOR") ? prisma.brand.count() : Promise.resolve(null),
    isShowroomStaff || roles.includes("MODERATOR") ? prisma.showroom.count() : Promise.resolve(null),
    isContentStaff ? prisma.article.count() : Promise.resolve(null),
  ]);

  const cards = [
    vehicles !== null && ["Vehicles", vehicles],
    brands !== null && ["Brands", brands],
    showrooms !== null && ["Showrooms", showrooms],
    articles !== null && ["Articles", articles],
  ].filter(Boolean) as Array<[string, number]>;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-[#00DF8F]">VoltBD Panel</p>
            <h1 className="mt-2 text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{roles.join(" · ")}</p>
          </div>
          {isAdmin && <Link href="/admin" className="rounded-xl bg-[#00DF8F] px-4 py-2 text-sm font-bold text-[#070b14]">Open Admin</Link>}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, count]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0e1628]">
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0e1628]">
          <h2 className="text-lg font-bold">Panel access</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your dashboard is ready. Content management screens can be added under the role-specific actions below.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {isShowroomStaff && <Link href="/vehicles" className="rounded-lg border px-3 py-2 text-sm hover:border-emerald-500">View vehicles</Link>}
            {(isContentStaff || roles.includes("MODERATOR")) && <Link href="/blog" className="rounded-lg border px-3 py-2 text-sm hover:border-emerald-500">View articles</Link>}
            {isShowroomStaff || roles.includes("MODERATOR") ? <Link href="/showrooms" className="rounded-lg border px-3 py-2 text-sm hover:border-emerald-500">View showrooms</Link> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
