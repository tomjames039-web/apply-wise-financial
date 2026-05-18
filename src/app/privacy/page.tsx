"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Privacy Policy
            </h1>
            <p className="text-navy/60">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg text-navy/80">

            <p className="lead text-xl">
              At Apply Wise, we take your privacy seriously. This policy explains how we collect,
              use, and protect your personal information.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">1. Who We Are</h2>
            <p>
              Apply Wise Financial is a trading style of Apply Wise Ltd. We are the data controller
              responsible for your personal data. Our Data Protection Officer can be contacted at
              info@apply-wise.co.uk.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, address, email address, and phone number</li>
              <li>Date of birth and National Insurance number</li>
              <li>Employment details and income information</li>
              <li>Bank statements and financial information</li>
              <li>Credit history (obtained with your consent)</li>
            </ul>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide mortgage advice and services</li>
              <li>Process mortgage applications on your behalf</li>
              <li>Communicate with you about your application</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Improve our services and website</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">4. Legal Basis for Processing</h2>
            <p>We process your data based on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contract:</strong> To provide our services to you</li>
              <li><strong>Legal obligation:</strong> To comply with FCA regulations</li>
              <li><strong>Legitimate interest:</strong> To improve our services</li>
              <li><strong>Consent:</strong> For marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">5. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mortgage lenders to process your application</li>
              <li>Credit reference agencies to check your credit history</li>
              <li>Solicitors and conveyancers involved in your purchase</li>
              <li>Our service providers who help us operate our business</li>
              <li>Regulatory bodies when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">6. Data Security</h2>
            <p>
              We use industry-standard security measures to protect your data, including encryption,
              secure servers, and access controls. We regularly review and update our security practices.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">7. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to provide our services and
              comply with legal obligations. For mortgage applications, we typically retain data
              for 6 years after the relationship ends.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">8. Your Rights</h2>
            <p>Under data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">9. Contact Us</h2>
            <p>
              To exercise your rights or ask questions about this policy, contact our Data Protection
              Officer at info@apply-wise.co.uk or write to us at:
            </p>
            <p>
              Data Protection Officer<br />
              Apply Wise Financial Ltd<br />
              4 Fiddlers Hamlet<br />
              Epping, CM16 7PY
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">10. Complaints</h2>
            <p>
              You have the right to complain to the Information Commissioner's Office (ICO) if you
              believe we have not handled your data correctly. Visit ico.org.uk for more information.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
