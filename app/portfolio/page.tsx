import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("portfolio");

/** Server wrapper — metadata + JSON-LD prerendered, client grid inside. */
export default function PortfolioPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NextStep Portfolio — 6 projects",
    itemListElement: [
      { "@type": "CreativeWork", position: 1, name: "InventoryPro — Stock Dashboard", creator: { "@id": `${siteConfig.url}/#organization` } },
      { "@type": "CreativeWork", position: 2, name: "Clinic Booker — Appointments", creator: { "@id": `${siteConfig.url}/#organization` } },
      { "@type": "CreativeWork", position: 3, name: "Boutique Store — Next.js Site", creator: { "@id": `${siteConfig.url}/#organization` } },
    ],
  };
  return (
    <>
      <JsonLd data={itemList} id="ld-portfolio-list" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "Portfolio", url: `${siteConfig.url}/portfolio/` },
        ])}
        id="ld-crumb-portfolio"
      />
      <PortfolioClient />
    </>
  );
}
