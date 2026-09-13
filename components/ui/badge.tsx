import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border-2 border-[#1A1A1A] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-white text-[#1A1A1A]",
        red: "bg-[#E3262E] text-white",
        yellow: "bg-[#FFF4A3] text-[#1A1A1A]",
        dark: "bg-[#1A1A1A] text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
