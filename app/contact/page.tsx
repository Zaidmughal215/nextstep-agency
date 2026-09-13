import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Reveal from "@/components/shared/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema, siteConfig } from "@/lib/seo";

export const metadata = buildMetadata("contact");

/** Contact — h1 quote intent, NAP block, frontend-only form. */
export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "Contact", url: `${siteConfig.url}/contact/` },
        ])}
        id="ld-crumb-contact"
      />

      <div className="border-b-[3px] border-[#1A1A1A] bg-[#E3262E] text-white">
        <SectionWrapper className="py-14 lg:py-20" ariaLabel="Contact introduction">
          <Reveal>
            <Badge variant="yellow">✉ Reply in 24h</Badge>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
              Contact NextStep — Get Your Free Quote Today
            </h1>
            <p className="mt-4 max-w-2xl font-medium text-white/85">
              <strong>NextStep</strong> is a <strong>Faisalabad digital studio</strong> serving all Pakistan + US clients.
              Tell us about your <strong>software, website or branding</strong> need — fixed price back within 24 hours.
            </p>
          </Reveal>
        </SectionWrapper>
      </div>

      <SectionWrapper ariaLabel="Contact form and details" className="section-pad">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <h2 className="sr-only">Send a message to NextStep</h2>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <address className="editorial-frame h-fit bg-white p-6 not-italic sm:p-7">
              <h2 className="font-heading text-xl font-black">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm font-semibold">
                <li>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50"><Mail className="size-4" aria-hidden="true" /> Email</p>
                  <a href={`mailto:${siteConfig.email}`} title="Email NextStep — info.zaid.officials@gmail.com" className="link-underline mt-1 inline-block break-all font-bold text-[#E3262E]">{siteConfig.email}</a>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50"><Phone className="size-4" aria-hidden="true" /> Abdul Rahman — Marketing</p>
                  <a href="tel:+923284738123" title="Call Abdul Rahman — +92 328 4738123" className="link-underline mt-1 inline-block font-bold">+92 328 4738123</a>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50"><Phone className="size-4" aria-hidden="true" /> Zaid Mughal — Developer</p>
                  <a href="tel:+923394807064" title="Call Zaid Mughal — +92 339 4807064" className="link-underline mt-1 inline-block font-bold">+92 339 4807064</a>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50"><MapPin className="size-4" aria-hidden="true" /> Studio</p>
                  <p className="mt-1">Faisalabad, Punjab, Pakistan — serving Lahore, Islamabad & US remotely</p>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50"><Clock className="size-4" aria-hidden="true" /> Hours</p>
                  <p className="mt-1">Mo–Sa 09:00–18:00 (PKT)</p>
                </li>
              </ul>
              <div className="relative mt-6 overflow-hidden rounded-xl border-[3px] border-[#1A1A1A] bg-gradient-to-br from-[#E3262E] via-[#ff6b5e] to-[#FFF4A3]">
                <div aria-hidden="true" className="grid h-52 w-full place-items-center">
                  <p className="rounded-full border-2 border-[#1A1A1A] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0_0_#1A1A1A]">
                    ✳ Faisalabad · Punjab · PK
                  </p>
                </div>
                <iframe
                  title="Map — Faisalabad, Punjab, Pakistan (NextStep studio area)"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.05%2C31.38%2C73.22%2C31.52&layer=mapnik&marker=31.4504%2C73.1350"
                  className="absolute inset-0 h-full w-full bg-transparent"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </address>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  );
}
