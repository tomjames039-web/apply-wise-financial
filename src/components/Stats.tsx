"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const stats = [
  {
    value: 90,
    suffix: "+",
    label: "UK Lenders",
    description: "Access to the whole market",
  },
  {
    value: 20,
    suffix: "+",
    label: "Years Experience",
    description: "Industry expertise since 2003",
  },
  {
    value: 100,
    suffix: "%",
    label: "Whole of Market",
    description: "Independent advice",
  },
  {
    value: 0,
    suffix: "",
    label: "Broker Fee",
    description: "For product switches with your current lender",
    isZero: true,
  },
];

function AnimatedNumber({
  value,
  suffix,
  inView
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return val.toLocaleString("en-GB");
    }
    if (Number.isInteger(val)) {
      return val.toString();
    }
    return val.toFixed(1);
  };

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold">
      {formatValue(displayValue)}{suffix}
    </span>
  );
}

export function Stats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-navy relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
              Established & Trusted
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
              Two Decades of Expertise
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Apply Wise brings over 20 years of mortgage industry experience
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <ScrollAnimation key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                {'isZero' in stat && stat.isZero ? (
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold">£0</span>
                ) : (
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                )}
                <p className="text-lg md:text-xl font-semibold text-white mt-2">
                  {stat.label}
                </p>
                <p className="text-sm text-white/40 mt-1">
                  {stat.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
