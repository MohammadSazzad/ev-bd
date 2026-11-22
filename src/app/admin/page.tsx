import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || !user.roles.includes("ADMIN")) redirect("/");
  const [vehicles, brands, showrooms, articles] = await Promise.all([
    prisma.vehicle.count(),
    prisma.brand.count(),
    prisma.showroom.count(),
    prisma.article.count(),
  ]);
  const cards = [["Vehicles", vehicles], ["Brands", brands], ["Showrooms", showrooms], ["Articles", articles]];
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold">VoltBD Admin</h1>
      <p className="mt-2 text-slate-500">Manage catalogue content through the versioned admin APIs.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, count]) => <div key={label} className="rounded-2xl border p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{count}</p></div>)}
      </div>
    </main>
  );
}
