"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const lifetimeMortgageFeatures = [
  {
    title: "Roll-Up Lifetime Mortgage",
    description: "The most common type. Interest is added to the loan each month and compounds over time. No monthly payments required.",
    pros: ["No monthly payments", "Flexible use of funds", "Stay in your home for life"],
    cons: ["Interest compounds quickly", "Reduces inheritance", "Higher total cost over time"],
  },
  {
    title: "Interest-Only Lifetime Mortgage",
    description: "You make monthly interest payments to prevent the loan balance growing. The original loan is repaid when the property is sold.",
    pros: ["Loan balance stays the same", "More inheritance preserved", "Lower total cost"],
    cons: ["Monthly payments required", "Must prove affordability", "Payments could become difficult"],
  },
  {
    title: "Drawdown Lifetime Mortgage",
    description: "Access a cash reserve over time rather than taking everything upfront. Interest only charged on what you've withdrawn.",
    pros: ["Reduces interest costs", "Flexible access to funds", "Can preserve more equity"],
    cons: ["Reserve not guaranteed", "May not access full amount", "Requires financial planning"],
  },
  {
    title: "Enhanced Lifetime Mortgage",
    description: "Higher release amounts available if you have certain health conditions or lifestyle factors like smoking.",
    pros: ["Up to 15% more funds", "Same protections apply", "Recognises reduced life expectancy"],
    cons: ["Medical evidence required", "Not available to everyone", "Conditions vary by lender"],
  },
];

const homeReversionFeatures = [
  {
    title: "Full Home Reversion",
    description: "Sell 100% of your home to a reversion company in exchange for a tax-free lump sum and the right to live there rent-free for life.",
    pros: ["Large lump sum available", "No interest charges", "Guaranteed rent-free occupancy"],
    cons: ["Lose all property ownership", "No benefit from house price rises", "Usually receive 30-60% of value"],
  },
  {
    title: "Partial Home Reversion",
    description: "Sell a percentage of your home (e.g., 25-75%) while retaining ownership of the rest. Receive a proportionate lump sum.",
    pros: ["Retain some ownership", "Benefit from price rises on retained share", "More flexible"],
    cons: ["Less cash released", "Complex arrangements", "Limited availability"],
  },
];

const comparisonData = [
  {
    feature: "Ownership",
    lifetimeMortgage: "You retain full ownership",
    homeReversion: "You sell part or all ownership",
  },
  {
    feature: "How it works",
    lifetimeMortgage: "A loan secured against your home",
    homeReversion: "Sale of your property or share of it",
  },
  {
    feature: "Monthly payments",
    lifetimeMortgage: "Optional (usually none required)",
    homeReversion: "None - you live rent-free",
  },
  {
    feature: "Interest",
    lifetimeMortgage: "Yes - typically compounds",
    homeReversion: "No interest charges",
  },
  {
    feature: "Amount received",
    lifetimeMortgage: "20-57% of property value",
    homeReversion: "30-60% of share sold",
  },
  {
    feature: "House price benefit",
    lifetimeMortgage: "You benefit from 100%",
    homeReversion: "Only on share you retain",
  },
  {
    feature: "Minimum age",
    lifetimeMortgage: "Usually 55+",
    homeReversion: "Usually 65+",
  },
  {
    feature: "Availability",
    lifetimeMortgage: "Widely available",
    homeReversion: "Very limited options",
  },
  {
    feature: "Popularity",
    lifetimeMortgage: "95%+ of equity release market",
    homeReversion: "Less than 5% of market",
  },
];

const faqs = [
  {
    question: "Which type of equity release is best for me?",
    answer: "For most people, a lifetime mortgage is the most suitable option due to its flexibility and availability. Drawdown plans are popular as they minimise interest costs. Home reversion is rarely recommended now due to limited availability and the fact you receive significantly less than your property's full value. We'll assess your circumstances to recommend the best option.",
  },
  {
    question: "Can I switch between different types?",
    answer: "You can potentially remortgage from one lifetime mortgage to another, for example moving from a roll-up to a drawdown plan. However, switching from a home reversion plan is not possible as you've already sold part of your property. Early repayment charges may apply when switching providers.",
  },
  {
    question: "What happens if house prices fall?",
    answer: "With lifetime mortgages from Equity Release Council members, you have a 'No Negative Equity Guarantee'. This means you'll never owe more than your home is worth, even if prices crash. With home reversion, the company takes this risk on the portion they've purchased.",
  },
  {
    question: "Can I make voluntary repayments?",
    answer: "Most modern lifetime mortgages allow voluntary repayments of up to 10-15% per year without penalty. This can help control how much interest accumulates. With home reversion, there's nothing to repay as you've sold part of your home.",
  },
  {
    question: "What if I want to move house?",
    answer: "Both types allow you to move, subject to the new property meeting the provider's criteria. With a lifetime mortgage, you 'port' the loan to your new home. With home reversion, the company maintains their percentage ownership of your new property.",
  },
];

