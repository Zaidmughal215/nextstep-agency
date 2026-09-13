import Link from "next/link";
import { Code2, Globe, Palette, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import SpringCard from "@/components/shared/SpringCard";
import { SERVICES } from "@/lib/constants";

const ICONS = { code: Code2, globe: Globe, palette: Palette } as const;

/** Services overview — h2 + h3 hierarchy, Q&A entity sentences for AEO. */
export default function ServicesSection({ compact = false }: { compact?: boolean }) {
  return (
    <SectionWrapper ariaLabel="NextStep services overview" className="section-pad">
      <Reveal>
        <Badge variant="red">★ What we do</Badge>
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-black sm:text-4xl">
          Digital Design Studio in Pakistan — Software, Websites, Branding
        </h2>
        <p className="mt-3 max-w-2xl font-medium text-[#1A1A1A]/75">
          <strong>What is NextStep?</strong> A cooperative Faisalabad studio for SMEs in Faisalabad, Lahore and Islamabad.
          <strong> Who needs it?</strong> Shops, clinics and startups losing clients to slow pages and messy ops.
          <strong> What do you get?</strong> Fixed-price builds with maintenance — no agency ghosting.
        </p>
      </Reveal>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS];
          return (
            <li key={s.id}>
              <Reveal delay={i * 0.08}>
                <SpringCard>
                  <Card className="h-full">
                    <CardHeader>
                      <span aria-hidden="true" className="grid size-12 place-items-center rounded-xl border-[3px] border-[#1A1A1A] bg-[#FFF4A3] shadow-[3px_3px_0_0_#1A1A1A]">
                        <Icon className="size-6" />
                      </span>
                      <CardTitle className="pt-3">{s.title}</CardTitle>
                      <CardDescription>{s.short}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5 text-sm font-semibold">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2">
                            <span aria-hidden="true" className="size-2 rounded-full bg-[#E3262E]" /> {b}
                          </li>
                        ))}
                      </ul>
                      {!compact && (
                        <Link
                          href={`/services/#${s.id}`}
                          title={`${s.title} in Faisalabad — details, deliverables, pricing`}
                          className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-black uppercase tracking-wide text-[#E3262E]"
                        >
                          Learn more <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </SpringCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
