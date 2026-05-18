"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function EquityReleaseCalculatorPage() {
  // Basic inputs
  const [age, setAge] = useState(65);
  const [partnerAge, setPartnerAge] = useState(0);
  const [propertyValue, setPropertyValue] = useState(350000);
  const [outstandingMortgage, setOutstandingMortgage] = useState(0);

  // Health & lifestyle
  const [healthCondition, setHealthCondition] = useState("good");
  const [isSmoker, setIsSmoker] = useState(false);

  // Plan type
  const [planType, setPlanType] = useState<"lumpsum" | "drawdown">("lumpsum");
  const [initialDrawdown, setInitialDrawdown] = useState(50000);

  // Interest rate assumption
  const [interestRate, setInterestRate] = useState(6.5);

  // Calculations
  const calculations = useMemo(() => {
    // Use youngest age for couples
    const effectiveAge = partnerAge > 0 ? Math.min(age, partnerAge) : age;

    // Base LTV calculation - increases with age
    // Enhanced rates for health conditions
    let baseLTV = Math.min(57, Math.max(20, (effectiveAge - 55) * 1.2 + 18));

    // Health enhancement (can add 5-15% more)
    if (healthCondition === "poor") {
      baseLTV = Math.min(60, baseLTV + 8);
    } else if (healthCondition === "moderate") {
      baseLTV = Math.min(58, baseLTV + 4);
    }

    // Smoker enhancement
    if (isSmoker) {
      baseLTV = Math.min(60, baseLTV + 3);
    }

    // Calculate maximum release
    const grossRelease = (propertyValue * baseLTV) / 100;
    const netRelease = Math.max(0, grossRelease - outstandingMortgage);

    // Interest projections over time
    const projections = [];
    const balance = planType === "lumpsum" ? netRelease : initialDrawdown;
    const monthlyRate = interestRate / 100 / 12;

    for (let year = 0; year <= 25; year += 5) {
      if (year === 0) {
        projections.push({
          year,
          age: effectiveAge,
          balance: Math.round(balance),
          interestAccrued: 0,
          propertyValue: propertyValue,
          equity: propertyValue - balance,
        });
      } else {
        // Compound interest calculation
        const compoundedBalance = balance * Math.pow(1 + monthlyRate, year * 12);
        const interestAccrued = compoundedBalance - balance;

        // Assume property grows at 3% per year
        const futurePropertyValue = propertyValue * Math.pow(1.03, year);
        const remainingEquity = futurePropertyValue - compoundedBalance;

        projections.push({
          year,
          age: effectiveAge + year,
          balance: Math.round(compoundedBalance),
          interestAccrued: Math.round(interestAccrued),
          propertyValue: Math.round(futurePropertyValue),
          equity: Math.round(remainingEquity),
        });
      }
    }

    // Monthly equivalent payment if it was a repayment mortgage
    const term = 25 * 12;
    const factor = Math.pow(1 + monthlyRate, term);
    const monthlyEquivalent = (netRelease * monthlyRate * factor) / (factor - 1);

    return {
      baseLTV: baseLTV.toFixed(1),
      grossRelease: Math.round(grossRelease),
      netRelease: Math.round(netRelease),
      projections,
      monthlyEquivalent: Math.round(monthlyEquivalent),
      effectiveAge,
    };
  }, [age, partnerAge, propertyValue, outstandingMortgage, healthCondition, isSmoker, planType, initialDrawdown, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <Link href="/equity-release" className="text-gold text-sm hover:underline mb-4 inline-block">
                ← Back to Equity Release
              </Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-4">
                Equity Release Calculator
              </h1>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Get a detailed estimate of how much you could release and see how interest compounds over time
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Input Section - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Details */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Your Age</label>
                        <span className="text-gold font-bold">{age} years</span>
                      </div>
                      <input
                        type="range"
                        min={55}
                        max={90}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                      />
                      <div className="flex justify-between text-xs text-navy/40 mt-1">
                        <span>55</span>
                        <span>90</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Partner's Age (if applicable)</label>
                        <span className="text-navy font-semibold">{partnerAge === 0 ? "N/A" : `${partnerAge} years`}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={90}
                        value={partnerAge}
                        onChange={(e) => setPartnerAge(Number(e.target.value))}
                        className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                      />
                      <p className="text-xs text-navy/40 mt-1">Set to 0 if single applicant</p>
                    </div>

                    <div>
                      <label className="text-navy/70 text-sm font-medium block mb-2">Health Status</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "good", label: "Good" },
                          { value: "moderate", label: "Fair" },
                          { value: "poor", label: "Poor" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setHealthCondition(option.value)}
                            className={`p-2 rounded-lg text-sm font-medium transition-all ${
                              healthCondition === option.value
                                ? "bg-gold text-navy"
                                : "bg-pearl text-navy/60 hover:bg-pearl/80"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-navy/40 mt-2">
                        Health conditions may qualify you for enhanced rates
                      </p>
                    </div>

                    <label className="flex items-center gap-3 p-3 bg-pearl rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSmoker}
                        onChange={(e) => setIsSmoker(e.target.checked)}
                        className="w-4 h-4 rounded border-navy/20 text-gold focus:ring-gold"
                      />
                      <span className="text-navy/70 text-sm">I am a smoker (may enhance rates)</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Property Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Property Value</label>
                        <span className="text-gold font-bold">{formatCurrency(propertyValue)}</span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={2000000}
                        step={10000}
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                      />
                      <div className="flex justify-between text-xs text-navy/40 mt-1">
                        <span>£100k</span>
                        <span>£2m</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Outstanding Mortgage</label>
                        <span className="text-navy font-semibold">{formatCurrency(outstandingMortgage)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={propertyValue * 0.5}
                        step={1000}
                        value={outstandingMortgage}
                        onChange={(e) => setOutstandingMortgage(Number(e.target.value))}
                        className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                      />
                      <p className="text-xs text-navy/40 mt-1">This will be paid off from your release</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plan Options */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Plan Options
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPlanType("lumpsum")}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          planType === "lumpsum"
                            ? "bg-gold/10 border-gold text-navy"
                            : "bg-pearl border-navy/10 text-navy/60 hover:border-gold/30"
                        }`}
                      >
                        <p className="font-semibold">Lump Sum</p>
                        <p className="text-xs mt-1 opacity-60">Take full amount</p>
                      </button>
                      <button
                        onClick={() => setPlanType("drawdown")}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          planType === "drawdown"
                            ? "bg-gold/10 border-gold text-navy"
                            : "bg-pearl border-navy/10 text-navy/60 hover:border-gold/30"
                        }`}
                      >
                        <p className="font-semibold">Drawdown</p>
                        <p className="text-xs mt-1 opacity-60">Take as needed</p>
                      </button>
                    </div>

                    {planType === "drawdown" && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-navy/70 text-sm font-medium">Initial Drawdown</label>
                          <span className="text-gold font-bold">{formatCurrency(initialDrawdown)}</span>
                        </div>
                        <input
                          type="range"
                          min={10000}
                          max={calculations.netRelease}
                          step={5000}
                          value={Math.min(initialDrawdown, calculations.netRelease)}
                          onChange={(e) => setInitialDrawdown(Number(e.target.value))}
                          className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-navy/70 text-sm font-medium">Interest Rate (for illustration)</label>
                        <span className="text-navy font-semibold">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={9}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2.5 md:h-2 bg-pearl rounded-lg cursor-pointer touch-none"
                      />
                      <p className="text-xs text-navy/40 mt-1">Current rates typically 5.5% - 7.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main Result */}
              <Card className="bg-navy border-none shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="grid sm:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-white/50 text-sm mb-1">Maximum LTV</p>
                      <p className="text-3xl font-bold text-white">{calculations.baseLTV}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-sm mb-1">Gross Release</p>
                      <p className="text-3xl font-bold text-white">{formatCurrency(calculations.grossRelease)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-sm mb-1">Net to You</p>
                      <p className="text-3xl font-bold text-gold">{formatCurrency(calculations.netRelease)}</p>
                    </div>
                  </div>

                  {outstandingMortgage > 0 && (
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-white/70 text-sm">
                        {formatCurrency(outstandingMortgage)} will be used to clear your existing mortgage
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Year by Year Projection */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-4">
                    Interest Projection Over Time
                  </h3>
                  <p className="text-navy/60 text-sm mb-6">
                    See how the loan balance grows with compound interest at {interestRate}% per year
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-navy/10">
                          <th className="text-left py-3 px-2 text-navy/50 font-medium">Year</th>
                          <th className="text-left py-3 px-2 text-navy/50 font-medium">Your Age</th>
                          <th className="text-right py-3 px-2 text-navy/50 font-medium">Loan Balance</th>
                          <th className="text-right py-3 px-2 text-navy/50 font-medium">Interest Added</th>
                          <th className="text-right py-3 px-2 text-navy/50 font-medium">Property Value*</th>
                          <th className="text-right py-3 px-2 text-navy/50 font-medium">Remaining Equity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.projections.map((row, index) => (
                          <tr key={row.year} className={index % 2 === 0 ? "bg-pearl/30" : ""}>
                            <td className="py-3 px-2 font-medium text-navy">{row.year}</td>
                            <td className="py-3 px-2 text-navy/70">{row.age}</td>
                            <td className="py-3 px-2 text-right font-semibold text-navy">{formatCurrency(row.balance)}</td>
                            <td className="py-3 px-2 text-right text-red-600">
                              {row.interestAccrued > 0 ? `+${formatCurrency(row.interestAccrued)}` : "-"}
                            </td>
                            <td className="py-3 px-2 text-right text-navy/70">{formatCurrency(row.propertyValue)}</td>
                            <td className={`py-3 px-2 text-right font-semibold ${row.equity >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {formatCurrency(row.equity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-navy/40 mt-4">
                    *Property value assumes 3% annual growth. Actual values may vary.
                  </p>
                </CardContent>
              </Card>

              {/* Key Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-navy mb-2">No Monthly Repayments</h4>
                    <p className="text-navy/60 text-sm">
                      With a lifetime mortgage, you don't make monthly payments. The interest compounds and is repaid when the property is sold.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-navy/5 rounded-xl">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-navy mb-2">If This Were a Repayment Mortgage</h4>
                    <p className="text-navy/60 text-sm">
                      Monthly payment would be approximately <span className="font-bold text-gold">{formatCurrency(calculations.monthlyEquivalent)}</span> over 25 years
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <Card className="bg-navy border-none rounded-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Get Your Personalised Illustration
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Speak to our equity release specialists for an accurate quote
                  </p>
                  <Link href="/equity-release#enquiry">
                    <motion.button
                      className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Free Consultation
                    </motion.button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-navy/40 text-center mt-8 max-w-3xl mx-auto">
            This calculator provides estimates only and should not be considered financial advice.
            Actual rates and amounts will depend on individual circumstances and lender criteria.
            Equity release will reduce the value of your estate and may affect your entitlement to state benefits.
          </p>
        </div>
      </main>

      <Footer />

      {/* Slider styles now handled globally in globals.css for better mobile support */}
    </div>
  );
}
