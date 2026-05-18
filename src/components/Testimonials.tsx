"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const testimonials = [
  {
    quote: "Efficient, friendly and helpful. Made sure I understood everything. The process was astonishingly straightforward. I couldn't recommend them highly enough!",
    author: "Michelle T.",
    location: "London",
    date: "December 2024",
    rating: 5,
    mortgageType: "First Time Buyer",
  },
  {
    quote: "Really helpful service. The advisor was patient and explained everything clearly. Would definitely recommend to anyone looking for a mortgage.",
    author: "Karen S.",
    location: "Manchester",
    date: "March 2025",
    rating: 5,
    mortgageType: "Remortgage",
  },
  {
    quote: "Excellent service from start to finish. They found me a great deal and handled all the paperwork. Saved me over £200 a month!",
    author: "Francesco D.",
    location: "Birmingham",
    date: "March 2025",
    rating: 5,
    mortgageType: "Buy to Let",
  },
  {
    quote: "As first time buyers we had no idea where to start. Apply Wise made everything simple and stress-free. We're now in our dream home!",
    author: "James & Sophie W.",
    location: "Bristol",
    date: "February 2025",
    rating: 5,
    mortgageType: "First Time Buyer",
  },
  {
    quote: "Professional, knowledgeable, and always available when I had questions. The online process was seamless. Highly recommended!",
    author: "Aisha P.",
    location: "Leeds",
    date: "January 2025",
    rating: 5,
    mortgageType: "Remortgage",
  },
  {
    quote: "I was nervous about remortgaging but they made it so easy. Got a much better rate than my current lender offered. Thank you!",
    author: "David M.",
    location: "Edinburgh",
    date: "January 2025",
    rating: 5,
    mortgageType: "Remortgage",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Show 3 testimonials at a time on desktop, 1 on mobile
  const testimonialsToShow = 3;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < testimonialsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push({ ...testimonials[index], index });
    }
    return result;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-pearl to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-navy/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              Testimonials
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight mb-4">
              What Our Clients Say
            </h2>
            <p className="text-navy/50 max-w-xl mx-auto">
              Join thousands of happy homeowners who found their perfect mortgage with us
            </p>

            {/* Rating summary */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-navy font-semibold">4.9/5</span>
              <span className="text-navy/40">from 847 reviews</span>
            </div>
          </div>
        </ScrollAnimation>

        {/* Desktop: Show 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          <AnimatePresence mode="popLayout">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.author}-${testimonial.index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-navy/5 rounded-2xl p-8 hover:border-gold/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Mortgage type badge */}
                <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full w-fit mb-4">
                  {testimonial.mortgageType}
                </span>

                {/* Quote */}
                <p className="text-navy/70 text-sm leading-relaxed flex-grow mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-navy/10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/60 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-navy">{testimonial.author}</p>
                    <p className="text-sm text-navy/40">{testimonial.location} • {testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile: Show 1 card with swipe */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-navy/5 rounded-2xl p-6 shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full mb-4">
                {testimonials[currentIndex].mortgageType}
              </span>

              <p className="text-navy/70 text-sm leading-relaxed mb-6">
                "{testimonials[currentIndex].quote}"
              </p>

              <div className="pt-4 border-t border-navy/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/60 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-navy">{testimonials[currentIndex].author}</p>
                  <p className="text-sm text-navy/40">{testimonials[currentIndex].location} • {testimonials[currentIndex].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gold w-6"
                  : "bg-navy/20 hover:bg-navy/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
