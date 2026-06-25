import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arivo-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-arivo-primary text-white shadow-[0_4px_16px_rgba(26,122,82,0.28)] hover:bg-[#156644] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(26,122,82,0.35)]",
        ghost:
          "border border-black/12 bg-arivo-surface text-arivo-text hover:bg-[#e8f0ec] hover:border-black/18",
        outline:
          "border border-black/12 bg-transparent text-arivo-text hover:bg-arivo-surface",
        dark: "bg-arivo-text text-white hover:bg-[#0a2e23] hover:-translate-y-px h-9 px-[18px] text-sm",
      },
      size: {
        default: "h-12 px-7 text-[15px]",
        sm: "h-9 px-[18px] text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
