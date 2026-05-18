"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

// Why remortgage reasons
const remortgageReasons = [
  {
    title: "Lower Your Monthly Payments",
    description: "A better rate could reduce what you pay each month — sometimes by hundreds of pounds.",
  },
  {
    title: "Fix Your Rate",
    description: "Lock in a fixed rate to protect yourself from future interest rate rises and budget with certainty.",
  },
  {
    title: "Release Equity",
    description: "Access the value built up in your home for renovations, investments, or other purposes.",
  },
  {
    title: "Escape the SVR",
    description: "If your deal has ended, you're likely on an expensive Standard Variable Rate. Time to move.",
  },
  {
    title: "Change Your Term",
    description: "Extend to reduce payments, or shorten to pay off sooner and save on total interest.",
  },
  {
    title: "Consolidate Debt",
    description: "Roll high-interest debts into your mortgage — potentially lowering your overall monthly outgoings.",
  },
];

// When to remortgage signals
const remortgageSignals = [
  "Your current fixed or tracker deal is ending in the next 6 months",
  "You're on your lender's Standard Variable Rate (SVR)",
  "Your property has increased in value since you bought",
  "Your credit score has improved",
  "Interest rates have dropped since you got your mortgage",
  "You need to borrow more against your property",
];

// Process steps
const processSteps = [
  {
    step: "1",
    title: "Quick Review",
    description: "Tell us about your current mortgage — takes 2 minutes",
  },
  {
    step: "2",
    title: "Full Market Search",
    description: "We compare your lender's offer against 90+ other lenders",
  },
  {
    step: "3",
    title: "Clear Recommendation",
    description: "We tell you whether to stay or switch — and why",
  },
  {
    step: "4",
    title: "We Handle Everything",
    description: "From application to completion, we manage the process",
  },
];

export default function RemortgagePage() {
  return (
    <main className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section - Matches Homepage Design */}
      <section className="relative min-h-[75vh] flex items-center bg-pearl pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Remortgaging Your Property?
              <br />
              <span className="text-gold">You Could Be Overpaying Without Realising</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Most homeowners stay with their lender because it's easy — not because it's the best deal.
            </motion.p>

            {/* Key insight line */}
            <motion.p
              className="text-base text-navy/50 mb-10 max-w-xl mx-auto italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Most people don't check the wider market — and end up overpaying.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Compare your current lender vs whole market",
                "No fee for product transfers",
                "Potential to save £100s per month",
                "Secure a rate up to 6 months early",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-navy/70">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons - Matching Homepage Style */}
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
                  Review My Mortgage
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
                  Calculate Savings
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
              <div className="flex items-center gap-1.5">
                <img src="/logos/fca.png" alt="FCA Regulated" className="h-5 w-auto" />
                <span>Regulated</span>
              </div>
              <span className="text-gold">•</span>
              <span>90+ Lenders</span>
              <span className="text-gold">•</span>
              <span>Free Service</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lender Logos Section */}
      <section className="py-10 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Compare your current lender against 90+ others
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <img src="/logos/natwest.png" alt="NatWest" className="h-8 w-auto object-contain" />
            <img src="/logos/nationwide.png" alt="Nationwide" className="h-8 w-auto object-contain" />
            <img src="/logos/barclays.png" alt="Barclays" className="h-8 w-auto object-contain" />
            <img src="/logos/halifax.png" alt="Halifax" className="h-8 w-auto object-contain" />
            <img src="/logos/santander.png" alt="Santander" className="h-8 w-auto object-contain" />
            <img src="/logos/hsbc.png" alt="HSBC" className="h-8 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Stay or Switch Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Stay or Switch — We'll Tell You the Right Move
                </h2>
                <p className="text-navy/60 max-w-2xl mx-auto">
                  Not every remortgage means switching lenders. Sometimes staying is the smarter choice. We'll compare both options and give you a straight answer.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollAnimation delay={0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">When Staying Makes Sense</h3>
                    <ul className="space-y-3 text-navy/70">
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>Your current lender's retention deal is genuinely competitive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>Switching costs would outweigh the savings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>Your circumstances make a new application difficult</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">When Switching Wins</h3>
                    <ul className="space-y-3 text-navy/70">
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>Better rates are available elsewhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>Your LTV has improved since you last applied</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold mt-1">—</span>
                        <span>You need features your current lender doesn't offer</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            <ScrollAnimation delay={0.3}>
              <p className="text-center text-navy/60 mt-8 max-w-2xl mx-auto">
                We don't push you either way. We compare the numbers and recommend what's genuinely best for your situation.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Product Transfer Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-navy/5">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">
                      Product Transfers — No Fee, No Catch
                    </h3>
                    <p className="text-navy/70 mb-4 leading-relaxed">
                      If staying with your current lender is the best option, we'll arrange it for you at no cost. We're paid a small fee by the lender — so there's nothing for you to pay.
                    </p>
                    <p className="text-navy/70 leading-relaxed">
                      A product transfer is often simpler and faster than a full remortgage. No new valuation, no solicitor, no stress. We'll tell you if this is the right route for you.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <span className="inline-flex items-center gap-2 text-sm text-navy/60 bg-pearl px-4 py-2 rounded-full">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        No broker fee
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-navy/60 bg-pearl px-4 py-2 rounded-full">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        No valuation needed
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-navy/60 bg-pearl px-4 py-2 rounded-full">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        No solicitor required
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Why Remortgage Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Reasons to Review Your Mortgage
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                If any of these apply to you, it's worth checking your options.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {remortgageReasons.map((reason, index) => (
              <ScrollAnimation key={reason.title} delay={index * 0.08}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-navy mb-2">{reason.title}</h3>
                    <p className="text-navy/60 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* When to Remortgage */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
                Signs It's Time to Act
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-navy/5">
                <ul className="space-y-5">
                  {remortgageSignals.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-7 h-7 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-navy/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                How It Works
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                We keep it simple. No jargon, no pressure, just clear advice.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((item, index) => (
              <ScrollAnimation key={item.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-navy font-semibold mb-2">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Could You Be Paying Less?
              </h2>
              <p className="text-navy/60 mb-8 max-w-xl mx-auto">
                Use our calculator to see what a rate change could mean for your monthly payments.
              </p>
              <Link href="/calculator">
                <motion.button
                  className="px-8 py-4 bg-pearl text-navy font-semibold rounded-lg border border-navy/10 hover:bg-navy hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Our Calculator
                </motion.button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Check Your Options Properly
              </h2>
              <p className="text-navy/60 mb-8">
                Whether you stay or switch, you'll know you made the right choice.
              </p>
              <Link href="/apply">
                <motion.button
                  className="px-10 py-4 bg-navy text-white font-semibold text-lg rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Review My Mortgage
                </motion.button>
              </Link>
              <p className="text-navy/40 text-sm mt-4">
                No obligation • No credit impact • We'll review everything properly
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
