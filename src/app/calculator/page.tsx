"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

type CalculatorTab = "mortgage" | "stamp-duty" | "affordability";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("mortgage");

  // Mortgage Calculator State
  const [propertyValue, setPropertyValue] = useState(300000);
  const [deposit, setDeposit] = useState(30000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [termYears, setTermYears] = useState(25);

  // Stamp Duty Calculator State
  const [stampDutyPropertyValue, setStampDutyPropertyValue] = useState(300000);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isAdditionalProperty, setIsAdditionalProperty] = useState(false);
  const [isNonUKResident, setIsNonUKResident] = useState(false);

  // Affordability Calculator State
  const [income1, setIncome1] = useState(50000);
  const [income2, setIncome2] = useState(0);
  const [monthlyOutgoings, setMonthlyOutgoings] = useState(500);

  // Mortgage Calculations
  const mortgageCalculations = useMemo(() => {
    const loanAmount = propertyValue - deposit;
    const ltv = (loanAmount / propertyValue) * 100;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = termYears * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, totalPayments);
      monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    } else {
      monthlyPayment = loanAmount / totalPayments;
    }

    const totalRepayment = monthlyPayment * totalPayments;
    const totalInterest = totalRepayment - loanAmount;

    return {
      loanAmount,
      ltv: ltv.toFixed(1),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }, [propertyValue, deposit, interestRate, termYears]);

  // Stamp Duty Calculations (Official SDLT rates from GOV.UK - April 2025)
  const stampDutyCalculations = useMemo(() => {
    let stampDuty = 0;
    const value = stampDutyPropertyValue;

    // Check if first-time buyer relief applies
    if (isFirstTimeBuyer && value <= 500000) {
      // First-time buyer relief: 0% up to £300,000, 5% from £300,001 to £500,000
      if (value <= 300000) {
        stampDuty = 0;
      } else {
        stampDuty = (value - 300000) * 0.05;
      }
    } else {
      // Standard rates (also applies if FTB property > £500,000)
      // Band 1: Up to £125,000 = 0%
      // Band 2: £125,001 to £250,000 = 2%
      // Band 3: £250,001 to £925,000 = 5%
      // Band 4: £925,001 to £1,500,000 = 10%
      // Band 5: Above £1,500,000 = 12%

      if (value > 125000) {
        // 2% on portion from £125,001 to £250,000
        const band2Amount = Math.min(value, 250000) - 125000;
        if (band2Amount > 0) {
          stampDuty += band2Amount * 0.02;
        }
      }

      if (value > 250000) {
        // 5% on portion from £250,001 to £925,000
        const band3Amount = Math.min(value, 925000) - 250000;
        if (band3Amount > 0) {
          stampDuty += band3Amount * 0.05;
        }
      }

      if (value > 925000) {
        // 10% on portion from £925,001 to £1,500,000
        const band4Amount = Math.min(value, 1500000) - 925000;
        if (band4Amount > 0) {
          stampDuty += band4Amount * 0.10;
        }
      }

      if (value > 1500000) {
        // 12% on portion above £1,500,000
        const band5Amount = value - 1500000;
        stampDuty += band5Amount * 0.12;
      }
    }

    // Additional property surcharge (5% of total property value)
    if (isAdditionalProperty) {
      stampDuty += value * 0.05;
    }

    // Non-UK resident surcharge (2% of total property value)
    if (isNonUKResident) {
      stampDuty += value * 0.02;
    }

    const effectiveRate = value > 0 ? (stampDuty / value) * 100 : 0;

    return {
      stampDuty: stampDuty.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      totalCost: (value + stampDuty).toFixed(2),
    };
  }, [stampDutyPropertyValue, isFirstTimeBuyer, isAdditionalProperty, isNonUKResident]);

  // Affordability Calculations
  const affordabilityCalculations = useMemo(() => {
    const totalIncome = income1 + income2;
    const annualOutgoings = monthlyOutgoings * 12;
    const netIncome = totalIncome - annualOutgoings;

    // Standard multiplier is 4.5x income, stress tested
    const standardMultiplier = 4.5;
    const maxBorrowing = totalIncome * standardMultiplier;

    // Estimated monthly payment at current rates
    const estimatedRate = 0.05; // 5% assumed rate
    const term = 25 * 12;
    const monthlyRate = estimatedRate / 12;
    const factor = Math.pow(1 + monthlyRate, term);
    const monthlyPayment = (maxBorrowing * monthlyRate * factor) / (factor - 1);

    // Affordability based on 35% of monthly income
    const affordableMonthly = (totalIncome / 12) * 0.35;
    const affordableBorrowing = (affordableMonthly * (factor - 1)) / (monthlyRate * factor);

    return {
      maxBorrowing: Math.min(maxBorrowing, affordableBorrowing).toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalIncome: totalIncome.toFixed(0),
      affordableMonthly: affordableMonthly.toFixed(0),
    };
  }, [income1, income2, monthlyOutgoings]);

  const formatCurrency = (value: string | number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Custom mobile-friendly slider component
  const Slider = ({
    id,
    value,
    min,
    max,
    step,
    onChange,
  }: {
    id: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
  }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleInteraction = (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const percent = Math.max(0, Math.min(1, x / width));
      const newValue = min + percent * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      onChange(Math.max(min, Math.min(max, steppedValue)));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      handleInteraction(e.touches[0].clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      handleInteraction(e.touches[0].clientX);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      handleInteraction(e.clientX);

      const handleMouseMove = (e: MouseEvent) => {
        handleInteraction(e.clientX);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    return (
      <div
        ref={sliderRef}
        className="relative h-14 md:h-12 flex items-center cursor-pointer select-none py-2"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Track background */}
        <div className="absolute w-full h-2.5 md:h-2 bg-pearl rounded-full" />

        {/* Track fill */}
        <div
          className="absolute h-2.5 md:h-2 bg-gold rounded-full"
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb - larger on mobile for easier touch */}
        <div
          className="absolute w-10 h-10 md:w-8 md:h-8 bg-gold rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 transition-transform active:scale-110 hover:scale-105"
          style={{ left: `${percentage}%` }}
        />

        {/* Hidden input for accessibility */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="sr-only"
          aria-label={id}
        />
      </div>
    );
  };

  const tabs = [
    { id: "mortgage" as const, label: "Mortgage", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )},
    { id: "stamp-duty" as const, label: "Stamp Duty", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )},
    { id: "affordability" as const, label: "Affordability", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    )},
  ];

  // Get the breakdown for display
  const getStampDutyBreakdown = () => {
    const value = stampDutyPropertyValue;
    const breakdown: { band: string; amount: number; rate: string; tax: number }[] = [];

    if (isFirstTimeBuyer && value <= 500000) {
      // First-time buyer breakdown
      if (value <= 300000) {
        breakdown.push({ band: "Up to £300,000", amount: value, rate: "0%", tax: 0 });
      } else {
        breakdown.push({ band: "Up to £300,000", amount: 300000, rate: "0%", tax: 0 });
        breakdown.push({ band: "£300,001 to £500,000", amount: value - 300000, rate: "5%", tax: (value - 300000) * 0.05 });
      }
    } else {
      // Standard breakdown
      if (value > 0) {
        const band1 = Math.min(value, 125000);
        breakdown.push({ band: "Up to £125,000", amount: band1, rate: "0%", tax: 0 });
      }
      if (value > 125000) {
        const band2 = Math.min(value, 250000) - 125000;
        breakdown.push({ band: "£125,001 to £250,000", amount: band2, rate: "2%", tax: band2 * 0.02 });
      }
      if (value > 250000) {
        const band3 = Math.min(value, 925000) - 250000;
        breakdown.push({ band: "£250,001 to £925,000", amount: band3, rate: "5%", tax: band3 * 0.05 });
      }
      if (value > 925000) {
        const band4 = Math.min(value, 1500000) - 925000;
        breakdown.push({ band: "£925,001 to £1.5m", amount: band4, rate: "10%", tax: band4 * 0.10 });
      }
      if (value > 1500000) {
        const band5 = value - 1500000;
        breakdown.push({ band: "Above £1.5m", amount: band5, rate: "12%", tax: band5 * 0.12 });
      }
    }

    return breakdown;
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-8 md:mb-10">
              <motion.p
                className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Financial Tools
              </motion.p>
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-navy tracking-tight mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Mortgage Calculators
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-navy/60 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Plan your property purchase with our suite of calculators
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Link href="/calculator/btl-yield" className="inline-flex items-center gap-2 text-gold font-medium hover:underline text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Try our Buy-to-Let Yield Calculator
                </Link>
              </motion.div>
            </div>
          </ScrollAnimation>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg border border-navy/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-navy text-white shadow-md"
                      : "text-navy/60 hover:text-navy hover:bg-pearl/50"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "mortgage" && (
              <motion.div
                key="mortgage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                  {/* Mortgage Calculator Inputs */}
                  <Card className="bg-white border border-navy/5 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
                      <h2 className="text-lg md:text-xl font-semibold text-navy">
                        Mortgage Details
                      </h2>

                      {/* Property Value */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label htmlFor="propertyValue" className="text-navy font-medium">
                            Property Value
                          </Label>
                          <motion.span
                            key={propertyValue}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatCurrency(propertyValue)}
                          </motion.span>
                        </div>
                        <Slider
                          id="propertyValue"
                          min={50000}
                          max={2000000}
                          step={5000}
                          value={propertyValue}
                          onChange={setPropertyValue}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£50k</span>
                          <span>£2m</span>
                        </div>
                      </div>

                      {/* Deposit */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label htmlFor="deposit" className="text-navy font-medium">
                            Deposit
                          </Label>
                          <motion.span
                            key={deposit}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatCurrency(deposit)}
                          </motion.span>
                        </div>
                        <Slider
                          id="deposit"
                          min={0}
                          max={propertyValue * 0.95}
                          step={1000}
                          value={deposit}
                          onChange={setDeposit}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£0</span>
                          <span>{formatCurrency(propertyValue * 0.95)}</span>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label htmlFor="interestRate" className="text-navy font-medium">
                            Interest Rate
                          </Label>
                          <motion.span
                            key={interestRate}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                            transition={{ duration: 0.3 }}
                          >
                            {Number(interestRate).toFixed(1)}%
                          </motion.span>
                        </div>
                        <Slider
                          id="interestRate"
                          min={0.5}
                          max={10}
                          step={0.1}
                          value={interestRate}
                          onChange={setInterestRate}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>0.5%</span>
                          <span>10%</span>
                        </div>
                      </div>

                      {/* Mortgage Term */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label htmlFor="termYears" className="text-navy font-medium">
                            Mortgage Term
                          </Label>
                          <motion.span
                            key={termYears}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                            transition={{ duration: 0.3 }}
                          >
                            {termYears} years
                          </motion.span>
                        </div>
                        <Slider
                          id="termYears"
                          min={5}
                          max={40}
                          step={1}
                          value={termYears}
                          onChange={setTermYears}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>5 years</span>
                          <span>40 years</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mortgage Results */}
                  <div className="space-y-5 md:space-y-6">
                    <motion.div
                      key={mortgageCalculations.monthlyPayment}
                      initial={{ scale: 0.98, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-navy border-none shadow-xl overflow-hidden rounded-xl">
                        <CardContent className="p-6 md:p-8 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                          <p className="text-white/60 mb-3 text-sm md:text-base">
                            Estimated Monthly Payment
                          </p>
                          <motion.p
                            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gold mb-2 relative"
                            key={mortgageCalculations.monthlyPayment}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                          >
                            {formatCurrency(mortgageCalculations.monthlyPayment)}
                          </motion.p>
                          <p className="text-white/40 text-sm">per month</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {[
                        { label: "Loan Amount", value: formatCurrency(mortgageCalculations.loanAmount) },
                        { label: "LTV Ratio", value: `${mortgageCalculations.ltv}%` },
                        { label: "Total Interest", value: formatCurrency(mortgageCalculations.totalInterest), highlight: true },
                        { label: "Total Repayment", value: formatCurrency(mortgageCalculations.totalRepayment) },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <Card className="bg-white border border-navy/5 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                            <CardContent className="p-4 text-center">
                              <p className="text-navy/50 text-xs md:text-sm mb-1">{item.label}</p>
                              <p className={`text-lg md:text-xl font-semibold ${item.highlight ? "text-gold" : "text-navy"}`}>
                                {item.value}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Card className="bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl">
                      <CardContent className="p-5 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold text-navy mb-2">
                          Ready to take the next step?
                        </h3>
                        <p className="text-navy/60 text-sm mb-4">
                          Our mortgage experts can help you find the best deal for your situation.
                        </p>
                        <Link href="/apply">
                          <motion.button
                            className="w-full py-3 bg-navy text-white font-medium text-sm tracking-wider uppercase rounded-lg hover:bg-navy-deep transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Get Personalised Advice
                          </motion.button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stamp-duty" && (
              <motion.div
                key="stamp-duty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                  {/* Stamp Duty Inputs */}
                  <Card className="bg-white border border-navy/5 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-navy">
                          Property Details
                        </h2>
                        <a
                          href="https://www.gov.uk/stamp-duty-land-tax/residential-property-rates"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gold hover:underline flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          GOV.UK rates
                        </a>
                      </div>

                      {/* Property Value */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label className="text-navy font-medium">Property Value</Label>
                          <motion.span
                            key={stampDutyPropertyValue}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                          >
                            {formatCurrency(stampDutyPropertyValue)}
                          </motion.span>
                        </div>
                        <Slider
                          id="stampDutyValue"
                          min={50000}
                          max={2000000}
                          step={5000}
                          value={stampDutyPropertyValue}
                          onChange={setStampDutyPropertyValue}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£50k</span>
                          <span>£2m</span>
                        </div>
                      </div>

                      {/* Buyer Type */}
                      <div className="space-y-4">
                        <Label className="text-navy font-medium">Buyer Type</Label>
                        <div className="space-y-3">
                          <label className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all border ${isFirstTimeBuyer ? 'bg-gold/10 border-gold/30' : 'bg-pearl/50 border-transparent hover:bg-pearl hover:border-gold/20'}`}>
                            <input
                              type="checkbox"
                              checked={isFirstTimeBuyer}
                              onChange={(e) => {
                                setIsFirstTimeBuyer(e.target.checked);
                                if (e.target.checked) setIsAdditionalProperty(false);
                              }}
                              className="w-5 h-5 rounded border-navy/20 text-gold focus:ring-gold"
                            />
                            <div>
                              <p className="font-medium text-navy">First Time Buyer</p>
                              <p className="text-sm text-navy/50">0% up to £300,000, then 5% to £500,000</p>
                            </div>
                          </label>
                          <label className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all border ${isAdditionalProperty ? 'bg-gold/10 border-gold/30' : 'bg-pearl/50 border-transparent hover:bg-pearl hover:border-gold/20'}`}>
                            <input
                              type="checkbox"
                              checked={isAdditionalProperty}
                              onChange={(e) => {
                                setIsAdditionalProperty(e.target.checked);
                                if (e.target.checked) setIsFirstTimeBuyer(false);
                              }}
                              className="w-5 h-5 rounded border-navy/20 text-gold focus:ring-gold"
                            />
                            <div>
                              <p className="font-medium text-navy">Additional Property</p>
                              <p className="text-sm text-navy/50">5% stamp duty surcharge applies</p>
                            </div>
                          </label>
                          <label className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all border ${isNonUKResident ? 'bg-gold/10 border-gold/30' : 'bg-pearl/50 border-transparent hover:bg-pearl hover:border-gold/20'}`}>
                            <input
                              type="checkbox"
                              checked={isNonUKResident}
                              onChange={(e) => setIsNonUKResident(e.target.checked)}
                              className="w-5 h-5 rounded border-navy/20 text-gold focus:ring-gold"
                            />
                            <div>
                              <p className="font-medium text-navy">Non-UK Resident</p>
                              <p className="text-sm text-navy/50">2% surcharge applies</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Warning for FTB over £500k */}
                      {isFirstTimeBuyer && stampDutyPropertyValue > 500000 && (
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-800">
                            <strong>Note:</strong> First-time buyer relief is not available for properties over £500,000. Standard rates will apply.
                          </p>
                        </div>
                      )}

                      {/* Info box */}
                      <div className="p-4 bg-navy/5 rounded-lg border border-navy/10">
                        <p className="text-sm text-navy/70">
                          <strong className="text-navy">SDLT rates</strong> apply to England and Northern Ireland. Scotland (LBTT) and Wales (LTT) have different rates.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stamp Duty Results */}
                  <div className="space-y-5 md:space-y-6">
                    <Card className="bg-navy border-none shadow-xl overflow-hidden rounded-xl">
                      <CardContent className="p-6 md:p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <p className="text-white/60 mb-3 text-sm md:text-base">
                          Stamp Duty to Pay
                        </p>
                        <motion.p
                          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gold mb-2 relative"
                          key={stampDutyCalculations.stampDuty}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          {formatCurrency(stampDutyCalculations.stampDuty)}
                        </motion.p>
                        <p className="text-white/40 text-sm">
                          Effective rate: {stampDutyCalculations.effectiveRate}%
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                        <CardContent className="p-4 text-center">
                          <p className="text-navy/50 text-xs md:text-sm mb-1">Property Price</p>
                          <p className="text-lg md:text-xl font-semibold text-navy">
                            {formatCurrency(stampDutyPropertyValue)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                        <CardContent className="p-4 text-center">
                          <p className="text-navy/50 text-xs md:text-sm mb-1">Total Cost</p>
                          <p className="text-lg md:text-xl font-semibold text-gold">
                            {formatCurrency(stampDutyCalculations.totalCost)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Stamp Duty Breakdown */}
                    <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Tax Breakdown</h3>
                        <div className="space-y-2 text-sm">
                          {getStampDutyBreakdown().map((band, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-navy/5 last:border-0">
                              <div>
                                <span className="text-navy/60">{band.band}</span>
                                <span className="text-navy/40 text-xs ml-2">({formatCurrency(band.amount)})</span>
                              </div>
                              <div className="text-right">
                                <span className="text-navy font-medium">{band.rate}</span>
                                <span className="text-navy/60 text-xs ml-2">= {formatCurrency(band.tax)}</span>
                              </div>
                            </div>
                          ))}
                          {isAdditionalProperty && (
                            <div className="flex justify-between py-2 bg-gold/10 px-2 -mx-2 rounded mt-2">
                              <span className="text-gold font-medium">Additional property surcharge</span>
                              <span className="text-gold font-medium">+5% = {formatCurrency(stampDutyPropertyValue * 0.05)}</span>
                            </div>
                          )}
                          {isNonUKResident && (
                            <div className="flex justify-between py-2 bg-navy/5 px-2 -mx-2 rounded mt-2">
                              <span className="text-navy font-medium">Non-UK resident surcharge</span>
                              <span className="text-navy font-medium">+2% = {formatCurrency(stampDutyPropertyValue * 0.02)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Official SDLT Rates Table */}
                    <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-navy mb-4">
                          {isFirstTimeBuyer && stampDutyPropertyValue <= 500000 ? "First-Time Buyer Rates" : "Standard SDLT Rates"}
                        </h3>
                        <div className="space-y-1 text-sm">
                          {isFirstTimeBuyer && stampDutyPropertyValue <= 500000 ? (
                            <>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">Up to £300,000</span>
                                <span className="text-navy font-medium">0%</span>
                              </div>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">£300,001 to £500,000</span>
                                <span className="text-navy font-medium">5%</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">Up to £125,000</span>
                                <span className="text-navy font-medium">0%</span>
                              </div>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">£125,001 to £250,000</span>
                                <span className="text-navy font-medium">2%</span>
                              </div>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">£250,001 to £925,000</span>
                                <span className="text-navy font-medium">5%</span>
                              </div>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">£925,001 to £1.5m</span>
                                <span className="text-navy font-medium">10%</span>
                              </div>
                              <div className="flex justify-between py-1.5">
                                <span className="text-navy/60">Above £1.5m</span>
                                <span className="text-navy font-medium">12%</span>
                              </div>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-navy/40 mt-4 pt-3 border-t border-navy/10">
                          Source: GOV.UK (April 2025). Rates apply to England and Northern Ireland.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "affordability" && (
              <motion.div
                key="affordability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                  {/* Affordability Inputs */}
                  <Card className="bg-white border border-navy/5 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-5 md:p-8 space-y-6 md:space-y-8">
                      <h2 className="text-lg md:text-xl font-semibold text-navy">
                        Your Income
                      </h2>

                      {/* Income 1 */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label className="text-navy font-medium">Your Annual Income</Label>
                          <motion.span
                            key={income1}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                          >
                            {formatCurrency(income1)}
                          </motion.span>
                        </div>
                        <Slider
                          id="income1"
                          min={15000}
                          max={250000}
                          step={1000}
                          value={income1}
                          onChange={setIncome1}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£15k</span>
                          <span>£250k</span>
                        </div>
                      </div>

                      {/* Income 2 */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label className="text-navy font-medium">Partner's Annual Income (optional)</Label>
                          <motion.span
                            key={income2}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                          >
                            {formatCurrency(income2)}
                          </motion.span>
                        </div>
                        <Slider
                          id="income2"
                          min={0}
                          max={250000}
                          step={1000}
                          value={income2}
                          onChange={setIncome2}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£0</span>
                          <span>£250k</span>
                        </div>
                      </div>

                      {/* Monthly Outgoings */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
                          <Label className="text-navy font-medium">Monthly Commitments</Label>
                          <motion.span
                            key={monthlyOutgoings}
                            className="text-xl md:text-2xl font-semibold text-navy"
                            initial={{ scale: 1.05, color: "#D4A524" }}
                            animate={{ scale: 1, color: "#0B1F3A" }}
                          >
                            {formatCurrency(monthlyOutgoings)}
                          </motion.span>
                        </div>
                        <Slider
                          id="outgoings"
                          min={0}
                          max={5000}
                          step={50}
                          value={monthlyOutgoings}
                          onChange={setMonthlyOutgoings}
                        />
                        <div className="flex justify-between text-xs text-navy/40">
                          <span>£0</span>
                          <span>£5k</span>
                        </div>
                        <p className="text-xs text-navy/40">
                          Include loans, credit cards, child maintenance, etc.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Affordability Results */}
                  <div className="space-y-5 md:space-y-6">
                    <Card className="bg-navy border-none shadow-xl overflow-hidden rounded-xl">
                      <CardContent className="p-6 md:p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <p className="text-white/60 mb-3 text-sm md:text-base">
                          You Could Borrow Up To
                        </p>
                        <motion.p
                          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gold mb-2 relative"
                          key={affordabilityCalculations.maxBorrowing}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          {formatCurrency(affordabilityCalculations.maxBorrowing)}
                        </motion.p>
                        <p className="text-white/40 text-sm">
                          Based on 4.5x combined income
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                        <CardContent className="p-4 text-center">
                          <p className="text-navy/50 text-xs md:text-sm mb-1">Combined Income</p>
                          <p className="text-lg md:text-xl font-semibold text-navy">
                            {formatCurrency(affordabilityCalculations.totalIncome)}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                        <CardContent className="p-4 text-center">
                          <p className="text-navy/50 text-xs md:text-sm mb-1">Affordable Monthly</p>
                          <p className="text-lg md:text-xl font-semibold text-gold">
                            {formatCurrency(affordabilityCalculations.affordableMonthly)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Property Budget */}
                    <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Your Property Budget</h3>
                        <div className="space-y-3">
                          {[
                            { deposit: "5%", budget: Number(affordabilityCalculations.maxBorrowing) / 0.95 },
                            { deposit: "10%", budget: Number(affordabilityCalculations.maxBorrowing) / 0.90 },
                            { deposit: "15%", budget: Number(affordabilityCalculations.maxBorrowing) / 0.85 },
                            { deposit: "20%", budget: Number(affordabilityCalculations.maxBorrowing) / 0.80 },
                          ].map((option) => (
                            <div key={option.deposit} className="flex justify-between items-center py-2 border-b border-navy/5 last:border-0">
                              <span className="text-navy/60 text-sm">With {option.deposit} deposit</span>
                              <span className="text-navy font-semibold">{formatCurrency(option.budget)}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl">
                      <CardContent className="p-5 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold text-navy mb-2">
                          Get a Precise Figure
                        </h3>
                        <p className="text-navy/60 text-sm mb-4">
                          This is an estimate. Speak to us for a personalised affordability assessment.
                        </p>
                        <Link href="/apply">
                          <motion.button
                            className="w-full py-3 bg-navy text-white font-medium text-sm tracking-wider uppercase rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Get Personalised Assessment
                          </motion.button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <p className="text-xs text-navy/40 text-center px-4 mt-8 max-w-2xl mx-auto">
            These calculators provide estimates only and should not be considered financial advice.
            Actual rates, payments, and eligibility may vary. Your home may be repossessed if you
            do not keep up repayments on your mortgage. SDLT rates are for England and Northern Ireland only.
          </p>
        </div>
      </main>

      <Footer />


    </div>
  );
}
