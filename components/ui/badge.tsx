import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "accent" | "info";
}

const variants = {
  default: "bg-app-surface text-app-muted border-app-border",
  success: "bg-app-success/10 text-app-success border-app-success/25",
  warning: "bg-app-warning/10 text-app-warning border-app-warning/25",
  danger: "bg-app-danger/10 text-app-danger border-app-danger/25",
  accent: "bg-app-accent-muted text-app-accent border-app-accent/25",
  info: "bg-app-info/10 text-app-info border-app-info/25",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
