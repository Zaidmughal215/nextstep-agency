import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import FounderAvatar from "@/components/shared/FounderAvatar";

/** Founders tease — h2 only (page h1 lives in Hero). */
export default function AboutSection() {
  return (
    <div className="border-y-[3px] border-[#1A1A1A] bg-white">
      <SectionWrapper ariaLabel="About NextStep founders" className="section-pad">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Badge variant="yellow">✦ The studio</Badge>
            <h2 className="mt-4 font-heading text-3xl font-black sm:text-4xl">
              Two founders. Zero bloat. All accountability.
            </h2>
            <p className="mt-4 font-medium leading-relaxed text-[#1A1A1A]/75">
              <strong>NextStep</strong> was founded in <strong>Faisalabad, Punjab</strong> by{" "}
              <strong>Abdul Rahman</strong> (Marketing & Client Relations) and <strong>Zaid Mughal</strong>{" "}
              (Developer & Graphic Designer). We stay small on purpose — you always talk to the person doing the work.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { t: "Cooperative", d: "Daily updates, plain Urdu/English" },
                { t: "Fast", d: "7–14 day delivery windows" },
                { t: "Maintained", d: "90-day support included" },
              ].map((v) => (
                <li key={v.t} className="rounded-xl border-[3px] border-[#1A1A1A] bg-[#F9F7F5] p-3 shadow-[4px_4px_0_0_#1A1A1A]">
                  <p className="font-heading text-sm font-black uppercase">{v.t}</p>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A]/70">{v.d}</p>
                </li>
              ))}
            </ul>
            <Link href="/about/" title="About NextStep — story, values, founders" className="mt-6 inline-block">
              <Button variant="outline">Our story <ArrowRight aria-hidden="true" /></Button>
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { initials: "AR", name: "Abdul Rahman", role: "Marketing & Client Relations", tel: "+92 328 4738123", bg: "bg-[#E3262E] text-white", src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/founders/abdul-rahman.webp`, alt: "Abdul Rahman - Co-Founder of NextStep" },
                { initials: "ZM", name: "Zaid Mughal", role: "Developer & Graphic Designer", tel: "+92 339 4807064", bg: "bg-[#1A1A1A] text-white", src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/founders/zaid-mughal.webp`, alt: "Zaid Mughal - Co-Founder of NextStep" },
              ].map((f) => (
                <article key={f.name} className="editorial-frame p-5 text-center">
                  <FounderAvatar src={f.src} alt={f.alt} initials={f.initials} fallbackBg={f.bg} className="mx-auto" />
                  <h3 className="mt-3 font-heading text-lg font-bold">{f.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/60">{f.role}</p>
                  <a href={`tel:${f.tel.replace(/\s/g, "")}`} title={`Call ${f.name}`} className="link-underline mt-2 inline-block text-sm font-bold text-[#E3262E]">{f.tel}</a>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionWrapper>
    </div>
  );
}
