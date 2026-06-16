"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag?: (cmd: string, event: string, params: Record<string, string | number>) => void;
    fbq?: (cmd: string, event: string, params?: Record<string, string | number>) => void;
  }
}

// Steps for what happens next
const nextSteps = [
  {
    step: "1",
    title: "We Contact You",
    description: "We'll give you a quick call to confirm a few details.",
  },
  {
    step: "2",
    title: "We Build Your Setup",
    description: "We create your link, QR code, and materials.",
  },
  {
    step: "3",
    title: "You Share It",
    description: "Send it to your team or display the QR code.",
  },
  {
    step: "4",
    title: "We Handle Everything",
    description: "We speak directly with employees and manage the full process.",
  },
];

function ThankYouContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") || "";
  const [copied, setCopied] = useState(false);

  // Track conversion
  useEffect(() => {
    // Google Analytics conversion tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        event_category: "employer_benefits_registration",
        event_label: "form_submission",
        value: 1,
      });
    }

    // Facebook Pixel conversion tracking
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "Employer Benefits Registration",
      });
    }

    console.log("Conversion tracked:", reference);
  }, [reference]);

  const copyReference = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-pearl-texture pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <motion.div
              className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <motion.svg
                className="w-10 h-10 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Thanks — your registration has been received
            </motion.h1>

            <motion.p
              className="text-lg text-navy/70 mb-6 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We'll contact you shortly to set up your staff link, QR code and launch materials.
            </motion.p>

            {/* Reference Number */}
            {reference && (
              <motion.div
                className="inline-flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm border border-navy/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-sm text-navy/50">Your reference:</span>
                <span className="font-semibold text-navy">{reference}</span>
                <button
                  onClick={copyReference}
                  className="text-gold hover:text-gold-dark transition-colors"
                  title="Copy reference"
                >
                  {copied ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Happens Next
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {nextSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Connector line */}
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gold/30" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-navy font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy/60 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Reminder Section */}
      <section className="py-16 md:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Value
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What This Normally Costs
            </motion.h2>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-navy/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-navy/70 text-lg mb-4">
                Our full mortgage advice service typically costs up to <span className="font-bold text-navy">£695</span> per client.
              </p>
              <div className="h-px bg-navy/10 my-6" />
              <p className="text-lg">
                As part of your business setup, this is provided{" "}
                <span className="font-bold text-gold">completely free</span> to your employees.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book a Call CTA Section */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Want to Speak Sooner?
            </motion.h2>
            <motion.p
              className="text-white/60 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              If you'd like to discuss anything before we call, book a convenient time below.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://calendly.com/apply-wise/business-benefits"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
              </a>
              <a
                href="tel:01992535555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 01992 535 555
              </a>
            </motion.div>

            <motion.p
              className="text-white/40 text-sm mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Or email us at{" "}
              <a href="mailto:info@apply-wise.co.uk" className="text-gold hover:underline">
                info@apply-wise.co.uk
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-pearl border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#003B5C] rounded px-2.5 py-1">
                  <span className="text-white font-bold text-sm tracking-tight">FCA</span>
                </div>
                <span className="text-navy/60 text-sm font-medium">Regulated</span>
              </div>
              <span className="text-gold">|</span>
              <span className="text-navy/50 text-sm">90+ Lenders</span>
              <span className="text-gold">|</span>
              <span className="text-navy/50 text-sm">Whole of Market</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

function LoadingState() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-pearl-texture pt-24 pb-16">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-navy/50">Loading...</p>
      </div>
    </section>
  );
}

export default function BusinessThankYouPage() {
  return (
    <main className="min-h-screen bg-pearl">
      {/* Minimal header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/" className="inline-block">
            <img
              src="/logos/apply-wise-logo.png"
              alt="Apply Wise"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      <Suspense fallback={<LoadingState />}>
        <ThankYouContent />
      </Suspense>

      {/* Minimal Footer */}
      <footer className="py-6 bg-pearl border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-[10px] text-navy/30 text-center">
            Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP (FRN: 661183). Your home may be repossessed if you do not keep up repayments on your mortgage.
          </p>
        </div>
      </footer>
    </main>
  );
}
