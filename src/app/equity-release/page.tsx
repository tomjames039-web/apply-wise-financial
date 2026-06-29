"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

const reasons = [
  "Get extra funds to enjoy retirement",
  "Help family members financially",
  "Improve your home or garden",
  "Eliminate debt or go mortgage free",
  "Take the trip of a lifetime",
  "Pay for care or medical expenses",
];

const equityReleaseLenders = [
  { name: "Aviva" },
  { name: "Legal & General" },
  { name: "Canada Life" },
  { name: "More2Life" },
  { name: "Pure Retirement" },
  { name: "Standard Life" },
];

const guarantees = [
  {
    title: "No Negative Equity Guarantee",
    description: "You will never owe more than the value of your home.",
  },
  {
    title: "Right to Remain",
    description: "You can remain in your home for as long as you wish, providing it remains your main residence.",
  },
  {
    title: "Freedom to Move",
    description: "You have freedom to move to another suitable property, subject to the new property being acceptable to your provider.",
  },
];

const comparisonTable = [
  {
    feature: "Ownership",
    lifetimeMortgage: "You retain full ownership of your home",
    homeReversion: "You sell part or all of your home",
    winner: "lifetime",
  },
  {
    feature: "Monthly Payments",
    lifetimeMortgage: "Optional - usually none required",
    homeReversion: "None - you live rent-free",
    winner: "tie",
  },
  {
    feature: "Interest Charges",
    lifetimeMortgage: "Yes - typically compounds over time",
    homeReversion: "No interest charges apply",
    winner: "reversion",
  },
  {
    feature: "Amount Released",
    lifetimeMortgage: "20-57% of property value",
    homeReversion: "30-60% of share sold value",
    winner: "lifetime",
  },
  {
    feature: "House Price Growth",
    lifetimeMortgage: "You benefit from 100% of growth",
    homeReversion: "Only benefit on retained share",
    winner: "lifetime",
  },
  {
    feature: "Minimum Age",
    lifetimeMortgage: "Usually 55+",
    homeReversion: "Usually 65+",
    winner: "lifetime",
  },
  {
    feature: "Market Availability",
    lifetimeMortgage: "Widely available - 95%+ of market",
    homeReversion: "Very limited - less than 5%",
    winner: "lifetime",
  },
];

const faqs = [
  {
    question: "Is equity release a safe way to borrow against my home?",
    answer: "For many homeowners over the age of 55, equity release could be a good option to borrow money as a lump sum or drawdown facility. All plans from Equity Release Council members include important safeguards like the No Negative Equity Guarantee.",
  },
  {
    question: "What is a Lifetime Mortgage?",
    answer: "A lifetime mortgage is a loan secured against your home that doesn't require monthly repayments. You retain ownership of your home, and the interest is typically 'rolled up' (compounded). The loan and rolled-up interest is repaid when you move to a care home, pass away, or sell the property.",
  },
  {
    question: "Are any special checks required?",
    answer: "There are typically no credit checks needed for lifetime mortgages. There's no means test from lenders either, which offers peace of mind and greater certainty during the application process.",
  },
  {
    question: "Can I choose how to receive the money?",
    answer: "Yes, lifetime mortgages can be taken as a single lump sum, regular income, or via drawdown (where you take smaller amounts over time). Drawdown can help reduce the interest that builds up, as you only pay interest on money you've actually withdrawn.",
  },
  {
    question: "What if house prices change?",
    answer: "With the No Negative Equity Guarantee, you'll never owe more than your home is worth. If house prices fall, your estate won't have to make up any shortfall. If they rise, any remaining equity after the loan is repaid goes to your beneficiaries.",
  },
  {
    question: "What if equity release isn't right for me?",
    answer: "If equity release isn't appropriate for your situation, we'll tell you. We'll explain alternatives such as remortgaging, downsizing, or other options. We never pressure clients into decisions that aren't right for them.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Free Consultation",
    description: "We'll explain your options and answer all your questions with no obligation.",
  },
  {
    step: "2",
    title: "Personalised Quote",
    description: "We'll show you how much you could release and what it would cost.",
  },
  {
    step: "3",
    title: "Application",
    description: "We handle all the paperwork and keep you updated throughout.",
  },
  {
    step: "4",
    title: "Funds Released",
    description: "Receive your funds, typically within 6-8 weeks of application.",
  },
];

