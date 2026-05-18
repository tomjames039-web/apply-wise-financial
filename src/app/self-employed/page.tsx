"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

// Business types
const businessTypes = [
  {
    title: "Limited Company Directors",
    description: "Running your own Ltd company? We help lenders see beyond just your salary and dividends to your true earning potential.",
    incomeUsed: "Salary + Dividends OR Salary + Share of Net Profits",
    keyBenefit: "Borrow up to 40% more using net profit route",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    link: "/self-employed/company-directors",
  },
  {
    title: "Sole Traders",
    description: "As a sole trader, your net profit is your income. We ensure lenders see the full picture of your business success.",
    incomeUsed: "Net Profit (after expenses, before tax)",
    keyBenefit: "2-3 year average or latest year if increasing",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    link: "/self-employed/sole-traders",
  },
  {
    title: "Contractors",
    description: "Whether you're inside or outside IR35, umbrella or limited company, we know how to present your income to lenders.",
    incomeUsed: "Day rate x working days OR company accounts",
    keyBenefit: "Day rate calculations can maximize borrowing",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    link: "/self-employed/contractors",
  },
  {
    title: "Partnerships & LLPs",
    description: "Your share of partnership profits counts as income. We work with lenders who understand complex partnership structures.",
    incomeUsed: "Share of Net Profit from Partnership",
    keyBenefit: "Full share of profits considered",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    link: "/self-employed/partnerships",
  },
];

// Key challenges and how Apply Wise solves them
const challenges = [
  {
    challenge: "Low Salary for Tax Efficiency",
    problem: "You take a minimal salary to reduce National Insurance, but banks only see your low salary.",
    solution: "We use lenders who assess affordability on salary PLUS your share of company net profits (after corporation tax), not just what you withdraw.",
  },
  {
    challenge: "Retained Profits Ignored",
    problem: "You've left profits in the business for growth or tax efficiency, but most lenders won't count them.",
    solution: "Specialist lenders understand that retained profits represent your real earning potential. We present your case to lenders who get it.",
  },
  {
    challenge: "Variable Income",
    problem: "Your income fluctuates year-to-year, making lenders nervous about your affordability.",
    solution: "We know which lenders use the latest year (if increasing), which average over 2-3 years, and which take the most favourable view.",
  },
  {
    challenge: "Less Than 2 Years Trading",
    problem: "Most banks require 2-3 years of accounts, but your business is newer.",
    solution: "We have access to lenders who will consider 1 year's trading history, and even some who work with start-ups on projected income.",
  },
];

// FAQs
const faqs = [
  {
    question: "How do lenders calculate my income as a company director?",
    answer: "There are two main approaches: Most high street lenders add your salary plus dividends drawn. However, specialist lenders can use your salary plus your share of net profit (after corporation tax). The net profit route often allows significantly higher borrowing because it includes profits you've sensibly left in the business rather than withdrawing and paying higher taxes on.",
  },
  {
    question: "Can I still be tax efficient AND get a good mortgage?",
    answer: "Absolutely. Using lenders who assess income based on company net profit means you can keep your salary low (saving National Insurance), not withdraw excess dividends (saving dividend tax), but still demonstrate your full earning capacity to the lender. It's the best of both worlds.",
  },
  {
    question: "How many years of accounts do I need?",
    answer: "Most lenders require 2-3 years of trading history. However, we work with some specialist lenders who will consider just 1 year of accounts, and in some cases, new businesses with a strong contract or business plan.",
  },
  {
    question: "What if my profits vary significantly year to year?",
    answer: "Different lenders handle this differently. Some average your last 2-3 years, some use the latest year only, and some use the lower of the two most recent years. If your income is growing, we'll target lenders who use the latest (higher) year.",
  },
  {
    question: "I'm a contractor - how is my income assessed?",
    answer: "Contractors have options. Some lenders will use a day rate calculation (e.g., day rate x 5 days x 46-48 weeks) which often maximises borrowing. Others will assess you like a standard director using salary and dividends or net profit. IR35 status can affect which approach is best.",
  },
];

// Success stories
const testimonials = [
  {
    quote: "My accountant advised keeping profits in the company. When I went to my bank, they said I could only borrow £180k. Apply Wise found a lender using net profits and I borrowed £320k - same tax efficiency, much bigger house!",
    author: "James M.",
    role: "IT Consultancy Director",
    location: "Reading",
    borrowingIncrease: "78% more",
    rating: 5,
  },
  {
    quote: "As a contractor, I was told my day rate couldn't be used. Apply Wise found a lender who calculated my income based on my contract rate. Borrowed nearly double what Halifax offered.",
    author: "Sarah K.",
    role: "IT Contractor",
    location: "Manchester",
    borrowingIncrease: "94% more",
    rating: 5,
  },
  {
    quote: "Only 14 months trading and everyone said wait another year. Apply Wise found a lender happy with one year's accounts plus a strong contract pipeline. We're in our new home already.",
    author: "David & Emma T.",
    role: "Marketing Agency Owners",
    location: "Bristol",
    borrowingIncrease: "Others declined",
    rating: 5,
  },
];