export default function TypesOfEquityReleasePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"lifetime" | "reversion">("lifetime");

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-navy pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/equity-release" className="text-gold text-sm hover:underline mb-4 inline-block">
              ← Back to Equity Release
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Types of
              <br />
              <span className="text-gold">Equity Release</span>
            </h1>
            <p className="text-white/70 text-lg mb-6 max-w-xl">
              Understand the different ways to release equity from your home. Our comprehensive guide explains lifetime mortgages and home reversion plans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-white border-b border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className={`cursor-pointer transition-all ${activeTab === "lifetime" ? "ring-2 ring-gold shadow-lg" : "hover:shadow-md"}`}
                  onClick={() => setActiveTab("lifetime")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">Lifetime Mortgage</h3>
                    <p className="text-sm text-gold font-medium">95%+ of the market</p>
                  </div>
                </div>
                <p className="text-navy/60 text-sm">
                  A loan secured against your home. You retain ownership and can stay for life.
                </p>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all ${activeTab === "reversion" ? "ring-2 ring-gold shadow-lg" : "hover:shadow-md"}`}
                  onClick={() => setActiveTab("reversion")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">Home Reversion</h3>
                    <p className="text-sm text-navy/50 font-medium">Less than 5% of market</p>
                  </div>
                </div>
                <p className="text-navy/60 text-sm">
                  Sell all or part of your home in exchange for a lump sum and rent-free occupancy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Types */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            {activeTab === "lifetime" ? (
              <motion.div
                key="lifetime"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollAnimation>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                      Lifetime Mortgage Options
                    </h2>
                    <p className="text-navy/60 max-w-2xl mx-auto">
                      The most popular form of equity release. Choose from several sub-types to match your needs.
                    </p>
                  </div>
                </ScrollAnimation>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {lifetimeMortgageFeatures.map((type, index) => (
                    <ScrollAnimation key={type.title} delay={index * 0.1}>
                      <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">
                              {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-navy">{type.title}</h3>
                          </div>
                          <p className="text-navy/70 text-sm mb-4">{type.description}</p>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Advantages</p>
                              <ul className="space-y-1">
                                {type.pros.map((pro, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-navy/60">
                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Considerations</p>
                              <ul className="space-y-1">
                                {type.cons.map((con, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-navy/60">
                                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))}
                </div>

                <ScrollAnimation delay={0.4}>
                  <div className="mt-12 max-w-3xl mx-auto">
                    <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-navy mb-3">Which Lifetime Mortgage is Right for You?</h3>
                        <ul className="space-y-2 text-sm text-navy/70">
                          <li><strong>Roll-up:</strong> Best if you want maximum flexibility and no monthly payments</li>
                          <li><strong>Interest-only:</strong> Best if you can afford payments and want to protect inheritance</li>
                          <li><strong>Drawdown:</strong> Best if you need funds gradually rather than all at once</li>
                          <li><strong>Enhanced:</strong> Best if you have health conditions that qualify for better rates</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollAnimation>
              </motion.div>
            ) : (
              <motion.div
                key="reversion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollAnimation>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                      Home Reversion Plans
                    </h2>
                    <p className="text-navy/60 max-w-2xl mx-auto">
                      Sell part or all of your home while retaining the right to live there. Less common but may suit specific circumstances.
                    </p>
                  </div>
                </ScrollAnimation>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {homeReversionFeatures.map((type, index) => (
                    <ScrollAnimation key={type.title} delay={index * 0.1}>
                      <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold text-navy mb-3">{type.title}</h3>
                          <p className="text-navy/70 text-sm mb-4">{type.description}</p>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Advantages</p>
                              <ul className="space-y-1">
                                {type.pros.map((pro, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-navy/60">
                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">Considerations</p>
                              <ul className="space-y-1">
                                {type.cons.map((con, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-navy/60">
                                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))}
                </div>

                <ScrollAnimation delay={0.3}>
                  <div className="mt-12 max-w-3xl mx-auto">
                    <Card className="bg-amber-50 border border-amber-200 rounded-xl">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <h3 className="font-bold text-amber-800 mb-2">Important Note on Home Reversion</h3>
                            <p className="text-amber-700 text-sm">
                              Home reversion plans are now rarely recommended or available. Most providers have exited this market.
                              You typically receive only 30-60% of the value of the share sold, meaning a significantly lower amount
                              compared to lifetime mortgages. We generally advise clients towards lifetime mortgage options unless
                              there are specific circumstances that make home reversion more suitable.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollAnimation>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Side-by-Side Comparison
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Compare the key differences between lifetime mortgages and home reversion plans
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-navy/10">
                    <th className="text-left py-4 px-4 text-navy font-semibold">Feature</th>
                    <th className="text-left py-4 px-4 bg-gold/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-navy font-semibold">Lifetime Mortgage</span>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4">
                      <span className="text-navy font-semibold">Home Reversion</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "" : "bg-pearl/30"}>
                      <td className="py-4 px-4 font-medium text-navy">{row.feature}</td>
                      <td className="py-4 px-4 text-navy/70 bg-gold/5">{row.lifetimeMortgage}</td>
                      <td className="py-4 px-4 text-navy/70">{row.homeReversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10 text-center">
              Frequently Asked Questions
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={faq.question} delay={index * 0.05}>
                <div className="bg-white border border-navy/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-pearl/50 transition-colors"
                  >
                    <h3 className="font-semibold text-navy pr-4 text-sm md:text-base">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-navy/70 text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still not sure which is right for you?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Our equity release specialists will explain your options in detail and help you make an informed decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/equity-release/calculator">
                <motion.button
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Use Our Calculator
                </motion.button>
              </Link>
              <Link href="/equity-release#enquiry">
                <motion.button
                  className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Free Advice
                </motion.button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
