"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

// Generate next 14 days for date selection
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays (0)
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }

  return dates;
};

// Time slots
const timeSlots = [
  { time: "09:00", label: "9:00 AM" },
  { time: "09:30", label: "9:30 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "10:30", label: "10:30 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "11:30", label: "11:30 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "12:30", label: "12:30 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "14:30", label: "2:30 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "15:30", label: "3:30 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "16:30", label: "4:30 PM" },
  { time: "17:00", label: "5:00 PM" },
  { time: "17:30", label: "5:30 PM" },
  { time: "18:00", label: "6:00 PM" },
  { time: "18:30", label: "6:30 PM" },
  { time: "19:00", label: "7:00 PM" },
];

// Saturday has shorter hours
const saturdaySlots = [
  { time: "10:00", label: "10:00 AM" },
  { time: "10:30", label: "10:30 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "11:30", label: "11:30 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "12:30", label: "12:30 PM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "13:30", label: "1:30 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "14:30", label: "2:30 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "15:30", label: "3:30 PM" },
];

export default function BookACallPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    topic: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Store tracking data on page load
  useEffect(() => {
    storeTrackingData();
  }, []);

  const availableDates = useMemo(() => generateDates(), []);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return timeSlots;
    // Saturday (6) has shorter hours
    return selectedDate.getDay() === 6 ? saturdaySlots : timeSlots;
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get tracking data for lead attribution
    const tracking = getStoredTrackingData();

    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          formattedDate: selectedDate ? formatFullDate(selectedDate) : "",
          formattedTime: availableTimeSlots.find(s => s.time === selectedTime)?.label || selectedTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to submit. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", email: "", phone: "", postcode: "", topic: "", notes: "" });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-navy pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gold text-sm font-medium">Free Consultation</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Book a Call with
                <br />
                <span className="text-gold">Our Mortgage Experts</span>
              </h1>
              <p className="text-white/70 text-lg">
                Choose a convenient time and we'll call you. No obligation, just friendly advice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-16 bg-pearl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {!isSubmitted ? (
              <>
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center gap-3">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                            step >= s
                              ? "bg-gold text-navy"
                              : "bg-navy/10 text-navy/40"
                          }`}
                          animate={{ scale: step === s ? 1.1 : 1 }}
                        >
                          {step > s ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            s
                          )}
                        </motion.div>
                        {s < 3 && (
                          <div className={`w-12 h-0.5 mx-2 transition-all ${step > s ? "bg-gold" : "bg-navy/10"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Labels */}
                <div className="text-center mb-8">
                  <p className="text-navy/50 text-sm">
                    {step === 1 && "Step 1: Choose a date"}
                    {step === 2 && "Step 2: Select a time"}
                    {step === 3 && "Step 3: Your details"}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1: Date Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                        <CardContent className="p-6 md:p-8">
                          <h2 className="text-xl font-semibold text-navy mb-6 text-center">
                            When would you like us to call?
                          </h2>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {availableDates.map((date) => (
                              <motion.button
                                key={date.toISOString()}
                                onClick={() => handleDateSelect(date)}
                                className={`p-4 rounded-xl border text-center transition-all ${
                                  selectedDate?.toDateString() === date.toDateString()
                                    ? "bg-gold border-gold text-navy"
                                    : "bg-pearl border-navy/10 hover:border-gold/50 hover:bg-gold/5"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <p className="text-xs text-navy/50 uppercase">
                                  {date.toLocaleDateString("en-GB", { weekday: "short" })}
                                </p>
                                <p className="text-2xl font-bold text-navy">
                                  {date.getDate()}
                                </p>
                                <p className="text-xs text-navy/60">
                                  {date.toLocaleDateString("en-GB", { month: "short" })}
                                </p>
                              </motion.button>
                            ))}
                          </div>
                          <p className="text-center text-navy/40 text-sm mt-6">
                            Available Mon-Sat. Sunday closed.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 2: Time Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                        <CardContent className="p-6 md:p-8">
                          <div className="flex items-center justify-between mb-6">
                            <button
                              onClick={() => setStep(1)}
                              className="flex items-center gap-2 text-navy/60 hover:text-navy transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </button>
                            <div className="text-right">
                              <p className="text-sm text-navy/50">Selected date</p>
                              <p className="font-semibold text-navy">{selectedDate && formatDate(selectedDate)}</p>
                            </div>
                          </div>

                          <h2 className="text-xl font-semibold text-navy mb-6 text-center">
                            What time works best?
                          </h2>

                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {availableTimeSlots.map((slot) => (
                              <motion.button
                                key={slot.time}
                                onClick={() => handleTimeSelect(slot.time)}
                                className={`py-3 px-4 rounded-xl border text-center transition-all ${
                                  selectedTime === slot.time
                                    ? "bg-gold border-gold text-navy"
                                    : "bg-pearl border-navy/10 hover:border-gold/50 hover:bg-gold/5"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <p className="font-medium text-navy">{slot.label}</p>
                              </motion.button>
                            ))}
                          </div>

                          <p className="text-center text-navy/40 text-sm mt-6">
                            {selectedDate?.getDay() === 6
                              ? "Saturday hours: 10am - 4pm"
                              : "Mon-Fri hours: 9am - 7pm"
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Details */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                        <CardContent className="p-6 md:p-8">
                          <div className="flex items-center justify-between mb-6">
                            <button
                              onClick={() => setStep(2)}
                              className="flex items-center gap-2 text-navy/60 hover:text-navy transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </button>
                            <div className="text-right">
                              <p className="text-sm text-navy/50">Your appointment</p>
                              <p className="font-semibold text-navy">
                                {selectedDate && formatDate(selectedDate)} at {availableTimeSlots.find(s => s.time === selectedTime)?.label}
                              </p>
                            </div>
                          </div>

                          <h2 className="text-xl font-semibold text-navy mb-6 text-center">
                            Your contact details
                          </h2>

                          <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                              <label className="block text-navy/70 mb-2 text-sm font-medium">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="John Smith"
                              />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-navy/70 mb-2 text-sm font-medium">Phone Number *</label>
                                <input
                                  type="tel"
                                  required
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                  placeholder="07123 456789"
                                />
                              </div>
                              <div>
                                <label className="block text-navy/70 mb-2 text-sm font-medium">Postcode *</label>
                                <input
                                  type="text"
                                  required
                                  value={formData.postcode}
                                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                                  className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 uppercase"
                                  placeholder="CM16 7PY"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-navy/70 mb-2 text-sm font-medium">Email *</label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="john@example.com"
                              />
                            </div>

                            <div>
                              <label className="block text-navy/70 mb-2 text-sm font-medium">What would you like to discuss?</label>
                              <select
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                              >
                                <option value="">Select a topic (optional)</option>
                                <option value="first-time-buyer">First Time Buyer</option>
                                <option value="remortgage">Remortgage</option>
                                <option value="product-transfer">Product Transfer</option>
                                <option value="buy-to-let">Buy to Let</option>
                                <option value="bad-credit">Bad Credit Mortgage</option>
                                <option value="equity-release">Equity Release</option>
                                <option value="self-employed">Self Employed</option>
                                <option value="other">Other / General Enquiry</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-navy/70 mb-2 text-sm font-medium">Anything else we should know? (optional)</label>
                              <textarea
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-4 bg-pearl border border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none"
                                placeholder="E.g. Best time to reach you, specific questions..."
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
                                  Booking...
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  Confirm Booking
                                </>
                              )}
                            </button>

                            <p className="text-navy/40 text-xs text-center">
                              By booking, you agree to our{" "}
                              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
                              We'll send a confirmation to your email.
                            </p>
                          </form>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                  <CardContent className="p-8 md:p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>

                    <h2 className="text-2xl font-bold text-navy mb-4">
                      Call Booked!
                    </h2>

                    <div className="bg-pearl rounded-xl p-6 mb-6 max-w-sm mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold text-navy">
                          {selectedDate && formatFullDate(selectedDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-navy">
                          {availableTimeSlots.find(s => s.time === selectedTime)?.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-navy/70 mb-6 max-w-md mx-auto">
                      We've sent a confirmation email to <strong>{formData.email}</strong>.
                      One of our mortgage experts will call you at the scheduled time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/">
                        <button className="px-8 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-deep transition-all">
                          Back to Home
                        </button>
                      </Link>
                      <button
                        onClick={resetForm}
                        className="px-8 py-3 border border-navy/20 text-navy font-medium rounded-lg hover:bg-pearl transition-all"
                      >
                        Book Another Call
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy mb-2">15-30 Minutes</h3>
                <p className="text-navy/60 text-sm">Quick initial consultation to understand your needs</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy mb-2">No Obligation</h3>
                <p className="text-navy/60 text-sm">Free advice with no pressure to proceed</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy mb-2">Expert Advisers</h3>
                <p className="text-navy/60 text-sm">Qualified mortgage professionals ready to help</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Prefer to Call */}
      <section className="py-8 bg-pearl border-t border-navy/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-navy/60">
            Prefer to call us directly?{" "}
            <a href="tel:01992535555" className="text-gold font-semibold hover:underline">
              01992 535 555
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
