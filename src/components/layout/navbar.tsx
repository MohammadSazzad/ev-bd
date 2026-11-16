"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data/homepage";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/vehicles") {
      return pathname.startsWith("/vehicles") || pathname.startsWith("/catalogue");
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070b14]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00DF8F] group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-[#00DF8F] text-[#00DF8F]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Volt<span className="text-[#00DF8F]">BD</span>
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
                className={`text-sm font-medium transition-colors hover:text-white ${
                  active ? "text-[#00DF8F]" : "text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center justify-center rounded-lg bg-[#00DF8F] px-4 py-1.5 text-sm font-semibold text-[#070b14] transition-all hover:bg-[#00DF8F]/90 active:scale-95 shadow-sm shadow-emerald-500/20"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070b14] px-4 pt-2 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    active
                      ? "bg-emerald-950/40 text-[#00DF8F]"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/api/auth/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-[#00DF8F] px-4 py-2.5 text-base font-semibold text-[#070b14] hover:bg-[#00DF8F]/90 shadow-sm"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
