"use client";

/** Scroll-scrubbed red arrow — stroke-dasharray / dashoffset drawing. */
import { useEffect, useRef } from "react";

export default function ArrowDraw({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("@/lib/gsap");
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      ctx = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: svg, start: "top 90%", end: "bottom 45%", scrub: 1 },
        });
      });
    })();
    return () => {
      try {
        ctx?.revert();
      } catch {
        /* noop */
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 220 60"
      fill="none"
      role="img"
      aria-label="Hand-drawn red arrow pointing forward"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        ref={pathRef}
        d="M6 32 C 60 8, 130 8, 185 30 M170 18 L188 31 L171 45"
        stroke="#E3262E"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
