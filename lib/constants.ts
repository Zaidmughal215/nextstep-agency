/** Shared content — services, projects, FAQs. Single source for pages + llms.txt. */
export const NAV_LINKS = [
  { label: "Services", href: "/services/", title: "Services — Software, Websites, Branding in Faisalabad" },
  { label: "Work", href: "/portfolio/", title: "Portfolio — 6 case studies by NextStep" },
  { label: "About", href: "/about/", title: "About — Founders of NextStep Faisalabad" },
  { label: "Contact", href: "/contact/", title: "Contact — Get a free quote in 24 hours" },
] as const;

export const SERVICES = [
  {
    id: "software",
    icon: "code",
    title: "Custom Software Development",
    keyword: "Custom Software Development in Faisalabad",
    short: "Bespoke web apps, dashboards & internal tools — Next.js + TypeScript, shipped as an MVP in 14 days.",
    bullets: ["MVP in 14 days", "Admin panel + API + docs", "90-day maintenance included"],
    deliverables: "NextStep delivers a working MVP, admin panel, API, documentation and team training.",
  },
  {
    id: "websites",
    icon: "globe",
    title: "Website Building",
    keyword: "Website Building — Next.js Development in Pakistan",
    short: "Blazing static sites that book clients — SEO-ready, <100ms LCP, Urdu/English, WhatsApp integrated.",
    bullets: ["Next.js static export", "SEO + OG + sitemap built-in", "WhatsApp & maps integration"],
    deliverables: "NextStep delivers a 5–8 page site, CMS-ready copy, SEO metadata, and launch checklist.",
  },
  {
    id: "branding",
    icon: "palette",
    title: "Business Branding",
    keyword: "Business Branding & Identity Design in Pakistan",
    short: "Logos & identities SMEs are proud of — guidelines, social kits, print-ready files in 7 days.",
    bullets: ["Logo + identity system", "Brand guidelines PDF", "Social & print kit"],
    deliverables: "NextStep delivers logo suite, color/type system, guidelines, and social templates.",
  },
] as const;

export type ProjectCategory = "Software" | "Website" | "Branding";

export const PROJECTS: {
  id: string;
  title: string;
  category: ProjectCategory;
  gradient: string;
  result: string;
  blurb: string;
}[] = [
  {
    id: "inventory-pro",
    title: "InventoryPro — Stock Dashboard",
    category: "Software",
    gradient: "from-[#E3262E] via-[#ff6b5e] to-[#FFF4A3]",
    result: "+38% stock accuracy in 60 days",
    blurb: "Faisalabad textile SME replaced spreadsheets with a NextStep dashboard.",
  },
  {
    id: "clinic-booker",
    title: "Clinic Booker — Appointments",
    category: "Software",
    gradient: "from-[#1A1A1A] via-[#E3262E] to-[#FFF4A3]",
    result: "2.1× bookings, zero no-show chaos",
    blurb: "Lahore clinic ships online booking with SMS reminders.",
  },
  {
    id: "boutique-store",
    title: "Boutique Store — Next.js Site",
    category: "Website",
    gradient: "from-[#FFF4A3] via-[#F9F7F5] to-[#E3262E]",
    result: "0.8s LCP, 3× WhatsApp leads",
    blurb: "Faisalabad boutique goes from Facebook-only to own storefront.",
  },
  {
    id: "restaurant-landing",
    title: "Restaurant Landing + Menu",
    category: "Website",
    gradient: "from-[#E3262E] to-[#1A1A1A]",
    result: "SEO #3 ‘restaurant Faisalabad’",
    blurb: "Menu site with maps, hours, and click-to-call that ranks.",
  },
  {
    id: "chai-brand",
    title: "Chai Brand Identity",
    category: "Branding",
    gradient: "from-[#FFF4A3] to-[#E3262E]",
    result: "Full kit in 7 days, print-ready",
    blurb: "Logo, packaging accents and social kit for a Faisalabad chai startup.",
  },
  {
    id: "gym-identity",
    title: "Gym Identity System",
    category: "Branding",
    gradient: "from-[#1A1A1A] via-[#3a3a3a] to-[#E3262E]",
    result: "+52% trial signups post-rebrand",
    blurb: "Bold retro-editorial identity with guidelines and signage.",
  },
];

export const HOME_FAQS = [
  {
    q: "What does NextStep do?",
    a: "NextStep is a Faisalabad digital studio offering custom software development, Next.js website building, and business branding for SMEs in Pakistan and the US.",
  },
  {
    q: "How fast can NextStep deliver?",
    a: "Websites in 7–10 days, brand kits in 7 days, software MVPs in 14 days — with 90-day post-delivery maintenance included.",
  },
  {
    q: "How much does a website cost in Faisalabad?",
    a: "Fixed, upfront pricing. Starter sites from PKR 45k, software MVPs scoped per module. Contact NextStep at +92 328 4738123 for a free quote in 24 hours.",
  },
];

export const SERVICES_FAQS = [
  {
    q: "What is custom software development at NextStep?",
    a: "Bespoke web apps built with Next.js and TypeScript by NextStep in Faisalabad — for SMEs needing inventory, booking or CRM that spreadsheets can't handle. Deliverables: MVP, admin panel, API, docs, training.",
  },
  {
    q: "What is included in website building?",
    a: "A 5–8 page Next.js static site with SEO metadata, sitemap, Open Graph, WhatsApp integration and maps. LCP under 1s, Urdu/English copy, launch checklist included.",
  },
  {
    q: "What does the branding package include?",
    a: "Logo suite, color and type system, brand guidelines PDF, social templates and print-ready files — delivered in 7 days by Zaid Mughal, designer at NextStep.",
  },
  {
    q: "Do you provide maintenance after delivery?",
    a: "Yes. Every NextStep project includes 90 days of post-delivery maintenance — bug fixes, small tweaks and launch support. Paid care plans after that.",
  },
];
