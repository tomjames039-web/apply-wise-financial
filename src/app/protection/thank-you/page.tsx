"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ProtectionThankYouPage() {
  useEffect(() => {
    // Track conversion
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
        event_category: "protection",
        event_label: "booking_complete",
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              You're All Set!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/60 mb-8"
            >
              Your protection review has been booked successfully.
            </motion.p>

            {/* What's Next Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 text-left"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Happens Next?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">We'll call you</p>
                    <p className="text-white/50 text-sm">A protection specialist will contact you within 2 hours during business hours (Mon-Fri, 9am-6pm).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">We'll review your needs</p>
                    <p className="text-white/50 text-sm">We'll discuss your circumstances and understand exactly what protection you need.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">We'll find the best options</p>
                    <p className="text-white/50 text-sm">We compare policies from 20+ leading UK insurers to find the right cover at the best price.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">No pressure decision</p>
                    <p className="text-white/50 text-sm">We'll present your options clearly. You decide if and when to proceed — no hard sell.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Confirmation Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-3 text-amber-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Check your email for confirmation details</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/"
                className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-all"
              >
                Back to Home
              </Link>
              <Link
                href="/guides"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                Read Our Guides
              </Link>
            </motion.div>

            {/* Contact Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/40 text-sm mt-10"
            >
              Questions? Call us on{" "}
              <a href="tel:01992535555" className="text-amber-400 hover:underline">
                01992 535 555
              </a>{" "}
              or email{" "}
              <a href="mailto:info@apply-wise.co.uk" className="text-amber-400 hover:underline">
                info@apply-wise.co.uk
              </a>
            </motion.p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
