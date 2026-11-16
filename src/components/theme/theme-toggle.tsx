"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, Theme } from "./theme-provider";

interface ThemeToggleProps {
  showLabels?: boolean;
}

export function ThemeToggle({ showLabels = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  if (showLabels) {
    return (
      <div className="flex w-full items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-1">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#0e1628] text-emerald-600 dark:text-[#00DF8F] shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 p-1 transition-colors"
      role="group"
      aria-label="Theme selection"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            title={`Switch to ${opt.label} theme`}
            aria-label={`Switch to ${opt.label} theme`}
            aria-pressed={isSelected}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
              isSelected
                ? "bg-white dark:bg-[#0e1628] text-emerald-600 dark:text-[#00DF8F] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700/60"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