const videoTestimonials = [
  {
    id: 1,
    name: "Robert & Susan Thompson",
    location: "Hampshire",
    age: "Both 70+",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=225&fit=crop",
    quote: "We released £85,000 to help our children with house deposits and took a dream cruise to Australia.",
    videoUrl: "#",
    amountReleased: "£85,000",
    purpose: "Family & Travel",
  },
  {
    id: 2,
    name: "Margaret Collins",
    location: "Devon",
    age: "78",
    thumbnail: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=225&fit=crop",
    quote: "After my husband passed, the mortgage payments were a struggle. Equity release gave me peace of mind.",
    videoUrl: "#",
    amountReleased: "£120,000",
    purpose: "Mortgage Clearance",
  },
  {
    id: 3,
    name: "James & Patricia Davies",
    location: "Surrey",
    age: "Both 68",
    thumbnail: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400&h=225&fit=crop",
    quote: "We used equity release to renovate our home and make it suitable for our retirement years.",
    videoUrl: "#",
    amountReleased: "£65,000",
    purpose: "Home Improvements",
  },
];

const testimonials = [
  {
    quote: "The team explained everything clearly and were so patient with all my questions. I was able to help my grandchildren with house deposits and still live comfortably.",
    author: "Margaret W.",
    location: "Surrey",
    age: "72",
    rating: 5,
  },
  {
    quote: "After my husband passed, I wasn't sure what to do about the mortgage. Apply Wise found me a lifetime mortgage that cleared my debt and gave me peace of mind.",
    author: "Patricia H.",
    location: "Kent",
    age: "68",
    rating: 5,
  },
  {
    quote: "Professional service from start to finish. They found us a great equity release plan that let us renovate our home and enjoy our retirement properly.",
    author: "David & Jean M.",
    location: "Essex",
    age: "Both 65+",
    rating: 5,
  },
];

