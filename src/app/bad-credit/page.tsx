"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

// Credit issue types
const creditIssues = [
  {
    title: "CCJ (County Court Judgement)",
    description: "A CCJ on your credit file doesn't mean mortgage rejection. We work with lenders who consider satisfied CCJs, with options improving as time passes since satisfaction.",
    timeframe: "Best options once satisfied",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    link: "/bad-credit/ccj",
  },
  {
    title: "Defaults",
    description: "Defaults on credit accounts don't have to stop your mortgage dreams. Many specialist lenders will consider applications with defaults, depending on age and value.",
    timeframe: "Options available with recent defaults",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    link: "/bad-credit/defaults",
  },
  {
    title: "IVA (Individual Voluntary Arrangement)",
    description: "Whether you're currently in an IVA or it's been discharged, we can help. Some lenders will even consider applications while an IVA is still active.",
    timeframe: "Options during and after IVA",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    link: "/bad-credit/iva",
  },
  {
    title: "Bankruptcy",
    description: "Discharged bankruptcy doesn't mean the end of homeownership. We have lenders who will consider you from 1 day after discharge, with more options as time passes.",
    timeframe: "From 1 day post-discharge",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    link: "/bad-credit/bankruptcy",
  },
  {
    title: "Late Payments",
    description: "Missed payments on your credit file? This is one of the most common credit issues and many lenders are understanding, especially if they weren't recent.",
    timeframe: "Minimal impact after 12 months",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: "/bad-credit/late-payments",
  },
  {
    title: "Low Credit Score",
    description: "A low credit score often has straightforward solutions. We can advise on quick wins to improve your score and find lenders suited to your current situation.",
    timeframe: "Can often improve in 1-3 months",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    link: "/bad-credit/low-credit-score",
  },
  {
    title: "Debt Management Plan (DMP)",
    description: "Currently on a DMP or recently completed one? We have lenders who specialise in helping people who've taken responsible steps to manage their debt.",
    timeframe: "Options during and after DMP",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    link: "/bad-credit/dmp",
  },
  {
    title: "Repossession",
    description: "A previous repossession can be overcome. We work with specialist lenders who understand circumstances change and give second chances.",
    timeframe: "From 1 year after repossession",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    link: "/bad-credit/repossession",
  },
];

// Specialist lenders that work with bad credit with logos
const specialistLenders = [
  { name: "Halifax", logo: "/logos/halifax.png" },
  { name: "NatWest", logo: "/logos/natwest.png" },
  { name: "Santander", logo: "/logos/santander.png" },
  { name: "Pepper Money", logo: null },
  { name: "Kensington", logo: null },
  { name: "Together", logo: null },
  { name: "Aldermore", logo: null },
  { name: "Precise", logo: null },
];

// Why Apply Wise for bad credit
const whyApplyWise = [
  {
    title: "We Actually Specialise in Bad Credit",
    description: "Unlike generalist brokers who might dabble in adverse credit, this is our bread and butter. Our advisers handle complex cases daily and know exactly which lenders to approach.",
  },
  {
    title: "We Don't Judge Your Past",
    description: "Life happens. Divorce, redundancy, illness, business failure - we've heard it all and we're here to help, not judge. Every situation has a solution.",
  },
  {
    title: "Exclusive Lender Relationships",
    description: "We've built relationships with specialist lenders through years of experience. Some will only work with us because they trust our case preparation and client vetting.",
  },
  {
    title: "We Prepare Your Application Properly",
    description: "Bad credit cases need careful packaging. We present your case in the best light, addressing concerns upfront and providing comprehensive supporting documentation.",
  },
  {
    title: "Honest Assessment Upfront",
    description: "We won't waste your time. In your first call, we'll tell you honestly whether we can help and what your realistic options are. No false promises.",
  },
  {
    title: "Dedicated Case Manager",
    description: "You'll have one point of contact throughout - someone who knows your case inside out and fights your corner with lenders.",
  },
];

// FAQs
const faqs = [
  {
    question: "Can I get a mortgage with a CCJ?",
    answer: "Yes, many specialist lenders will consider applications with satisfied CCJs. The key factors are: how old is the CCJ, how much was it for, when was it satisfied, and how many do you have. Generally, options improve significantly once a CCJ is satisfied and more time has passed. We can assess your specific situation and advise on the best path forward.",
  },
  {
    question: "Will I pay higher interest rates with bad credit?",
    answer: "Typically yes, but not always as much as you might think. Rates for adverse credit have become much more competitive. As your credit improves over time, you can usually remortgage to a better rate. We always aim to get you the most competitive rate available for your circumstances.",
  },
  {
    question: "How much deposit do I need with bad credit?",
    answer: "Most adverse credit lenders require a minimum of 15-25% deposit, though this varies based on the severity of credit issues. With more serious issues like recent bankruptcy, you may need 25-40%. We can advise on what's realistic for your situation.",
  },
  {
    question: "Should I wait for my credit to improve before applying?",
    answer: "Not necessarily. Sometimes waiting can actually make things worse (credit issues dropping off can leave gaps in your file). We can assess your situation now and advise whether to apply immediately or take steps to improve first. Often we can find a solution straight away.",
  },
  {
    question: "Can I get a mortgage while in an IVA?",
    answer: "Yes, some lenders will consider applications from people currently in an IVA, with permission from your IVA supervisor. More options become available once your IVA is complete. We've helped many clients in this exact situation.",
  },
  {
    question: "I was declined by another broker - can you still help?",
    answer: "Very likely yes. Many brokers don't have the specialist knowledge or lender relationships needed for complex cases. We regularly help clients who've been declined elsewhere. Don't let one rejection put you off - get in touch.",
  },
  {
    question: "How quickly can you get me an answer?",
    answer: "We aim to give you an initial assessment within 24 hours of receiving your credit report. For straightforward cases, we can often get a Decision in Principle the same day. Complex cases may take a little longer to package properly, but we work as quickly as possible.",
  },
  {
    question: "What if I have multiple credit issues?",
    answer: "Multiple issues don't necessarily mean no options. We've helped clients with combinations of CCJs, defaults, bankruptcy, and more. Each case is assessed individually and we know which lenders are most flexible with multiple adverse items.",
  },
];

