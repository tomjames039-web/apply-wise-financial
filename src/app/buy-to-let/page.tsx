"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

// Multi-step form state type
interface BTLFormData {
  propertyType: string;
  propertyValue: number;
  expectedRent: number;
  deposit: number;
  ownershipType: string;
  existingProperties: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
}

const lenders = [
  { name: "NatWest", brandColor: "#5B2D8E" },
  { name: "Nationwide", brandColor: "#004B87" },
  { name: "Barclays", brandColor: "#00AEEF" },
  { name: "Halifax", brandColor: "#004A93" },
  { name: "Santander", brandColor: "#EC0000" },
  { name: "HSBC", brandColor: "#DB0011" },
  { name: "The Mortgage Works", brandColor: "#1E3A5F" },
  { name: "Paragon", brandColor: "#00205B" },
];

const steps = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Tell us about you and your BTL goals",
    description: "No lengthy phone calls or branch visits. It takes just a few minutes to tell us what you need from your buy-to-let mortgage online.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Speak to a BTL mortgage expert",
    description: "Choose the perfect time. We're available 6 days a week, including evenings, to discuss your options and find the right deal.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Get your BTL mortgage sorted",
    description: "We'll check, chase, and help avoid delays. Get regular updates from your mortgage expert and case manager throughout.",
  },
];

const faqs = [
  {
    question: "How long does it take to get a buy-to-let mortgage?",
    answer: "Around 4-6 weeks for purchases or 3-4 weeks for remortgages. This can vary depending on the complexity of your case and how quickly you provide documentation.",
  },
  {
    question: "How many buy-to-let mortgages can I have?",
    answer: "Usually 3-5 per lender. Some lenders won't approve another mortgage if you have a large portfolio. You can take out mortgages with different lenders if you hit the limit with your existing one.",
  },
  {
    question: "Can I get a buy-to-let mortgage as a first-time buyer?",
    answer: "Yes, some lenders will offer buy-to-let mortgages without being a homeowner first, though options are more limited. Keep in mind you won't get first-time buyer stamp duty relief on a BTL purchase.",
  },
  {
    question: "How much deposit do I need for a buy-to-let mortgage?",
    answer: "Most buy-to-let mortgages require a minimum deposit of 25% of the property value. To access the best rates, you'll typically need 40% or more, which lowers your LTV to 60%.",
  },
  {
    question: "Can I use a normal mortgage to buy a property and rent it out?",
    answer: "No, that would be mortgage fraud. You need a buy-to-let mortgage if you plan to rent out the property. You can potentially get a consent to let for a short period, but for permanent rental, you'll need a BTL mortgage.",
  },
  {
    question: "What insurance do I need for a buy-to-let property?",
    answer: "There's no additional legal requirement, but landlord insurance is highly recommended - especially if you plan to use the rental income to pay your mortgage. It typically covers building insurance, liability, and loss of rent.",
  },
];

const btlDifferences = [
  { title: "Interest rates", desc: "Usually a bit higher due to the commercial and higher risk nature of BTL purchases" },
  { title: "Repayment type", desc: "Interest-only mortgages are common for BTL, while residential mortgages are usually capital repayment" },
  { title: "Fees", desc: "Usually higher and often charged as a percentage of the property value" },
  { title: "Deposit", desc: "You'll need a minimum of 25% vs 5-10% for residential mortgages" },
  { title: "Criteria", desc: "Often stricter with additional requirements to meet" },
  { title: "Loan calculation", desc: "Based on rental yield rather than personal income, though both factors are considered" },
];

const howToApplySteps = [
  {
    number: "1",
    title: "Do your research",
    description: "How much are local rents? Is the property in a sought-after location? How much will it cost to maintain?",
  },
  {
    number: "2",
    title: "Know your repayment plan",
    description: "If you use an interest-only mortgage, you'll need to know how you'll repay the loan at the end of your term (sale of property, investments, pension, etc.).",
  },
  {
    number: "3",
    title: "Prepare your documents",
    description: "We'll need proof of deposit, income records, bank details, and ID documents. Limited company applications require accounts and tax records.",
  },
  {
    number: "4",
    title: "Get a mortgage in principle",
    description: "Contact us for an MIP to find out how much you may be able to borrow - this helps when making offers.",
  },
  {
    number: "5",
    title: "Make an offer and apply",
    description: "Use your MIP to make an offer, then come back to us for a whole-of-market comparison and to start your application.",
  },
];

