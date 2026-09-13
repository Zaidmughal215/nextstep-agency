"use client";

/**
 * Frontend-only contact form — two-phase UX:
 * 1) Valid submit on "Send via Email" flips the primary CTA to "Send via WhatsApp" (no navigation yet).
 * 2) Clicking "Send via WhatsApp" opens wa.me with all details pre-filled.
 * Keeps zod validation; no backend; static-export safe.
 */
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validations";
import { siteConfig } from "@/lib/seo";
import { Send, MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";

type FormState = { name: string; email: string; phone: string; service: string; message: string };

const defaultForm: FormState = { name: "", email: "", phone: "", service: "Website Building", message: "" };

// Primary WhatsApp target — Abdul Rahman (Marketing). wa.me expects digits without "+".
const WHATSAPP_E164 = siteConfig.phones[0] as string; // "+923284738123"
const waDigits = WHATSAPP_E164.replace(/\D/g, "");

function buildWhatsAppText(d: FormState) {
  return [
    `Hi NextStep! 👋 I'm ${d.name}.`,
    ``,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Service: ${d.service}`,
    ``,
    `Project details:`,
    d.message,
    ``,
    `— sent from zportfolio.site/contact`,
  ].join("\n");
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "whatsappReady" | "sent">("idle");

  const isReady = phase === "whatsappReady";
  const waUrl = useMemo(() => {
    if (!isReady) return null;
    const text = encodeURIComponent(buildWhatsAppText(form));
    return `https://wa.me/${waDigits}?text=${text}`;
  }, [form, isReady]);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // While user edits after flipping, clear only that field's error — keep phase so button stays WhatsApp until sent.
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function handlePrimaryClick(e: React.MouseEvent) {
    e.preventDefault();

    // Phase 2 — already validated; open WhatsApp.
    if (phase === "whatsappReady" && waUrl) {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setPhase("sent");
      return;
    }

    // Phase 1 — validate, then flip button to WhatsApp (do NOT navigate to mailto now).
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    console.log("[NextStep contact] validated — ready for WhatsApp", parsed.data);
    setPhase("whatsappReady");
  }

  function reset() {
    setForm(defaultForm);
    setErrors({});
    setPhase("idle");
  }

  if (phase === "sent") {
    return (
      <div role="status" className="editorial-frame bg-[#FFF4A3] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[#E3262E]" aria-hidden="true" />
        <h2 className="mt-3 font-heading text-2xl font-black">Opening WhatsApp…</h2>
        <p className="mt-2 text-sm font-medium text-[#1A1A1A]/75">
          Your message is pre-filled with all your details — just hit send on WhatsApp. Didn&apos;t open?{" "}
          {waUrl && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#E3262E] underline">
              Open WhatsApp again
            </a>
          )}{" "}
          or email <a className="font-bold text-[#E3262E]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
        <Button variant="outline" className="mt-5" onClick={reset}>
          <ArrowLeft aria-hidden="true" /> Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={(ev) => ev.preventDefault()} noValidate aria-label="Contact NextStep form" className="editorial-frame p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="e.g. Ahmed Raza" value={form.name} onChange={onChange} required aria-describedby={errors.name ? "err-name" : undefined} aria-invalid={!!errors.name} className="mt-2" />
          {errors.name && <p id="err-name" role="alert" className="mt-1 text-xs font-bold text-[#E3262E]">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@business.pk" value={form.email} onChange={onChange} required aria-describedby={errors.email ? "err-email" : undefined} aria-invalid={!!errors.email} className="mt-2" />
          {errors.email && <p id="err-email" role="alert" className="mt-1 text-xs font-bold text-[#E3262E]">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={onChange} required aria-describedby={errors.phone ? "err-phone" : undefined} aria-invalid={!!errors.phone} className="mt-2" />
          {errors.phone && <p id="err-phone" role="alert" className="mt-1 text-xs font-bold text-[#E3262E]">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="service">Service needed *</Label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={onChange}
            className="mt-2 flex h-11 w-full rounded-xl border-[3px] border-[#1A1A1A] bg-white px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E]"
          >
            <option>Software Development</option>
            <option>Website Building</option>
            <option>Business Branding</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="message">Project details *</Label>
        <Textarea id="message" name="message" placeholder="What do you sell? What problem should the site/software fix? Deadline?" value={form.message} onChange={onChange} required aria-describedby={errors.message ? "err-message" : undefined} aria-invalid={!!errors.message} className="mt-2" />
        {errors.message && <p id="err-message" role="alert" className="mt-1 text-xs font-bold text-[#E3262E]">{errors.message}</p>}
      </div>

      {/* Primary CTA morphs after valid first click; keeps same position so user doesn't hunt. */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          size="lg"
          onClick={handlePrimaryClick}
          aria-label={isReady ? "Send via WhatsApp — opens WhatsApp with your details" : "Validate details — then send via WhatsApp"}
          className={isReady ? "bg-[#25D366] text-[#1A1A1A] hover:bg-[#20bd5a] border-[#1A1A1A]" : ""}
        >
          {isReady ? (
            <>Send via WhatsApp <MessageCircle aria-hidden="true" /></>
          ) : (
            <>Send via Email <Send aria-hidden="true" /></>
          )}
        </Button>

        {isReady && (
          <button
            type="button"
            onClick={() => setPhase("idle")}
            className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/60 underline underline-offset-4 hover:text-[#1A1A1A]"
          >
            Edit details
          </button>
        )}
      </div>

      <p className="mt-3 text-xs font-medium text-[#1A1A1A]/60">
        {isReady ? (
          <>All details look good — the button now sends to WhatsApp ({siteConfig.phoneDisplay[0]}) with everything pre-filled. One tap to open.</>
        ) : (
          <>Frontend-only form — we&apos;ll check your details first, then the same button becomes WhatsApp. No data stored. Reply within 24h.</>
        )}
      </p>
    </form>
  );
}
