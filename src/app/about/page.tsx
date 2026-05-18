"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import Image from "next/image";
import { FCABadge } from "@/components/FCABadge";

export default function AboutPage() {
  const stats = [
    { number: "90+", label: "Lending Partners" },
    { number: "1000s", label: "Mortgage Products" },
    { number: "FCA", label: "Regulated" },
    { number: "Free", label: "Initial Consultation" }
  ];

  const values = [
    {
      title: "Transparency",
      description: "No hidden fees, no jargon, no surprises. We believe you deserve to understand exactly what you're signing up for."
    },
    {
      title: "Expertise",
      description: "Our advisers are fully qualified and regularly trained. We stay on top of market changes so you don't have to."
    },
    {
      title: "Customer First",
      description: "Your needs drive everything we do. We'll never recommend a product that isn't right for your circumstances."
    },
    {
      title: "Innovation",
      description: "We use technology to make the process faster and easier, while keeping the human touch where it matters most."
    },
    {
      title: "Integrity",
      description: "We're authorised and regulated by the FCA. We take our responsibilities seriously and always act in your best interest."
    },
    {
      title: "Accessibility",
      description: "Everyone deserves access to quality mortgage advice, regardless of their circumstances or experience level."
    }
  ];

  const team = [
    {
      name: "Tom James",
      role: "Mortgage, Protection & Equity Release Advisor",
      photo: "https://i.postimg.cc/QNCxJLDb/linked-in-pic.jpg",
      badges: [
        { label: "CeMAP", highlight: false },
        { label: "CeRER", highlight: false },
        { label: "FCA Regulated", highlight: false }
      ],
      bio: "Tom brings a distinctive perspective to financial advice. With a background spanning financial services and having built and run his own businesses, he understands firsthand the pressures that self-employed clients, contractors and business owners face when navigating the mortgage market. His approach is straightforward and jargon-free — he takes time to understand your situation properly, then finds the right solution for you, not the easiest one. Whether you're a first-time buyer, remortgaging or exploring equity release, you'll always deal directly with Tom."
    },
    {
      name: "Ian Scott",
      role: "Principal Advisor & Founder, Scott & Goose",
      photo: "https://i.postimg.cc/08c2h5Vj/ian-scott-scott-goose-medium.jpg",
      badges: [
        { label: "CeMAP", highlight: false },
        { label: "CeRER", highlight: false },
        { label: "Directly Authorised · FCA", highlight: true },
        { label: "Since 2003", highlight: false }
      ],
      bio: "Ian is the founder of Scott & Goose — one of the longest-established mortgage advisory firms in the area — and has been advising clients since 2003. Ian leads his own team of advisors and is directly authorised by the FCA, the highest level of regulatory accountability in the industry. Apply Wise operates as an appointed representative of Scott & Goose, meaning every piece of advice delivered through Apply Wise sits within the same robust regulatory framework Ian has built over two decades. His depth of experience makes him especially well-placed for complex cases — from later-life lending and equity release to difficult-to-secure mortgages."
    }
  ];

  const trustIndicators = [
    "FCA Regulated",
    "Directly Authorised",
    "Whole-of-Market Access",
    "No Product Switch Fees",
    "20+ Years Combined Experience"
  ];

  return (
    <main className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.p>
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy tracking-tight mb-5 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About Apply Wise
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-navy/60 mb-6 md:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're on a mission to make mortgages simple, accessible, and stress-free for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-6 md:mb-8">
                Our Story
              </h2>
            </ScrollAnimation>
            <div className="space-y-5 md:space-y-6 text-navy/60 text-sm md:text-base leading-relaxed">
              <ScrollAnimation delay={0.1}>
                <p>
                  Apply Wise was founded with a simple belief: getting a mortgage shouldn't be complicated.
                  Too many people were overwhelmed by jargon, confused by options, and stressed by the process.
                </p>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <p>
                  We set out to change that. By combining cutting-edge technology with expert human advice,
                  we've created a mortgage service that puts you in control while ensuring you never feel alone
                  in making such an important decision.
                </p>
              </ScrollAnimation>
              <ScrollAnimation delay={0.3}>
                <p>
                  Today, we've helped thousands of people find their perfect mortgage, from first-time buyers
                  taking their first step onto the property ladder to experienced landlords expanding their portfolios.
                </p>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto text-center" staggerDelay={0.1}>
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="p-4 md:p-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-navy/70 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16 lg:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
                What We Stand For
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-navy tracking-tight">
                Our Values
              </h2>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white rounded-xl p-6 md:p-8 border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-navy mb-3 md:mb-4">{value.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center mb-10 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
                The Team
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-4 md:mb-5">
                Advice from people, not algorithms
              </h2>
              <p className="text-base md:text-lg text-navy/60 max-w-3xl mx-auto">
                We're a small, specialist team — when you work with Apply Wise, you deal directly with an experienced, qualified advisor from start to finish.
              </p>
            </div>
          </ScrollAnimation>

          {/* Team Cards */}
          <StaggerContainer className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-12" staggerDelay={0.15}>
            {team.map((member, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-pearl rounded-xl p-6 md:p-8 border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-5 md:gap-6">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/20 bg-navy/5">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-navy mb-1">{member.name}</h3>
                      <p className="text-sm text-navy/50 mb-3 md:mb-4">{member.role}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {member.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              badge.highlight
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-navy/5 text-navy/70 border border-navy/10"
                            }`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-navy/60 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Regulatory Callout Box */}
          <ScrollAnimation delay={0.2}>
            <div className="max-w-5xl mx-auto mb-10 md:mb-12">
              <div className="bg-pearl rounded-xl p-6 md:p-8 border-l-4 border-gold">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="flex-shrink-0">
                    <FCABadge size="lg" showText={false} />
                  </div>
                  <p className="text-sm md:text-base text-navy/70 leading-relaxed">
                    <span className="font-semibold text-navy">Regulatory information.</span>{" "}
                    Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP, which is directly authorised and regulated by the Financial Conduct Authority (FCA ref: 661183). All advice provided through Apply Wise is delivered under Scott & Goose's FCA authorisation — giving you the same regulatory protections as an established, directly authorised firm.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Trust Bar */}
          <ScrollAnimation delay={0.3}>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-navy/50">
                {trustIndicators.map((indicator, index) => (
                  <span key={index} className="flex items-center">
                    <span>{indicator}</span>
                    {index < trustIndicators.length - 1 && (
                      <span className="ml-4 text-gold">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimation>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-4 md:mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-base md:text-lg text-navy/60 mb-6 md:mb-8 max-w-2xl mx-auto">
              Experience the Apply Wise difference. Get free, expert mortgage advice today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link href="/apply">
                <motion.button
                  className="px-8 md:px-10 py-3 text-navy font-semibold text-sm md:text-base tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  className="px-8 md:px-10 py-3 text-navy/50 font-medium text-sm md:text-base tracking-wider uppercase transition-all duration-300 hover:text-navy"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </main>
  );
}
