import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import WhatsAppWidget from "@/components/ui/whatsapp-widget";
import PageTransition from "@/components/shared/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, buildMetadata, websiteSchema, organizationSchema, navigationSchema } from "@/lib/seo";
import "./globals.css";

/** Optimized font loading — display:swap per spec (CLS-safe). */
const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-heading",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Lenis/GSAP load lazily inside the provider's useEffect (code-split,
// never blocks paint) — static import keeps prerender intact.

export const metadata: Metadata = {
  ...buildMetadata("home"),
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: `${siteConfig.url}/` },
  authors: [{ name: "NextStep — Abdul Rahman, Zaid Mughal" }],
  creator: "NextStep",
  publisher: "NextStep",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E3262E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${heading.variable} ${body.variable}`}>
      <head>
        <JsonLd data={websiteSchema()} id="ld-website" />
        <JsonLd data={organizationSchema()} id="ld-organization" />
        <JsonLd data={navigationSchema()} id="ld-navigation" />
      </head>
      <body className="min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border-[3px] focus:border-[#1A1A1A] focus:bg-[#FFF4A3] focus:px-4 focus:py-2 focus:font-bold">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          {/* Floating WhatsApp widget. */}
          <WhatsAppWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
