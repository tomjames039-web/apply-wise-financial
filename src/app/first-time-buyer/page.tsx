"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function FirstTimeBuyerPage() {
  return (
    <main className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section - Centered Design */}
      <section className="relative min-h-[70vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              First Time Buyer?
              <br />
              <span className="text-gold">Your First Home Awaits</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Buying your first home is exciting but can feel overwhelming. We're here to guide you through every step with expert advice tailored to first-time buyers.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Access to 90+ lenders",
                "Government scheme experts",
                "No stamp duty up to £425k",
                "Free, impartial advice",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-navy/70">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/apply">
                <motion.button
                  className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Calculate Affordability
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-4 text-xs text-navy/40 tracking-wide mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lender Logos Section */}
      <section className="py-10 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Access to 90+ lenders including
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {["NatWest", "Nationwide", "Barclays", "Halifax", "Santander", "HSBC"].map((lender) => (
              <span key={lender} className="text-navy/60 font-semibold text-sm md:text-base hover:text-navy transition-colors">
                {lender}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                What First Time Buyers Need to Know
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Understanding the basics will help you prepare for your first mortgage
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Deposit",
                description: "Most lenders require at least 5-10% deposit. The more you save, the better rates you'll get."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                title: "Credit Score",
                description: "A good credit score helps you access better rates. Check yours before applying."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                ),
                title: "Affordability",
                description: "Lenders typically offer 4-4.5x your annual income, depending on your circumstances."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
                title: "Stamp Duty",
                description: "First time buyers pay no stamp duty on properties up to £425,000 in England."
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center p-6 bg-pearl rounded-xl">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-navy/70">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Government Schemes for First Time Buyers
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Take advantage of schemes designed to help you get on the property ladder
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-navy mb-4">Lifetime ISA</h3>
                <p className="text-navy/70 mb-4">
                  Save up to £4,000 per year and get a 25% government bonus. Use it towards your first home
                  deposit or retirement.
                </p>
                <ul className="space-y-2 text-navy/70">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    25% bonus on savings
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Property must be under £450,000
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-navy mb-4">Shared Ownership</h3>
                <p className="text-navy/70 mb-4">
                  Buy a share of your home (25-75%) and pay rent on the rest. You can buy more shares
                  over time through "staircasing".
                </p>
                <ul className="space-y-2 text-navy/70">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lower deposit required
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Smaller mortgage needed
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Your Journey to Home Ownership
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                We'll guide you through every step of the process
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Save Your Deposit" },
              { step: "2", title: "Get a Decision in Principle" },
              { step: "3", title: "Find Your Home" },
              { step: "4", title: "Make an Offer" },
              { step: "5", title: "Complete & Move In" }
            ].map((item, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-navy">{item.title}</h3>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Ready to Buy Your First Home?
            </h2>
            <p className="text-lg text-navy/70 mb-8 max-w-2xl mx-auto">
              Speak to one of our first-time buyer specialists today and get expert guidance
              through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <motion.button
                  className="px-10 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  className="px-10 py-4 border border-navy/20 text-navy font-medium rounded-lg hover:bg-navy/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Calculate Affordability
                </motion.button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </main>
  );
}
