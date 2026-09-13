import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star, Zap, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/shared/AnimatedText";
import ArrowDraw from "@/components/shared/ArrowDraw";
import Reveal from "@/components/shared/Reveal";

/**
 * Hero — owns the page's single <h1>. Punchy headline + concrete proof.
 * SSR text (no client wrapper hides content from crawlers).
 */
export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b-[3px] border-[#1A1A1A] bg-[#F9F7F5]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(#1A1A1A 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(to bottom, black, transparent 70%)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20">
        <div>
          <Reveal>
            <Badge variant="yellow" className="shadow-[3px_3px_0_0_#1A1A1A]">
              <Star className="size-3" aria-hidden="true" /> Est. Faisalabad — SMEs · PK + US
            </Badge>
          </Reveal>
          <AnimatedText
            as="h1"
            className="mt-5 block font-heading text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl"
            text="Websites That Book Clients. Software That Ships."
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-[#1A1A1A]/80 sm:text-lg">
              <strong>NextStep</strong> is a Faisalabad digital studio for small businesses —{" "}
              <strong>Next.js websites, custom software, and branding</strong>. 14-day delivery, 90-day support, zero bloat.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/portfolio/" title="See NextStep work — 6 case studies">
                <Button size="lg">See Our Work <ArrowRight aria-hidden="true" /></Button>
              </Link>
              <Link href="/contact/" title="Start a project with NextStep — free quote">
                <Button size="lg" variant="secondary">Start a Project <ArrowUpRight aria-hidden="true" /></Button>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t-[3px] border-[#1A1A1A] pt-5">
              <div className="flex items-center gap-2 text-sm font-bold"><Zap className="size-4 text-[#E3262E]" aria-hidden="true" /><dt className="sr-only">Projects delivered</dt><dd>48+ projects shipped</dd></div>
              <div className="flex items-center gap-2 text-sm font-bold"><Star className="size-4 text-[#E3262E]" aria-hidden="true" /><dt className="sr-only">Average rating</dt><dd>4.9★ client average</dd></div>
              <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="size-4 text-[#E3262E]" aria-hidden="true" /><dt className="sr-only">Performance</dt><dd>&lt;1s LCP · 90-day support</dd></div>
            </dl>
          </Reveal>
          <ArrowDraw className="mt-6 h-14 w-64" />
        </div>

        {/* Editorial framed proof card — decorative, lazy below hero text on mobile */}
        <Reveal delay={0.15} className="relative">
          <div className="editorial-frame overflow-hidden">
            <div className="flex items-center justify-between border-b-[3px] border-[#1A1A1A] bg-[#FFF4A3] px-5 py-3">
              <p className="text-xs font-black uppercase tracking-widest">● ● ● &nbsp;This week at NextStep</p>
              <p className="text-xs font-black uppercase">FSD</p>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              {[
                { k: "Boutique Store", v: "0.8s LCP → 3× WhatsApp leads", c: "bg-[#E3262E] text-white" },
                { k: "InventoryPro", v: "+38% stock accuracy in 60 days", c: "bg-[#1A1A1A] text-white" },
                { k: "Chai Brand Kit", v: "Full identity in 7 days flat", c: "bg-[#FFF4A3] text-[#1A1A1A]" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-3 rounded-xl border-2 border-[#1A1A1A] bg-[#F9F7F5] px-4 py-3">
                  <div>
                    <p className="font-heading text-sm font-bold">{r.k}</p>
                    <p className="text-xs font-semibold text-[#1A1A1A]/70">{r.v}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border-2 border-[#1A1A1A] px-2.5 py-1 text-[10px] font-black uppercase ${r.c}`}>Live</span>
                </div>
              ))}
              <p className="border-t-2 border-dashed border-[#1A1A1A]/30 pt-4 text-xs font-semibold text-[#1A1A1A]/60">
                Concrete proof, not promises. Every NextStep build ships with a launch checklist + 90-day maintenance.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -right-3 -top-3 rotate-6 rounded-xl border-[3px] border-[#1A1A1A] bg-[#E3262E] px-4 py-2 font-heading text-sm font-black uppercase text-white shadow-[4px_4px_0_0_#1A1A1A]">
            14-day MVP
          </div>
        </Reveal>
      </div>
    </div>
  );
}
