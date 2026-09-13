import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-[3px] border-[#1A1A1A] text-sm font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#E3262E] text-white shadow-[4px_4px_0_0_#1A1A1A] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#1A1A1A]",
        secondary: "bg-[#FFF4A3] text-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#1A1A1A]",
        outline: "bg-white text-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] hover:bg-[#F9F7F5] hover:-translate-y-0.5",
        ghost: "border-transparent shadow-none hover:bg-[#F9F7F5] hover:border-[#1A1A1A]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 py-3.5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
