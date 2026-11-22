import { prisma } from "@/lib/db/prisma";
import { ResourcePage } from "@/components/admin/resource-page";
export default async function AdminRolesPage() { const rows = await prisma.role.findMany({ include: { _count: { select: { users: true } } }, orderBy: { name: "asc" } }); return <ResourcePage eyebrow="Access control" title="Roles & access" description="Review the platform’s operational role assignments." rows={rows.map((row) => ({ id: row.id.toString(), title: row.name, subtitle: row.description ?? "No description", meta: `${row._count.users} assigned users`, status: "ACTIVE" }))} />; }
