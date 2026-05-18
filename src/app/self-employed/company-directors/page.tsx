"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

// Key benefits for company directors
const keyBenefits = [
  {
    title: "Use Net Profits, Not Just Dividends",
    description: "Lenders can assess your income on salary plus your share of company net profits - not just what you've withdrawn. This can dramatically increase your borrowing capacity.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Stay Tax Efficient",
    description: "Keep your salary at the NI threshold and retain profits in your company. You can still get the mortgage you need without paying unnecessary taxes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Retained Profits Count",
    description: "Left money in the business for growth or rainy days? Specialist lenders understand this represents real earnings and will factor it into their calculations.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "1 Year Accounts Accepted",
    description: "Some lenders only need 12 months of trading history. Don't wait years to buy - we'll find a lender who understands newer businesses.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// How lenders assess director income
const lenderApproaches = [
  {
    type: "High Street Banks",
    method: "Salary + Dividends",
    description: "Traditional banks typically only consider what you've physically withdrawn from your company.",
    calculation: "Salary drawn + Dividends taken",
    suitableFor: "Directors who draw most profits as dividends",
    pros: ["Competitive rates", "Wide product choice", "Quick decisions"],
    cons: ["Ignores retained profits", "Lower borrowing", "Penalises tax efficiency"],
    maxBorrowing: "Lower",
  },
  {
    type: "Specialist Lenders",
    method: "Salary + Share of Net Profit",
    description: "Calculate income based on your ownership share of company profits, after corporation tax.",
    calculation: "Salary + (Net Profit × Shareholding %)",
    suitableFor: "Tax-efficient directors with retained profits",
    pros: ["Higher borrowing", "Rewards success", "Tax efficiency friendly"],
    cons: ["Slightly higher rates", "More documentation", "Specialist knowledge needed"],
    maxBorrowing: "Higher",
  },
  {
    type: "Contractor Specialists",
    method: "Day Rate / Contract Value",
    description: "For IT contractors and consultants, some lenders use your day rate multiplied by working weeks.",
    calculation: "Day Rate × 5 days × 46-48 weeks",
    suitableFor: "Contractors with strong day rates",
    pros: ["Maximises income", "Simple calculation", "Works inside/outside IR35"],
    cons: ["Contract must have time remaining", "Limited lender choice", "Needs specialist broker"],
    maxBorrowing: "Highest for contractors",
  },
];

// Tax efficiency explained
const taxEfficiencyBenefits = [
  {
    strategy: "Low Salary (NI Threshold)",
    amount: "£12,570",
    taxSaved: "Save £1,000s in National Insurance",
    impact: "Banks only see £12,570 income",
    applyWiseSolution: "We use lenders who add your share of net profits",
  },
  {
    strategy: "Minimal Dividends",
    amount: "£40,000",
    taxSaved: "Avoid higher rate dividend tax",
    impact: "Banks calculate £52,570 total",
    applyWiseSolution: "Net profit approach gives £92,570+ income",
  },
  {
    strategy: "Retained Profits",
    amount: "£80,000",
    taxSaved: "Only 19-25% corp tax vs 33%+ personal",
    impact: "Banks completely ignore this",
    applyWiseSolution: "Specialist lenders include your share",
  },
];

// Worked example
const workedExample = {
  scenario: "Sarah runs a digital marketing agency. She's tax-efficient, keeping salary low and retaining profits for business growth.",
  companyDetails: {
    netProfit: 150000,
    shareholding: 100,
    salary: 12570,
    dividendsTaken: 45000,
    retainedProfit: 92430,
  },
  highStreetResult: {
    income: 57570, // salary + dividends
    multiplier: 4.5,
    maxBorrowing: 259065,
  },
  specialistResult: {
    income: 125070, // salary + (net profit after CT assumed)
    multiplier: 4.5,
    maxBorrowing: 562815,
  },
};

// Documentation needed
const documentsList = [
  {
    title: "SA302 Tax Calculations",
    description: "HMRC tax calculations for 2-3 years (or 1 year minimum)",
    tip: "Download from your HMRC online account",
  },
  {
    title: "Tax Year Overviews",
    description: "Confirms your tax position with HMRC",
    tip: "Available alongside your SA302",
  },
  {
    title: "Company Accounts",
    description: "Full statutory accounts prepared by your accountant",
    tip: "Must show net profit figures clearly",
  },
  {
    title: "CT600 Corporation Tax Return",
    description: "Shows company profits submitted to HMRC",
    tip: "Some lenders require this to verify accounts",
  },
  {
    title: "Business Bank Statements",
    description: "3-6 months of company account statements",
    tip: "Shows business is trading actively",
  },
  {
    title: "Accountant's Reference",
    description: "Letter confirming projected income (if required)",
    tip: "Useful for newer businesses or varying income",
  },
];

// FAQs
const faqs = [
  {
    question: "How exactly do lenders calculate my income as a company director?",
    answer: "There are two main methods: The traditional approach adds your PAYE salary plus dividends declared on your tax return. The specialist approach uses your salary plus your shareholding percentage of the company's net profit (after corporation tax). For example, if you own 50% of a company with £200k net profit, specialists would use £100k as your income share, regardless of what you actually withdrew.",
  },
  {
    question: "Can I really borrow more while paying less tax?",
    answer: "Yes! This is the key advantage of using specialist lenders. You can keep your salary at £12,570 (below the NI threshold), take minimal dividends, and leave profits in the company - paying only corporation tax at 19-25%. Traditional banks would only lend based on what you withdrew, but specialists assess your true earning capacity based on company profits.",
  },
  {
    question: "What if I have multiple directorships or companies?",
    answer: "We can often combine income from multiple companies. You'll need accounts for each entity, and we'll present your total income position to lenders who specialise in complex structures. This includes holding company arrangements, group structures, and directors with interests in several trading companies.",
  },
  {
    question: "My profits vary significantly year to year - will this be a problem?",
    answer: "Not necessarily. Different lenders handle this differently: some average your last 2-3 years, some use the latest year if it's the highest (great for growing businesses), and some use the lower of two years. We match you with the lender whose methodology gives you the best result.",
  },
  {
    question: "I only have 1 year of accounts - can I still get a mortgage?",
    answer: "Yes, several specialist lenders will consider company directors with just 12 months of trading history. Some may also consider a strong contract pipeline or projected income certified by your accountant. We've helped many directors buy homes within their first year of trading.",
  },
  {
    question: "What about directors of newly incorporated companies who were previously self-employed?",
    answer: "If you recently incorporated a pre-existing sole trader business, some lenders will consider your previous self-employed history alongside your new company accounts. This can give you a longer track record for lending purposes.",
  },
  {
    question: "Will the lender contact my accountant?",
    answer: "Possibly, but usually only to verify accounts are genuine or request specific documents. Your accountant won't need to provide opinions on affordability - that's the lender's assessment based on the figures provided. We handle all lender communications to make this seamless.",
  },
  {
    question: "I'm a director but also employed elsewhere - how does this work?",
    answer: "We can combine your employed income (evidenced by payslips) with your company director income. This dual-income scenario often needs a specialist approach to ensure both income sources are fully utilised, and we know exactly which lenders handle this best.",
  },
];

// Testimonials
const testimonials = [
  {
    quote: "I was taking £50k salary and dividends, but my company made £180k profit. Halifax offered £225k. Apply Wise found a lender who used my net profits - I got approved for £415k. Same tax, bigger house!",
    author: "Richard T.",
    role: "Software Development Director",
    location: "Cambridge",
    borrowingIncrease: "+84%",
    rating: 5,
  },
  {
    quote: "My accountant advised keeping salary at £12,570 for NI savings. Banks wouldn't lend me enough to buy in London. Apply Wise understood immediately and found a specialist lender who saw my real income.",
    author: "Priya K.",
    role: "Marketing Agency Owner",
    location: "London",
    borrowingIncrease: "+67%",
    rating: 5,
  },
  {
    quote: "Only 14 months trading as a Ltd company but a strong pipeline of contracts. Apply Wise found a lender happy with 1 year's accounts plus my contracts. We're now in our dream home.",
    author: "Michael & Sarah W.",
    role: "Consultancy Directors",
    location: "Bristol",
    borrowingIncrease: "Approved when others declined",
    rating: 5,
  },
  {
    quote: "Two companies, complex shareholdings, and a part-time employed role too. Apply Wise consolidated everything and presented my case perfectly. The mortgage completed in 6 weeks.",
    author: "James H.",
    role: "Multiple Company Director",
    location: "Manchester",
    borrowingIncrease: "Complex case approved",
    rating: 5,
  },
];

// Specialist lenders for company directors
const specialistLenders = [
  { name: "Kensington", specialty: "Net profit approach" },
  { name: "Aldermore", specialty: "1 year accounts" },
  { name: "Precise Mortgages", specialty: "Complex income" },
  { name: "Vida Homeloans", specialty: "Contractor specialists" },
  { name: "Halifax", specialty: "Competitive rates" },
  { name: "Accord", specialty: "Flexible criteria" },
];

export default function CompanyDirectorsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyType: "",
    yearsTrading: "",
    netProfit: "",
    salaryDividends: "",
    shareholding: "",
    propertyValue: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interactive calculator
  const [calcSalary, setCalcSalary] = useState(12570);
  const [calcDividends, setCalcDividends] = useState(45000);
  const [calcNetProfit, setCalcNetProfit] = useState(150000);
  const [calcShareholding, setCalcShareholding] = useState(100);

  const borrowingCalculation = useMemo(() => {
    // Traditional: salary + dividends
    const traditionalIncome = calcSalary + calcDividends;

    // Specialist: salary + share of net profit after corp tax (assume 19% CT)
    const profitAfterCT = calcNetProfit * 0.81; // After 19% corp tax
    const shareOfProfit = (profitAfterCT * calcShareholding) / 100;
    const specialistIncome = calcSalary + shareOfProfit;

    const multiplier = 4.5;

    return {
      traditionalIncome: Math.round(traditionalIncome),
      specialistIncome: Math.round(specialistIncome),
      traditionalBorrowing: Math.round(traditionalIncome * multiplier),
      specialistBorrowing: Math.round(specialistIncome * multiplier),
      difference: Math.round((specialistIncome * multiplier) - (traditionalIncome * multiplier)),
      percentageIncrease: traditionalIncome > 0 ? Math.round(((specialistIncome - traditionalIncome) / traditionalIncome) * 100) : 0,
    };
  }, [calcSalary, calcDividends, calcNetProfit, calcShareholding]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const [apiResponse, setApiResponse] = useState<{
    id?: string;
    priority?: string;
    estimatedBorrowing?: {
      traditional: string | null;
      specialist: string | null;
      potentialExtra: string | null;
    };
    nextSteps?: string[];
  } | null>(null);

  // Store tracking data on page load
  useEffect(() => {
    storeTrackingData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get tracking data for lead attribution
    const tracking = getStoredTrackingData();

    try {
      const response = await fetch("/api/self-employed-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          source: "company-directors-page",
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Self-Employed Enquiry submitted:", result);
        setApiResponse(result.data);
        setFormSubmitted(true);
      } else {
        console.error("Submission failed:", result.error);
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-navy pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-deep" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/self-employed" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold text-sm mb-6 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Self-Employed
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-gold text-sm font-medium">Company Director Specialists</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Limited Company Director
                <br />
                <span className="text-gold">Mortgages</span>
              </h1>

              <p className="text-white/70 text-lg mb-6 max-w-2xl">
                Stop being penalised for tax efficiency. We work with lenders who use your <strong className="text-white">net company profits</strong> - not just salary and dividends - letting you borrow up to <span className="text-gold font-semibold">40-80% more</span>.
              </p>

              {/* Key value props */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use retained profits for borrowing</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Stay tax efficient - no extra withdrawals</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 year accounts accepted</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multiple companies & complex structures</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#calculator">
                  <motion.button
                    className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Calculate Your Borrowing
                  </motion.button>
                </Link>
                <Link href="#enquiry">
                  <motion.button
                    className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Speak to a Specialist
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialist Lenders Ticker */}
      <section className="py-8 bg-white border-b border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-5 font-medium">
            Access to 35+ lenders who understand company director income
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {specialistLenders.map((lender) => (
              <div key={lender.name} className="text-center">
                <p className="text-navy font-semibold text-sm">{lender.name}</p>
                <p className="text-navy/50 text-xs">{lender.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Why Company Directors Love Working With Us
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                We understand the unique challenges of being a tax-efficient company director seeking a mortgage
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {keyBenefits.map((benefit, index) => (
              <ScrollAnimation key={benefit.title} delay={index * 0.1}>
                <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2">{benefit.title}</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem & Solution - Visual Comparison */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                The Hidden Cost of Being Tax Efficient
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Most banks only see what you withdraw, not what you actually earn. Here's how this affects your borrowing.
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-5xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {taxEfficiencyBenefits.map((item, index) => (
                  <Card key={item.strategy} className="bg-pearl border border-navy/5 rounded-xl">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <p className="text-navy/50 text-sm font-medium uppercase tracking-wider">{item.strategy}</p>
                        <p className="text-3xl font-bold text-navy mt-1">{item.amount}</p>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-700">{item.taxSaved}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-700">{item.impact}</span>
                        </div>
                        <div className="flex items-start gap-2 pt-2 border-t border-navy/10">
                          <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-navy font-medium">{item.applyWiseSolution}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollAnimation>

            {/* Worked Example */}
            <ScrollAnimation delay={0.2}>
              <Card className="bg-gradient-to-br from-navy to-navy-deep border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Real Example: Sarah's Marketing Agency</h3>
                    <p className="text-white/60 text-sm max-w-xl mx-auto">{workedExample.scenario}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* High Street Result */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <h4 className="text-white font-semibold">High Street Bank Says...</h4>
                      </div>
                      <div className="space-y-2 text-sm text-white/70 mb-4">
                        <div className="flex justify-between">
                          <span>Salary</span>
                          <span>{formatCurrency(workedExample.companyDetails.salary)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dividends Taken</span>
                          <span>{formatCurrency(workedExample.companyDetails.dividendsTaken)}</span>
                        </div>
                        <div className="flex justify-between line-through text-white/40">
                          <span>Retained Profits</span>
                          <span>{formatCurrency(workedExample.companyDetails.retainedProfit)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                          <div className="flex justify-between text-white font-medium">
                            <span>Income Used</span>
                            <span>{formatCurrency(workedExample.highStreetResult.income)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <p className="text-red-300 text-xs uppercase tracking-wider mb-1">Maximum Borrowing</p>
                        <p className="text-2xl font-bold text-red-400">{formatCurrency(workedExample.highStreetResult.maxBorrowing)}</p>
                      </div>
                    </div>

                    {/* Specialist Result */}
                    <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h4 className="text-white font-semibold">Apply Wise Finds...</h4>
                      </div>
                      <div className="space-y-2 text-sm text-white/70 mb-4">
                        <div className="flex justify-between">
                          <span>Salary</span>
                          <span>{formatCurrency(workedExample.companyDetails.salary)}</span>
                        </div>
                        <div className="flex justify-between text-gold">
                          <span>Share of Net Profit*</span>
                          <span>{formatCurrency(workedExample.companyDetails.netProfit * 0.75)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 mt-2">
                          <div className="flex justify-between text-white font-medium">
                            <span>Income Used</span>
                            <span>{formatCurrency(workedExample.specialistResult.income)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gold/20 rounded-lg border border-gold/30">
                        <p className="text-gold text-xs uppercase tracking-wider mb-1">Maximum Borrowing</p>
                        <p className="text-2xl font-bold text-gold">{formatCurrency(workedExample.specialistResult.maxBorrowing)}</p>
                      </div>
                      <p className="text-white/40 text-xs mt-3 text-center">*After corporation tax deduction</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="inline-block px-6 py-3 bg-green-500/20 rounded-full border border-green-500/30">
                      <span className="text-green-300 font-bold text-lg">
                        Sarah borrows {formatCurrency(workedExample.specialistResult.maxBorrowing - workedExample.highStreetResult.maxBorrowing)} MORE
                      </span>
                      <span className="text-green-300/70 text-sm ml-2">
                        (+{Math.round(((workedExample.specialistResult.maxBorrowing / workedExample.highStreetResult.maxBorrowing) - 1) * 100)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section id="calculator" className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Calculate Your Borrowing Power
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Enter your figures to see how much more you could borrow using the net profit approach
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-white/70 text-sm font-medium">Annual Salary</label>
                        <span className="text-gold font-bold">{formatCurrency(calcSalary)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={60000}
                        step={1000}
                        value={calcSalary}
                        onChange={(e) => setCalcSalary(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                      <div className="flex justify-between text-xs text-white/40 mt-1">
                        <span>£0</span>
                        <span>£12,570 (NI threshold)</span>
                        <span>£60k</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-white/70 text-sm font-medium">Annual Dividends Taken</label>
                        <span className="text-gold font-bold">{formatCurrency(calcDividends)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200000}
                        step={5000}
                        value={calcDividends}
                        onChange={(e) => setCalcDividends(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-white/70 text-sm font-medium">Company Net Profit (before tax)</label>
                        <span className="text-gold font-bold">{formatCurrency(calcNetProfit)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={500000}
                        step={10000}
                        value={calcNetProfit}
                        onChange={(e) => setCalcNetProfit(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-white/70 text-sm font-medium">Your Shareholding %</label>
                        <span className="text-gold font-bold">{calcShareholding}%</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        step={1}
                        value={calcShareholding}
                        onChange={(e) => setCalcShareholding(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                      <div className="flex justify-between text-xs text-white/40 mt-1">
                        <span>1%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/50 text-sm mb-1">Traditional Lender (Salary + Dividends)</p>
                        <p className="text-xs text-white/40 mb-2">Income: {formatCurrency(borrowingCalculation.traditionalIncome)}</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(borrowingCalculation.traditionalBorrowing)}</p>
                      </div>

                      <div className="p-4 bg-gold/20 rounded-xl border border-gold/30">
                        <p className="text-gold text-sm mb-1">Specialist Lender (Net Profit Approach)</p>
                        <p className="text-xs text-gold/60 mb-2">Income: {formatCurrency(borrowingCalculation.specialistIncome)}</p>
                        <p className="text-3xl font-bold text-gold">{formatCurrency(borrowingCalculation.specialistBorrowing)}</p>
                      </div>

                      <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30 text-center">
                        <p className="text-green-300 text-sm mb-1">You Could Borrow</p>
                        <p className="text-2xl font-bold text-green-400">
                          {formatCurrency(borrowingCalculation.difference)} MORE
                        </p>
                        <p className="text-green-300/60 text-xs mt-1">
                          {borrowingCalculation.percentageIncrease}% increase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="#enquiry">
                    <motion.button
                      className="px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Your Personalised Quote
                    </motion.button>
                  </Link>
                  <p className="text-white/40 text-xs mt-3">
                    Based on 4.5x income multiplier. Actual borrowing depends on individual circumstances and lender criteria.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Lenders Assess Income */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                How Different Lenders Assess Your Income
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Not all lenders are created equal. Here's how we match you with the right one.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lenderApproaches.map((approach, index) => (
              <ScrollAnimation key={approach.type} delay={index * 0.1}>
                <Card className={`border rounded-xl h-full ${index === 1 ? 'bg-gold/5 border-gold/30 shadow-lg' : 'bg-white border-navy/5'}`}>
                  <CardContent className="p-6">
                    {index === 1 && (
                      <div className="inline-block px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full mb-3">
                        RECOMMENDED FOR MOST DIRECTORS
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-navy mb-1">{approach.type}</h3>
                    <p className={`text-sm font-medium mb-3 ${index === 1 ? 'text-gold' : 'text-navy/60'}`}>{approach.method}</p>
                    <p className="text-navy/60 text-sm mb-4">{approach.description}</p>

                    <div className="p-3 bg-pearl rounded-lg mb-4">
                      <p className="text-xs text-navy/50 uppercase tracking-wider mb-1">Calculation</p>
                      <p className="text-sm font-medium text-navy">{approach.calculation}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-green-700 font-semibold uppercase tracking-wider mb-1">Pros</p>
                        <ul className="space-y-1">
                          {approach.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy/60">
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-red-700 font-semibold uppercase tracking-wider mb-1">Cons</p>
                        <ul className="space-y-1">
                          {approach.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy/60">
                              <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-navy/10">
                      <p className="text-xs text-navy/40 uppercase tracking-wider mb-1">Best For</p>
                      <p className="text-sm text-navy font-medium">{approach.suitableFor}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                What Documents Will I Need?
              </h2>
              <p className="text-navy/60">
                We'll guide you through gathering everything - here's what to expect
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {documentsList.map((doc, index) => (
              <ScrollAnimation key={doc.title} delay={index * 0.05}>
                <div className="flex items-start gap-4 p-5 bg-pearl rounded-xl">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{doc.title}</h4>
                    <p className="text-navy/60 text-xs mt-1">{doc.description}</p>
                    <p className="text-gold text-xs mt-2 font-medium">{doc.tip}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Directors Who Borrowed More
              </h2>
              <p className="text-white/60">
                Real company directors who maximised their borrowing with Apply Wise
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl h-full">
                  <CardContent className="p-5">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <span className="inline-block px-2 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded mb-3">
                      {testimonial.borrowingIncrease}
                    </span>

                    <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div className="w-10 h-10 bg-gold/30 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{testimonial.author}</p>
                        <p className="text-white/50 text-xs">{testimonial.role}</p>
                        <p className="text-white/40 text-xs">{testimonial.location}</p>
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
                Company Director Mortgage FAQs
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
                        <div className="px-5 pb-5 text-navy/70 text-sm leading-relaxed">
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

      {/* Enquiry Form */}
      <section id="enquiry" className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Get Your Company Director Mortgage Quote
                </h2>
                <p className="text-white/60">
                  Tell us about your business and we'll show you how much you could really borrow
                </p>
              </div>
            </ScrollAnimation>

            {!formSubmitted ? (
              <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Phone</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="07123 456789"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Company Type</label>
                        <select
                          required
                          value={formData.companyType}
                          onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-gold focus:outline-none"
                        >
                          <option value="" className="bg-navy">Select type</option>
                          <option value="ltd-sole" className="bg-navy">Ltd Company (Sole Director)</option>
                          <option value="ltd-multiple" className="bg-navy">Ltd Company (Multiple Directors)</option>
                          <option value="contractor-ltd" className="bg-navy">Contractor Ltd Company</option>
                          <option value="multiple-companies" className="bg-navy">Multiple Companies</option>
                          <option value="holding-company" className="bg-navy">Holding Company Structure</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Years Trading</label>
                        <select
                          value={formData.yearsTrading}
                          onChange={(e) => setFormData({ ...formData, yearsTrading: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-gold focus:outline-none"
                        >
                          <option value="" className="bg-navy">Select</option>
                          <option value="0-1" className="bg-navy">Less than 1 year</option>
                          <option value="1-2" className="bg-navy">1-2 years</option>
                          <option value="2-3" className="bg-navy">2-3 years</option>
                          <option value="3+" className="bg-navy">3+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Company Net Profit (Latest Year)</label>
                        <input
                          type="text"
                          value={formData.netProfit}
                          onChange={(e) => setFormData({ ...formData, netProfit: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="£150,000"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Your Shareholding %</label>
                        <input
                          type="text"
                          value={formData.shareholding}
                          onChange={(e) => setFormData({ ...formData, shareholding: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="100%"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Salary + Dividends Taken</label>
                        <input
                          type="text"
                          value={formData.salaryDividends}
                          onChange={(e) => setFormData({ ...formData, salaryDividends: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="£50,000"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2 text-sm">Property Value / Budget</label>
                        <input
                          type="text"
                          value={formData.propertyValue}
                          onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="£500,000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Anything else? (optional)</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none resize-none"
                        placeholder="e.g. Multiple directorships, contractor day rate, recently incorporated..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Get My Quote"
                      )}
                    </button>
                    <p className="text-white/40 text-xs text-center">
                      By submitting, you agree to our <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Thank you, {formData.name.split(" ")[0]}!
                </h3>

                {/* Reference number */}
                {apiResponse?.id && (
                  <p className="text-white/50 text-sm mb-4">
                    Reference: <code className="bg-white/10 px-2 py-1 rounded">{apiResponse.id}</code>
                  </p>
                )}

                {/* Estimated borrowing comparison */}
                {apiResponse?.estimatedBorrowing?.potentialExtra && (
                  <div className="bg-white/5 rounded-xl p-5 max-w-md mx-auto mb-6">
                    <h4 className="text-gold font-semibold mb-3 text-sm">Your Estimated Borrowing</h4>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-white/50 text-xs">Traditional Lender</p>
                        <p className="text-white font-semibold">{apiResponse.estimatedBorrowing.traditional || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gold text-xs">Specialist Lender</p>
                        <p className="text-gold font-bold text-lg">{apiResponse.estimatedBorrowing.specialist || "N/A"}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 text-center">
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-sm font-semibold rounded-full">
                        Potential Extra: {apiResponse.estimatedBorrowing.potentialExtra}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-white/70 max-w-md mx-auto mb-6">
                  One of our company director mortgage specialists will call you within 2 hours during business hours to discuss how we can maximise your borrowing.
                </p>

                {/* Next Steps */}
                {apiResponse?.nextSteps && apiResponse.nextSteps.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-5 max-w-md mx-auto text-left">
                    <h4 className="text-white font-semibold mb-3 text-sm">What happens next:</h4>
                    <ul className="space-y-2">
                      {apiResponse.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-white/70 text-sm">
                          <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gradient-to-r from-gold/20 to-gold/10 border-y border-gold/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold text-navy mb-2">
                Ready to see your true borrowing power?
              </h3>
              <p className="text-navy/60">
                Don't let tax efficiency hold back your property dreams.
              </p>
            </div>
            <Link href="#calculator">
              <motion.button
                className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Now
              </motion.button>
            </Link>
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
