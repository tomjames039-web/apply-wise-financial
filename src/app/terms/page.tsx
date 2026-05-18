"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Terms & Conditions
            </h1>
            <p className="text-navy/60">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg text-navy/80">

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">1. Introduction</h2>
            <p>
              These terms and conditions govern your use of the Apply Wise website and services.
              By accessing our website or using our services, you agree to be bound by these terms.
            </p>
            <p>
              Apply Wise Financial is a trading style of Apply Wise Ltd, registered in England and Wales
              (Company Number: 12345678). We are authorised and regulated by the Financial Conduct
              Authority (FCA Register Number: 123456).
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">2. Our Services</h2>
            <p>
              Apply Wise provides mortgage broking services, helping customers find and apply for
              mortgage products that suit their needs. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mortgage advice and recommendations</li>
              <li>Comparison of mortgage products from multiple lenders</li>
              <li>Assistance with mortgage applications</li>
              <li>Information and educational content about mortgages</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">3. Eligibility</h2>
            <p>
              To use our services, you must be at least 18 years old and a UK resident. You must
              provide accurate and complete information when using our services.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">4. Our Advice</h2>
            <p>
              When we provide mortgage advice, we will assess your needs and circumstances and
              recommend products that are suitable for you. However, you are responsible for
              ensuring that any mortgage you apply for is affordable and appropriate for your situation.
            </p>
            <p>
              We do not provide advice on matters outside our regulatory permissions, including
              tax advice, legal advice, or investment advice.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">5. Fees and Charges</h2>
            <p>
              We do not charge a fee for our initial consultation or mortgage recommendation service.
              We receive commission from lenders when a mortgage application is completed successfully.
            </p>
            <p>
              For certain Buy-to-Let applications, we may charge an arrangement fee. This will be
              clearly disclosed to you before you proceed.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">6. Your Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Inform us of any changes to your circumstances</li>
              <li>Read and understand any documents before signing</li>
              <li>Make mortgage payments on time</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">7. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and software, is the
              property of Apply Wise Ltd or our licensors and is protected by copyright law.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">8. Limitation of Liability</h2>
            <p>
              While we take reasonable care in providing our services, we cannot guarantee the
              accuracy of information provided by third parties, including lenders. We are not
              liable for any loss arising from your reliance on such information.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">9. Complaints</h2>
            <p>
              If you are unhappy with our services, please contact us at info@apply-wise.co.uk.
              We have a formal complaints procedure and will respond within 8 weeks. If you remain
              dissatisfied, you may be able to refer your complaint to the Financial Ombudsman Service.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">10. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. The current version will always be
              available on our website. Continued use of our services after changes constitutes
              acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about these terms, please contact us at:
            </p>
            <p>
              Apply Wise Financial Ltd<br />
              4 Fiddlers Hamlet<br />
              Epping, CM16 7PY<br />
              Email: info@apply-wise.co.uk
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