// Testimonials
const testimonials = [
  {
    quote: "After being declined by 3 brokers, Apply Wise got me approved within 2 weeks. I had a CCJ and an old default but they knew exactly which lender to approach. Can't recommend them enough.",
    author: "Mark T.",
    location: "Birmingham",
    situation: "CCJ & Default",
    rating: 5,
  },
  {
    quote: "I was upfront about my bankruptcy from the start. Rather than turning me away, they explained my options clearly and found me a mortgage at a rate I was happy with. True professionals.",
    author: "Sarah J.",
    location: "Manchester",
    situation: "Discharged Bankruptcy",
    rating: 5,
  },
  {
    quote: "My credit was a mess after my divorce. Apply Wise didn't judge, just got on with finding a solution. 6 months later I'm in my new home. They changed my life.",
    author: "James & Claire R.",
    location: "Leeds",
    situation: "Multiple Defaults",
    rating: 5,
  },
  {
    quote: "Had an IVA that finished 2 years ago. Banks wouldn't touch me. Apply Wise found a specialist lender and I got approved for more than I expected. Brilliant service.",
    author: "Mohammed K.",
    location: "London",
    situation: "Completed IVA",
    rating: 5,
  },
];

// Process steps
const processSteps = [
  {
    step: "1",
    title: "Free Credit Review",
    description: "We'll review your credit report and assess your situation with no judgement. Takes 10 minutes.",
  },
  {
    step: "2",
    title: "Options Explained",
    description: "We'll explain exactly what's possible, which lenders suit you, and what rates to expect.",
  },
  {
    step: "3",
    title: "Application Prepared",
    description: "We package your application professionally, addressing any concerns lenders might have.",
  },
  {
    step: "4",
    title: "Mortgage Secured",
    description: "We handle everything through to completion, keeping you updated every step of the way.",
  },
];

export default function BadCreditPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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
              Bad Credit?
              <br />
              <span className="text-gold">We Say Yes When Others Don't</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              CCJs, defaults, IVA, bankruptcy, missed payments — your past doesn't define your future. We have specialist lenders waiting to help.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                "Specialist adverse credit lenders",
                "Same-day response",
                "No impact on your credit score",
                "20+ years experience",
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
                  Check My Options
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
              <a href="tel:01992535555">
                <motion.button
                  className="px-10 py-3 text-navy/50 font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:text-navy"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Call Us Now
                </motion.button>
              </a>
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
              <span>Specialist Lenders</span>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialist Lenders */}
      <section className="py-10 bg-white border-b border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-navy/50 text-sm mb-6 font-medium">
            Exclusive access to specialist adverse credit lenders
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

      {/* Credit Issues Grid */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Whatever Your Credit Issue, We Can Help
              </h2>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Click on your situation below to learn more about your options. No credit issue is too complex for our specialist team.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {creditIssues.map((issue, index) => (
              <ScrollAnimation key={issue.title} delay={index * 0.05}>
                <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                      {issue.icon}
                    </div>
                    <h3 className="text-base font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-navy/60 text-sm leading-relaxed mb-3">
                      {issue.description}
                    </p>
                    <div className="flex items-center gap-1 text-gold text-xs font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {issue.timeframe}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apply Wise Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                  <span className="text-navy font-medium text-sm">Why Choose Us</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  Adverse Credit is Our Speciality
                </h2>
                <p className="text-navy/60 max-w-2xl mx-auto">
                  Not all mortgage brokers are created equal. Here's why clients with credit issues trust Apply Wise.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyApplyWise.map((reason, index) => (
                <ScrollAnimation key={reason.title} delay={index * 0.08}>
                  <div className="p-6 bg-pearl rounded-xl h-full">
                    <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-navy font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-navy/60 text-sm">
                      {reason.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Getting a mortgage with bad credit doesn't have to be complicated. Here's our simple process.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <ScrollAnimation key={step.step} delay={index * 0.1}>
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gold/30" />
                  )}
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={0.4}>
            <div className="text-center mt-10">
              <Link href="#enquiry">
                <motion.button
                  className="px-10 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Free Assessment
                </motion.button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Success Stories
              </h2>
              <p className="text-navy/60">
                Real clients who got mortgages when others said no
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.author} delay={index * 0.1}>
                <Card className="bg-white border border-navy/5 rounded-xl h-full">
                  <CardContent className="p-5">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Situation badge */}
                    <span className="inline-block px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded mb-3">
                      {testimonial.situation}
                    </span>

                    <p className="text-navy/70 text-sm leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-navy/10">
                      <div className="w-9 h-9 bg-gold/20 rounded-full flex items-center justify-center text-gold font-semibold text-sm">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Bad Credit Mortgage FAQs
              </h2>
              <p className="text-navy/60">
                Answers to common questions about getting a mortgage with credit issues
              </p>
            </div>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <ScrollAnimation key={faq.question} delay={index * 0.05}>
                <div className="bg-pearl border border-navy/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-pearl/80 transition-colors"
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
      <section id="enquiry" className="py-16 md:py-20 bg-pearl">
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
    </div>
  );
}
