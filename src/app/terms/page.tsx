import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/layout/LegalPageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service — Arivo",
  description:
    "Terms governing your use of the Arivo AI-powered personal finance platform. Read disclaimers, eligibility requirements, and user responsibilities.",
  path: "/terms",
  keywords: ["Arivo terms", "terms of service", "AI finance app terms India"],
});

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Effective Date: June 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
    >
      <div className="callout p-5 sm:p-6 mb-8 border-l-4 border-brand-green/70 bg-brand-green/[0.03]">
        <p className="text-sm leading-relaxed text-app-muted">
          <strong>Important Disclaimers:</strong> Arivo is an AI-powered personal finance companion in Beta. Arivo is not a bank, brokerage, insurance company, or SEBI-registered investment adviser or research analyst. All insights are for informational and educational purposes only.
        </p>
      </div>

      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using the website, mobile applications, API services, and associated platform resources provided by Arivo (collectively, the &quot;Services&quot;), you agree to comply with and be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you must not access or use the Services.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          To use Arivo, you must be at least 18 years of age (or the age of majority in your jurisdiction) and possess the legal capacity to enter into a binding contract under the laws of India. By registering for or using our Services, you warrant and represent that you meet these eligibility requirements.
        </p>
      </LegalSection>

      <LegalSection title="3. User Accounts & Google Authentication">
        <p>
          To access the full features of the platform, you must sign in. We utilize Google Authentication to manage access safely and securely. You are responsible for maintaining the confidentiality of your Google account credentials and are fully responsible for all activities that occur under your Arivo profile. You must notify us immediately of any unauthorized access to your account.
        </p>
      </LegalSection>

      <LegalSection title="4. Beta Software Disclaimer">
        <p>
          Arivo is currently in Beta. You acknowledge and agree that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The Services are under active development and may contain bugs, errors, or inaccuracies.</li>
          <li>Features, user interfaces, and functionality may change or be removed at any time without prior notice.</li>
          <li>We do not guarantee that the Services will be uninterrupted, error-free, or constantly available.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. AI-Generated Content & Disclaimers">
        <p>
          Arivo employs advanced artificial intelligence algorithms to process financial metrics and generate projections, scenario outcomes, and recommendations. You acknowledge that:
        </p>
        <ul className="list-disc space-y-2 pl-5 font-medium">
          <li>AI can make mistakes, hallucinate, or produce incomplete or inaccurate responses.</li>
          <li>AI-generated content is for educational and informational purposes only.</li>
          <li>Arivo does not provide personalized investment, tax, legal, or financial advice.</li>
          <li>You must independently verify any critical financial details before acting on them.</li>
          <li>Arivo shall not be liable for any financial losses, investment losses, or damages resulting from reliance on AI-generated responses.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Financial & Professional Services Disclaimer">
        <p>
          Arivo is not a bank, brokerage, insurance carrier, SEBI-registered investment adviser (RIA), or research analyst. We:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not execute or place financial trades.</li>
          <li>Do not recommend specific financial products, stocks, mutual funds, or insurance policies.</li>
          <li>Do not guarantee financial outcomes, returns, or success of any budget/savings strategy.</li>
          <li>Are not a substitute for professional legal, tax, investment, or estate planning advice. Always consult a qualified professional before making major financial commitments.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Acceptable Use Policy">
        <p>
          You agree not to misuse the Services. Specifically, you will not:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Services for any illegal or fraudulent activities.</li>
          <li>Attempt to reverse engineer, decompile, crawl, scrape, or extract source code from Arivo.</li>
          <li>Upload malicious code, viruses, or run automated scripts to scrape or overload our infrastructure.</li>
          <li>Transmit sensitive information unless explicitly requested by the platform&apos;s profile fields.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Accuracy of Information">
        <p>
          The quality of Arivo&apos;s insights depends on the accuracy of the financial parameters you voluntarily input. You are solely responsible for ensuring that all data inputs (income, expenses, assets, liabilities) are accurate and kept up to date.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-Party Services">
        <p>
          The Services may contain integrations or links to third-party providers (such as AI models, authentication portals, and analytics engines). We do not control, endorse, or assume responsibility for any third-party websites, terms, or services.
        </p>
      </LegalSection>

      <LegalSection title="10. Intellectual Property">
        <p>
          All trademarks, logo designs, graphics, source code, UI elements, copy, and database structures are the exclusive intellectual property of Arivo or its licensors. No license, transfer, or right is granted to you except the limited, non-exclusive right to access and use the Services under these Terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Account Suspension & Termination">
        <p>
          We reserve the right to suspend, restrict, or terminate your access to the Services at our sole discretion, without liability, if we believe you are in breach of these Terms, or if we discontinue the beta platform. You can stop using the Services at any time and request data erasure or account deletion through our profile settings.
        </p>
      </LegalSection>

      <LegalSection title="12. Disclaimer of Warranties">
        <p className="uppercase text-xs font-semibold tracking-wider text-app-muted">
          The services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, security, and non-infringement.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, in no event shall Arivo, its founders, directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, savings, or investments) arising out of or related to your use of the Services.
        </p>
        <p>
          Our total aggregate liability for any claims relating to these Terms or the Services shall not exceed INR 1,000.
        </p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Arivo and its officers, founders, and employees from and against any third-party claims, liabilities, losses, costs, or expenses (including legal fees) arising from your breach of these Terms, misuse of the Services, or violation of applicable laws.
        </p>
      </LegalSection>

      <LegalSection title="15. Governing Law & Jurisdiction">
        <p>
          These Terms shall be governed by, and construed in accordance with, the laws of India. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to these Terms">
        <p>
          We may update these Terms from time to time. If we make material modifications, we will notify you by updating the &quot;Effective Date&quot; at the top of this page or via in-app alerts. Continued use of the Services after changes are posted constitutes acceptance of the new Terms.
        </p>
      </LegalSection>

      <LegalSection title="17. Contact Information">
        <p>
          If you have questions or concerns about these Terms, you can contact the Arivo team at:
          {" "}
          <Link
            href="mailto:hello@arivoai.in"
            className="link-accent font-medium text-brand-green hover:underline"
          >
            hello@arivoai.in
          </Link>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
