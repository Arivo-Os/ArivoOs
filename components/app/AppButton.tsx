import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AppButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type AppButtonSize = "sm" | "md" | "lg";

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
}

const variants: Record<AppButtonVariant, string> = {
  primary:
    "bg-app-accent text-white shadow-app-sm hover:brightness-110 active:scale-[0.98] focus-visible:ring-app-accent/40",
  secondary:
    "border border-app-border bg-app-surface text-app-text hover:border-app-border-strong hover:bg-app-card active:scale-[0.98]",
  ghost: "text-app-muted hover:bg-app-card/60 hover:text-app-text active:scale-[0.98]",
  danger:
    "border border-app-danger/30 bg-app-danger/10 text-app-danger hover:bg-app-danger/15 active:scale-[0.98]",
};

const sizes: Record<AppButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
AppButton.displayName = "AppButton";
