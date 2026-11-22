import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/admin");
  if (!user.roles.some((role) => ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"].includes(role))) redirect("/dashboard");
  return <AdminShell user={user}>{children}</AdminShell>;
}
