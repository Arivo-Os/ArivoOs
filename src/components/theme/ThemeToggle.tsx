"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/features/theme/theme-context";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200",
          isDark
            ? "border-app-border bg-app-card text-app-text hover:border-app-border-strong"
            : "border-ink/10 bg-white text-ink hover:border-brand-green/30",
          className
        )}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200",
        isDark
          ? "border-app-border bg-app-card text-app-muted hover:border-app-border-strong hover:text-app-text"
          : "border-ink/10 bg-white text-ink-muted hover:border-brand-green/30 hover:text-ink",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
