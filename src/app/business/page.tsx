"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

// UTM parameter type
interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag?: (cmd: string, event: string, params: Record<string, string | number>) => void;
    fbq?: (cmd: string, event: string, params?: Record<string, string | number>) => void;
  }
}

// Analytics tracking helper
const trackEvent = (eventName: string, eventParams: Record<string, string | number> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, eventParams);
  }
  console.log("Event tracked:", eventName, eventParams);
};

// What we set up for you
const setupItems = [
  {
    title: "Your dedicated employee access link",
    description: "A private link your staff can use to request advice or book a call directly",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: "A QR code for instant access",
    description: "Staff can simply scan and get started — no login required",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>
    ),
  },
  {
    title: "A monthly ready-made email",
    description: "We send you a short, pre-written email each month that you can forward to your team or HR — no effort required",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Optional staff poster",
    description: "A clean, branded poster for staff rooms or noticeboards",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

// What employees get
const employeeBenefits = [
  "Free mortgage review",
  "Access to 100+ lenders",
  "Help with remortgages, purchases, and buy-to-let",
  "Early rate securing (up to 6 months ahead)",
  "Support with bad credit cases",
];

// How it works steps
const howItWorksSteps = [
  {
    step: "1",
    title: "You Register",
    description: "Provide your basic details using our short form.",
  },
  {
    step: "2",
    title: "We Set Everything Up",
    description: "We create your dedicated access link, QR code, and internal materials.",
  },
  {
    step: "3",
    title: "You Share It",
    description: "Send the link to your team or display the QR code.",
  },
  {
    step: "4",
    title: "We Handle Everything",
    description: "We speak directly with your employees, provide advice, and manage the full process.",
  },
];

function BusinessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    employeeCount: "",
    staffCommsMethod: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });
  const [referrer, setReferrer] = useState<string>("");

  // Capture UTM parameters and referrer on mount
  useEffect(() => {
    const params: UTMParams = {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_term: searchParams.get("utm_term") || "",
      utm_content: searchParams.get("utm_content") || "",
    };
    setUtmParams(params);
    setReferrer(document.referrer || "");

    trackEvent("page_view", {
      page_title: "Employer Benefits Page",
      page_location: "/business",
      ...(params.utm_source && { utm_source: params.utm_source }),
    });
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    trackEvent("employer_form_submit_attempt", {
      form_name: "employer_benefits",
    });

    try {
      const response = await fetch("/api/business-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          employeeCount: formData.employeeCount || "not-specified",
          staffCommsMethod: formData.staffCommsMethod || "",
          message: formData.message || "",
          businessType: "Employer Benefits Registration",
          source: "employer_benefits_page",
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          leadType: "employer_contact",
          ...utmParams,
          referrer,
        }),
      });

      const result = await response.json();

      if (result.success) {
        trackEvent("employer_form_submit_success", {
          form_name: "employer_benefits",
          reference: result.data.reference,
        });
        router.push(`/business/thank-you?ref=${result.data.reference}`);
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.");
        trackEvent("employer_form_submit_error", {
          form_name: "employer_benefits",
          error: result.error,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Connection error. Please check your internet and try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-pearl">
      {/* Minimal header - just logo */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/" className="inline-block">
            <img
              src="/logos/apply-wise-logo.png"
              alt="Apply Wise"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-pearl-texture pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Employee Benefits
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Offer Your Staff a Valuable Financial Benefit — At No Cost to You
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-navy/70 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We provide FCA-regulated mortgage advice to your employees, helping them save money and reduce financial stress — with zero cost or admin for your business.
            </motion.p>

            {/* Bullet points */}
            <motion.ul
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm text-navy/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                "No cost to your business",
                "No obligation for employees",
                "Fully managed by us",
                "FCA regulated & compliant",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </motion.ul>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#register-form">
                <motion.button
                  className="relative px-10 py-3 text-navy font-semibold text-lg tracking-wider uppercase border-b-2 border-gold transition-all duration-300 hover:text-gold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Your Business
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: 0.3, opacity: 0.5 }}
                    animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why This Matters
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Businesses Are Offering Mortgage Support
            </motion.h2>
            <motion.div
              className="space-y-4 text-navy/70 leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg">
                Employees are under increasing financial pressure due to rising mortgage costs. This impacts productivity, wellbeing, and staff retention.
              </p>
              <p className="text-lg">
                Offering access to expert mortgage advice is a simple, powerful way to support your team — without increasing payroll or overheads.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Getting Started
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorksSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Connector line */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gold/30" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-navy font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy/60 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-navy/50 mt-10 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              You remain completely hands-off.
            </motion.p>
          </div>
        </div>
      </section>

      {/* What We Set Up For You Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Full Service
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What We Set Up For You
            </motion.h2>
            <motion.p
              className="text-navy/60 text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We handle everything needed to get this live for your team:
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {setupItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4 p-6 bg-pearl rounded-xl border border-navy/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-navy/60 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-navy/60 mb-2">
                Everything is designed to be plug-and-play — you simply share it once, and we handle everything else.
              </p>
              <p className="text-sm text-gold font-medium">
                Most businesses spend less than 5 minutes setting this up.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Your Employees Get Section */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Employee Benefits
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Your Employees Get
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {employeeBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3 bg-white/5 rounded-lg px-5 py-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Value Section */}
      <section className="py-16 md:py-20 bg-pearl-texture">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Value
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What This Normally Costs
            </motion.h2>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-navy/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-navy/70 text-lg mb-4">
                Our full mortgage advice service typically costs up to <span className="font-bold text-navy">£695</span> per client.
              </p>
              <div className="h-px bg-navy/10 my-6" />
              <p className="text-lg">
                However, as part of your business partnership, we provide this service to your employees{" "}
                <span className="font-bold text-gold">completely free of charge</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Compliance Section */}
      <section className="py-10 bg-white border-y border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#003B5C] rounded px-2.5 py-1">
                  <span className="text-white font-bold text-sm tracking-tight">FCA</span>
                </div>
                <span className="text-navy/60 text-sm font-medium">Regulated</span>
              </div>
              <span className="text-gold">|</span>
              <span className="text-navy/50 text-sm">90+ Lenders</span>
              <span className="text-gold">|</span>
              <span className="text-navy/50 text-sm">Whole of Market</span>
            </div>
          </div>
          <p className="text-center text-xs text-navy/40 mt-4 max-w-2xl mx-auto">
            Apply Wise Financial Limited is an Appointed Representative of Scott & Goose LLP, which is authorised and regulated by the Financial Conduct Authority.
          </p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register-form" className="py-16 md:py-24 bg-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
                Get Started
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
                Set This Up in Minutes
              </h2>
              <p className="text-white/50">
                Register your business and we'll have everything ready within 24 hours.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="Company Ltd"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="07123 456789"
                />
              </div>

              <div>
                <label
                  htmlFor="employeeCount"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Approximate number of employees
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  id="employeeCount"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  placeholder="e.g. 25"
                />
              </div>

              <div>
                <label
                  htmlFor="staffCommsMethod"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Preferred way to share with staff
                </label>
                <select
                  id="staffCommsMethod"
                  name="staffCommsMethod"
                  value={formData.staffCommsMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                >
                  <option value="">Please select…</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Noticeboard">Noticeboard</option>
                  <option value="Payslip insert">Payslip insert</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Message <span className="text-white/40">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep border border-gold/20 text-white placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                  placeholder="Anything you'd like us to know?"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm text-center">
                  {submitError}
                </div>
              )}

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold text-navy font-semibold rounded-lg transition-all duration-300 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Offer This To My Team"
                  )}
                </motion.button>
              </div>

              <p className="text-center text-white/30 text-xs pt-2">
                No obligation • No cost to your business
              </p>
            </motion.form>

            {/* Alternative: Book a Call */}
            <motion.div
              className="mt-8 pt-8 border-t border-white/10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white/50 text-sm mb-3">Prefer to speak first?</p>
              <a
                href="https://calendly.com/apply-wise/business-benefits"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("calendly_click", { location: "form_section" })}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      {/* Minimal Footer */}
      <footer className="py-8 bg-navy border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logos/apply-wise-logo.png"
                alt="Apply Wise"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span>FCA Regulated</span>
              <span className="text-gold">•</span>
              <span>90+ Lenders</span>
              <span className="text-gold">•</span>
              <span>Whole of Market</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] text-white/20 text-center">
              Apply Wise Financial Ltd is an Appointed Representative of Scott & Goose LLP (FRN: 661183). Your home may be repossessed if you do not keep up repayments on your mortgage.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-navy/50">Loading...</p>
      </div>
    </div>
  );
}

export default function BusinessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BusinessPageContent />
    </Suspense>
  );
}
