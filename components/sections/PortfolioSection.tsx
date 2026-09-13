"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import { PROJECTS, type ProjectCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Software", "Website", "Branding"];

/** Portfolio grid — 1col mobile / 2col tablet / 3col desktop, abstract gradients. */
export default function PortfolioSection({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = PROJECTS.filter((p) => filter === "All" || p.category === filter).slice(0, limit ?? 6);

  return (
    <SectionWrapper ariaLabel="NextStep portfolio preview" className="section-pad">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>■ Selected work</Badge>
            <h2 className="mt-4 font-heading text-3xl font-black sm:text-4xl">Proof, not promises — 6 builds</h2>
            <p className="mt-2 max-w-xl font-medium text-[#1A1A1A]/70">
              Abstract previews in brand palette. Every project shipped fixed-price with 90-day support.
            </p>
          </div>
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "rounded-full border-2 border-[#1A1A1A] px-4 py-1.5 text-xs font-black uppercase tracking-wide transition-all",
                  filter === f ? "bg-[#1A1A1A] text-white shadow-[3px_3px_0_0_#E3262E]" : "bg-white hover:bg-[#FFF4A3]"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.li
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <article className="group h-full overflow-hidden rounded-xl border-[3px] border-[#1A1A1A] bg-white shadow-[6px_6px_0_0_#1A1A1A] transition-transform duration-300 hover:-translate-y-1.5">
                <div className={`relative h-44 bg-gradient-to-br ${p.gradient}`} role="img" aria-label={`Abstract gradient placeholder for ${p.title} — NextStep brand palette`}>
                  <span className="absolute left-3 top-3 rounded-full border-2 border-[#1A1A1A] bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">{p.category}</span>
                  <span aria-hidden="true" className="absolute bottom-3 right-4 font-heading text-5xl font-black text-white/30">✳</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#1A1A1A]/65">{p.blurb}</p>
                  <p className="mt-3 inline-block rounded-lg border-2 border-[#1A1A1A] bg-[#FFF4A3] px-2.5 py-1 text-xs font-black">{p.result}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {limit && (
        <Reveal className="mt-8 text-center">
          <Link
            href="/portfolio/"
            title="View full NextStep portfolio — 6 projects"
            className="inline-flex items-center gap-1 rounded-xl border-[3px] border-[#1A1A1A] bg-white px-6 py-3 text-sm font-black uppercase shadow-[4px_4px_0_0_#1A1A1A] transition-transform hover:-translate-y-0.5"
          >
            View all work <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      )}
    </SectionWrapper>
  );
}
