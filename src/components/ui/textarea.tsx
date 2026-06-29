import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full resize-y rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-subtle transition-colors focus-visible:border-brand-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
