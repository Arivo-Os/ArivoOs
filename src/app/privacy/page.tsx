import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — Arivo",
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
      <div className="callout p-5 sm:p-6 mb-8 border-l-4 border-brand-green/70 bg-brand-green/[0.03]">
        <p className="text-sm leading-relaxed text-app-muted">
          <strong>Privacy Commitment:</strong> Arivo values the privacy of your financial data. We do not sell your personal or financial information, and we utilize encryption in transit and secure databases to protect your profile.
        </p>
      </div>

      <LegalSection title="1. Introduction">
        <p>
          Arivo (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an AI-powered financial decision companion. This Privacy Policy outlines our practices regarding the collection, use, sharing, and protection of your personal and financial data when you access our website, applications, or API integrations (collectively, the &quot;Services&quot;).
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>
          To provide you with personalized financial insights and tracking capabilities, we collect different types of data:
        </p>
        
        <h3 className="text-sm font-semibold mt-4 mb-2 text-app-foreground">a. Information You Provide Directly</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Google Account Information:</strong> When signing in, we collect your name, email address, profile picture URL, and a unique Google identifier to create and manage your secure account.</li>
          <li><strong>Financial Profiles:</strong> Any details you voluntarily enter, including your income, monthly savings, expense categories, financial goals, assets, and liabilities.</li>
          <li><strong>Chat & Conversation History:</strong> Message logs, prompts, and queries you send to the Arivo AI assistant, alongside context generated to answer your financial questions.</li>
        </ul>

        <h3 className="text-sm font-semibold mt-4 mb-2 text-app-foreground">b. Information Collected Automatically</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Device & Browser Information:</strong> IP addresses, operating system versions, browser types, screen resolutions, and crash logs to optimize app stability.</li>
          <li><strong>Usage Metrics:</strong> Page navigation logs, feature engagement, response speeds, and click-through actions to measure performance and guide app design.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>
          We use your data strictly to operate and refine the Arivo platform:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Authentication:</strong> Logging you in securely using your Google Credentials.</li>
          <li><strong>AI Analysis:</strong> Generating custom budgeting, saving, and scenario insights based on your financial inputs and questions.</li>
          <li><strong>Product Improvements:</strong> Analyzing aggregated usage metrics to find bugs, optimize page speeds, and improve AI model outputs.</li>
          <li><strong>Security & Support:</strong> Monitoring for malicious activities, maintaining uptime, and responding to support tickets.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. AI Data & Conversation Quality">
        <p>
          Your conversation logs are securely stored to enable chat continuity and history tracking in your account. 
        </p>
        <p className="font-medium text-brand-green bg-brand-green/[0.02] p-4 rounded border border-brand-green/10">
          <strong>Privacy Tip:</strong> Because Arivo is currently in Beta, conversation logs are monitored and analyzed strictly for the purpose of improving AI accuracy. Please do not share highly sensitive personally identifiable details (such as account passwords, credit card numbers, or PINs) in your chat threads.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Sharing & Non-Disclosure">
        <p>
          We take data sharing seriously:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>No Selling of Data:</strong> Arivo does not sell, trade, or rent your personal or financial information to third-party brokers, advertisers, or lead generators.</li>
          <li><strong>Service Providers:</strong> We share necessary data only with trusted infrastructure providers that power Arivo (such as database hosting, AI backend servers, and authentication partners). These partners are legally bound to protect your data.</li>
          <li><strong>Legal Requirements:</strong> We may disclose information if required by court order, law enforcement requests, or to protect the safety, rights, or property of Arivo users.</li>
          <li><strong>Business Transfers:</strong> If Arivo undergoes a merger, acquisition, or asset sale, your data may be transferred to the acquiring entity, subject to this Privacy Policy.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Data Security">
        <p>
          We implement standard physical, technical, and administrative safeguards:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>All traffic is encrypted in transit using Secure Socket Layer/Transport Layer Security (SSL/TLS).</li>
          <li>Databases are restricted using strict access controls and firewall logic.</li>
          <li>Authentication credentials are isolated using Google Sign-In protocols.</li>
        </ul>
        <p className="text-xs text-app-muted italic">
          Disclaimer: While we use extensive security measures to safeguard your information, no digital storage or transmission is 100% secure. We cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="7. User Rights & Data Deletion">
        <p>
          You hold the following rights over your data:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Access & Export:</strong> You can view your financial inputs and goal data directly inside the platform.</li>
          <li><strong>Correction:</strong> You can edit or delete your financial parameters and profile settings at any time.</li>
          <li><strong>Account Erasure:</strong> You can request the complete deletion of your account, including profile details, goal entries, and conversation history. Deletion requests are processed immediately.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Cookies and Storage">
        <p>
          We use cookies and browser local storage to maintain session continuity and save your preferences:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Essential & Auth Cookies:</strong> Required to keep you securely signed in to Arivo and process API requests.</li>
          <li><strong>Preference Storage:</strong> Saves client-side UI configurations, such as dark/light mode toggles.</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Children&apos;s Privacy">
        <p>
          Arivo is not structured or intended to attract individuals under the age of 18. If we discover that a user under 18 has submitted personal information, we will immediately purge it from our servers.
        </p>
      </LegalSection>

      <LegalSection title="10. International Transfers">
        <p>
          Arivo&apos;s servers and database infrastructure may be located in India and other countries (such as AI backend nodes). By using the Services, you consent to the transfer, storage, and processing of your information across international data centers, in compliance with applicable local rules.
        </p>
      </LegalSection>

      <LegalSection title="11. Policy Updates">
        <p>
          We reserve the right to modify this Privacy Policy. If we make material changes, we will update the &quot;Effective Date&quot; at the top of this document and notify users through inline platform notices or email. Your continued use of the Services after changes are published constitutes acknowledgment of the revised Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact Information">
        <p>
          If you have questions about this policy, want to request manual account deletion, or wish to report security issues, contact our support team at:
          {" "}
          <Link
            href="mailto:support@arivoai.in"
            className="link-accent font-medium text-brand-green hover:underline"
          >
            support@arivoai.in
          </Link>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
