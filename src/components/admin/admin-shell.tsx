"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, Building2, CarFront, ChevronLeft, FileText, ImageIcon, LayoutDashboard, LogOut, Menu, Settings, ShieldCheck, Tags, Users, X, Zap } from "lucide-react";
import type { UserDTO } from "@/types/auth";

type AdminShellProps = { user: UserDTO; children: React.ReactNode };

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, roles: ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"] },
  { label: "Vehicles", href: "/admin/vehicles", icon: CarFront, roles: ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"] },
  { label: "Brands", href: "/admin/brands", icon: Tags, roles: ["ADMIN", "EDITOR", "MODERATOR"] },
  { label: "Showrooms", href: "/admin/showrooms", icon: Building2, roles: ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"] },
  { label: "Articles", href: "/admin/articles", icon: FileText, roles: ["ADMIN", "EDITOR", "MODERATOR"] },
  { label: "Media library", href: "/admin/media", icon: ImageIcon, roles: ["ADMIN", "EDITOR", "MODERATOR", "SHOWROOM"] },
  { label: "Users", href: "/admin/users", icon: Users, roles: ["ADMIN"] },
  { label: "Roles & access", href: "/admin/roles", icon: ShieldCheck, roles: ["ADMIN"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["ADMIN"] },
];

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const items = navigation.filter((item) => item.roles.some((role) => user.roles.includes(role)));

  async function signOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950 dark:bg-[#070b14] dark:text-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-[#0b1220] ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${collapsed ? "lg:w-[84px]" : ""}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden font-bold tracking-tight">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950"><Zap className="h-4 w-4 fill-current" /></span>
            {!collapsed && <span className="text-lg">Volt<span className="text-emerald-500">BD</span></span>}
          </Link>
          <button type="button" className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {!collapsed && <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>}
          <nav className="space-y-1">
            {items.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} title={collapsed ? item.label : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}><Icon className="h-[18px] w-[18px] shrink-0" />{!collapsed && <span>{item.label}</span>}</Link>;
            })}
          </nav>
        </div>
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          {!collapsed && <div className="mb-2 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-900"><p className="truncate text-sm font-semibold">{user.name}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div>}
          <button type="button" onClick={signOut} title={collapsed ? "Sign out" : undefined} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"><LogOut className="h-[18px] w-[18px]" />{!collapsed && "Sign out"}</button>
        </div>
        <button type="button" onClick={() => setCollapsed((value) => !value)} className="absolute -right-3 top-[72px] hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:flex" aria-label="Toggle sidebar"><ChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} /></button>
      </aside>
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <div className={`transition-[padding] duration-200 ${collapsed ? "lg:pl-[84px]" : "lg:pl-[270px]"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-[#070b14]/90 sm:px-6">
          <div className="flex items-center gap-3"><button type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu className="h-5 w-5" /></button><div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex"><BarChart3 className="h-4 w-4" /> Operations workspace</div></div>
          <div className="flex items-center gap-3"><Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-950 dark:hover:text-white">View site</Link><div className="h-8 w-8 rounded-full bg-emerald-100 text-center text-sm font-bold leading-8 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">{user.name.charAt(0).toUpperCase()}</div></div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
