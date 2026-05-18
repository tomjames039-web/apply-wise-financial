"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function ConveyancingThankYouPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-pearl overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-24 h-24 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Quote Request Received
              </h1>
              <p className="text-navy/70 text-lg mb-8">
                Thank you for your conveyancing quote request. Our panel solicitors will be in touch shortly with your personalised quote.
              </p>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white border border-navy/10 rounded-xl mb-8 text-left">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    What Happens Next
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Quote Review",
                        description: "Our solicitors will review your details and prepare a comprehensive quote.",
                      },
                      {
                        step: "2",
                        title: "Quote Delivery",
                        description: "You'll receive your quote via email, typically within 24 hours.",
                      },
                      {
                        step: "3",
                        title: "Next Steps",
                        description: "Once you're happy, simply confirm and we'll get started on your conveyancing.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy">{item.title}</h3>
                          <p className="text-navy/60 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-navy/5 rounded-xl p-6 mb-8"
            >
              <p className="text-navy/70 text-sm">
                Have questions? Contact us at{" "}
                <a href="tel:01992535555" className="text-gold font-semibold hover:underline">
                  01992 535 555
                </a>{" "}
                or{" "}
                <a href="mailto:info@apply-wise.co.uk" className="text-gold font-semibold hover:underline">
                  info@apply-wise.co.uk
                </a>
              </p>
            </motion.div>

            {/* Return Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/">
                <motion.button
                  className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Return to Homepage
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cross-Sell Section */}
      <section className="py-16 bg-white border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-navy mb-3">
                While You're Here...
              </h2>
              <p className="text-navy/60">
                Make sure you're fully protected during your property transaction
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Protection Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link href="/protection">
                  <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                        Life & Protection Insurance
                      </h3>
                      <p className="text-navy/60 text-sm mb-4">
                        Protect your new home and family with the right cover. Get a free protection review.
                      </p>
                      <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Check your options
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* Mortgage Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link href="/remortgage">
                  <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                        Mortgage Rate Check
                      </h3>
                      <p className="text-navy/60 text-sm mb-4">
                        Is your mortgage deal ending soon? Compare rates from 90+ lenders.
                      </p>
                      <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Compare rates
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-pearl border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-navy/50">
            <div className="flex items-center gap-2">
              <div className="bg-[#003B5C] rounded px-2 py-0.5">
                <span className="text-white font-bold text-xs tracking-tight">FCA</span>
              </div>
              <span>Regulated</span>
            </div>
            <span className="text-gold">•</span>
            <span>Panel of Trusted Solicitors</span>
            <span className="text-gold">•</span>
            <span>Competitive Fixed Fees</span>
            <span className="text-gold">•</span>
            <span>No Hidden Costs</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
