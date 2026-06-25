import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Arivo",
  description: "How Arivo handles your financial data — private, never sold, never shared.",
  alternates: { canonical: "https://arivoai.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-container px-7 py-32">
      <span className="section-label">Legal</span>
      <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-arivo-text">
        Privacy Policy
      </h1>
      <p className="mb-8 max-w-xl text-lg text-arivo-muted">
        Your financial data is private, never sold, and used solely to power your decision analysis. The full privacy policy will be published before public launch.
      </p>
      <Link href="/" className="text-sm font-semibold text-arivo-primary hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
