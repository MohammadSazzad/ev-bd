"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, LayoutDashboard, LogOut, Menu, X, Zap } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data/homepage";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { UserDTO } from "@/types/auth";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [user, setUser] = useState<UserDTO | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (mounted) setUser(response?.data?.user ?? null);
      })
      .catch(() => {
        if (mounted) setUser(null);
      });
    return () => {
      mounted = false;
    };
  }, [pathname]);

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/vehicles") {
      return pathname.startsWith("/vehicles") || pathname.startsWith("/catalogue");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-slate-200 bg-white/85 backdrop-blur-md transition-colors duration-150 dark:border-slate-800/80 dark:bg-[#070b14]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-[#00DF8F] group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-[#00DF8F] text-emerald-600 dark:text-[#00DF8F]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Volt<span className="text-emerald-600 dark:text-[#00DF8F]">BD</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-emerald-600 dark:text-[#00DF8F] font-semibold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Theme Switcher / Auth */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button type="button" onClick={() => setAccountMenuOpen((open) => !open)} aria-expanded={accountMenuOpen} aria-label="Open account menu" className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${accountMenuOpen ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" : "border-slate-200 bg-white text-slate-500 hover:border-emerald-400 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                <CircleUserRound className="h-[19px] w-[19px]" />
              </button>
              {accountMenuOpen && <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-[#0e1628] dark:shadow-black/30"><Link href="/dashboard" onClick={() => setAccountMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"><LayoutDashboard className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Dashboard</Link><button type="button" onClick={handleSignOut} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"><LogOut className="h-4 w-4" /> Logout</button></div>}
            </div>
          ) : <Link href="/login" className="inline-flex items-center justify-center rounded-lg bg-[#00DF8F] px-4 py-1.5 text-sm font-semibold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-95 shadow-sm shadow-emerald-500/20">Login</Link>}
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          {user && <button type="button" onClick={() => setAccountMenuOpen((open) => !open)} aria-expanded={accountMenuOpen} aria-label="Open account menu" className={`flex h-9 w-9 items-center justify-center rounded-full border ${accountMenuOpen ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}><CircleUserRound className="h-[19px] w-[19px]" /></button>}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {user && accountMenuOpen && (
        <div className="absolute right-4 top-[4.5rem] z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.16)] md:hidden dark:border-slate-700 dark:bg-[#0e1628] dark:shadow-black/30">
          <Link href="/dashboard" onClick={() => setAccountMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
            <LayoutDashboard className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            Dashboard
          </Link>
          <button type="button" onClick={handleSignOut} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] px-4 pt-2 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    active
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-[#00DF8F] font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
            <div className="px-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Theme
              </p>
              <ThemeToggle showLabels />
            </div>
            {!user && <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center rounded-lg bg-[#00DF8F] px-4 py-2.5 text-base font-semibold text-[#070b14] shadow-sm hover:bg-[#00DF8F]/90">Login</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
