"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductTransferPage() {
  // Calculator state
  const [mortgageBalance, setMortgageBalance] = useState(280000);
  const [currentRate, setCurrentRate] = useState(6.2);
  const [newRate, setNewRate] = useState(4.49);
  const [term, setTerm] = useState(22);

  // Countdown for urgency
  const [daysUntilRateChange, setDaysUntilRateChange] = useState(14);

  useEffect(() => {
    // Simulate urgency countdown
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysRemaining = Math.ceil((endOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setDaysUntilRateChange(daysRemaining);
  }, []);

  // Calculate monthly payments
  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const currentMonthly = calculateMonthlyPayment(mortgageBalance, currentRate, term);
  const newMonthly = calculateMonthlyPayment(mortgageBalance, newRate, term);
  const monthlySavings = currentMonthly - newMonthly;
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = monthlySavings * 60;

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const earlyRateFaqs = [
    {
      question: "How can I lock in a rate 6 months early?",
      answer: "Many lenders allow you to secure a new rate up to 6 months before your current deal ends. We submit an application to lock in today's rate, which then becomes active when your current deal expires. This is completely free with most lenders."
    },
    {
      question: "What happens if rates drop after I've locked in?",
      answer: "If rates improve after you've secured a rate, we can review your options and potentially switch you to a better deal before completion. Most lenders allow this without penalty, giving you flexibility while protecting against rate rises."
    },
    {
      question: "Is there a cost to securing a rate early?",
      answer: "No, securing a rate early with your current lender through a product transfer is typically free. We don't charge a broker fee for product transfers, and most lenders don't charge application fees for existing customers."
    },
    {
      question: "What if my circumstances change before the rate starts?",
      answer: "Since product transfers usually don't require a full affordability assessment, minor changes to your circumstances typically won't affect your secured rate. However, significant changes should be discussed with your adviser."
    },
    {
      question: "Can I still secure a rate early if I want to remortgage?",
      answer: "Yes, many lenders also offer early rate locks for remortgage applications. However, remortgaging involves more steps including valuation and legal work. We'll advise on the best approach based on your situation."
    },
    {
      question: "When should I start looking at my options?",
      answer: "We recommend reviewing your options around 6 months before your current deal ends. This gives you maximum flexibility to secure the best available rate while protecting against future rate increases."
    }
  ];

  const testimonials = [
    {
      quote: "I was going to just accept what Halifax offered me, but Apply Wise found me a rate 0.8% lower. That's saving me £187 every month.",
      name: "Sarah M.",
      location: "Chelmsford, Essex",
      savings: "£187/month"
    },
    {
      quote: "My fixed rate was ending and I was dreading it. They sorted everything - even got me a better deal than my lender was offering direct.",
      name: "James T.",
      location: "Harlow, Essex",
      savings: "£2,400/year"
    },
    {
      quote: "Absolutely brilliant service. No fee for staying with my lender, and they still checked I wasn't missing a better deal elsewhere.",
      name: "Michelle D.",
      location: "Hertford",
      savings: "£156/month"
    }
  ];

  return (
    <main className="min-h-screen bg-pearl">
      <Header />

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-[#D4A524] to-[#B8941E] text-navy py-3 text-center fixed top-0 left-0 right-0 z-[60]">
        <div className="container mx-auto px-4">
          <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>
              <strong>Bank of England base rate at 4.5%</strong> — Lock in your new rate before it changes
            </span>
            <span className="hidden md:inline ml-2 bg-navy text-white text-xs px-2 py-1 rounded-full font-bold">
              {daysUntilRateChange} days left this month
            </span>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-44 pb-20 bg-gradient-to-br from-[#0B1F3A] via-[#0B1F3A] to-[#162D4D] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4A524] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#D4A524] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-white/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Free service — No broker fee for product transfers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your Fixed Rate Is Ending?
              <br />
              <span className="text-[#D4A524]">Don't Overpay.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              We'll compare your lender's offer against 90+ others — for free.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-[#D4A524] mb-10 font-medium"
            >
              Average client saves £167/month. Some save much more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/apply?type=product-transfer">
                <Button size="lg" className="bg-[#D4A524] hover:bg-[#B8941E] text-navy px-10 py-7 text-lg rounded-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                  Check My New Rate
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <a href="tel:01992535555">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-lg font-semibold backdrop-blur-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 01992 535 555
                </Button>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-12"
            >
              <div className="flex items-center gap-2 text-white/80">
                <div className="bg-white rounded px-2 py-0.5">
                  <span className="text-[#003B5C] font-bold text-xs tracking-tight">FCA</span>
                </div>
                <span className="font-medium text-sm">Regulated</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-[#D4A524]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">90+ Lenders</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-[#D4A524]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">No Fee for Product Transfers</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5 text-[#D4A524]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-sm">5-Star Reviews</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "£167", label: "Avg. monthly savings" },
              { value: "3,200+", label: "Clients helped" },
              { value: "4.9/5", label: "Client rating" },
              { value: "48hrs", label: "Typical turnaround" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator - More Visual */}
      <section className="py-16 md:py-24 bg-[#F5F3EF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Savings Calculator
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                See What You Could Save
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Many clients are shocked by how much they're overpaying. Check your numbers:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                {/* Inputs */}
                <div className="p-8 md:p-10 border-r border-gray-100">
                  <div className="space-y-8">
                    <div>
                      <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                        <span>Mortgage Balance</span>
                        <span className="text-[#0B1F3A] font-bold">£{mortgageBalance.toLocaleString()}</span>
                      </label>
                      <input
                        type="range"
                        min="50000"
                        max="1000000"
                        step="10000"
                        value={mortgageBalance}
                        onChange={(e) => setMortgageBalance(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>£50k</span>
                        <span>£1m</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                        <span>Current Interest Rate</span>
                        <span className="text-red-600 font-bold">{currentRate}%</span>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="9"
                        step="0.1"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>3%</span>
                        <span>9%</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                        <span>New Rate Available</span>
                        <span className="text-green-600 font-bold">{newRate}%</span>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="7"
                        step="0.01"
                        value={newRate}
                        onChange={(e) => setNewRate(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>3%</span>
                        <span>7%</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                        <span>Remaining Term</span>
                        <span className="text-[#0B1F3A] font-bold">{term} years</span>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="1"
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>5 yrs</span>
                        <span>35 yrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-[#0B1F3A] to-[#162D4D] p-8 md:p-10 text-white">
                  <h3 className="text-lg font-medium text-white/70 mb-8">Your Potential Savings</h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-white/70">Current Payment</span>
                      <span className="text-2xl font-bold text-red-400">£{currentMonthly.toFixed(0)}/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-white/70">New Payment</span>
                      <span className="text-2xl font-bold text-green-400">£{newMonthly.toFixed(0)}/mo</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="text-white/60 text-sm mb-2">You'd Save</div>
                    <div className="text-5xl font-bold text-[#D4A524]">
                      £{monthlySavings > 0 ? monthlySavings.toFixed(0) : '0'}
                      <span className="text-lg font-normal text-white/60 ml-2">per month</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white/50 text-xs mb-1">Annual Savings</div>
                      <div className="text-xl font-bold text-white">£{annualSavings > 0 ? annualSavings.toFixed(0) : '0'}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white/50 text-xs mb-1">5-Year Total</div>
                      <div className="text-xl font-bold text-[#D4A524]">£{fiveYearSavings > 0 ? fiveYearSavings.toFixed(0) : '0'}</div>
                    </div>
                  </div>

                  <Link href="/apply?type=product-transfer">
                    <Button size="lg" className="w-full bg-[#D4A524] hover:bg-[#B8941E] text-navy py-6 text-lg rounded-lg font-bold">
                      Lock In This Rate
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </Button>
                  </Link>

                  <p className="text-xs text-white/40 mt-4 text-center">
                    Estimates only. Your actual rate depends on your circumstances.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Act Now - Urgency Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-red-600 uppercase tracking-wider text-sm font-semibold mb-3 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Don't Wait
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                Why You Need to Act Now
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  ),
                  title: "Rates Are Volatile",
                  description: "Bank of England rates have changed 6 times in the past 2 years. Locking in now protects you."
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Lock In 6 Months Early",
                  description: "We can secure your rate now, even if your deal doesn't end for months. No risk, all upside."
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "SVR Costs Are Brutal",
                  description: "Standard Variable Rates are typically 7%+. Every month you delay could cost you hundreds."
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  title: "We Work Fast",
                  description: "Most product transfers complete within 48 hours. We handle all the paperwork."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F5F3EF] rounded-xl p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[#0B1F3A] rounded-lg flex items-center justify-center text-[#D4A524]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Simple Process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                We've helped thousands of homeowners. Here's how easy it is:
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#D4A524]/20 via-[#D4A524] to-[#D4A524]/20" />

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Tell Us About Your Mortgage", description: "2-minute form. We just need the basics.", time: "2 mins" },
                  { step: "2", title: "We Review Your Options", description: "We check your lender AND 90+ others.", time: "Same day" },
                  { step: "3", title: "Get Your Recommendation", description: "Clear advice on the best option for you.", time: "Within 24hrs" },
                  { step: "4", title: "We Handle Everything", description: "Paperwork, lender calls, completion. Done.", time: "48hrs typical" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="w-20 h-20 bg-[#D4A524] rounded-full flex items-center justify-center text-[#0B1F3A] font-bold text-2xl mx-auto mb-6 relative z-10 shadow-lg shadow-[#D4A524]/30">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm mb-3">{item.description}</p>
                    <span className="inline-block bg-white/10 rounded-full px-3 py-1 text-xs text-[#D4A524]">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/apply?type=product-transfer">
                <Button size="lg" className="bg-[#D4A524] hover:bg-[#B8941E] text-navy px-12 py-7 text-lg rounded-lg font-bold">
                  Start Now — Takes 2 Minutes
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Client Results
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                Real Savings from Real Clients
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F5F3EF] rounded-xl p-6 relative"
                >
                  <div className="absolute top-4 right-4 bg-[#D4A524] text-navy text-sm font-bold px-3 py-1 rounded-full">
                    {testimonial.savings}
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#D4A524]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#0B1F3A] mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <span className="font-semibold text-[#0B1F3A]">{testimonial.name}</span>
                    <span className="text-gray-500"> — {testimonial.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Transfer vs Remortgage */}
      <section className="py-16 md:py-20 bg-[#F5F3EF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Know Your Options
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                Product Transfer vs Remortgage
              </h2>
              <p className="text-xl text-gray-600">
                Not sure which is right for you? Here's the breakdown:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-3 bg-[#0B1F3A] text-white">
                <div className="p-5 font-semibold text-white/80">Feature</div>
                <div className="p-5 font-semibold text-center bg-[#D4A524] text-navy">Product Transfer</div>
                <div className="p-5 font-semibold text-center">Remortgage</div>
              </div>
              {[
                { feature: "Stay with same lender", transfer: "Yes", remortgage: "No" },
                { feature: "Legal work required", transfer: "No", remortgage: "Yes" },
                { feature: "Valuation needed", transfer: "Usually No", remortgage: "Yes" },
                { feature: "Speed to completion", transfer: "Days", remortgage: "Weeks" },
                { feature: "Our broker fee", transfer: "£0", remortgage: "From £295" },
                { feature: "Access all lenders", transfer: "No", remortgage: "Yes" },
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}>
                  <div className="p-5 text-[#0B1F3A] font-medium">{row.feature}</div>
                  <div className="p-5 text-center font-semibold text-green-600 bg-[#D4A524]/5">{row.transfer}</div>
                  <div className="p-5 text-center text-gray-600">{row.remortgage}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-gray-600 text-lg"
            >
              <strong className="text-[#0B1F3A]">Not sure which is better?</strong> We'll check both and tell you honestly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Transparent Pricing
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                Our Fees
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#D4A524] to-[#B8941E] rounded-2xl p-8 text-center text-navy relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-navy text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                  Most Popular
                </div>
                <div className="text-6xl font-bold mb-2">£0</div>
                <div className="text-lg font-semibold mb-4">Product Transfer</div>
                <p className="text-navy/80 text-sm">
                  If you stay with your current lender, we don't charge a fee. Simple.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#F5F3EF] rounded-2xl p-8 text-center"
              >
                <div className="text-xl font-bold text-[#0B1F3A] mb-4">Remortgage</div>
                <div className="text-3xl font-bold text-[#0B1F3A] mb-2">From £295</div>
                <p className="text-gray-600 text-sm">
                  If switching lender is better for you, our fee is clear upfront.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#F5F3EF] rounded-2xl p-8 text-center"
              >
                <div className="text-xl font-bold text-[#0B1F3A] mb-4">Lender Commission</div>
                <div className="text-3xl font-bold text-[#0B1F3A] mb-2">Disclosed</div>
                <p className="text-gray-600 text-sm">
                  We receive commission from lenders. Always explained before you proceed.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#F5F3EF]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#D4A524] uppercase tracking-wider text-sm font-semibold mb-3">
                Common Questions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                FAQs
              </h2>
            </motion.div>

            <div className="space-y-3">
              {earlyRateFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-[#0B1F3A] pr-4">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === index ? 'bg-[#D4A524] text-navy rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0B1F3A] via-[#0B1F3A] to-[#162D4D] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4A524] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#D4A524] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Stop Overpaying?
            </h2>
            <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
              Most people save £100-£300/month. Some save even more.
            </p>
            <p className="text-[#D4A524] mb-10 font-medium">
              Takes 2 minutes. No obligations. No hard credit check.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/apply?type=product-transfer">
                <Button size="lg" className="bg-[#D4A524] hover:bg-[#B8941E] text-navy px-12 py-7 text-lg rounded-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                  Check My New Rate
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <a href="tel:01992535555">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-7 text-lg rounded-lg font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Prefer to Talk? Call Us
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No hard credit check</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>FCA regulated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-10 bg-[#F5F3EF] border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-3 text-sm text-gray-500 text-center">
            <p>
              A product transfer means switching to a new deal with your existing lender.
              We will also assess whether remortgaging to another lender may be more suitable based on your circumstances.
            </p>
            <p>
              <strong className="text-[#0B1F3A]">Apply Wise Financial Limited</strong> is an Appointed Representative of
              Scott & Goose LLP, which is authorised and regulated by the Financial Conduct Authority
              under Firm Reference Number 661183.
            </p>
            <p className="text-red-600/80">
              Your home may be repossessed if you do not keep up repayments on your mortgage.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
