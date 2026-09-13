/**
 * Lenis factory — no React inside, so it stays tree-shakeable
 * and dynamically importable (heavy animation script per spec).
 */
import Lenis from "lenis";

export type LenisOptions = ConstructorParameters<typeof Lenis>[0];

const EASE = (t: number) => Math.min(1, 1.003 - Math.pow(2, -10 * t));

export function createLenis(options?: LenisOptions): Lenis {
  return new Lenis({
    duration: 1.15,
    easing: EASE,
    smoothWheel: true,
    touchMultiplier: 1.6,
    ...options,
  });
}

export { EASE };
