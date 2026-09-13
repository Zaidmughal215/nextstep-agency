import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/Reveal";

/** Yellow CTA banner — h2, punchy + proof. */
export default function ContactCTA() {
  return (
    <div className="border-t-[3px] border-[#1A1A1A] bg-[#FFF4A3]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="editorial-frame flex flex-col items-start justify-between gap-6 bg-white p-6 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <p className="badge-pill bg-[#E3262E] text-white">✦ Free quote in 24h</p>
              <h2 className="mt-4 font-heading text-3xl font-black sm:text-4xl">
                Tell us the problem. Get a fixed price tomorrow.
              </h2>
              <p className="mt-2 max-w-xl font-medium text-[#1A1A1A]/70">
                NextStep replies within 24 hours — WhatsApp, call or email. Faisalabad studio, serving all Pakistan + US.
              </p>
            </div>
            <Link href="/contact/" title="Contact NextStep — free quote">
              <Button size="lg">Book Free Consultation <ArrowRight aria-hidden="true" /></Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
