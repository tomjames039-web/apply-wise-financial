"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export default function BTLYieldCalculatorPage() {
  // Property Inputs
  const [propertyValue, setPropertyValue] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(1200);
  const [deposit, setDeposit] = useState(62500);

  // Running Costs (Annual)
  const [mortgagePayment, setMortgagePayment] = useState(800);
  const [managementFees, setManagementFees] = useState(120);
  const [insurance, setInsurance] = useState(30);
  const [maintenance, setMaintenance] = useState(100);
  const [voidPeriod, setVoidPeriod] = useState(1); // Weeks per year

  // Calculations
  const calculations = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const voidCost = (annualRent / 52) * voidPeriod;
    const effectiveRent = annualRent - voidCost;

    // Gross Yield = (Annual Rent / Property Value) * 100
    const grossYield = (annualRent / propertyValue) * 100;

    // Annual Costs
    const annualMortgage = mortgagePayment * 12;
    const annualManagement = managementFees * 12;
    const annualInsurance = insurance * 12;
    const annualMaintenance = maintenance * 12;
    const totalAnnualCosts = annualMortgage + annualManagement + annualInsurance + annualMaintenance;

    // Net Profit
    const netProfit = effectiveRent - totalAnnualCosts;

    // Net Yield = (Net Profit / Property Value) * 100
    const netYield = (netProfit / propertyValue) * 100;

    // ROI on Deposit = (Net Profit / Deposit) * 100
    const roiOnDeposit = deposit > 0 ? (netProfit / deposit) * 100 : 0;

    // Monthly Cash Flow
    const monthlyCashFlow = netProfit / 12;

    // Rental Coverage Ratio (for lender stress test)
    const rentalCoverage = mortgagePayment > 0 ? (monthlyRent / mortgagePayment) * 100 : 0;

    // LTV
    const ltv = ((propertyValue - deposit) / propertyValue) * 100;

    return {
      annualRent,
      effectiveRent: effectiveRent.toFixed(0),
      grossYield: grossYield.toFixed(2),
      netYield: netYield.toFixed(2),
      netProfit: netProfit.toFixed(0),
      roiOnDeposit: roiOnDeposit.toFixed(1),
      monthlyCashFlow: monthlyCashFlow.toFixed(0),
      totalAnnualCosts: totalAnnualCosts.toFixed(0),
      rentalCoverage: rentalCoverage.toFixed(0),
      ltv: ltv.toFixed(0),
      loanAmount: propertyValue - deposit,
    };
  }, [propertyValue, monthlyRent, deposit, mortgagePayment, managementFees, insurance, maintenance, voidPeriod]);

  const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Mobile-friendly slider component
  const Slider = ({
    value,
    min,
    max,
    step,
    onChange,
  }: {
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
      e.preventDefault();
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
        className="relative h-14 md:h-10 flex items-center cursor-pointer touch-none select-none py-2"
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
          className="absolute w-10 h-10 md:w-7 md:h-7 bg-gold rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 transition-transform active:scale-110 hover:scale-105"
          style={{ left: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-10">
              <Link href="/calculator" className="text-gold text-sm hover:underline mb-4 inline-block">
                ← Back to Calculators
              </Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-4">
                Buy-to-Let Yield Calculator
              </h1>
              <p className="text-navy/60 max-w-2xl mx-auto">
                Calculate your rental yield, ROI, and monthly cash flow to assess the profitability of your buy-to-let investment
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Property Details */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Property Details
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Property Value</label>
                        <span className="text-gold font-bold">{formatCurrency(propertyValue)}</span>
                      </div>
                      <Slider min={50000} max={2000000} step={5000} value={propertyValue} onChange={setPropertyValue} />
                      <div className="flex justify-between text-xs text-navy/40 mt-1">
                        <span>£50k</span>
                        <span>£2m</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Your Deposit</label>
                        <span className="text-gold font-bold">{formatCurrency(deposit)}</span>
                      </div>
                      <Slider min={propertyValue * 0.15} max={propertyValue * 0.75} step={5000} value={Math.min(deposit, propertyValue * 0.75)} onChange={setDeposit} />
                      <div className="flex justify-between text-xs text-navy/40 mt-1">
                        <span>15% ({formatCurrency(propertyValue * 0.15)})</span>
                        <span>75%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Monthly Rent</label>
                        <span className="text-gold font-bold">{formatCurrency(monthlyRent)}</span>
                      </div>
                      <Slider min={300} max={5000} step={25} value={monthlyRent} onChange={setMonthlyRent} />
                      <div className="flex justify-between text-xs text-navy/40 mt-1">
                        <span>£300</span>
                        <span>£5,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Running Costs */}
              <Card className="bg-white border border-navy/5 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Monthly Running Costs
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Mortgage Payment</label>
                        <span className="text-navy font-semibold">{formatCurrency(mortgagePayment)}/mo</span>
                      </div>
                      <Slider min={0} max={3000} step={25} value={mortgagePayment} onChange={setMortgagePayment} />
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Management Fees</label>
                        <span className="text-navy font-semibold">{formatCurrency(managementFees)}/mo</span>
                      </div>
                      <Slider min={0} max={500} step={10} value={managementFees} onChange={setManagementFees} />
                      <p className="text-xs text-navy/40 mt-1">Typically 8-12% of monthly rent</p>
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Insurance</label>
                        <span className="text-navy font-semibold">{formatCurrency(insurance)}/mo</span>
                      </div>
                      <Slider min={0} max={200} step={5} value={insurance} onChange={setInsurance} />
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Maintenance Budget</label>
                        <span className="text-navy font-semibold">{formatCurrency(maintenance)}/mo</span>
                      </div>
                      <Slider min={0} max={500} step={10} value={maintenance} onChange={setMaintenance} />
                      <p className="text-xs text-navy/40 mt-1">Recommended: 1% of property value per year</p>
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left gap-1">
                        <label className="text-navy/70 text-sm font-medium">Expected Void Period</label>
                        <span className="text-navy font-semibold">{voidPeriod} weeks/year</span>
                      </div>
                      <Slider min={0} max={8} step={1} value={voidPeriod} onChange={setVoidPeriod} />
                      <p className="text-xs text-navy/40 mt-1">Time between tenancies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Main Results */}
              <Card className="bg-navy border-none shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-white/50 text-sm mb-1">Gross Yield</p>
                      <motion.p
                        key={calculations.grossYield}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-4xl font-bold text-gold"
                      >
                        {calculations.grossYield}%
                      </motion.p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-sm mb-1">Net Yield</p>
                      <motion.p
                        key={calculations.netYield}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className={`text-4xl font-bold ${Number(calculations.netYield) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {calculations.netYield}%
                      </motion.p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/70">Annual Rental Income</span>
                      <span className="text-white font-semibold">{formatCurrency(calculations.annualRent)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/70">Effective Rent (after voids)</span>
                      <span className="text-white font-semibold">{formatCurrency(calculations.effectiveRent)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/70">Total Annual Costs</span>
                      <span className="text-red-400 font-semibold">-{formatCurrency(calculations.totalAnnualCosts)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-white font-medium">Net Annual Profit</span>
                      <span className={`text-xl font-bold ${Number(calculations.netProfit) >= 0 ? 'text-gold' : 'text-red-400'}`}>
                        {formatCurrency(calculations.netProfit)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                  <CardContent className="p-5 text-center">
                    <p className="text-navy/50 text-sm mb-1">Monthly Cash Flow</p>
                    <p className={`text-2xl font-bold ${Number(calculations.monthlyCashFlow) >= 0 ? 'text-navy' : 'text-red-500'}`}>
                      {formatCurrency(calculations.monthlyCashFlow)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                  <CardContent className="p-5 text-center">
                    <p className="text-navy/50 text-sm mb-1">ROI on Deposit</p>
                    <p className={`text-2xl font-bold ${Number(calculations.roiOnDeposit) >= 0 ? 'text-gold' : 'text-red-500'}`}>
                      {calculations.roiOnDeposit}%
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                  <CardContent className="p-5 text-center">
                    <p className="text-navy/50 text-sm mb-1">Rental Coverage</p>
                    <p className={`text-2xl font-bold ${Number(calculations.rentalCoverage) >= 125 ? 'text-green-600' : 'text-amber-500'}`}>
                      {calculations.rentalCoverage}%
                    </p>
                    <p className="text-xs text-navy/40 mt-1">Lenders require 125%+</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                  <CardContent className="p-5 text-center">
                    <p className="text-navy/50 text-sm mb-1">LTV</p>
                    <p className="text-2xl font-bold text-navy">{calculations.ltv}%</p>
                    <p className="text-xs text-navy/40 mt-1">Loan: {formatCurrency(calculations.loanAmount)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Yield Guide */}
              <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy mb-4">Yield Guide</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <span className="text-navy/70">Below 4% - Generally poor return</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-amber-400 rounded-full" />
                      <span className="text-navy/70">4-6% - Average for most areas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <span className="text-navy/70">6%+ - Good rental yield</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-white border border-navy/5 shadow-md rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy mb-2">Ready to invest?</h3>
                  <p className="text-navy/60 text-sm mb-4">
                    Speak to our BTL mortgage experts to find the best deal for your investment.
                  </p>
                  <Link href="/buy-to-let">
                    <motion.button
                      className="w-full py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-deep transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get BTL Mortgage Advice
                    </motion.button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-navy/40 text-center mt-8 max-w-2xl mx-auto">
            This calculator provides estimates only and should not be considered financial advice.
            Actual yields and returns may vary. Tax implications are not included in these calculations.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