const trustPoints = [
  {
    title: "Equity Release Council Members",
    description: "We only recommend plans from Equity Release Council members, ensuring important safeguards.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "FCA Regulated",
    description: "Directly authorised and regulated by the Financial Conduct Authority.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Personal Service",
    description: "Direct access to your adviser via phone during the day, evenings, and weekends.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export default function EquityReleasePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  // Calculator state
  const [age, setAge] = useState(65);
  const [propertyValue, setPropertyValue] = useState(350000);

  // Simple equity release estimate calculation
  const estimatedRelease = useMemo(() => {
    const baseLTV = Math.min(55, Math.max(20, (age - 55) * 1.5 + 20));
    const maxRelease = (propertyValue * baseLTV) / 100;
    return {
      minRelease: Math.round(maxRelease * 0.7),
      maxRelease: Math.round(maxRelease),
      ltv: baseLTV.toFixed(0),
    };
  }, [age, propertyValue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    propertyValue: "",
    reason: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    id?: string;
    estimatedRelease?: {
      min: string | null;
      max: string | null;
      ltv: string;
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
      const response = await fetch("/api/equity-release-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          source: "equity-release-page",
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Equity Release Enquiry submitted:", result);
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
              Equity Release
              <br />
              <span className="text-gold">& Lifetime Mortgages</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Unlock the value in your home to enjoy retirement, help family, or achieve lifelong dreams. Expert advice with no pressure, just solutions.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "No monthly repayments required",
                "Stay in your home for life",
                "Tax-free cash release",
                "Equity Release Council members",
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
              <Link href="#enquiry">
                <motion.button
                  className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Free Advice
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
                  Calculate Release
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
              <span>Equity Release Council</span>
              <span className="text-gold">•</span>
              <span>Over 55s Only</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lender Logos Section */}
      <section className="py-10 bg-white border-b border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            We work with leading equity release providers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {equityReleaseLenders.map((lender) => (
              <motion.div
                key={lender.name}
                className="flex items-center justify-center h-12 px-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-navy/70 font-semibold text-base md:text-lg">{lender.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                How the Process Works
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Our simple, supportive process from first enquiry to funds in your account.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, idx) => (
              <ScrollAnimation key={step.step} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-gold font-bold text-2xl">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-navy/60 text-sm">{step.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <ScrollAnimation>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                  Tap into your home's value safely
                </h2>
                <p className="text-navy/70 mb-6">
                  Equity release and lifetime mortgages can play a crucial role in retirement funding, helping other family members with a first-time purchase, paying for home improvements, or simply enjoying the retirement you deserve.
                </p>
                <p className="text-navy/70 mb-8">
                  Our qualified advisers will help you understand your options, the effects on state benefits, tax implications including inheritance tax, and any other obligations.
                </p>
                <h3 className="text-lg font-semibold text-navy mb-4">
                  There are many reasons you might consider equity release:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-navy/70 text-sm">{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Link to types page */}
                <div className="mt-8">
                  <Link href="/equity-release/types" className="inline-flex items-center gap-2 text-gold font-medium hover:underline">
                    <span>Learn about different types of equity release</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <Card className="bg-pearl border border-navy/5 rounded-xl sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">
                      Speak to an Equity Release Specialist
                    </h3>
                    <p className="text-navy/60 text-sm mb-6">
                      Get personalized advice with no obligation
                    </p>
                  </div>
                  <Link href="#enquiry">
                    <button className="w-full py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-colors mb-4">
                      Request a Callback
                    </button>
                  </Link>
                  <p className="text-center text-navy/40 text-xs">
                    Available Mon-Fri 9am-6pm, Sat 10am-4pm
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Lifetime Mortgage vs Home Reversion
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Compare the two main types of equity release to understand which might be more suitable for your circumstances
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border border-navy/5 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-navy text-white">
                          <th className="text-left py-4 px-5 font-semibold">Feature</th>
                          <th className="text-left py-4 px-5 font-semibold">
                            <div className="flex items-center gap-2">
                              <span className="bg-gold text-navy text-xs px-2 py-0.5 rounded-full font-bold">Most Popular</span>
                              <span>Lifetime Mortgage</span>
                            </div>
                          </th>
                          <th className="text-left py-4 px-5 font-semibold">Home Reversion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonTable.map((row, index) => (
                          <tr key={row.feature} className={`${index % 2 === 0 ? "bg-white" : "bg-pearl/30"} border-b border-navy/5 last:border-0`}>
                            <td className="py-4 px-5 font-medium text-navy">{row.feature}</td>
                            <td className="py-4 px-5 text-navy/70">
                              <div className="flex items-start gap-2">
                                {row.winner === "lifetime" && (
                                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                <span>{row.lifetimeMortgage}</span>
                              </div>
                            </td>
                            <td className="py-4 px-5 text-navy/70">
                              <div className="flex items-start gap-2">
                                {row.winner === "reversion" && (
                                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                <span>{row.homeReversion}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Link href="/equity-release/types">
                  <motion.button
                    className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More About Types
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Find out how much equity you could release
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Use our calculator to get an estimate. It only takes a moment and you don't need to provide personal details.
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-white/70 font-medium">Your Age</label>
                        <span className="text-gold font-bold text-xl">{age} years</span>
                      </div>
                      <input
                        type="range"
                        min={55}
                        max={90}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-white/40 mt-1">
                        <span>55</span>
                        <span>90</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-white/70 font-medium">Property Value</label>
                        <span className="text-gold font-bold text-xl">{formatCurrency(propertyValue)}</span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={2000000}
                        step={10000}
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-white/40 mt-1">
                        <span>£100k</span>
                        <span>£2m</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {["Enjoy retirement", "Help family", "Home improvements", "Go debt-free"].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-white/60 text-sm mb-2">You could release between</p>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {formatCurrency(estimatedRelease.minRelease)}
                        </span>
                        <span className="text-white/40">-</span>
                        <span className="text-2xl md:text-3xl font-bold text-gold">
                          {formatCurrency(estimatedRelease.maxRelease)}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs mb-6">
                        Based on approximately {estimatedRelease.ltv}% LTV
                      </p>
                      <Link href="/equity-release/calculator">
                        <button className="w-full py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors mb-3">
                          Get Detailed Calculation
                        </button>
                      </Link>
                      <Link href="#enquiry">
                        <button className="w-full py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
                          Request Personalised Quote
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-navy font-medium text-sm">Video Stories</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Hear from Our Customers
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Real stories from people who have successfully released equity from their homes
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {videoTestimonials.map((video, index) => (
              <ScrollAnimation key={video.id} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl overflow-hidden h-full hover:shadow-lg transition-all group">
                  <div className="relative aspect-video bg-navy/10">
                    <img
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-navy/40 group-hover:bg-navy/50 transition-colors">
                      <motion.button
                        className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPlayingVideo(video.id)}
                      >
                        <svg className="w-8 h-8 text-navy ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.button>
                    </div>
                    {/* Amount badge */}
                    <div className="absolute top-3 right-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
                      {video.amountReleased}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded">
                        {video.purpose}
                      </span>
                    </div>
                    <p className="text-navy/70 text-sm italic mb-4">"{video.quote}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-navy/10">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
                        {video.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-navy text-sm">{video.name}</p>
                        <p className="text-navy/50 text-xs">{video.location} | Age: {video.age}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          {/* Video modal placeholder */}
          <AnimatePresence>
            {playingVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-navy/90 flex items-center justify-center p-4"
                onClick={() => setPlayingVideo(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="aspect-video bg-navy/10 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-navy font-semibold mb-2">Video Coming Soon</p>
                      <p className="text-navy/60 text-sm">Customer testimonial videos are being recorded and will be available shortly.</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <button
                      onClick={() => setPlayingVideo(null)}
                      className="px-6 py-2 bg-navy text-white font-medium rounded-lg hover:bg-navy-deep transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Equity Release Council Section */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-navy font-medium text-sm">Proud Members</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Equity Release Council Standards
                </h2>
                <p className="text-navy/60 max-w-2xl mx-auto">
                  We only recommend plans from Equity Release Council members, which means important safeguards are built into every plan.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-3 gap-6">
              {guarantees.map((guarantee, index) => (
                <ScrollAnimation key={guarantee.title} delay={index * 0.1}>
                  <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-navy mb-2">
                        {guarantee.title}
                      </h3>
                      <p className="text-navy/60 text-sm">
                        {guarantee.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                What our customers think
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-navy/70 text-sm leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-navy text-sm">{testimonial.author}</p>
                        <p className="text-navy/50 text-xs">{testimonial.location} | Age: {testimonial.age}</p>
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
                Dispelling Equity Release Myths
              </h2>
              <p className="text-navy/60">
                Common questions answered by our experts
              </p>
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

      {/* Trust Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10 text-center">
              Why trust Apply Wise?
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {trustPoints.map((point, index) => (
              <ScrollAnimation key={point.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                    {point.icon}
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{point.title}</h3>
                  <p className="text-navy/60 text-sm">{point.description}</p>
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
                  Need more information?
                </h2>
                <p className="text-white/60">
                  The best way we can help is to have a quick conversation. Contact us for a no-obligation discussion.
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
                        <label className="block text-white/70 mb-2 text-sm">Age</label>
                        <input
                          type="number"
                          required
                          min={55}
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                          placeholder="65"
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
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Approximate Property Value</label>
                      <input
                        type="text"
                        value={formData.propertyValue}
                        onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                        placeholder="£350,000"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">What would you use the funds for?</label>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:border-gold focus:outline-none"
                      >
                        <option value="" className="bg-navy">Select a reason</option>
                        <option value="retirement" className="bg-navy">Enjoy retirement</option>
                        <option value="family" className="bg-navy">Help family financially</option>
                        <option value="home" className="bg-navy">Home improvements</option>
                        <option value="debt" className="bg-navy">Pay off debts</option>
                        <option value="care" className="bg-navy">Care costs</option>
                        <option value="other" className="bg-navy">Other</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-all mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
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
                        "Request Free Consultation"
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

                {/* Estimated release */}
                {apiResponse?.estimatedRelease?.max && (
                  <div className="bg-white/5 rounded-xl p-5 max-w-md mx-auto mb-6">
                    <h4 className="text-gold font-semibold mb-3 text-sm">Estimated Amount You Could Release</h4>
                    <div className="text-center">
                      <p className="text-white/60 text-sm">Between</p>
                      <p className="text-2xl font-bold text-white">
                        {apiResponse.estimatedRelease.min} - {apiResponse.estimatedRelease.max}
                      </p>
                      <p className="text-gold text-xs mt-1">Based on approximately {apiResponse.estimatedRelease.ltv} LTV</p>
                    </div>
                  </div>
                )}

                <p className="text-white/70 max-w-md mx-auto mb-6">
                  Our equity release specialists will contact you within 2 hours during business hours to discuss your options in detail.
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

      {/* Disclaimer */}
      <section className="py-8 bg-navy-deep border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-white/40 text-xs text-center max-w-4xl mx-auto">
            <strong className="text-white/60">Important:</strong> Equity Release may affect your entitlement to means-tested state benefits and will reduce the value of your estate.
            A lifetime mortgage is a loan secured against your home. The loan plus accrued interest is repaid when you die or move into long-term care.
            To understand the features and risks of an Equity Release product, ask for a personalised illustration.
            Apply Wise Financial recommends products from the Equity Release Council, ensuring important consumer safeguards are in place.
          </p>
        </div>
      </section>

      <Footer />

      {/* Slider styles now handled globally in globals.css for better mobile support */}
    </div>
  );
}
