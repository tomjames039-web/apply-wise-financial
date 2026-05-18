"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const guides = [
  {
    category: "First Time Buyers",
    slug: "first-time-buyers",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    articles: [
      {
        title: "Complete Guide to Buying Your First Home",
        slug: "complete-first-home-guide",
        readTime: "10 min read",
        description: "Everything you need to know from saving your deposit to picking up the keys."
      },
      {
        title: "How Much Deposit Do You Need?",
        slug: "deposit-requirements",
        readTime: "5 min read",
        description: "Understanding deposit requirements and how to maximise your options."
      },
      {
        title: "Understanding Stamp Duty for First Time Buyers",
        slug: "stamp-duty-first-time-buyers",
        readTime: "6 min read",
        description: "First time buyer stamp duty relief and how to calculate what you'll pay."
      },
      {
        title: "First Time Buyer Schemes Explained",
        slug: "first-time-buyer-schemes",
        readTime: "8 min read",
        description: "Shared Ownership, Help to Buy, and other schemes to help you get on the ladder."
      },
    ]
  },
  {
    category: "Remortgaging",
    slug: "remortgaging",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    articles: [
      {
        title: "When Should You Remortgage?",
        slug: "when-to-remortgage",
        readTime: "7 min read",
        description: "Signs it's time to switch and how to avoid costly SVR rates."
      },
      {
        title: "How to Remortgage: Step by Step Guide",
        slug: "how-to-remortgage",
        readTime: "12 min read",
        description: "The complete process from application to completion."
      },
      {
        title: "Remortgaging to Release Equity",
        slug: "remortgage-release-equity",
        readTime: "6 min read",
        description: "How to access your home's value for improvements or other purposes."
      },
      {
        title: "Product Transfer vs Remortgage",
        slug: "product-transfer-vs-remortgage",
        readTime: "5 min read",
        description: "Which option is right for you when your deal ends?"
      },
    ]
  },
  {
    category: "Buy To Let",
    slug: "buy-to-let",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    articles: [
      {
        title: "Getting Started as a Landlord",
        slug: "getting-started-landlord",
        readTime: "15 min read",
        description: "Everything you need to know before buying your first investment property."
      },
      {
        title: "Buy To Let Tax Guide",
        slug: "btl-tax-guide",
        readTime: "10 min read",
        description: "Stamp duty surcharges, income tax, and tax-efficient ownership structures."
      },
      {
        title: "HMO Mortgages Explained",
        slug: "hmo-mortgages",
        readTime: "8 min read",
        description: "Higher yields with Houses of Multiple Occupation."
      },
      {
        title: "Limited Company Buy To Let",
        slug: "limited-company-btl",
        readTime: "9 min read",
        description: "Is an SPV structure right for your portfolio?"
      },
    ]
  },
  {
    category: "Mortgage Types",
    slug: "mortgage-types",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    articles: [
      {
        title: "Fixed Rate vs Tracker Mortgages",
        slug: "fixed-vs-tracker",
        readTime: "7 min read",
        description: "Understanding the pros and cons of each type."
      },
      {
        title: "Interest Only Mortgages Explained",
        slug: "interest-only-mortgages",
        readTime: "6 min read",
        description: "When they make sense and the repayment strategies you need."
      },
      {
        title: "Offset Mortgages: Are They Worth It?",
        slug: "offset-mortgages",
        readTime: "8 min read",
        description: "Using your savings to reduce mortgage interest."
      },
      {
        title: "Understanding Mortgage Rates",
        slug: "understanding-rates",
        readTime: "5 min read",
        description: "How rates are set and what affects your personal rate."
      },
    ]
  },
  {
    category: "Bad Credit",
    slug: "bad-credit",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    articles: [
      {
        title: "Getting a Mortgage with Bad Credit",
        slug: "mortgage-with-bad-credit",
        readTime: "10 min read",
        description: "Your options when you have credit issues."
      },
      {
        title: "CCJ Mortgages Explained",
        slug: "ccj-mortgages",
        readTime: "7 min read",
        description: "How CCJs affect your application and what lenders accept them."
      },
      {
        title: "Mortgages After Bankruptcy",
        slug: "mortgages-after-bankruptcy",
        readTime: "8 min read",
        description: "Timelines and options after discharge."
      },
      {
        title: "Improving Your Credit Score",
        slug: "improving-credit-score",
        readTime: "6 min read",
        description: "Practical steps to boost your score before applying."
      },
      {
        title: "How to Improve Your Credit Score Fast",
        slug: "how-to-improve-credit-score-fast",
        readTime: "8 min read",
        description: "Quick wins and practical steps to boost your credit score before a mortgage application."
      },
    ]
  },
  {
    category: "Market Updates",
    slug: "market-updates",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    articles: [
      {
        title: "Mortgage Rates Forecast 2026",
        slug: "mortgage-rates-forecast-2026",
        readTime: "8 min read",
        description: "Expert analysis of UK mortgage rate predictions for 2026 and what it means for buyers."
      },
      {
        title: "Is 2026 a Good Time to Buy a House?",
        slug: "best-time-to-buy-house-2026",
        readTime: "7 min read",
        description: "Analysis of the current property market and whether now is the right time to buy."
      },
    ]
  },
  {
    category: "Self-Employed",
    slug: "self-employed",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    articles: [
      {
        title: "How Much Can Self-Employed People Borrow?",
        slug: "how-much-can-self-employed-borrow",
        readTime: "10 min read",
        description: "Complete guide to mortgage borrowing for self-employed borrowers, contractors, and company directors."
      },
    ]
  },
  {
    category: "Protection",
    slug: "protection",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    articles: [
      {
        title: "Do I Need Life Insurance for My Mortgage?",
        slug: "do-i-need-life-insurance-mortgage",
        readTime: "6 min read",
        description: "Understanding life insurance, when it's required, and how to protect your home and family."
      },
    ]
  },
];

