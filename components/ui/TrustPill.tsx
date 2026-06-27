import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustPillProps {
  icon: LucideIcon;
  label: string;
  variant?: "dark" | "light";
  className?: string;
}

export function TrustPill({ icon: Icon, label, variant = "light", className }: TrustPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        variant === "dark" ? "text-white/60" : "text-ink-muted",
        className
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          variant === "dark"
            ? "bg-white/[0.08] text-brand-green"
            : "bg-brand-green/10 text-brand-green"
        )}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}

interface IconBadgeProps {
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: "dark" | "light" | "green";
  className?: string;
}

export function IconBadge({ icon: Icon, children, variant = "dark", className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-sm",
        variant === "dark" && "border border-white/10 bg-white/5 text-white/80",
        variant === "light" && "border border-ink/10 bg-white text-ink-muted",
        variant === "green" && "border border-brand-green/20 bg-brand-green/10 text-brand-green",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
      {children}
    </span>
  );
}
