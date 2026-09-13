import Reveal from "@/components/shared/Reveal";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/shared/SectionWrapper";

/** FAQ block — SSR <details>, mirrors FAQPage JSON-LD. */
export default function FaqBlock({ faqs, heading = "Questions SMEs ask us" }: { faqs: { q: string; a: string }[]; heading?: string }) {
  // 3 items fill a 3-col row; 4+ use 2-col. Visual only — no copy/DOM-order change.
  const gridClass = faqs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className="border-t-[3px] border-[#1A1A1A] bg-white">
      <SectionWrapper ariaLabel="Frequently asked questions" className="section-pad">
        <Reveal>
          <Badge variant="yellow">? FAQ</Badge>
          <h2 className="mt-4 font-heading text-3xl font-black sm:text-4xl">{heading}</h2>
        </Reveal>
        <div className={`mt-8 grid gap-4 ${gridClass}`}>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="editorial-frame-sm group p-5" name="faq">
                <summary className="cursor-pointer list-none font-heading text-base font-bold [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 inline-grid size-7 place-items-center rounded-lg border-2 border-[#1A1A1A] bg-[#FFF4A3] text-sm group-open:bg-[#E3262E] group-open:text-white" aria-hidden="true">+</span>
                  {f.q}
                </summary>
                <p className="mt-3 pl-9 text-sm font-medium leading-relaxed text-[#1A1A1A]/75">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
