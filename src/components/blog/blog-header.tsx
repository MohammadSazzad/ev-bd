"use client";

import { BLOG_CATEGORIES, BlogCategory } from "@/lib/data/blog";

interface BlogHeaderProps {
  activeCategory: BlogCategory;
  onSelectCategory: (cat: BlogCategory) => void;
}

export function BlogHeader({
  activeCategory,
  onSelectCategory,
}: BlogHeaderProps) {
  return (
    <div className="mb-10">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          EV News & Guides
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Keep up with electric vehicle infrastructure developments, policy updates, and expert battery maintenance tips.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        {BLOG_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                isActive
                  ? "bg-[#00DF8F] text-[#070b14] ring-2 ring-emerald-500/30"
                  : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
