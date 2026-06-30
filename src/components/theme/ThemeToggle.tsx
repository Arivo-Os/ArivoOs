"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/features/theme/theme-context";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border bg-app-card text-app-muted transition-colors hover:border-app-border-strong hover:bg-app-card-hover hover:text-app-text focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
