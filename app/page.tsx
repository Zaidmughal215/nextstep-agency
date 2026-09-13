import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactCTA from "@/components/sections/ContactCTA";
import FaqBlock from "@/components/sections/FaqBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqSchema, breadcrumbSchema, siteConfig } from "@/lib/seo";
import { HOME_FAQS } from "@/lib/constants";

export const metadata: Metadata = buildMetadata("home");

/** Home — single h1 lives in <Hero/>. SSR text for AI crawlers. */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={faqSchema(HOME_FAQS)}
        id="ld-faq-home"
      />
      <JsonLd
        data={breadcrumbSchema([{ name: "Home", url: `${siteConfig.url}/` }])}
        id="ld-crumb-home"
      />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection limit={3} />
      <FaqBlock faqs={HOME_FAQS} />
      <ContactCTA />
    </>
  );
}
