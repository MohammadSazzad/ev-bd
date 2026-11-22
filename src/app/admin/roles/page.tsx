import { prisma } from "@/lib/db/prisma";
import { RolePermissionManager } from "@/components/admin/role-permission-manager";

export default async function AdminRolesPage() {
  const [roles, permissions] = await Promise.all([
    prisma.role.findMany({ include: { _count: { select: { users: true } }, permissions: { include: { permission: true } } }, orderBy: { name: "asc" } }),
    prisma.permission.findMany({ orderBy: { key: "asc" } }),
  ]);
  return <div className="space-y-6"><div><p className="text-sm font-semibold text-emerald-600">Access control</p><h1 className="mt-1 text-2xl font-bold">Roles & permissions</h1><p className="mt-1 text-sm text-slate-500">Super Admin controls the capabilities available to every operational role.</p></div><RolePermissionManager roles={roles.map((role) => ({ id: role.id.toString(), name: role.name, description: role.description, users: role._count.users, permissionKeys: role.permissions.map((item) => item.permission.key) }))} permissions={permissions.map((permission) => ({ id: permission.id.toString(), key: permission.key, description: permission.description }))} /></div>;
}
