import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page Not Found | NextStep",
  description: "This NextStep page does not exist. Head back home or get a free quote.",
  alternates: { canonical: `${siteConfig.url}/404/` },
  robots: { index: false, follow: true },
};

/** Branded 404 — retro-editorial, static-safe (server component, no hooks). */
export default function NotFound() {
  return (
    <main aria-label="Page not found">
      <div className="border-b-[3px] border-[#1A1A1A] bg-[#FFF4A3]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <Badge variant="red">✳ 404 — Wrong turn</Badge>
          <h1 className="mx-auto mt-5 font-heading text-6xl font-black tracking-tight sm:text-8xl">
            Lost?
          </h1>
          <p className="mx-auto mt-4 max-w-md font-medium text-[#1A1A1A]/75">
            This page doesn&apos;t exist (or moved). The studio is still right here in
            Faisalabad — let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" title="NextStep — Home">
              <Button size="lg">
                <ArrowLeft aria-hidden="true" /> Back to home
              </Button>
            </Link>
            <Link href="/contact/" title="Contact NextStep — free quote">
              <Button size="lg" variant="secondary">
                Get a free quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
