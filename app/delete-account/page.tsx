import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";
import { AccountDeletionForm } from "@/components/sections/AccountDeletionForm";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Request permanent deletion of your Arivo account and associated personal data. Submit a form or email support@arivoai.in.",
  alternates: { canonical: "https://arivoai.in/delete-account" },
  openGraph: {
    title: "Delete Your Arivo Account",
    description:
      "Request deletion of your Arivo account, financial data, and personal information.",
    url: "https://arivoai.in/delete-account",
  },
};

const pageLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
];

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      label="Account"
      title="Delete Your Arivo Account"
      subtitle="You have the right to request deletion of your Arivo account and associated personal data."
    >
      <LegalSection title="Overview">
        <p>
          You can permanently delete your Arivo account and the personal information
          associated with it by submitting a deletion request below. Once verified and
          processed, your account will be removed and eligible data will be deleted
          from our systems.
        </p>
      </LegalSection>

      <LegalSection title="What will be deleted">
        <ul className="list-disc space-y-2 pl-5">
          <li>Profile information</li>
          <li>Mobile number</li>
          <li>Financial goals</li>
          <li>Financial data entered into Arivo</li>
          <li>AI conversation history (if stored)</li>
          <li>Preferences</li>
          <li>Associated personal information</li>
        </ul>
      </LegalSection>

      <LegalSection title="What may be retained">
        <p>
          Certain information may be retained for a limited period where required by
          applicable law, fraud prevention, security, dispute resolution, or regulatory
          compliance.
        </p>
      </LegalSection>

      <LegalSection title="How to request deletion">
        <p className="mb-6">
          Complete the form below to submit your account deletion request. You can
          also email us directly if you prefer.
        </p>

        <AccountDeletionForm />

        <div className="mt-6 rounded-xl border border-black/8 bg-arivo-surface p-5">
          <p className="mb-2 text-sm font-semibold text-arivo-text">
            Alternatively, email us at:
          </p>
          <Link
            href="mailto:support@arivoai.in?subject=Account%20Deletion%20Request"
            className="text-base font-semibold text-arivo-primary transition-colors hover:underline"
          >
            support@arivoai.in
          </Link>
          <p className="mt-3 text-sm text-arivo-muted">
            Subject: <strong className="text-arivo-text">Account Deletion Request</strong>
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Confirmation">
        <p className="rounded-xl border border-arivo-primary/15 bg-arivo-primary/6 px-5 py-4 text-arivo-text">
          We will verify your identity and process eligible deletion requests within{" "}
          <strong>7 business days</strong>.
        </p>
      </LegalSection>

      <nav
        aria-label="Related pages"
        className="flex flex-wrap gap-x-6 gap-y-2 border-t border-black/8 pt-8"
      >
        {pageLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-arivo-muted transition-colors hover:text-arivo-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </LegalPageLayout>
  );
}
