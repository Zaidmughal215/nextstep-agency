import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-[3px] border-[#1A1A1A] bg-white px-4 py-3 text-sm font-medium placeholder:text-[#1A1A1A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E] disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
