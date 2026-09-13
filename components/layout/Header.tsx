"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Header — semantic <header><nav>, editorial border.
 * Tag-only semantics; classes are visual (unchanged by SEO passes).
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#1A1A1A] bg-[#F9F7F5]/95 backdrop-blur">
      <HeaderNav />
    </header>
  );
}

function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Primary navigation" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link href="/" title="NextStep — Home | Digital Studio Faisalabad" className="flex items-center gap-2 font-heading text-xl font-black tracking-tight">
        <span aria-hidden="true" className="grid size-9 place-items-center overflow-hidden rounded-full border-[3px] border-[#1A1A1A] bg-[#1A1A1A] shadow-[3px_3px_0_0_#1A1A1A]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/brand/nextstep-icon.webp`}
            alt="NextStep logo"
            width={36}
            height={36}
            priority
            className="size-full object-cover"
          />
        </span>
        NextStep
        <span className="hidden rounded-full border-2 border-[#1A1A1A] bg-[#FFF4A3] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest sm:inline">FSD·PK</span>
      </Link>

      <ul className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((l) => {
          const base = (l.href as string).replace(/\/$/, "");
          const active = pathname === l.href || pathname === base || pathname?.startsWith(`${base}/`);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                title={l.title}
                aria-current={active ? "page" : undefined}
                className={cn("link-underline text-sm font-bold uppercase tracking-wide", active && "text-[#E3262E] after:w-full")}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/contact/"
            title="Contact NextStep — Get a free quote in 24 hours"
            className="inline-flex items-center gap-1 rounded-xl border-[3px] border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2 text-sm font-bold uppercase text-white shadow-[4px_4px_0_0_#E3262E] transition-transform hover:-translate-y-0.5"
          >
            Start <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-xl border-[3px] border-[#1A1A1A] bg-white shadow-[3px_3px_0_0_#1A1A1A] md:hidden"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-[72px] rounded-xl border-[3px] border-[#1A1A1A] bg-white p-4 shadow-[6px_6px_0_0_#1A1A1A] md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  title={l.title}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-heading text-lg font-bold hover:bg-[#FFF4A3]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact/"
                title="Contact NextStep — Get a free quote"
                onClick={() => setOpen(false)}
                className="block rounded-xl border-[3px] border-[#1A1A1A] bg-[#E3262E] px-3 py-3 text-center font-bold uppercase text-white"
              >
                Start a Project
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
