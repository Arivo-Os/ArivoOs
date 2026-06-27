import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Arivo team. Reach us at support@arivoai.in or send a message through our contact form.",
  alternates: { canonical: "https://arivoai.in/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-page">
      <PageHero label="Contact" title="Contact Us" description="Have a question about Arivo? We're here to help." />

      <section aria-label="Contact information and form" className="page-section">
        <div className="mx-auto max-w-[900px] px-6 lg:px-8">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <aside className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
                <h2 className="mb-5 font-display text-lg font-bold text-ink">Get in touch</h2>
                <div className="space-y-4">
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink-muted">Support Email</span>
                    <Link href="mailto:support@arivoai.in" className="text-base font-semibold text-brand-green hover:underline">support@arivoai.in</Link>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink-muted">Website</span>
                    <Link href="https://arivoai.in" className="text-base font-semibold text-brand-green hover:underline">https://arivoai.in</Link>
                  </div>
                </div>
              </div>
              <p className="rounded-xl border border-brand-green/20 bg-brand-green/5 px-5 py-4 text-sm leading-relaxed text-ink">
                Our team typically responds within <strong>1–2 business days</strong>.
              </p>
            </aside>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
