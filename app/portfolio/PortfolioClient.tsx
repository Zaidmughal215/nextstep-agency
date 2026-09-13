"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import ContactCTA from "@/components/sections/ContactCTA";
import { PROJECTS, type ProjectCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Software", "Website", "Branding"];

/**
 * Portfolio page — client filter islands, but h1 + all copy SSR-friendly
 * (this component is client for interactivity; text still in initial HTML
 * because static export prerenders it — verified in QA via view-source).
 */
export default function PortfolioClient() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <div className="border-b-[3px] border-[#1A1A1A] bg-[#1A1A1A] text-white">
        <SectionWrapper className="py-14 lg:py-20" ariaLabel="Portfolio introduction">
          <Reveal>
            <Badge variant="yellow">■ 6 builds · PK SMEs</Badge>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
              Our Work — Websites, Software & Brands by NextStep
            </h1>
            <p className="mt-4 max-w-2xl font-medium text-white/75">
              <strong>NextStep</strong> portfolio: <strong>custom software, Next.js websites and brand identities</strong> for
              businesses in <strong>Faisalabad, Lahore and across Pakistan</strong>. Abstract previews in brand palette —
              every build shipped fixed-price with 90-day support and measurable results.
            </p>
          </Reveal>
        </SectionWrapper>
      </div>

      <SectionWrapper ariaLabel="Filterable project grid" className="section-pad">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border-[3px] border-[#1A1A1A] px-5 py-2 text-xs font-black uppercase tracking-wide transition-all",
                filter === f ? "bg-[#E3262E] text-white shadow-[3px_3px_0_0_#1A1A1A]" : "bg-white hover:bg-[#FFF4A3]"
              )}
            >
              {f}
            </button>
          ))}
        </div>

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
                <article className="h-full overflow-hidden rounded-xl border-[3px] border-[#1A1A1A] bg-white shadow-[6px_6px_0_0_#1A1A1A] transition-transform duration-300 hover:-translate-y-1.5">
                  <div className={`relative h-48 bg-gradient-to-br ${p.gradient}`} role="img" aria-label={`Abstract gradient placeholder for ${p.title} — NextStep ${p.category} project`}>
                    <span className="absolute left-3 top-3 rounded-full border-2 border-[#1A1A1A] bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">{p.category}</span>
                    <span aria-hidden="true" className="absolute bottom-3 right-4 font-heading text-6xl font-black text-white/30">✳</span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading text-lg font-bold leading-snug">{p.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#1A1A1A]/65">{p.blurb}</p>
                    <p className="mt-3 inline-block rounded-lg border-2 border-[#1A1A1A] bg-[#FFF4A3] px-2.5 py-1 text-xs font-black">{p.result}</p>
                    <p className="mt-3 text-xs font-semibold text-[#1A1A1A]/50">By NextStep · Faisalabad · Fixed price · 90-day support</p>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-8 rounded-xl border-2 border-dashed border-[#1A1A1A]/40 bg-white p-4 text-center text-sm font-semibold text-[#1A1A1A]/70">
          Want results like these? Call <a className="font-black text-[#E3262E]" href="tel:+923284738123">+92 328 4738123</a> — free quote in 24 hours.
        </p>
      </SectionWrapper>

      <ContactCTA />
    </>
  );
}
