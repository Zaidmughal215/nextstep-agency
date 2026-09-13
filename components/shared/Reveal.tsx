"use client";

/** Scroll reveal — y:60 → 0 + fade, power3.out. SSR-safe (content visible without JS). */
import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "span";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    })();
    return () => {
      try {
        ctx?.revert();
      } catch {
        /* noop */
      }
    };
  }, [delay]);

  // @ts-expect-error polymorphic tag
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
