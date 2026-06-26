import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing your use of the Arivo AI-powered financial decision engine. Read our disclaimers, eligibility requirements, and user responsibilities.",
  alternates: { canonical: "https://arivoai.in/terms" },
  openGraph: {
    title: "Terms & Conditions — Arivo",
    description:
      "Terms of use for Arivo — AI-powered financial guidance for informational purposes only.",
    url: "https://arivoai.in/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" subtitle="Effective Date: June 2026">
      <div className="rounded-xl border border-arivo-primary/15 bg-arivo-primary/6 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-arivo-text">
          <strong>Important:</strong> Arivo provides AI-powered financial guidance
          for informational purposes only and does not provide financial,
          investment, legal, or tax advice. Users should consult qualified
          professionals before making significant financial decisions.
        </p>
      </div>

      <LegalSection title="Acceptance of Terms">
        <p>
          By accessing or using Arivo&apos;s website, mobile application, or
          related services (collectively, the &quot;Services&quot;), you agree to
          be bound by these Terms &amp; Conditions. If you do not agree, please do
          not use the Services.
        </p>
      </LegalSection>

      <LegalSection title="Eligibility">
        <p>
          You must be at least 18 years of age and capable of entering into a
          legally binding agreement under applicable law to use Arivo. By using the
          Services, you represent that you meet these requirements.
        </p>
      </LegalSection>

      <LegalSection title="User Responsibilities">
        <p>When using Arivo, you agree to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide accurate and complete information where requested</li>
          <li>Use the Services only for lawful, personal purposes</li>
          <li>Keep your account credentials secure and confidential</li>
          <li>Not misuse, reverse engineer, or attempt to disrupt the Services</li>
          <li>Make your own informed decisions based on your unique circumstances</li>
        </ul>
      </LegalSection>

      <LegalSection title="AI-Generated Financial Guidance">
        <p>
          Arivo uses artificial intelligence to analyze information you provide and
          generate financial insights, recommendations, and scenario outcomes.
        </p>
        <p>
          All AI-generated content is provided for informational and educational
          purposes only. It does not constitute financial, investment, tax, legal,
          or professional advice. Arivo is not a registered investment advisor,
          broker-dealer, or financial planner.
        </p>
        <p>
          You are solely responsible for evaluating any guidance and for the
          financial decisions you make.
        </p>
      </LegalSection>

      <LegalSection title="No Investment Guarantee">
        <p>
          Arivo does not guarantee any specific financial outcome, return on
          investment, or result from following its recommendations. Past
          performance, projections, or simulations do not guarantee future
          results. Financial markets and personal circumstances involve risk, and
          you may lose money.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content, software, branding, designs, and technology underlying
          Arivo are owned by Arivo or its licensors and are protected by
          applicable intellectual property laws. You may not copy, modify,
          distribute, or create derivative works without prior written consent.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Arivo and its founders,
          employees, and affiliates shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from
          your use of the Services or reliance on AI-generated guidance.
        </p>
        <p>
          Our total liability for any claim related to the Services shall not
          exceed the amount you paid to Arivo in the twelve months preceding the
          claim, or INR 1,000, whichever is greater.
        </p>
      </LegalSection>

      <LegalSection title="Termination">
        <p>
          We may suspend or terminate your access to the Services at any time if
          you violate these Terms or if we discontinue the Services. You may stop
          using Arivo at any time and request account deletion by contacting us.
        </p>
      </LegalSection>

      <LegalSection title="Changes to Terms">
        <p>
          We may update these Terms &amp; Conditions from time to time. Continued
          use of the Services after changes are posted constitutes acceptance of
          the revised Terms. We encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms &amp; Conditions are governed by and construed in accordance
          with the laws of India. Any disputes arising under these Terms shall be
          subject to the exclusive jurisdiction of the courts located in India.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about these Terms, contact us at{" "}
          <Link
            href="mailto:support@arivoai.in"
            className="font-medium text-arivo-primary transition-colors hover:underline"
          >
            support@arivoai.in
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
