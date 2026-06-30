import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "alt" | "gradient" | "dark";
  containerSize?: "default" | "small" | "large" | "none";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", containerSize = "default", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-16 lg:py-24 relative overflow-hidden",
          {
            "bg-marketing-bg text-marketing-text": variant === "default",
            "bg-marketing-surface border-y border-marketing-border": variant === "alt",
            "bg-gradient-to-b from-marketing-bg via-marketing-surface to-marketing-bg": variant === "gradient",
            "bg-[#08111A] text-white": variant === "dark",
          },
          className
        )}
        {...props}
      >
        {containerSize !== "none" ? (
          <div
            className={cn("mx-auto px-4", {
              "max-w-6xl": containerSize === "default",
              "max-w-4xl": containerSize === "small",
              "max-w-7xl": containerSize === "large",
            })}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";
