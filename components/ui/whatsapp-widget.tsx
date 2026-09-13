"use client";

/**
 * Floating WhatsApp widget — bottom-right trigger + contact popup.
 * Retro-editorial styling, framer-motion micro-interactions.
 * - Desktop: spring cursor-follow button w/ float bob + pulse ring.
 * - Touch / reduced-motion: animations off, native behavior kept.
 * - SSR-safe: closed state prerenders; no `window` at module scope.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WA_MESSAGE = "Hi NextStep! I found your website and would like to discuss a project.";
const waLink = (digits: string) => `https://wa.me/${digits}?text=${encodeURIComponent(WA_MESSAGE)}`;

const CONTACTS = [
  {
    initials: "AR",
    name: "Abdul Rahman",
    role: "Dealer · Client Relations",
    href: waLink("923284738123"),
    avatarClass: "bg-[#FFF4A3] text-[#1A1A1A]",
    label: "Chat with Abdul Rahman on WhatsApp",
  },
  {
    initials: "ZM",
    name: "Zaid Mughal",
    role: "Developer · Design",
    href: waLink("923394807064"),
    avatarClass: "bg-[#E3262E] text-white",
    label: "Chat with Zaid Mughal on WhatsApp",
  },
] as const;

/** Official WhatsApp glyph (Font Awesome Free, CC BY 4.0), white fill. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" width={28} height={28} fill="white" aria-hidden="true" className={className}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Assume reduced motion until proven otherwise (no animation flash).
  const [reducedMotion, setReducedMotion] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Reduced-motion preference (SSR-safe: runs in effect only).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Escape closes; click-outside closes.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isOpen]);

  const floatActive = !reducedMotion && !isHovered;

  return (
    <div ref={wrapRef}>
      {/* Trigger cluster — fixed bottom-right, below SmoothCursor (z-100). */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Pulse ring */}
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-[#E3262E]"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        {/* Idle float bob (paused on hover) */}
        <motion.div
          animate={floatActive ? { y: [0, -6, 0] } : { y: 0 }}
          transition={
            floatActive
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        >
          <motion.button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={isOpen ? "Close WhatsApp contact options" : "Open WhatsApp contact options"}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            whileHover={reducedMotion ? undefined : { scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className={cn(
              "relative grid size-14 place-items-center rounded-full",
              "bg-[#E3262E] text-white",
              "border-2 border-white",
              "shadow-[0_8px_24px_rgba(227,38,46,0.35)]",
              "transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(227,38,46,0.45)]",
              "md:size-[60px]",
              // Charcoal focus ring overrides the global red one (higher specificity, no !important).
              "[&:focus-visible]:outline-2 [&:focus-visible]:outline-[#1A1A1A] [&:focus-visible]:outline-offset-2"
            )}
          >
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid place-items-center"
            >
              {isOpen ? (
                <X className="size-7" aria-hidden="true" strokeWidth={2.5} />
              ) : (
                <WhatsAppIcon />
              )}
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Popup panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-widget-title"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }
            }
            className={cn(
              "fixed bottom-[96px] right-6 z-40",
              "w-[280px] min-[400px]:w-[320px]",
              "max-h-[70vh] overflow-y-auto",
              "rounded-2xl border-[1.5px] border-[#1A1A1A] bg-white p-4",
              "shadow-[0_20px_48px_rgba(26,26,26,0.15)]"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="wa-widget-title" className="text-[13px] font-bold tracking-tight text-[#1A1A1A]">
                  Chat with us
                </h2>
                <p className="mt-0.5 text-[11px] font-medium text-[#1A1A1A]/55">
                  Usually replies within minutes
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat options"
                className="grid size-6 shrink-0 place-items-center rounded-full text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A]/10"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div aria-hidden="true" className="my-3 border-t border-[#1A1A1A]/[0.12]" />

            {/* Contact cards */}
            <ul className="space-y-2.5">
              {CONTACTS.map((c) => (
                <li key={c.name}>
                  <motion.a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={c.label}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="group flex items-center gap-3 rounded-xl border-2 border-transparent p-2.5 transition-colors hover:border-[#1A1A1A] hover:bg-[#F9F7F5]"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full border-2 border-[#1A1A1A]",
                        "font-heading text-sm font-black",
                        c.avatarClass
                      )}
                    >
                      {c.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[#1A1A1A]">
                        {c.name}
                      </span>
                      <span className="block text-[11px] font-medium text-[#1A1A1A]/60">
                        {c.role}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#1A1A1A] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <p className="mt-3 border-t border-dashed border-[#1A1A1A]/10 pt-2.5 text-center text-[10px] font-semibold text-[#1A1A1A]/45">
              NextStep · Digital Agency
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
