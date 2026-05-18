"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function BlogContent() {
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const existingScript = document.querySelector(
      'script[src="https://app.trysoro.com/api/embed/7ae2cb24-e757-4244-8e05-7ab285de99bb"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://app.trysoro.com/api/embed/7ae2cb24-e757-4244-8e05-7ab285de99bb";
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-pearl pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Insights & Advice
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 tracking-tight">
              Mortgage <span className="text-gold">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed">
              Expert insights, guides, and tips to help you make informed
              decisions about your mortgage journey
            </p>
          </motion.div>

          {/* Soro Blog Widget Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {/* Loading state while Soro widget loads */}
            <div
              id="soro-blog"
              className="min-h-[500px] bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden"
            >
              {/* Placeholder while loading */}
              <div className="flex items-center justify-center h-[500px] text-navy/40">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-navy/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm">Loading articles...</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-navy rounded-2xl p-10 md:p-16 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Mortgage Journey?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Get expert advice tailored to your situation. Our team is here
                to help you find the best mortgage deal.
              </p>
              <a
                href="/apply"
                className="inline-block bg-gold text-navy font-semibold py-4 px-10 rounded-lg text-base uppercase tracking-wide hover:bg-gold/90 transition-colors"
              >
                Get Free Advice
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
