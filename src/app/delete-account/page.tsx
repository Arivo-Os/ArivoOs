import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";
import { AccountDeletionForm } from "@/components/sections/AccountDeletionForm";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Delete Your Arivo Account",
  description:
    "Request permanent deletion of your Arivo account and associated personal data. Submit a form or email support@arivoai.in.",
  path: "/delete-account",
  keywords: ["delete Arivo account", "account deletion", "data deletion request"],
});

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
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Delete Account" }]}
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

        <div className="mt-6 glass-card p-5">
          <p className="mb-2 text-sm font-semibold text-white">
            Alternatively, email us at:
          </p>
          <Link
            href="mailto:support@arivoai.in?subject=Account%20Deletion%20Request"
            className="link-accent text-base font-semibold"
          >
            support@arivoai.in
          </Link>
          <p className="mt-3 text-sm text-arivo-muted">
            Subject: <strong className="text-white">Account Deletion Request</strong>
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Confirmation">
        <p className="callout px-5 py-4">
          We will verify your identity and process eligible deletion requests within{" "}
          <strong>7 business days</strong>.
        </p>
      </LegalSection>

      <nav
        aria-label="Related pages"
        className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-8"
      >
        {pageLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-arivo-muted transition-colors hover:text-[#22C55E]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </LegalPageLayout>
  );
}