// Specialist lenders with logos
const specialistLenders = [
  { name: "NatWest", logo: "/logos/natwest.png" },
  { name: "Halifax", logo: "/logos/halifax.png" },
  { name: "Santander", logo: "/logos/santander.png" },
  { name: "Barclays", logo: "/logos/barclays.png" },
  { name: "Nationwide", logo: "/logos/nationwide.png" },
  { name: "HSBC", logo: "/logos/hsbc.png" },
  { name: "Kensington", logo: null },
  { name: "Aldermore", logo: null },
];

export default function SelfEmployedPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Simple calculator state
  const [calcSalary, setCalcSalary] = useState(12570);
  const [calcDividends, setCalcDividends] = useState(40000);
  const [calcNetProfit, setCalcNetProfit] = useState(100000);

  const borrowingCalculation = useMemo(() => {
    const standardIncome = calcSalary + calcDividends;
    const profitIncome = calcSalary + (calcNetProfit * 0.75);
    const multiplier = 4.5;

    return {
      standardBorrowing: Math.round(standardIncome * multiplier),
      profitBorrowing: Math.round(profitIncome * multiplier),
      difference: Math.round((profitIncome * multiplier) - (standardIncome * multiplier)),
      percentageIncrease: Math.round(((profitIncome - standardIncome) / standardIncome) * 100),
    };
  }, [calcSalary, calcDividends, calcNetProfit]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section - Matches Homepage Design */}
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
              Self-Employed Mortgage?
              <br />
              <span className="text-gold">We Structure It Properly</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Company directors, sole traders and contractors — we match you with lenders who understand how your income actually works.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Salary + dividends + retained profit",
                "Latest year or improving income",
                "Complex income handled properly",
                "Access to specialist lenders",
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
                  Start Your Application
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
              <Link href="#calculator">
                <motion.button
                  className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See How Much More
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

      {/* Lender Logos */}
      <section className="py-10 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Access to 35+ lenders who understand self-employed income
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {specialistLenders.map((lender) => (
              <motion.div
                key={lender.name}
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                {lender.logo ? (
                  <img
                    src={lender.logo}
                    alt={lender.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-navy/70 font-semibold text-sm md:text-base hover:text-navy transition-colors">
                    {lender.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  The Problem With "Traditional" Mortgage Applications
                </h2>
                <p className="text-navy/60 max-w-2xl mx-auto">
                  Most banks assess company directors on salary + dividends only. If you're tax efficient, this drastically underestimates what you can really afford.
                </p>
              </div>
            </ScrollAnimation>

            {/* Comparison Visual */}
            <ScrollAnimation delay={0.1}>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="bg-white border border-red-200 rounded-xl overflow-hidden">
                  <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                    <h3 className="font-bold text-red-800 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      High Street Bank Approach
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-navy/60 text-sm mb-4">Only considers what you withdraw:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-navy/60">Salary</span>
                        <span className="font-semibold text-navy">£12,570</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy/60">Dividends</span>
                        <span className="font-semibold text-navy">£40,000</span>
                      </div>
                      <div className="flex justify-between text-red-400 line-through">
                        <span>Retained Profit</span>
                        <span>£80,000</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between">
                        <span className="font-semibold text-navy">Income Used</span>
                        <span className="font-bold text-red-600">£52,570</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-navy/60">Max Borrowing (4.5x)</span>
                        <span className="font-bold text-red-600">£236,565</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-green-200 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                    <h3 className="font-bold text-green-800 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Apply Wise Specialist Approach
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-navy/60 text-sm mb-4">Uses your true earning capacity:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-navy/60">Salary</span>
                        <span className="font-semibold text-navy">£12,570</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy/60">Share of Net Profit*</span>
                        <span className="font-semibold text-green-600">£80,000</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between">
                        <span className="font-semibold text-navy">Income Used</span>
                        <span className="font-bold text-green-600">£92,570</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-navy/60">Max Borrowing (4.5x)</span>
                        <span className="font-bold text-green-600">£416,565</span>
                      </div>
                      <div className="flex justify-between pt-2 bg-green-50 -mx-6 px-6 py-2 mt-2">
                        <span className="font-bold text-green-800">Extra Borrowing</span>
                        <span className="font-bold text-green-800">+£180,000</span>
                      </div>
                    </div>
                    <p className="text-xs text-navy/40 mt-4">*After corporation tax deduction</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section id="calculator" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                See Your Potential Borrowing
              </h2>
              <p className="text-navy/60 max-w-xl mx-auto">
                Enter your figures to see how much more you could borrow using the net profit approach
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-pearl border-2 border-gold/20 rounded-2xl overflow-hidden shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Annual Salary</label>
                        <span className="text-gold font-bold">{formatCurrency(calcSalary)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50000}
                        step={1000}
                        value={calcSalary}
                        onChange={(e) => setCalcSalary(Number(e.target.value))}
                        className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Annual Dividends Drawn</label>
                        <span className="text-gold font-bold">{formatCurrency(calcDividends)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={150000}
                        step={5000}
                        value={calcDividends}
                        onChange={(e) => setCalcDividends(Number(e.target.value))}
                        className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Company Net Profit (Pre-Tax)</label>
                        <span className="text-gold font-bold">{formatCurrency(calcNetProfit)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={500000}
                        step={10000}
                        value={calcNetProfit}
                        onChange={(e) => setCalcNetProfit(Number(e.target.value))}
                        className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                      <p className="text-navy/40 text-xs mt-1">Your share of profits if sole director</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-xl border border-navy/10">
                        <p className="text-navy/50 text-sm mb-1">Standard (Salary + Dividends)</p>
                        <p className="text-2xl font-bold text-navy">{formatCurrency(borrowingCalculation.standardBorrowing)}</p>
                      </div>

                      <div className="p-4 bg-gold/10 rounded-xl border border-gold/30">
                        <p className="text-gold text-sm mb-1">Using Net Profit Approach</p>
                        <p className="text-3xl font-bold text-gold">{formatCurrency(borrowingCalculation.profitBorrowing)}</p>
                      </div>

                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30 text-center">
                        <p className="text-green-700 text-sm mb-1">You Could Borrow</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(borrowingCalculation.difference)} MORE
                        </p>
                        <p className="text-green-600/60 text-xs mt-1">
                          {borrowingCalculation.percentageIncrease}% increase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/apply">
                    <motion.button
                      className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Your Personalised Quote
                    </motion.button>
                  </Link>
                  <p className="text-navy/40 text-xs mt-3">
                    Based on 4.5x income multiplier. Actual borrowing depends on individual circumstances.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Mortgages for Every Business Structure
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Whether you're a sole trader, limited company director, contractor, or partner — we know exactly how to present your income to lenders.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {businessTypes.map((type, index) => (
              <ScrollAnimation key={type.title} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">{type.title}</h3>
                    <p className="text-navy/60 text-sm mb-4">{type.description}</p>
                    <div className="space-y-2 pt-4 border-t border-navy/10">
                      <div>
                        <p className="text-xs text-navy/40 uppercase tracking-wider">Income Used</p>
                        <p className="text-sm font-medium text-navy">{type.incomeUsed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-navy/40 uppercase tracking-wider">Key Benefit</p>
                        <p className="text-sm font-medium text-gold">{type.keyBenefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Common Challenges — Solved
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                We've helped thousands of self-employed clients overcome these obstacles
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {challenges.map((item, index) => (
              <ScrollAnimation key={item.challenge} delay={index * 0.08}>
                <Card className="bg-white border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-navy">{item.challenge}</h3>
                    </div>
                    <p className="text-navy/60 text-sm mb-4">{item.problem}</p>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-800 text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Success Stories
              </h2>
              <p className="text-navy/60">
                Real business owners who borrowed more with Apply Wise
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded mb-3">
                      {testimonial.borrowingIncrease}
                    </span>

                    <p className="text-navy/80 text-sm leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-navy text-sm">{testimonial.author}</p>
                        <p className="text-navy/50 text-xs">{testimonial.role} - {testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Self-Employed Mortgage FAQs
              </h2>
            </div>
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

      {/* Final CTA - Check Your Options in 60 Seconds */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Check Your Options in 60 Seconds
              </h2>
              <p className="text-navy/60 mb-8">
                No obligation. No credit impact. Just a clear answer on what's possible.
              </p>
              <Link href="/apply">
                <motion.button
                  className="px-10 py-4 bg-navy text-white font-semibold text-lg rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Application
                </motion.button>
              </Link>
              <p className="text-navy/40 text-sm mt-4">
                Takes less than a minute
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom slider styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #D4A524;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #D4A524;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
