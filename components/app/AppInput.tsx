import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-app-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border bg-app-bg px-3 text-sm text-app-text",
            "placeholder:text-app-muted/70 transition-all duration-200",
            "focus:border-app-accent/50 focus:outline-none focus:ring-2 focus:ring-app-accent/20",
            error ? "border-app-danger/50" : "border-app-border hover:border-app-border-strong",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-app-muted">{hint}</p>}
        {error && <p className="text-xs text-app-danger">{error}</p>}
      </div>
    );
  }
);
AppInput.displayName = "AppInput";