const relatedArticles = [
  {
    title: "Limited Company Buy-to-Let",
    description: "Our limited company BTL mortgage experts can search across the market to find the right deal for your SPV.",
    link: "/buy-to-let/limited-company",
  },
  {
    title: "BTL Yield Calculator",
    description: "Calculate your rental yield, ROI, and monthly cash flow to assess the profitability of your investment.",
    link: "/calculator/btl-yield",
  },
  {
    title: "Buy-to-Let Tax Guide",
    description: "Understand stamp duty surcharges, income tax on rental profits, and how limited company ownership affects your tax liability.",
    link: "/guides",
  },
];

const btlTestimonials = [
  {
    quote: "Fantastic service for landlords. They found me a great BTL rate when my high street bank couldn't help. Saved me thousands on my portfolio refinance.",
    author: "David Harrison",
    location: "Manchester",
    propertyCount: "6 properties",
    rating: 5,
  },
  {
    quote: "Setting up my SPV and getting limited company mortgages seemed daunting, but Apply Wise made it straightforward. Now I have 3 properties in my portfolio.",
    author: "Sarah Mitchell",
    location: "Birmingham",
    propertyCount: "3 properties",
    rating: 5,
  },
  {
    quote: "As a first-time landlord, I had so many questions. The team was patient, knowledgeable, and found me a deal with just 20% deposit.",
    author: "James & Emily Chen",
    location: "Bristol",
    propertyCount: "1 property",
    rating: 5,
  },
];

