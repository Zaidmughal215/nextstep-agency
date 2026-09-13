import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import FounderAvatar from "@/components/shared/FounderAvatar";
import ContactCTA from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, personSchema, breadcrumbSchema, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata("about");

/** About — h1 story + two Person schemas, values, timeline. */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema("Abdul Rahman", "Co-Founder — Marketing & Client Relations", "+923284738123")} id="ld-person-ar" />
      <JsonLd data={personSchema("Zaid Mughal", "Co-Founder — Developer & Graphic Designer", "+923394807064")} id="ld-person-zm" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "About", url: `${siteConfig.url}/about/` },
        ])}
        id="ld-crumb-about"
      />

      <div className="border-b-[3px] border-[#1A1A1A] bg-[#FFF4A3]">
        <SectionWrapper className="py-14 lg:py-20" ariaLabel="About NextStep">
          <Reveal>
            <Badge variant="red">✦ Our story</Badge>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
              About NextStep — Faisalabad Studio, Built on Follow-Through
            </h1>
            <p className="mt-4 max-w-2xl font-medium text-[#1A1A1A]/75">
              <strong>NextStep</strong> is a two-founder digital studio in <strong>Faisalabad, Punjab, Pakistan</strong>.
              We build <strong>custom software, Next.js websites and brand identities</strong> for local SMEs — then stick around
              for 90 days to make sure they work. That follow-through is the whole brand.
            </p>
          </Reveal>
        </SectionWrapper>
      </div>

      <SectionWrapper ariaLabel="Founders of NextStep" className="section-pad">
        <Reveal>
          <h2 className="font-heading text-3xl font-black">Meet the founders</h2>
          <p className="mt-2 max-w-xl font-medium text-[#1A1A1A]/70">You always talk to the person doing the work. No account managers, no handoffs.</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              initials: "AR", name: "Abdul Rahman", role: "Co-Founder — Marketing & Client Relations",
              tel: "+92 328 4738123", href: "tel:+923284738123", bg: "bg-[#E3262E] text-white",
              src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/founders/abdul-rahman.webp`, alt: "Abdul Rahman - Co-Founder of NextStep",
              bio: "Abdul owns discovery, pricing and delivery. He scopes fixed quotes in 24 hours, sends daily Urdu/English updates, and makes sure what was promised is what ships. SMEs stay because he answers.",
            },
            {
              initials: "ZM", name: "Zaid Mughal", role: "Co-Founder — Developer & Graphic Designer",
              tel: "+92 339 4807064", href: "tel:+923394807064", bg: "bg-[#1A1A1A] text-white",
              src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/founders/zaid-mughal.webp`, alt: "Zaid Mughal - Co-Founder of NextStep",
              bio: "Zaid designs and builds everything — Next.js frontends, TypeScript backends, logos and guidelines. Obsessed with <1s LCP, clean type and print-ready files. If it ships, he built it.",
            },
          ].map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <article className="editorial-frame h-full p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <FounderAvatar src={f.src} alt={f.alt} initials={f.initials} fallbackBg={f.bg} priority={i === 0} />
                  <div>
                    <h3 className="font-heading text-xl font-bold">{f.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/60">{f.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-[#1A1A1A]/80">{f.bio}</p>
                <a href={f.href} title={`Call ${f.name} at NextStep`} className="mt-4 inline-flex items-center gap-2 rounded-xl border-[3px] border-[#1A1A1A] bg-[#F9F7F5] px-4 py-2 text-sm font-black shadow-[3px_3px_0_0_#1A1A1A] hover:bg-[#FFF4A3]">
                  <Phone className="size-4" aria-hidden="true" /> {f.tel}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <div className="border-y-[3px] border-[#1A1A1A] bg-white">
        <SectionWrapper ariaLabel="NextStep values" className="section-pad">
          <Reveal>
            <h2 className="font-heading text-3xl font-black">What we refuse to compromise</h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Highly cooperative", d: "Daily updates, plain language, shared checklists. You always know what's next." },
              { t: "Fast delivery", d: "Sites 7–10 days, brands 7 days, MVPs 14 days. Dates in writing, kept." },
              { t: "Maintained", d: "90-day post-delivery support on every build. Bugs fixed, tweaks included." },
              { t: "Overall quality", d: "<1s LCP, SEO baked in, print-ready brand files. No templates-as-custom." },
            ].map((v, i) => (
              <li key={v.t}>
                <Reveal delay={i * 0.06}>
                  <div className="editorial-frame-sm h-full p-5">
                    <p aria-hidden="true" className="font-heading text-2xl font-black text-[#E3262E]">0{i + 1}</p>
                    <h3 className="mt-2 font-heading text-base font-bold">{v.t}</h3>
                    <p className="mt-1 text-sm font-medium text-[#1A1A1A]/70">{v.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      </div>

      <SectionWrapper ariaLabel="How NextStep started" className="section-pad">
        <Reveal>
          <h2 className="font-heading text-3xl font-black">How it started</h2>
          <div className="mt-6 space-y-4">
            {[
              ["Faisalabad shops asked for help", "Local SMEs kept losing customers to slow pages and paper registers. We started fixing one shop at a time — site first, then systems."],
              ["Two roles, one promise", "Abdul runs client relations and delivery; Zaid designs and codes. Small team, full accountability — the person you call is the person who builds."],
              ["Maintenance as the USP", "Pakistani agencies kept ghosting after launch. We made 90-day support standard — and clients started referring. 48+ projects later, that's still the pitch."],
            ].map(([t, d], i) => (
              <article key={t} className="flex gap-4 rounded-xl border-[3px] border-[#1A1A1A] bg-white p-5 shadow-[4px_4px_0_0_#1A1A1A]">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg border-2 border-[#1A1A1A] bg-[#1A1A1A] font-heading font-black text-white">{i + 1}</span>
                <div>
                  <h3 className="font-heading font-bold">{t}</h3>
                  <p className="mt-1 text-sm font-medium text-[#1A1A1A]/70">{d}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio/" title="See NextStep portfolio"><Button variant="outline">See the proof <ArrowRight aria-hidden="true" /></Button></Link>
            <a href={`mailto:${siteConfig.email}`} title="Email NextStep founders" className="inline-flex items-center gap-2 rounded-xl border-[3px] border-[#1A1A1A] bg-[#FFF4A3] px-6 py-2.5 text-sm font-black uppercase shadow-[4px_4px_0_0_#1A1A1A] hover:-translate-y-0.5">
              <Mail className="size-4" aria-hidden="true" /> {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </SectionWrapper>

      <ContactCTA />
    </>
  );
}
