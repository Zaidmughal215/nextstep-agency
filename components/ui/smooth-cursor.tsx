"use client";

import { useEffect, useRef, useState, type FC } from "react";

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
}

/** Built-in fallback arrow — same shape, scale handled by wrapper. */
const DefaultCursorSVG: FC<{ isLocked: boolean }> = ({ isLocked }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 50 54"
    fill="none"
    aria-hidden="true"
    style={{
      display: "block",
      transform: isLocked ? "scale(1.5)" : "scale(0.5)",
      transformOrigin: "center",
      transition: "transform 180ms ease",
      willChange: "transform",
    }}
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_91_7928" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_91_7928" result="shape" />
      </filter>
    </defs>
  </svg>
);

const DESKTOP_QUERY = "(any-hover: hover) and (any-pointer: fine)";
const LERP = 0.15;
const MAGNET_RADIUS = 100; // px — spec

export function SmoothCursor({ cursor }: SmoothCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mutable refs driven by RAF loop — avoids React re-renders per frame.
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const lockedRef = useRef(false);

  // 1) Device gate — desktop only.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => {
      setIsEnabled(mq.matches);
      if (!mq.matches) setIsVisible(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 2) RAF lerp + magnetic header + mix-blend feedback + full cleanup.
  useEffect(() => {
    if (!isEnabled) return;
    const el = dotRef.current;
    if (!el) return;

    // Hide native cursor while custom is active.
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    // ——— magnetic helper: spec ———
    // Targets every <a> and <button> inside <header>. If mouse is within MAGNET_RADIUS
    // of the element's center, attract toward center via weighted average.
    function resolveMagnetic(mx: number, my: number) {
      const candidates = document.querySelectorAll<HTMLElement>("header a, header button");
      let closest: HTMLElement | null = null;
      let closestCx = 0;
      let closestCy = 0;
      let closestDist = Infinity;

      for (const node of candidates) {
        const r = node.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        if (dist < MAGNET_RADIUS && dist < closestDist) {
          closestDist = dist;
          closest = node;
          closestCx = cx;
          closestCy = cy;
        }
      }

      if (!closest) return { tx: mx, ty: my, hover: false };

      // Weighted average: closer → stronger pull. 0 at edge → 0.55–0.6 at center.
      const pull = (1 - closestDist / MAGNET_RADIUS) * 0.6;
      const tx = mx * (1 - pull) + closestCx * pull;
      const ty = my * (1 - pull) + closestCy * pull;

      // "Locks" (visual feedback) when the mouse is truly over the element.
      const rr = closest.getBoundingClientRect();
      const hover = mx >= rr.left && mx <= rr.right && my >= rr.top && my <= rr.bottom;

      return { tx, ty, hover };
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      const { tx, ty, hover } = resolveMagnetic(e.clientX, e.clientY);
      target.current.x = tx;
      target.current.y = ty;

      if (hover !== lockedRef.current) {
        lockedRef.current = hover;
        setIsLocked(hover);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // ——— RAF loop with lerp 0.15 ———
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;

      if (el) {
        // left/top driven by lerp; transform handles centering offset only.
        el.style.left = `${current.current.x}px`;
        el.style.top = `${current.current.y}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    // Seed current at viewport center until first mousemove avoids snap.
    current.current.x = window.innerWidth / 2;
    current.current.y = window.innerHeight / 2;
    target.current.x = current.current.x;
    target.current.y = current.current.y;

    // Register listeners — all removed in cleanup.
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(tick);

    // ——— full cleanup ———
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.style.cursor = prevCursor || "auto";
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  const inner = cursor ? (
    // If caller supplies custom node, wrap it scaled via css scale (no motion).
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        transform: isLocked ? "scale(1.5)" : "scale(1)",
        transition: "transform 180ms ease",
        willChange: "transform",
      }}
    >
      {cursor}
    </span>
  ) : (
    <DefaultCursorSVG isLocked={isLocked} />
  );

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        // Spec: will-change transform, top, left → hardware acceleration hint.
        willChange: "transform, top, left",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        pointerEvents: "none",
        // Visual feedback: difference blend when locked for contrast on any bg.
        mixBlendMode: (isLocked ? "difference" : "normal") as React.CSSProperties["mixBlendMode"],
        opacity: isVisible ? 1 : 0,
        transition: "opacity 150ms ease, mix-blend-mode 180ms ease",
      }}
    >
      {inner}
    </div>
  );
}