export default function BuyToLetPage() {
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<BTLFormData>({
    propertyType: "",
    propertyValue: 250000,
    expectedRent: 1200,
    deposit: 62500,
    ownershipType: "",
    existingProperties: "",
    timeframe: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store tracking data on page load
  useEffect(() => {
    storeTrackingData();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const updateFormData = (field: keyof BTLFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setFormStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setFormStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get tracking data for lead attribution
      const tracking = getStoredTrackingData();

      const response = await fetch("/api/btl-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("BTL Enquiry submitted:", result);
        setFormSubmitted(true);
      } else {
        console.error("Submission failed:", result.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormStep(0);
    setFormSubmitted(false);
    setShowModal(false);
    setFormData({
      propertyType: "",
      propertyValue: 250000,
      expectedRent: 1200,
      deposit: 62500,
      ownershipType: "",
      existingProperties: "",
      timeframe: "",
      name: "",
      email: "",
      phone: "",
      postcode: "",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateYield = () => {
    const annualRent = formData.expectedRent * 12;
    const grossYield = (annualRent / formData.propertyValue) * 100;
    return grossYield.toFixed(1);
  };

  const calculateLTV = () => {
    const ltv = ((formData.propertyValue - formData.deposit) / formData.propertyValue) * 100;
    return ltv.toFixed(0);
  };

  const stepTitles = [
    "Property Type",
    "Property Details",
    "Ownership",
    "Timeline",
    "Your Details",
  ];

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
              Buy-to-Let
              <br />
              <span className="text-gold">Mortgage Experts</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Whether you're a first-time landlord or expanding your portfolio, we search 90+ lenders to find the right deal for you.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Personal name or limited company",
                "Portfolio landlord specialists",
                "HMO & holiday let experts",
                "Competitive rates from 90+ lenders",
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
              <motion.button
                onClick={() => setShowModal(true)}
                className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a BTL Mortgage
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  initial={{ scaleX: 0.3, opacity: 0.5 }}
                  animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.button>
              <Link href="/remortgage">
                <motion.button
                  className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Remortgage BTL
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
      <section className="py-10 bg-white border-b border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Going above & beyond to save you time & money on your mortgage
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {lenders.map((lender) => (
              <motion.span
                key={lender.name}
                className="text-navy/70 font-semibold text-sm md:text-base hover:text-navy transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {lender.name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <ScrollAnimation key={step.title} delay={index * 0.1}>
                <Card className="bg-white border border-navy/5 shadow-sm rounded-xl h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-3">
                      {step.title}
                    </h3>
                    <p className="text-navy/60 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={0.3}>
            <div className="flex justify-center mt-10">
              <motion.button
                onClick={() => setShowModal(true)}
                className="px-10 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Mortgage Options
              </motion.button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* What is BTL Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                What is a buy-to-let mortgage?
              </h2>
              <div className="prose prose-lg text-navy/70 space-y-4">
                <p>
                  A buy-to-let mortgage is a loan you take out to buy a residential property you plan to let out for profit. It's specifically aimed at landlords and property investors.
                </p>
                <p>
                  It works the same way as any other mortgage - you put down a deposit and borrow the rest from a lender, then repay it over a set term. But there are different criteria to meet, and you'll need a larger deposit than you would for a residential purchase.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <h3 className="text-xl font-bold text-navy mt-12 mb-4">
                How much could I borrow for a buy-to-let mortgage?
              </h3>
              <div className="prose prose-lg text-navy/70 space-y-4">
                <p>
                  When you buy investment property with a mortgage, the lender's main focus is your potential return on that investment. They generally base the loan size on the potential rental income (known as the yield) that the property could make.
                </p>
                <p>
                  Most lenders will want rental income to cover your mortgage repayments, plus an additional 25-45% to cover taxes, maintenance, insurance and other costs.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <h3 className="text-xl font-bold text-navy mt-12 mb-6">
                Key differences from residential mortgages
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {btlDifferences.map((item, index) => (
                  <div key={item.title} className="flex gap-3 p-4 bg-pearl rounded-xl">
                    <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{item.title}</p>
                      <p className="text-navy/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-gold/20 to-gold/10 border-y border-gold/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-navy mb-2">
                Secure your new mortgage rate now
              </h3>
              <p className="text-navy/60">
                Lenders have been changing rates recently. Act now to secure your best deal!
              </p>
            </div>
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Mortgage Advice
            </motion.button>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                How to apply for a buy-to-let mortgage
              </h2>
              <p className="text-navy/60 mb-10">
                Just follow these five simple steps and you'll be well on your way to finding the right buy-to-let mortgage for you:
              </p>
            </ScrollAnimation>

            <div className="space-y-6">
              {howToApplySteps.map((step, index) => (
                <ScrollAnimation key={step.number} delay={index * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-gold font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1 pb-6 border-b border-navy/10 last:border-0">
                      <h4 className="font-semibold text-navy mb-2">{step.title}</h4>
                      <p className="text-navy/60 text-sm">{step.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={0.4}>
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Buy-to-Let Mortgage
                </motion.button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Related articles
            </h2>
            <p className="text-navy/60 mb-10">
              Read some of our highlighted buy-to-let articles below.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedArticles.map((article, index) => (
              <ScrollAnimation key={article.title} delay={index * 0.1}>
                <Link href={article.link}>
                  <Card className="bg-pearl border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-navy/60 text-sm leading-relaxed mb-4">
                        {article.description}
                      </p>
                      <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read full article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* BTL Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <p className="text-gold text-sm font-medium uppercase tracking-wider mb-3">
                Success Stories
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Trusted by landlords across the UK
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {btlTestimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/10 rounded-xl h-full">
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Property badge */}
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full mb-4">
                      {testimonial.propertyCount}
                    </span>

                    {/* Quote */}
                    <p className="text-navy/70 text-sm leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-navy text-sm">{testimonial.author}</p>
                        <p className="text-navy/50 text-xs">{testimonial.location}</p>
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
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10">
              Buy to let mortgage FAQs
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

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Ready to find your buy-to-let mortgage?
            </h2>
            <p className="text-navy/60 max-w-xl mx-auto mb-8">
              Get expert advice from our BTL specialists. Free, no-obligation consultation with access to 90+ lenders.
            </p>
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
            </motion.button>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />

      {/* Full-Screen Modal Form */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy"
          >
            {/* Close button */}
            <button
              onClick={resetForm}
              className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="absolute top-6 left-6 z-10">
              <Link href="/" className="flex items-center">
                <img
                  src="/logos/apply-wise-logo.png"
                  alt="Apply Wise"
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
            </div>

            <div className="h-full overflow-y-auto">
              <div className="min-h-full flex items-center justify-center py-20 px-4">
                <div className="w-full max-w-lg">
                  {!formSubmitted ? (
                    <>
                      {/* Progress indicator */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-sm">Step {formStep + 1} of 5</span>
                          <span className="text-gold text-sm font-medium">{stepTitles[formStep]}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${((formStep + 1) / 5) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {/* Step 1: Property Type */}
                        {formStep === 0 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                What type of property are you looking to buy?
                              </h2>
                              <p className="text-white/50">Select the option that best describes your investment</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {[
                                { value: "single", label: "Standard Buy-to-Let", desc: "A single residential property to rent out" },
                                { value: "hmo", label: "HMO (House of Multiple Occupation)", desc: "Property for multiple tenants like student lets" },
                                { value: "holiday", label: "Holiday Let", desc: "Short-term vacation rental property" },
                                { value: "portfolio", label: "Portfolio Addition", desc: "Adding to an existing property portfolio" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    updateFormData("propertyType", option.value);
                                    nextStep();
                                  }}
                                  className={`p-5 rounded-xl border text-left transition-all ${
                                    formData.propertyType === option.value
                                      ? "bg-gold/20 border-gold text-white"
                                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                                  }`}
                                >
                                  <p className="font-semibold">{option.label}</p>
                                  <p className="text-sm opacity-60 mt-1">{option.desc}</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Property Value & Rent */}
                        {formStep === 1 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                          >
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Property details
                              </h2>
                              <p className="text-white/50">Tell us about your investment property</p>
                            </div>

                            <div className="space-y-8">
                              <div>
                                <div className="flex justify-between mb-3">
                                  <label className="text-white/70 font-medium">Property Value</label>
                                  <span className="text-gold font-bold text-xl">{formatCurrency(formData.propertyValue)}</span>
                                </div>
                                <input
                                  type="range"
                                  min={75000}
                                  max={2000000}
                                  step={5000}
                                  value={formData.propertyValue}
                                  onChange={(e) => updateFormData("propertyValue", Number(e.target.value))}
                                  className="w-full cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-white/40 mt-1">
                                  <span>£75k</span>
                                  <span>£2m</span>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between mb-3">
                                  <label className="text-white/70 font-medium">Expected Monthly Rent</label>
                                  <span className="text-gold font-bold text-xl">{formatCurrency(formData.expectedRent)}</span>
                                </div>
                                <input
                                  type="range"
                                  min={400}
                                  max={5000}
                                  step={50}
                                  value={formData.expectedRent}
                                  onChange={(e) => updateFormData("expectedRent", Number(e.target.value))}
                                  className="w-full cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-white/40 mt-1">
                                  <span>£400</span>
                                  <span>£5,000</span>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between mb-3">
                                  <label className="text-white/70 font-medium">Your Deposit</label>
                                  <span className="text-gold font-bold text-xl">{formatCurrency(formData.deposit)}</span>
                                </div>
                                <input
                                  type="range"
                                  min={formData.propertyValue * 0.15}
                                  max={formData.propertyValue * 0.6}
                                  step={5000}
                                  value={Math.min(formData.deposit, formData.propertyValue * 0.6)}
                                  onChange={(e) => updateFormData("deposit", Number(e.target.value))}
                                  className="w-full cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-white/40 mt-1">
                                  <span>15%</span>
                                  <span>60%</span>
                                </div>
                              </div>

                              {/* Yield Calculator */}
                              <div className="grid grid-cols-2 gap-4 p-5 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-center">
                                  <p className="text-white/50 text-sm mb-1">Gross Yield</p>
                                  <p className="text-3xl font-bold text-gold">{calculateYield()}%</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-white/50 text-sm mb-1">LTV</p>
                                  <p className="text-3xl font-bold text-white">{calculateLTV()}%</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Ownership Type */}
                        {formStep === 2 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                How will you own the property?
                              </h2>
                              <p className="text-white/50">This affects your tax liability and mortgage options</p>
                            </div>
                            <div className="space-y-3">
                              {[
                                { value: "personal", label: "Personal Name", desc: "Buy as an individual or joint ownership" },
                                { value: "limited", label: "Limited Company (SPV)", desc: "For tax efficiency, especially on larger portfolios" },
                                { value: "unsure", label: "Not Sure Yet", desc: "We can advise on the best option for you" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => updateFormData("ownershipType", option.value)}
                                  className={`w-full p-5 rounded-xl border text-left transition-all ${
                                    formData.ownershipType === option.value
                                      ? "bg-gold/20 border-gold text-white"
                                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                                  }`}
                                >
                                  <p className="font-semibold">{option.label}</p>
                                  <p className="text-sm opacity-60 mt-1">{option.desc}</p>
                                </button>
                              ))}
                            </div>

                            <div className="pt-4">
                              <p className="text-white/70 mb-3 font-medium">How many BTL properties do you currently own?</p>
                              <div className="grid grid-cols-3 gap-3">
                                {["0", "1-3", "4+"].map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => updateFormData("existingProperties", option)}
                                    className={`p-4 rounded-xl border text-center transition-all ${
                                      formData.existingProperties === option
                                        ? "bg-gold/20 border-gold text-white"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                    }`}
                                  >
                                    <span className="font-semibold">{option}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 4: Timeframe */}
                        {formStep === 3 && (
                          <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                When are you looking to purchase?
                              </h2>
                              <p className="text-white/50">This helps us prioritise your application</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {[
                                { value: "asap", label: "As soon as possible", desc: "I'm ready to move now" },
                                { value: "1-3months", label: "In 1-3 months", desc: "Actively searching for properties" },
                                { value: "3-6months", label: "In 3-6 months", desc: "Planning ahead" },
                                { value: "exploring", label: "Just exploring options", desc: "Want to understand what's available" },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    updateFormData("timeframe", option.value);
                                    nextStep();
                                  }}
                                  className={`p-5 rounded-xl border text-left transition-all ${
                                    formData.timeframe === option.value
                                      ? "bg-gold/20 border-gold text-white"
                                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                                  }`}
                                >
                                  <p className="font-semibold">{option.label}</p>
                                  <p className="text-sm opacity-60 mt-1">{option.desc}</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 5: Contact Details */}
                        {formStep === 4 && (
                          <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Your contact details
                              </h2>
                              <p className="text-white/50">We'll use this to send you your personalised options</p>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-white/70 mb-2 font-medium">Full Name</label>
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => updateFormData("name", e.target.value)}
                                  placeholder="John Smith"
                                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-white/70 mb-2 font-medium">Email Address</label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => updateFormData("email", e.target.value)}
                                  placeholder="john@example.com"
                                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-white/70 mb-2 font-medium">Phone Number</label>
                                  <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData("phone", e.target.value)}
                                    placeholder="07123 456789"
                                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-white/70 mb-2 font-medium">Postcode</label>
                                  <input
                                    type="text"
                                    value={formData.postcode}
                                    onChange={(e) => updateFormData("postcode", e.target.value.toUpperCase())}
                                    placeholder="CM16 7PY"
                                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all uppercase"
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="text-white/40 text-sm">
                              By submitting, you agree to our{" "}
                              <Link href="/privacy" className="text-gold hover:underline">
                                Privacy Policy
                              </Link>
                              . We'll contact you about your mortgage enquiry.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-10">
                        <button
                          onClick={prevStep}
                          className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            formStep === 0
                              ? "opacity-0 pointer-events-none"
                              : "text-white/70 hover:text-white border border-white/20 hover:border-white/40"
                          }`}
                        >
                          Back
                        </button>
                        {formStep < 4 ? (
                          formStep !== 0 && formStep !== 3 && (
                            <button
                              onClick={nextStep}
                              disabled={
                                (formStep === 2 && !formData.ownershipType)
                              }
                              className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Continue
                            </button>
                          )
                        ) : (
                          <button
                            onClick={handleSubmit}
                            disabled={!formData.name || !formData.email || !formData.phone || !formData.postcode || isSubmitting}
                            className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                              "Get My Quotes"
                            )}
                          </button>
                        )}
                      </div>
                    </>
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
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Thank you, {formData.name.split(" ")[0]}!
                      </h3>
                      <p className="text-white/70 mb-8 max-w-md mx-auto">
                        We've received your buy-to-let enquiry. One of our BTL specialists will contact you within 24 hours to discuss your options.
                      </p>
                      <div className="inline-flex items-center gap-2 text-gold mb-8">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>We'll call you soon</span>
                      </div>
                      <div>
                        <button
                          onClick={resetForm}
                          className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
                        >
                          Back to Website
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider styles now handled globally in globals.css for better mobile support */}
    </div>
  );
}