// Featured guide content
const featuredGuide = {
  title: "The Ultimate First-Time Buyer Guide",
  description: "Everything you need to know about buying your first home, from saving your deposit to picking up the keys. Our comprehensive guide covers the entire process step by step.",
  readTime: "15 min read",
  topics: ["Saving for a deposit", "Mortgage in Principle", "Finding the right property", "Making an offer", "The legal process", "Exchange and completion"],
  slug: "first-time-buyers/complete-first-home-guide"
};

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-pearl pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold text-sm font-medium uppercase tracking-wider mb-4">
                Mortgage Education
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
                Mortgage Guides & Resources
              </h1>
              <p className="text-navy/70 text-lg max-w-2xl mx-auto">
                Expert advice to help you make informed decisions. From first-time buying to remortgaging and investment properties.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="bg-gradient-to-br from-navy to-navy-deep rounded-2xl p-6 md:p-10 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                  <span className="inline-block bg-gold text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                    Featured Guide
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {featuredGuide.title}
                  </h2>
                  <p className="text-white/70 text-base md:text-lg mb-6 max-w-2xl">
                    {featuredGuide.description}
                  </p>

                  {/* Topics covered */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredGuide.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link href={`/guides/${featuredGuide.slug}`}>
                      <motion.button
                        className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Read the Guide
                      </motion.button>
                    </Link>
                    <span className="text-white/50 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredGuide.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6 bg-pearl border-b border-navy/5 sticky top-16 z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === null
                  ? "bg-navy text-white"
                  : "bg-white text-navy/70 hover:bg-navy/5 border border-navy/10"
              }`}
            >
              All Guides
            </button>
            {guides.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.slug
                    ? "bg-navy text-white"
                    : "bg-white text-navy/70 hover:bg-navy/5 border border-navy/10"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-12 md:py-16 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {guides
              .filter((cat) => !activeCategory || cat.slug === activeCategory)
              .map((category, index) => (
                <ScrollAnimation key={category.slug} delay={index * 0.05}>
                  <div className="mb-12 last:mb-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                        {category.icon}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-navy">
                        {category.category}
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.articles.map((article) => (
                        <Link key={article.slug} href={`/guides/${category.slug}/${article.slug}`}>
                          <Card className="bg-white border border-navy/5 rounded-xl h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 group cursor-pointer">
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                  <h3 className="text-base font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                                    {article.title}
                                  </h3>
                                  <p className="text-navy/60 text-sm mb-3 line-clamp-2">
                                    {article.description}
                                  </p>
                                  <span className="text-navy/40 text-xs flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {article.readTime}
                                  </span>
                                </div>
                                <svg
                                  className="w-5 h-5 text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Need Personalised Advice?
            </h2>
            <p className="text-navy/60 mb-8 max-w-xl mx-auto">
              Our mortgage experts are here to answer your questions and help you find the right mortgage for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <motion.button
                  className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-deep transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Now
                </motion.button>
              </Link>
              <Link href="/book-a-call">
                <motion.button
                  className="px-8 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Call
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
