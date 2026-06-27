import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — Arivo AI Personal Finance App",
  description:
    "Learn how Arivo collects, uses, and protects your personal and financial information. Effective June 2026.",
  path: "/privacy",
  keywords: ["Arivo privacy policy", "data protection", "financial app privacy India"],
});

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Effective Date: June 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
    >
      <LegalSection title="Introduction">
        <p>
          Arivo values your privacy and is committed to protecting your personal
          information. This Privacy Policy explains what information we collect,
          how we use it, and the choices available to you.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>We may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Name (if provided)</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Financial information you choose to enter</li>
          <li>Goals and financial preferences</li>
          <li>Device information</li>
          <li>Crash reports</li>
          <li>Analytics information</li>
          <li>App usage information</li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>We use information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide personalized financial insights</li>
          <li>Generate AI-powered recommendations</li>
          <li>Improve decision quality</li>
          <li>Secure user accounts</li>
          <li>Prevent fraud</li>
          <li>Improve product performance</li>
          <li>Provide customer support</li>
        </ul>
      </LegalSection>

      <LegalSection title="AI & Financial Guidance">
        <p>
          Arivo uses artificial intelligence to provide financial insights and
          recommendations.
        </p>
        <p>
          AI-generated responses are informational only and should not be
          considered financial, investment, tax, or legal advice.
        </p>
        <p>Users remain responsible for their financial decisions.</p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We use industry-standard security practices including encryption during
          transmission, secure authentication, and access controls designed to
          protect your information.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>Arivo may integrate with services including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Firebase</li>
          <li>Google Play Services</li>
          <li>Razorpay</li>
          <li>AI service providers</li>
          <li>Cloud hosting providers</li>
        </ul>
        <p>
          These providers process information according to their own privacy
          policies.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>You may request to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access your information</li>
          <li>Update your information</li>
          <li>Delete your account</li>
          <li>Delete your stored data</li>
        </ul>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>Arivo is not intended for individuals under 18 years of age.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>This Privacy Policy may be updated periodically.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Email:{" "}
          <Link
            href="mailto:support@arivoai.in"
            className="link-accent"
          >
            support@arivoai.in
          </Link>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
