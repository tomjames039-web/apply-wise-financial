"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const benefits = [
  {
    title: "Corporation Tax Benefits",
    description: "Pay corporation tax (currently 25%) on profits rather than higher income tax rates (up to 45%).",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Full Mortgage Interest Relief",
    description: "Unlike personal ownership, limited companies can still deduct 100% of mortgage interest as an expense.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    title: "Retained Profits",
    description: "Keep profits in the company for future investments without paying additional personal tax.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Portfolio Growth",
    description: "Easier to scale your portfolio and bring in investors or partners through share structures.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Asset Protection",
    description: "Limited liability means your personal assets are protected from business debts.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Inheritance Planning",
    description: "Shares can be transferred more easily than property, potentially reducing inheritance tax.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "What is an SPV for buy-to-let?",
    answer: "A Special Purpose Vehicle (SPV) is a limited company set up specifically to buy, sell, and manage residential property. It's the standard structure for limited company buy-to-let mortgages. The company's SIC code should be 68100 (buying and selling own real estate) or 68209 (other letting and operating of own or leased real estate).",
  },
  {
    question: "Are limited company BTL mortgage rates higher?",
    answer: "Yes, limited company buy-to-let mortgage rates are typically 0.5-1% higher than personal BTL rates. However, the tax savings often outweigh this additional cost, especially for higher-rate taxpayers.",
  },
  {
    question: "Do I need an existing limited company?",
    answer: "No, most landlords set up a new SPV specifically for property investment. This keeps things simple and is what most lenders prefer. We can guide you through the setup process.",
  },
  {
    question: "Can I transfer existing properties to a limited company?",
    answer: "Yes, but this is a sale and purchase transaction. You'll need to pay stamp duty (including the 5% surcharge) and potentially capital gains tax on any profit. It's not always cost-effective for existing portfolios.",
  },
  {
    question: "What deposit do I need for a limited company BTL?",
    answer: "Most lenders require a minimum 25% deposit for limited company buy-to-let, the same as personal BTL. Some specialist lenders may accept 20% for experienced landlords.",
  },
  {
    question: "Will lenders require a personal guarantee?",
    answer: "Yes, almost all limited company BTL lenders require directors to provide personal guarantees. This means you're still personally liable if the company can't repay the mortgage.",
  },
];

const eligibilityCriteria = [
  "UK registered limited company (or willing to set one up)",
  "SIC codes 68100 or 68209 for property activities",
  "Directors must be UK residents aged 21-75",
  "Minimum 25% deposit in most cases",
  "Property must meet rental coverage requirements (typically 125-145%)",
  "Clean credit history for all directors",
];

export default function LimitedCompanyBTLPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hasCompany: "",
    portfolioSize: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Limited Company BTL Enquiry:", formData);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-pearl pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/buy-to-let" className="text-gold text-sm hover:underline mb-4 inline-block">
                ← Back to Buy-to-Let
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
                Limited Company
                <br />
                <span className="text-gold">Buy-to-Let Mortgages</span>
              </h1>
              <p className="text-navy/70 text-lg mb-8 max-w-xl">
                Purchase through an SPV for tax efficiency on your property portfolio. We'll help you find the right lender and guide you through the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#get-quote">
                  <motion.button
                    className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get a Quote
                  </motion.button>
                </Link>
                <Link href="/calculator/btl-yield">
                  <motion.button
                    className="px-8 py-4 bg-navy/10 text-navy font-semibold rounded-lg border border-navy/20 hover:bg-navy/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Calculate Yield
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Limited Company Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Why buy through a limited company?
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Since changes to mortgage interest relief in 2020, buying through a limited company has become increasingly popular for landlords
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={benefit.title} delay={index * 0.08}>
                <Card className="bg-pearl/50 border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-navy/60 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Comparison */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
                Tax comparison: Personal vs Limited Company
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white border border-navy/10 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center text-navy text-sm">1</span>
                      Personal Ownership
                    </h3>
                    <ul className="space-y-3 text-sm text-navy/70">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Mortgage interest only 20% tax credit (not deductible)
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Pay income tax at your marginal rate (up to 45%)
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Higher rate taxpayers pushed into higher brackets
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Lower mortgage rates available
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gold/30 rounded-xl shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold">2</span>
                      Limited Company (SPV)
                    </h3>
                    <ul className="space-y-3 text-sm text-navy/70">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        100% mortgage interest fully deductible
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Pay corporation tax at 25% (or 19% for small profits)
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Retain profits in the company tax-efficiently
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Slightly higher mortgage rates
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="mt-8 p-6 bg-gold/10 rounded-xl border border-gold/20">
                <p className="text-navy text-center">
                  <strong>Example:</strong> A higher-rate taxpayer with £30,000 rental profit could save over <span className="text-gold font-bold">£6,000 per year</span> by using a limited company structure.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
                Eligibility criteria
              </h2>
            </ScrollAnimation>

            <div className="space-y-4">
              {eligibilityCriteria.map((criteria, index) => (
                <ScrollAnimation key={index} delay={index * 0.05}>
                  <div className="flex items-center gap-4 p-4 bg-pearl rounded-xl">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy">{criteria}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="get-quote" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Get your limited company BTL quote
                </h2>
                <p className="text-navy/60">
                  Fill in your details and our specialists will be in touch
                </p>
              </div>
            </ScrollAnimation>

            {!formSubmitted ? (
              <Card className="bg-pearl border-2 border-gold/20 rounded-2xl">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-navy/70 mb-2 text-sm">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-4 bg-white border border-navy/20 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-navy/70 mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 bg-white border border-navy/20 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-navy/70 mb-2 text-sm">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-4 bg-white border border-navy/20 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                        placeholder="07123 456789"
                      />
                    </div>
                    <div>
                      <label className="block text-navy/70 mb-2 text-sm">Do you have a limited company?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Yes", "No", "Setting up"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, hasCompany: option })}
                            className={`p-3 rounded-xl border text-sm transition-all ${
                              formData.hasCompany === option
                                ? "bg-gold/20 border-gold text-navy"
                                : "bg-white border-navy/20 text-navy/70 hover:bg-navy/5"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-navy/70 mb-2 text-sm">Current portfolio size</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["0 properties", "1-3", "4+"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, portfolioSize: option })}
                            className={`p-3 rounded-xl border text-sm transition-all ${
                              formData.portfolioSize === option
                                ? "bg-gold/20 border-gold text-navy"
                                : "bg-white border-navy/20 text-navy/70 hover:bg-navy/5"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-all mt-6"
                    >
                      Get My Quote
                    </button>
                    <p className="text-navy/40 text-xs text-center">
                      By submitting, you agree to our <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">
                  Thank you, {formData.name.split(" ")[0]}!
                </h3>
                <p className="text-navy/70 max-w-md mx-auto">
                  Our limited company BTL specialists will contact you within 24 hours to discuss your options.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10">
              Limited company BTL FAQs
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

      <Footer />
    </div>
  );
}
