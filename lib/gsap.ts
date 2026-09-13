"use client";

/**
 * Central GSAP setup — registers ScrollTrigger once, client-only.
 * Import from client components; never from server components.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined" && !(gsap as unknown as { __nsRegistered?: boolean }).__nsRegistered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  (gsap as unknown as { __nsRegistered?: boolean }).__nsRegistered = true;
}

export { gsap, ScrollTrigger, useGSAP };

/** Standard reveal defaults — y:60 → 0, power3.out (per spec). */
export const REVEAL_DEFAULTS = {
  y: 60,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
} as const;
