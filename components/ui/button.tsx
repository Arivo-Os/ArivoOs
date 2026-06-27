import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#22C55E] text-black shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:-translate-y-px hover:shadow-[0_0_36px_rgba(34,197,94,0.45)]",
        ghost:
          "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
        outline:
          "border border-white/10 bg-transparent text-white hover:bg-white/5",
        dark: "bg-white text-black hover:bg-white/90 hover:-translate-y-px h-9 px-[18px] text-sm",
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
