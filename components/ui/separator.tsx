import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn("border-t-[3px] border-[#1A1A1A]", className)} {...props} />
  )
);
Separator.displayName = "Separator";

export { Separator };
