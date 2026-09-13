import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border-[3px] border-[#1A1A1A] bg-white px-4 py-2 text-sm font-medium placeholder:text-[#1A1A1A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E] disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
