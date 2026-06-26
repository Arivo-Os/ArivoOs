import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Arivo team. Reach us at support@arivoai.in or send a message through our contact form.",
  alternates: { canonical: "https://arivoai.in/contact" },
  openGraph: {
    title: "Contact Us — Arivo",
    description:
      "Contact the Arivo team for support, partnerships, or product questions.",
    url: "https://arivoai.in/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <section
        aria-labelledby="contact-hero-heading"
        className="border-b border-black/8 bg-arivo-surface pt-32 pb-12"
      >
        <div className="mx-auto max-w-[900px] px-7">
          <span className="section-label">Contact</span>
          <h1
            id="contact-hero-heading"
            className="mb-4 font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold tracking-tight text-arivo-text"
          >
            Contact Us
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-arivo-muted">
            Have a question about Arivo? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section aria-label="Contact information and form" className="py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-7">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <aside className="space-y-6">
              <div className="rounded-2xl border border-black/8 bg-white p-6 sm:p-7">
                <h2 className="mb-5 font-display text-lg font-bold text-arivo-text">
                  Get in touch
                </h2>

                <div className="space-y-4">
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
                      Support Email
                    </span>
                    <Link
                      href="mailto:support@arivoai.in"
                      className="text-base font-semibold text-arivo-primary transition-colors hover:underline"
                    >
                      support@arivoai.in
                    </Link>
                  </div>

                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
                      Website
                    </span>
                    <Link
                      href="https://arivoai.in"
                      className="text-base font-semibold text-arivo-primary transition-colors hover:underline"
                    >
                      https://arivoai.in
                    </Link>
                  </div>
                </div>
              </div>

              <p className="rounded-xl border border-arivo-primary/15 bg-arivo-primary/6 px-5 py-4 text-sm leading-relaxed text-arivo-text">
                Our team typically responds within{" "}
                <strong>1–2 business days</strong>.
              </p>
            </aside>

            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
