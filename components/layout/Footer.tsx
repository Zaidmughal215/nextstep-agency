import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/seo";

/** Footer — semantic <footer> with NAP + areaServed microdata. */
export default function Footer() {
  return (
    <footer className="border-t-[3px] border-[#1A1A1A] bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-heading text-2xl font-black">NextStep</p>
          <p className="mt-2 text-sm text-white/70">
            Faisalabad digital studio for SMEs — software, websites, branding. Fast delivery, 90-day support.
          </p>
          <p className="mt-4 inline-block rounded-full border-2 border-white/30 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
            Est. Faisalabad · PK
          </p>
        </div>

        <nav aria-label="Footer services navigation">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">Services</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li><Link title="Custom Software Development in Faisalabad" className="hover:text-[#FFF4A3]" href="/services/#software">Software Development</Link></li>
            <li><Link title="Website Building with Next.js in Pakistan" className="hover:text-[#FFF4A3]" href="/services/#websites">Website Building</Link></li>
            <li><Link title="Business Branding and Identity in Pakistan" className="hover:text-[#FFF4A3]" href="/services/#branding">Business Branding</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer site navigation">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">Studio</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li><Link title="Portfolio — 6 projects by NextStep" className="hover:text-[#FFF4A3]" href="/portfolio/">Work</Link></li>
            <li><Link title="About NextStep founders" className="hover:text-[#FFF4A3]" href="/about/">About</Link></li>
            <li><Link title="Contact NextStep for a free quote" className="hover:text-[#FFF4A3]" href="/contact/">Contact</Link></li>
          </ul>
        </nav>

        <address className="text-sm not-italic">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">Contact (Faisalabad, PK)</p>
          <ul className="mt-3 space-y-2 font-semibold">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-[#FFF4A3]" href={`mailto:${siteConfig.email}`} title="Email NextStep">
                <Mail className="size-4" aria-hidden="true" /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-[#FFF4A3]" href="tel:+923284738123" title="Call Abdul Rahman — Marketing">
                <Phone className="size-4" aria-hidden="true" /> +92 328 4738123 (Abdul Rahman)
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-[#FFF4A3]" href="tel:+923394807064" title="Call Zaid Mughal — Developer">
                <Phone className="size-4" aria-hidden="true" /> +92 339 4807064 (Zaid Mughal)
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-white/70">
              <MapPin className="size-4" aria-hidden="true" /> Faisalabad, Punjab, Pakistan
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/50">Open Mo–Sa 09:00–18:00 · Serving Lahore, Islamabad & US</p>
        </address>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} NextStep — Faisalabad, Pakistan. All rights reserved.</p>
          <p>Software · Websites · Branding</p>
        </div>
      </div>
    </footer>
  );
}
