import type { Metadata } from "next";

/**
 * Single source of truth for SEO — canonical domain, NAP, geo.
 * Faisalabad-only LocalBusiness (per owner). No socials (per owner).
 */
export const siteConfig = {
  name: "NextStep",
  tagline: "Websites That Book Clients. Software That Ships.",
  url: "https://zportfolio.site",
  logo: "https://zportfolio.site/og-image.png",
  ogImage: "https://zportfolio.site/og-image.png",
  email: "info.zaid.officials@gmail.com",
  phones: ["+923284738123", "+923394807064"] as const,
  phoneDisplay: ["+92 328 4738123", "+92 339 4807064"] as const,
  address: {
    streetAddress: "Faisalabad",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    postalCode: "38000",
    addressCountry: "PK",
  },
  geo: { latitude: 31.4504, longitude: 73.135 },
  areaServed: ["Faisalabad", "Lahore", "Islamabad", "Pakistan", "United States"],
  openingHours: "Mo-Sa 09:00-18:00",
  founders: [
    { name: "Abdul Rahman", jobTitle: "Co-Founder — Marketing & Client Relations", telephone: "+923284738123" },
    { name: "Zaid Mughal", jobTitle: "Co-Founder — Developer & Graphic Designer", telephone: "+923394807064" },
  ],
} as const;

type PageKey = "home" | "services" | "about" | "portfolio" | "contact";

/** Titles 50–60 chars, descriptions 140–160 chars (verified in QA). */
export const pageMeta: Record<PageKey, { title: string; description: string; path: string }> = {
  home: {
    title: "NextStep — Website Design & Software Studio Faisalabad",
    description:
      "NextStep builds fast Next.js websites & custom software for SMEs in Faisalabad, Pakistan. 14-day delivery, 90-day support. Book a free quote.",
    path: "/",
  },
  services: {
    title: "Software & Website Services in Faisalabad | NextStep",
    description:
      "Custom software, Next.js websites & branding by NextStep in Faisalabad, Pakistan. MVP in 14 days, fixed pricing, 90-day maintenance included.",
    path: "/services/",
  },
  about: {
    title: "About NextStep — Meet the Founders, Faisalabad Studio",
    description:
      "Meet Abdul Rahman & Zaid Mughal — the Faisalabad founders behind NextStep studio. Cooperative process, fast delivery, quality-driven builds.",
    path: "/about/",
  },
  portfolio: {
    title: "Portfolio — 6 Client Projects by NextStep Faisalabad",
    description:
      "Explore 6 NextStep client projects: custom software, Next.js websites & brand identities. Real results for Pakistan SMEs, fixed pricing, support.",
    path: "/portfolio/",
  },
  contact: {
    title: "Contact NextStep Faisalabad — Free Quote in 24 Hours",
    description:
      "Contact NextStep studio in Faisalabad: +92 328 4738123, info.zaid.officials@gmail.com. Get a free quote today — replies within 24 hours, guaranteed.",
    path: "/contact/",
  },
};

export function buildMetadata(key: PageKey): Metadata {
  const m = pageMeta[key];
  const canonical = `${siteConfig.url}${m.path === "/" ? "/" : m.path}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_PK",
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} — ${m.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [siteConfig.ogImage],
    },
  };
}

/* ————— JSON-LD factories ————— */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    inLanguage: "en-PK",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: siteConfig.logo,
    image: siteConfig.ogImage,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: [...siteConfig.phones],
    address: { "@type": "PostalAddress", ...siteConfig.address },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Faisalabad" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United States" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: [...siteConfig.phones].map((tel) => ({
      "@type": "ContactPoint",
      telephone: tel,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    })),
    founder: siteConfig.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NextStep Services",
      itemListElement: [
        "Custom Software Development",
        "Website Building (Next.js)",
        "Business Branding & Identity",
      ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
    },
  };
}

export function navigationSchema() {
  const links = [
    { name: "Services", url: `${siteConfig.url}/services/` },
    { name: "Portfolio", url: `${siteConfig.url}/portfolio/` },
    { name: "About", url: `${siteConfig.url}/about/` },
    { name: "Contact", url: `${siteConfig.url}/contact/` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Primary Navigation",
    hasPart: links.map((l) => ({ "@type": "SiteNavigationElement", name: l.name, url: l.url })),
  };
}

export function personSchema(name: string, jobTitle: string, telephone: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    telephone,
    email: siteConfig.email,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    workLocation: { "@type": "PostalAddress", addressLocality: "Faisalabad", addressCountry: "PK" },
    knowsAbout: ["Software Development", "Next.js", "Business Branding", "Graphic Design", "Client Relations"],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
