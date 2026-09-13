"use client";

/**
 * SmoothScrollProvider — Lenis + GSAP ScrollTrigger sync.
 * Dynamically imported (ssr:false) so heavy animation libs never
 * block first paint. Full cleanup: lenis.destroy() + ticker remove.
 */
import { useEffect, type ReactNode } from "react";
import type Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let instance: Lenis | null = null;
    let rafId = 0;
    let cancelled = false;
    let removeTick: (() => void) | null = null;

    (async () => {
      const [{ createLenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("@/lib/lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;

      const lenis = createLenis();
      instance = lenis;
      // Frame-by-frame sync: Lenis drives, ScrollTrigger observes.
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTick = () => gsap.ticker.remove(tick);

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      try {
        removeTick?.();
      } catch {
        /* noop */
      }
      try {
        instance?.destroy();
      } catch {
        /* noop */
      }
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
