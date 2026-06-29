"use client";

import { Home, Plane, ShoppingBag, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_PROMPTS = [
  { label: "Afford a purchase", icon: ShoppingBag, message: "Can I afford a purchase right now?" },
  { label: "Home loan check", icon: Home, message: "Can I take a home loan based on my profile?" },
  { label: "Invest now?", icon: TrendingUp, message: "Should I invest ₹50,000 right now?" },
  { label: "Plan a trip", icon: Plane, message: "Can I afford a trip this year?" },
  { label: "Savings goal", icon: Target, message: "Am I on track with my savings goals?" },
];

interface VerisQuickPromptsProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export function VerisQuickPrompts({ onSelect, disabled, className }: VerisQuickPromptsProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {DEFAULT_PROMPTS.map((prompt) => {
        const Icon = prompt.icon;
        return (
          <button
            key={prompt.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt.message)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-app-border bg-app-bg px-3 py-1.5 text-xs font-medium text-app-muted transition-colors hover:border-app-accent/40 hover:text-app-accent disabled:opacity-50"
          >
            <Icon className="h-3.5 w-3.5" />
            {prompt.label}
          </button>
        );
      })}
    </div>
  );
}
