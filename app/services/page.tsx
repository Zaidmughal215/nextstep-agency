import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Globe, Palette, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import SpringCard from "@/components/shared/SpringCard";
import ArrowDraw from "@/components/shared/ArrowDraw";
import FaqBlock from "@/components/sections/FaqBlock";
import ContactCTA from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqSchema, breadcrumbSchema, siteConfig } from "@/lib/seo";
import { SERVICES_FAQS } from "@/lib/constants";

export const metadata = buildMetadata("services");

const DETAIL: Record<string, { icon: typeof Code2; steps: string[]; price: string; time: string }> = {
  software: {
    icon: Code2,
    steps: ["01 — Scope call + fixed quote", "02 — MVP build in sprints", "03 — Testing + training", "04 — Launch + 90-day support"],
    price: "Scoped per module · fixed quote",
    time: "MVP in 14 days",
  },
  websites: {
    icon: Globe,
    steps: ["01 — Copy + structure in 48h", "02 — Next.js build + SEO", "03 — WhatsApp/maps wiring", "04 — Launch checklist + support"],
    price: "Starter from PKR 45k · fixed",
    time: "Live in 7–10 days",
  },
  branding: {
    icon: Palette,
    steps: ["01 — Discovery + moodboard", "02 — Logo concepts ×3", "03 — Identity + guidelines", "04 — Social/print kit + files"],
    price: "Full kit · fixed in 7 days",
    time: "Delivery in 7 days",
  },
};

/** Services — h1 + keyword h2s per service, conversational Q&A for AEO/GEO. */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema(SERVICES_FAQS)} id="ld-faq-services" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "Services", url: `${siteConfig.url}/services/` },
        ])}
        id="ld-crumb-services"
      />

      <div className="border-b-[3px] border-[#1A1A1A] bg-[#1A1A1A] text-white">
        <SectionWrapper className="py-14 lg:py-20" ariaLabel="Services introduction">
          <Reveal>
            <Badge variant="yellow">✦ Services — Faisalabad · PK</Badge>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
              Software, Websites & Branding Services in Pakistan
            </h1>
            <p className="mt-4 max-w-2xl font-medium text-white/75">
              <strong>NextStep</strong> is a Faisalabad studio for SMEs — <strong>custom software development, Next.js website building, and business branding</strong>. Fixed prices, 14-day MVPs, 90-day maintenance. Serving Faisalabad, Lahore, Islamabad and US clients.
            </p>
          </Reveal>
        </SectionWrapper>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {[
          { id: "software", kicker: "Service 01", h2: "Custom Software Development in Faisalabad", qa: [
            ["What is it?", "Bespoke web apps built with Next.js & TypeScript by NextStep."],
            ["Who needs it?", "SMEs in Faisalabad/Lahore needing inventory, booking or CRM that spreadsheets can't handle."],
            ["What problem does it solve?", "Manual errors and slow ops — we ship an MVP in 14 days with <100ms interactions and 90-day maintenance."],
            ["Deliverables?", "NextStep delivers MVP + admin panel + API + docs + training."],
          ]},
          { id: "websites", kicker: "Service 02", h2: "Website Building — Next.js Development in Pakistan", qa: [
            ["What is it?", "Blazing static sites that book clients — SEO-ready, WhatsApp-integrated, Urdu/English."],
            ["Who needs it?", "Shops, clinics, restaurants and startups in Pakistan losing leads to slow Facebook-only pages."],
            ["What problem does it solve?", "Invisible on Google, slow on mobile — we ship <1s LCP with sitemap, OG tags and click-to-call."],
            ["Deliverables?", "NextStep delivers a 5–8 page site, SEO metadata, launch checklist and 90-day support."],
          ]},
          { id: "branding", kicker: "Service 03", h2: "Business Branding & Identity Design in Pakistan", qa: [
            ["What is it?", "Logos & identities SMEs are proud of — designed by Zaid Mughal at NextStep."],
            ["Who needs it?", "New businesses in Faisalabad/Pakistan that look generic and get forgotten."],
            ["What problem does it solve?", "No trust, no recall — we deliver a full kit in 7 days that works on signboards and Instagram alike."],
            ["Deliverables?", "NextStep delivers logo suite, color/type system, guidelines PDF, social + print kit."],
          ]},
        ].map((s, idx) => {
          const d = DETAIL[s.id];
          const Icon = d.icon;
          return (
            <section key={s.id} id={s.id} aria-label={s.h2} className="scroll-mt-24 border-b-[3px] border-dashed border-[#1A1A1A]/25 py-14">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-[#E3262E]">{s.kicker}</p>
                <h2 className="mt-2 font-heading text-3xl font-black sm:text-4xl">{s.h2}</h2>
              </Reveal>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
                <Reveal>
                  <Card>
                    <CardHeader>
                      <span aria-hidden="true" className="grid size-12 place-items-center rounded-xl border-[3px] border-[#1A1A1A] bg-[#FFF4A3]"><Icon className="size-6" /></span>
                      <CardTitle className="pt-2">Conversational brief — is this you?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {s.qa.map(([q, a]) => (
                        <p key={q} className="text-sm font-medium leading-relaxed text-[#1A1A1A]/80">
                          <strong className="text-[#1A1A1A]">{q}</strong> {a}
                        </p>
                      ))}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="rounded-full border-2 border-[#1A1A1A] bg-[#FFF4A3] px-3 py-1 text-xs font-black">{d.time}</span>
                        <span className="rounded-full border-2 border-[#1A1A1A] bg-white px-3 py-1 text-xs font-black">{d.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
                <Reveal delay={0.1}>
                  <SpringCard>
                    <div className="editorial-frame bg-[#1A1A1A] p-6 text-white">
                      <h3 className="font-heading text-lg font-bold">How we deliver</h3>
                      <ol className="mt-4 space-y-3">
                        {d.steps.map((st) => (
                          <li key={st} className="flex items-start gap-2 text-sm font-semibold text-white/85">
                            <Check className="mt-0.5 size-4 shrink-0 text-[#FFF4A3]" aria-hidden="true" /> {st}
                          </li>
                        ))}
                      </ol>
                      <Link href="/contact/" title={`Get a quote for ${s.h2}`} className="mt-6 block">
                        <Button className="w-full">Get fixed quote <ArrowRight aria-hidden="true" /></Button>
                      </Link>
                    </div>
                  </SpringCard>
                </Reveal>
              </div>
              {idx < 2 && <ArrowDraw className="mx-auto mt-10 h-10 w-44" />}
            </section>
          );
        })}
      </div>

      <FaqBlock faqs={SERVICES_FAQS} heading="Service FAQs — answered plainly" />
      <ContactCTA />
    </>
  );
}
