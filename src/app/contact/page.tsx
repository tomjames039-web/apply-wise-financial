"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-pearl-texture">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.p
              className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Contact
            </motion.p>
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-navy tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-navy/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a question about your mortgage? Our friendly team is here to help.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <ScrollAnimation>
                <Card className="bg-pearl/50 border border-navy/5 shadow-lg rounded-xl overflow-hidden">
                  <CardContent className="p-5 md:p-8">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          className="text-center py-10 md:py-12"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key="success"
                        >
                          <motion.div
                            className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                          >
                            <motion.svg
                              className="w-8 h-8 text-gold"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          </motion.div>
                          <motion.h3
                            className="text-xl md:text-2xl font-semibold text-navy mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            Message Sent!
                          </motion.h3>
                          <motion.p
                            className="text-navy/60 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            Thank you for reaching out. We'll get back to you shortly.
                          </motion.p>
                          <motion.button
                            onClick={() => {
                              setIsSubmitted(false);
                              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                            }}
                            className="px-6 py-2.5 border border-navy/20 text-navy rounded-lg hover:bg-navy/5 transition-all font-medium"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Send Another Message
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <h2 className="text-lg md:text-xl font-semibold text-navy mb-6">
                            Send us a Message
                          </h2>
                          <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <motion.div
                                className="space-y-2"
                                whileTap={{ scale: 0.995 }}
                              >
                                <Label htmlFor="name" className="text-navy text-sm">Full Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  placeholder="John Smith"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("name")}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  className={`h-11 md:h-12 bg-white border-navy/10 transition-all duration-300 ${focusedField === "name" ? "border-gold ring-2 ring-gold/20" : ""}`}
                                />
                              </motion.div>
                              <motion.div
                                className="space-y-2"
                                whileTap={{ scale: 0.995 }}
                              >
                                <Label htmlFor="email" className="text-navy text-sm">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="john@example.com"
                                  value={formData.email}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("email")}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  className={`h-11 md:h-12 bg-white border-navy/10 transition-all duration-300 ${focusedField === "email" ? "border-gold ring-2 ring-gold/20" : ""}`}
                                />
                              </motion.div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <motion.div
                                className="space-y-2"
                                whileTap={{ scale: 0.995 }}
                              >
                                <Label htmlFor="phone" className="text-navy text-sm">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  placeholder="07700 900000"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("phone")}
                                  onBlur={() => setFocusedField(null)}
                                  className={`h-11 md:h-12 bg-white border-navy/10 transition-all duration-300 ${focusedField === "phone" ? "border-gold ring-2 ring-gold/20" : ""}`}
                                />
                              </motion.div>
                              <motion.div
                                className="space-y-2"
                                whileTap={{ scale: 0.995 }}
                              >
                                <Label htmlFor="subject" className="text-navy text-sm">Subject</Label>
                                <Input
                                  id="subject"
                                  name="subject"
                                  placeholder="Mortgage enquiry"
                                  value={formData.subject}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("subject")}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  className={`h-11 md:h-12 bg-white border-navy/10 transition-all duration-300 ${focusedField === "subject" ? "border-gold ring-2 ring-gold/20" : ""}`}
                                />
                              </motion.div>
                            </div>
                            <motion.div
                              className="space-y-2"
                              whileTap={{ scale: 0.998 }}
                            >
                              <Label htmlFor="message" className="text-navy text-sm">Message</Label>
                              <textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your mortgage needs..."
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("message")}
                                onBlur={() => setFocusedField(null)}
                                required
                                rows={5}
                                className={`w-full rounded-lg border bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none resize-none transition-all duration-300 ${focusedField === "message" ? "border-gold ring-2 ring-gold/20" : "border-navy/10"}`}
                              />
                            </motion.div>
                            <motion.button
                              type="submit"
                              className="w-full py-3 bg-navy text-white font-medium tracking-wider uppercase rounded-lg hover:bg-navy-deep transition-all duration-300 flex items-center justify-center gap-2"
                              disabled={isSubmitting}
                              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                              {isSubmitting ? (
                                <>
                                  <motion.div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Send Message
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </>
                              )}
                            </motion.button>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Contact Info */}
              <ScrollAnimation delay={0.2}>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-navy mb-3 md:mb-4">
                      Contact Information
                    </h2>
                    <p className="text-navy/60 text-sm md:text-base">
                      Prefer to speak with someone directly? Call us or send an email.
                    </p>
                  </div>

                  {/* Quick Contact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-gold/10 border border-gold/20 rounded-xl h-full">
                        <CardContent className="p-4 md:p-5 flex items-start gap-4">
                          <motion.div
                            className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0"
                            whileHover={{ rotate: 10 }}
                          >
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </motion.div>
                          <div>
                            <p className="font-semibold text-navy text-sm md:text-base">Call Us</p>
                            <a href="tel:01992535555" className="text-navy/70 text-sm hover:text-gold transition-colors">01992 535 555</a>
                            <p className="text-xs text-navy/40 mt-1">Mon-Fri 9am-8pm, Sat 9am-5pm</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-pearl border border-navy/5 rounded-xl h-full">
                        <CardContent className="p-4 md:p-5 flex items-start gap-4">
                          <motion.div
                            className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0"
                            whileHover={{ rotate: 10 }}
                          >
                            <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </motion.div>
                          <div>
                            <p className="font-semibold text-navy text-sm md:text-base">Email Us</p>
                            <a href="mailto:info@apply-wise.co.uk" className="text-navy/70 text-sm hover:text-gold transition-colors">info@apply-wise.co.uk</a>
                            <p className="text-xs text-navy/40 mt-1">We reply within 24 hours</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Office Hours */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                      <CardContent className="p-4 md:p-5">
                        <h3 className="font-semibold text-navy mb-4 flex items-center gap-2 text-sm md:text-base">
                          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Opening Hours
                        </h3>
                        <div className="space-y-3 text-sm">
                          {[
                            { day: "Monday - Friday", hours: "9:00am - 8:00pm" },
                            { day: "Saturday", hours: "9:00am - 5:00pm" },
                            { day: "Sunday", hours: "Closed" },
                          ].map((item, index) => (
                            <motion.div
                              key={item.day}
                              className="flex justify-between items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <span className="text-navy/60">{item.day}</span>
                              <span className={`font-medium ${item.hours === "Closed" ? "text-navy/40" : "text-navy"}`}>{item.hours}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* FAQ Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link href="/#faq">
                      <motion.div
                        className="flex items-center justify-between p-4 bg-pearl/50 border border-navy/5 rounded-xl cursor-pointer group"
                        whileHover={{ scale: 1.02, y: -2, backgroundColor: "#F5F3EF" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-navy text-sm">Have questions?</p>
                            <p className="text-xs text-navy/50">Check our FAQ section</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-navy/30 group-hover:text-gold group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-pearl-texture">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <ScrollAnimation>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-4">
                Ready to get started?
              </h2>
              <p className="text-navy/60 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
                Start your mortgage application today and let our experts guide you
                every step of the way.
              </p>
              <Link href="/apply">
                <motion.button
                  className="px-8 md:px-10 py-3 bg-gold text-navy font-semibold tracking-wider uppercase rounded-lg hover:bg-gold-light transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Now
                </motion.button>
              </Link>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
