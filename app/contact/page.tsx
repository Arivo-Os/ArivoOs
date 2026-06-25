import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Arivo — Get in Touch",
  description:
    "Reach out to the Arivo team for early access questions, partnership inquiries, or product feedback.",
  alternates: { canonical: "https://arivoai.in/contact" },
  robots: { index: true, follow: false },
};

const reasons = [
  "Early access & waitlist questions",
  "Partnerships & collaborations",
  "Product feedback & ideas",
];

export default function ContactPage() {
  return (
    <main>
      <section aria-labelledby="contact-hero-heading" className="border-b border-black/8 bg-arivo-surface pt-32 pb-16">
        <div className="mx-auto max-w-container px-7">
          <span className="section-label">Contact</span>
          <h1 id="contact-hero-heading" className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight text-arivo-text">
            Get in touch.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-arivo-muted">
            Questions about Arivo, partnerships, or early access — send us a message and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section aria-label="Contact form" className="py-20 lg:py-24">
        <div className="mx-auto max-w-container px-7">
          <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="section-label">How we can help</span>
              <h2 className="mb-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-arivo-text">
                We&apos;d love to hear from you.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-arivo-muted">
                Whether you&apos;re interested in early access, partnerships, or just want to learn more — our team reads every message.
              </p>

              <ul className="mb-8 space-y-3">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-2 text-sm text-arivo-text">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-arivo-accent" aria-hidden="true">
                      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:akhileshgoswami@arivoai.in"
                  className="flex flex-1 items-center gap-3 rounded-2xl border border-black/8 bg-white p-4 transition-colors hover:border-arivo-primary/20"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-arivo-primary/10 text-arivo-primary">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z M4 7l8 6 8-6" />
                    </svg>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <small className="text-[11px] font-medium text-arivo-muted">Email us directly</small>
                    <span className="text-sm font-semibold text-arivo-text">akhileshgoswami@arivoai.in</span>
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/company/125614133/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center gap-3 rounded-2xl border border-black/8 bg-white p-4 transition-colors hover:border-arivo-primary/20"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-arivo-primary/10 text-arivo-primary">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <small className="text-[11px] font-medium text-arivo-muted">Follow us</small>
                    <span className="text-sm font-semibold text-arivo-text">LinkedIn</span>
                  </span>
                </a>
              </div>

              <p className="text-sm text-arivo-muted">Typical response within 24–48 hours.</p>
            </div>

            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
