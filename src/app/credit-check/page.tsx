"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CHECKMYFILE_LINK = "https://www.checkmyfile.partners/GW6WNNW/2CTPL/";

export default function CreditCheckPage() {
  return (
    <main className="min-h-screen bg-pearl">
      {/* Minimal header - just logo */}
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-pearl-texture pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Before You Apply
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Check Your Credit Properly Before You Apply
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Most lenders assess your credit in detail — not just a basic score.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href={CHECKMYFILE_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Check My Credit Now
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </a>
              <p className="text-sm text-navy/50 mt-4">
                7-day free trial, then £14.99/month, cancel online anytime
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Understanding Your Credit
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why This Matters
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  title: "Lenders use different credit agencies",
                  description: "Different lenders check different agencies — Experian, Equifax, or TransUnion. Your score can vary between them, and what one lender sees might differ from another.",
                },
                {
                  title: "Missed payments may appear differently",
                  description: "A missed payment might show on one credit file but not another. Small discrepancies like this can affect which lenders will approve you.",
                },
                {
                  title: "Small issues can impact approval",
                  description: "Even minor credit issues — an old address, an unknown account, or a forgotten default — can slow down or prevent your mortgage approval.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-navy/60 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Recommend Check My File Section */}
      <section className="py-16 md:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Recommendation
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why We Recommend Check My File
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  title: "Combines multiple credit agencies",
                  description: "See your data from Experian, Equifax, TransUnion, and Crediva — all in one report.",
                },
                {
                  title: "More complete picture",
                  description: "Free credit apps only show part of the story. Check My File gives you the full view.",
                },
                {
                  title: "Closer to what lenders see",
                  description: "This is the same level of detail that mortgage lenders access when assessing your application.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-lg p-5 border border-navy/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-navy"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                      <p className="text-navy/60">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Get Started
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Check My Credit Now
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <a
                href={CHECKMYFILE_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg transition-all duration-300 hover:bg-gold-light"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Check My Credit Now
                </motion.button>
              </a>

              <p className="text-white/40 text-sm mt-4">
                7-day free trial, then £14.99/month, cancel online anytime
              </p>
            </motion.div>

            {/* Final line */}
            <motion.div
              className="mt-10 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white/60 text-sm">
                Once you've downloaded your report, send it over and we'll review it with you.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <a href="mailto:info@apply-wise.co.uk" className="text-gold hover:underline text-sm">
                  info@apply-wise.co.uk
                </a>
                <span className="text-white/20">|</span>
                <a href="tel:01992535555" className="text-gold hover:underline text-sm">
                  01992 535 555
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-navy border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logos/apply-wise-logo.png"
                alt="Apply Wise"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <div className="bg-[#003B5C] rounded px-2 py-0.5">
                  <span className="text-white font-bold text-xs tracking-tight">FCA</span>
                </div>
                <span>Regulated</span>
              </div>
              <span className="text-gold">•</span>
              <span>90+ Lenders</span>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
            <p className="text-[10px] text-white/20 text-center">
              Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP (FRN: 661183).
              Your home may be repossessed if you do not keep up repayments on your mortgage.
            </p>
            <p className="text-[10px] text-white/20 text-center">
              We may receive a referral commission if you sign up to Check My File through our link.
              Your credit report is optional but recommended to help us provide accurate advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
