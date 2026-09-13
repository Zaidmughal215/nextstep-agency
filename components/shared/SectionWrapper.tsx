import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent section shell — semantic <section> with labelled heading slot. */
export default function SectionWrapper({
  children,
  className,
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </section>
  );
}
