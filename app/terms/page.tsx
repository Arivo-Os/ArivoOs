import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Arivo",
  description: "Terms governing use of the Arivo financial decision engine.",
  alternates: { canonical: "https://arivoai.in/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-container px-7 py-32">
      <span className="section-label">Legal</span>
      <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-arivo-text">
        Terms of Service
      </h1>
      <p className="mb-8 max-w-xl text-lg text-arivo-muted">
        Arivo is a decision intelligence tool, not a regulated financial advisor. Full terms of service will be published before public launch.
      </p>
      <Link href="/" className="text-sm font-semibold text-arivo-primary hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
