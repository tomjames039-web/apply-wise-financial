"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

// Types
interface FormData {
  scenario: string;
  hasMortgage: string;
  mortgageBalance: string;
  hasDependents: string;
  monthlyIncome: string;
  sickPayDuration: string;
  savingsDuration: string;
  age: string;
  smoker: string;
  firstName: string;
  email: string;
  phone: string;
  consentContact: boolean;
  consentMarketing: boolean;
}

interface PricingResult {
  lifeMin: number;
  lifeMax: number;
  criticalMin: number;
  criticalMax: number;
  incomeMin: number;
  incomeMax: number;
  totalMin: number;
  totalMax: number;
}

interface RiskFlags {
  mortgageRisk: boolean;
  familyRisk: boolean;
  incomeRisk: boolean;
}

// Protection product data
const protectionProducts = [
  {
    id: "life-insurance",
    title: "Life Insurance",
    shortDesc: "Protect your family's financial future",
    description: "Life insurance provides a tax-free lump sum to your loved ones if you pass away. It covers mortgages, debts, and helps maintain your family's lifestyle.",
    monthlyFrom: "£5",
    whoNeeds: [
      "Anyone with a mortgage",
      "Parents with dependent children",
      "Main income earners",
      "Business owners",
      "Anyone with debts",
    ],
    benefits: [
      "Tax-free lump sum payment",
      "Can avoid inheritance tax via trust",
      "Level or decreasing cover options",
      "Joint policies for couples",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "critical-illness",
    title: "Critical Illness Cover",
    shortDesc: "Financial support when you need it most",
    description: "Pays a tax-free lump sum if you're diagnosed with a serious illness like cancer, heart attack, or stroke. Use it however you need.",
    monthlyFrom: "£12",
    whoNeeds: [
      "Those without savings",
      "Self-employed without sick pay",
      "Primary earners",
      "Anyone with a mortgage",
      "Family history of illness",
    ],
    benefits: [
      "Covers 40+ serious conditions",
      "Pays regardless of work ability",
      "Can combine with life cover",
      "Children's cover often free",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: "income-protection",
    title: "Income Protection",
    shortDesc: "Replace your salary if you can't work",
    description: "Pays a monthly income if you're unable to work due to illness or injury. Typically covers up to 60% of salary until you recover or retire.",
    monthlyFrom: "£15",
    whoNeeds: [
      "Self-employed with no sick pay",
      "Limited company sick pay",
      "Those on statutory sick pay only",
      "Ongoing financial commitments",
      "Main household earners",
    ],
    benefits: [
      "Pays monthly like a salary",
      "Covers any illness or injury",
      "Can pay until retirement",
      "Tax-deductible for self-employed",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// A/B Test Headline Variations
const headlineVariations = [
  {
    id: "A",
    headline: "Find Out What Protection You Need",
    highlight: "in 60 Seconds",
    subheadline: "Answer a few quick questions and see where you're financially exposed — no jargon, no pressure.",
  },
  {
    id: "B",
    headline: "Are You Financially Exposed?",
    highlight: "Find Out in 60 Seconds",
    subheadline: "Take our quick protection check and discover what cover could cost you — completely free.",
  },
  {
    id: "C",
    headline: "What Would Happen to Your Family",
    highlight: "If You Couldn't Work?",
    subheadline: "Get a personalised protection estimate in under a minute. No obligation, no hard sell.",
  },
];

// Protection Calculator Component
function ProtectionCalculator() {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(3500);
  const [mortgage, setMortgage] = useState(250000);
  const [isSmoker, setIsSmoker] = useState(false);
  const [coverType, setCoverType] = useState<"all" | "life" | "critical" | "income">("all");

  const calculateEstimate = () => {
    // Base rates per £100k cover
    const lifeBase = age < 35 ? 8 : age < 50 ? 18 : 40;
    const criticalBase = age < 35 ? 25 : age < 50 ? 55 : 120;
    const incomeBase = income * 0.02;

    // Mortgage factor
    const coverAmount = Math.max(100000, mortgage + (income * 12 * 10));
    const coverMultiplier = Math.min(coverAmount / 100000, 4);

    // Calculate per product
    const lifeMin = Math.round(lifeBase * coverMultiplier * (isSmoker ? 1.5 : 1));
    const lifeMax = Math.round(lifeMin * 1.5);

    const criticalMin = Math.round(criticalBase * coverMultiplier * (isSmoker ? 1.5 : 1));
    const criticalMax = Math.round(criticalMin * 1.5);

    const incomeMin = Math.round(incomeBase * (isSmoker ? 1.3 : 1));
    const incomeMax = Math.round(incomeMin * 1.8);

    return {
      life: { min: lifeMin, max: lifeMax },
      critical: { min: criticalMin, max: criticalMax },
      income: { min: incomeMin, max: incomeMax },
      total: {
        min: coverType === "all" ? lifeMin + criticalMin + incomeMin :
             coverType === "life" ? lifeMin :
             coverType === "critical" ? criticalMin : incomeMin,
        max: coverType === "all" ? lifeMax + criticalMax + incomeMax :
             coverType === "life" ? lifeMax :
             coverType === "critical" ? criticalMax : incomeMax,
      }
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-navy/5">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Age Slider */}
        <div>
          <label className="block text-navy font-medium text-sm mb-2">Your Age: <span className="text-gold">{age}</span></label>
          <input
            type="range"
            min="18"
            max="65"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-navy/50 mt-1">
            <span>18</span>
            <span>65</span>
          </div>
        </div>

        {/* Income Slider */}
        <div>
          <label className="block text-navy font-medium text-sm mb-2">Monthly Income: <span className="text-gold">£{income.toLocaleString()}</span></label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-navy/50 mt-1">
            <span>£1,000</span>
            <span>£10,000</span>
          </div>
        </div>

        {/* Mortgage Slider */}
        <div>
          <label className="block text-navy font-medium text-sm mb-2">Mortgage Balance: <span className="text-gold">£{mortgage.toLocaleString()}</span></label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={mortgage}
            onChange={(e) => setMortgage(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-navy/50 mt-1">
            <span>£0</span>
            <span>£1M</span>
          </div>
        </div>

        {/* Smoker Toggle */}
        <div>
          <label className="block text-navy font-medium text-sm mb-3">Do you smoke?</label>
          <div className="flex gap-3">
            <button
              onClick={() => setIsSmoker(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isSmoker ? 'bg-gold text-navy' : 'bg-pearl text-navy/70 hover:bg-pearl/80'}`}
            >
              No
            </button>
            <button
              onClick={() => setIsSmoker(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isSmoker ? 'bg-gold text-navy' : 'bg-pearl text-navy/70 hover:bg-pearl/80'}`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      {/* Cover Type Selector */}
      <div className="mb-6">
        <label className="block text-navy font-medium text-sm mb-3">Cover Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: "all" as const, label: "All Cover" },
            { id: "life" as const, label: "Life Only" },
            { id: "critical" as const, label: "Critical Illness" },
            { id: "income" as const, label: "Income Protection" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setCoverType(type.id)}
              className={`py-2 px-3 rounded-lg text-xs md:text-sm font-medium transition-all ${coverType === type.id ? 'bg-navy text-white' : 'bg-pearl text-navy/70 hover:bg-navy/10'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-xl p-5 text-center">
        <p className="text-navy/60 text-xs uppercase tracking-wider mb-1">Estimated Monthly Cost</p>
        <p className="text-3xl md:text-4xl font-bold text-gold mb-1">
          £{estimate.total.min} – £{estimate.total.max}
        </p>
        <p className="text-navy/50 text-xs">per month</p>

        {coverType === "all" && (
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gold/20">
            <div>
              <p className="text-navy/60 text-xs">Life</p>
              <p className="text-navy font-semibold text-sm">£{estimate.life.min}-{estimate.life.max}</p>
            </div>
            <div>
              <p className="text-navy/60 text-xs">Critical</p>
              <p className="text-navy font-semibold text-sm">£{estimate.critical.min}-{estimate.critical.max}</p>
            </div>
            <div>
              <p className="text-navy/60 text-xs">Income</p>
              <p className="text-navy font-semibold text-sm">£{estimate.income.min}-{estimate.income.max}</p>
            </div>
          </div>
        )}
      </div>

      <p className="text-navy/40 text-xs text-center mt-4">
        *Estimates only. Actual premiums depend on health and other factors.
      </p>
    </div>
  );
}

// Initial form state
const initialFormData: FormData = {
  scenario: "",
  hasMortgage: "",
  mortgageBalance: "",
  hasDependents: "",
  monthlyIncome: "",
  sickPayDuration: "",
  savingsDuration: "",
  age: "",
  smoker: "",
  firstName: "",
  email: "",
  phone: "",
  consentContact: false,
  consentMarketing: false,
};

// Tracking helper
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, data);
  }
  console.log(`[TRACK] ${eventName}`, data);
};

// Get or set A/B test variant
const getABVariant = (): typeof headlineVariations[0] => {
  if (typeof window === "undefined") return headlineVariations[0];

  const stored = localStorage.getItem("protection_ab_variant");
  if (stored) {
    const variant = headlineVariations.find(v => v.id === stored);
    if (variant) return variant;
  }

  const randomIndex = Math.floor(Math.random() * headlineVariations.length);
  const variant = headlineVariations[randomIndex];
  localStorage.setItem("protection_ab_variant", variant.id);
  trackEvent("ab_variant_assigned", { variant: variant.id });

  return variant;
};

export default function ProtectionPage() {
  const router = useRouter();
  const [showFunnel, setShowFunnel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [riskFlags, setRiskFlags] = useState<RiskFlags>({ mortgageRisk: false, familyRisk: false, incomeRisk: false });
  const [abVariant, setAbVariant] = useState(headlineVariations[0]);

  const totalSteps = 9;

  useEffect(() => {
    storeTrackingData();
    setAbVariant(getABVariant());
  }, []);

  // Calculate pricing
  const calculatePricing = useCallback((): PricingResult => {
    const age = parseInt(formData.age) || 35;
    const monthlyIncome = parseFloat(formData.monthlyIncome) || 3000;
    const mortgageBalance = parseFloat(formData.mortgageBalance) || 0;
    const isSmoker = formData.smoker === "yes";
    const lowSickPay = formData.sickPayDuration === "less-than-1" || formData.sickPayDuration === "1-3";
    const hasDependents = formData.hasDependents === "yes";
    const hasMortgage = formData.hasMortgage === "yes" && mortgageBalance > 0;

    let lifeBaseMin = 5, lifeBaseMax = 10;
    if (age >= 35 && age < 50) { lifeBaseMin = 10; lifeBaseMax = 20; }
    else if (age >= 50) { lifeBaseMin = 20; lifeBaseMax = 40; }

    const coverAmount = Math.max(100000, mortgageBalance + (monthlyIncome * 12 * 10));
    const coverMultiplier = coverAmount / 100000;

    let lifeMin = lifeBaseMin * Math.min(coverMultiplier, 3);
    let lifeMax = lifeBaseMax * Math.min(coverMultiplier, 3);
    let criticalMin = lifeMin * 2, criticalMax = lifeMax * 3;
    let incomeMin = monthlyIncome * 0.01, incomeMax = monthlyIncome * 0.03;

    if (isSmoker) { lifeMin *= 1.5; lifeMax *= 1.5; criticalMin *= 1.5; criticalMax *= 1.5; incomeMin *= 1.3; incomeMax *= 1.3; }
    if (lowSickPay) { incomeMin *= 1.2; incomeMax *= 1.3; }
    if (hasDependents) { lifeMin *= 1.2; lifeMax *= 1.2; criticalMin *= 1.1; criticalMax *= 1.1; }
    if (hasMortgage) { lifeMin *= 1.1; lifeMax *= 1.1; }

    return {
      lifeMin: Math.round(lifeMin), lifeMax: Math.round(lifeMax),
      criticalMin: Math.round(criticalMin), criticalMax: Math.round(criticalMax),
      incomeMin: Math.round(incomeMin), incomeMax: Math.round(incomeMax),
      totalMin: Math.round(lifeMin + criticalMin + incomeMin),
      totalMax: Math.round(lifeMax + criticalMax + incomeMax),
    };
  }, [formData]);

  const calculateRiskFlags = useCallback((): RiskFlags => ({
    mortgageRisk: formData.hasMortgage === "yes" && parseFloat(formData.mortgageBalance) > 0,
    familyRisk: formData.hasDependents === "yes",
    incomeRisk: (formData.sickPayDuration === "less-than-1" || formData.sickPayDuration === "1-3") || (formData.savingsDuration === "less-than-3"),
  }), [formData]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      trackEvent("step_complete", { step: currentStep + 1, variant: abVariant.id });
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleSubmit = async () => {
    if (!formData.consentContact) return;
    setIsSubmitting(true);
    const calculatedPricing = calculatePricing();
    const calculatedRiskFlags = calculateRiskFlags();
    setPricing(calculatedPricing);
    setRiskFlags(calculatedRiskFlags);

    const tracking = getStoredTrackingData();
    const webhookPayload = {
      firstName: formData.firstName, email: formData.email, phone: formData.phone,
      scenario: formData.scenario,
      mortgage: formData.hasMortgage === "yes" ? formData.mortgageBalance : "0",
      dependents: formData.hasDependents, income: formData.monthlyIncome,
      sickPay: formData.sickPayDuration, savings: formData.savingsDuration,
      age: formData.age, smoker: formData.smoker,
      estimatedRange: `£${calculatedPricing.totalMin} - £${calculatedPricing.totalMax}`,
      riskFlags: Object.entries(calculatedRiskFlags).filter(([, v]) => v).map(([k]) => k),
      abVariant: abVariant.id, ...tracking,
    };

    try {
      const response = await fetch("/api/protection-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.firstName, protectionType: "Protection Funnel", message: JSON.stringify(webhookPayload), ...webhookPayload }),
      });
      if (response.ok) {
        trackEvent("funnel_complete", { ...webhookPayload, variant: abVariant.id });
        setShowResults(true);
        trackEvent("results_view", { variant: abVariant.id });
      }
    } catch (error) { console.error("Error:", error); }
    finally { setIsSubmitting(false); }
  };

  const startFunnel = () => {
    trackEvent("funnel_start", { variant: abVariant.id });
    setShowFunnel(true);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookCall = () => {
    trackEvent("book_click", { variant: abVariant.id });
    router.push("/protection/thank-you");
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Render funnel step
  const renderStep = () => {
    const steps: Record<number, JSX.Element> = {
      1: (
        <StepContainer title="What best describes your situation?">
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: "mortgage", label: "I have a mortgage" },
              { value: "family", label: "Family / dependents rely on me" },
              { value: "self-employed", label: "I'm self-employed" },
              { value: "landlord", label: "I'm a landlord" },
              { value: "exploring", label: "Just exploring options" },
            ].map((opt) => (
              <OptionButton key={opt.value} selected={formData.scenario === opt.value} onClick={() => { updateField("scenario", opt.value); setTimeout(nextStep, 300); }}>
                {opt.label}
              </OptionButton>
            ))}
          </div>
        </StepContainer>
      ),
      2: (
        <StepContainer title="Do you have a mortgage?">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <OptionButton selected={formData.hasMortgage === "yes"} onClick={() => updateField("hasMortgage", "yes")}>Yes</OptionButton>
            <OptionButton selected={formData.hasMortgage === "no"} onClick={() => { updateField("hasMortgage", "no"); updateField("mortgageBalance", "0"); setTimeout(nextStep, 300); }}>No</OptionButton>
          </div>
          {formData.hasMortgage === "yes" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
              <label className="block text-navy/70 text-sm text-center">Approximate balance (£)</label>
              <input type="number" placeholder="e.g. 250000" value={formData.mortgageBalance} onChange={(e) => updateField("mortgageBalance", e.target.value)}
                className="w-full px-4 py-4 bg-white border border-navy/10 rounded-xl text-navy text-center placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none text-lg" />
              <button onClick={nextStep} disabled={!formData.mortgageBalance} className="w-full mt-4 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all disabled:opacity-30">Continue</button>
            </motion.div>
          )}
        </StepContainer>
      ),
      3: (
        <StepContainer title="Does anyone rely on your income?">
          <p className="text-navy/50 text-sm mb-6 text-center">Partner, children, or other dependents</p>
          <div className="grid grid-cols-2 gap-4">
            <OptionButton selected={formData.hasDependents === "yes"} onClick={() => { updateField("hasDependents", "yes"); setTimeout(nextStep, 300); }}>Yes</OptionButton>
            <OptionButton selected={formData.hasDependents === "no"} onClick={() => { updateField("hasDependents", "no"); setTimeout(nextStep, 300); }}>No</OptionButton>
          </div>
        </StepContainer>
      ),
      4: (
        <StepContainer title="What is your monthly income?">
          <p className="text-navy/50 text-sm mb-6 text-center">Before tax (gross)</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/50 text-lg">£</span>
            <input type="number" placeholder="e.g. 3500" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)}
              className="w-full px-4 pl-10 py-4 bg-white border border-navy/10 rounded-xl text-navy text-center placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none text-lg" />
          </div>
          <button onClick={nextStep} disabled={!formData.monthlyIncome} className="w-full mt-6 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all disabled:opacity-30">Continue</button>
        </StepContainer>
      ),
      5: (
        <StepContainer title="How long would your income last if you couldn't work?">
          <p className="text-navy/50 text-sm mb-6 text-center">Including employer sick pay</p>
          <div className="grid grid-cols-1 gap-3">
            {[{ value: "less-than-1", label: "Less than 1 month" }, { value: "1-3", label: "1–3 months" }, { value: "3-6", label: "3–6 months" }, { value: "6-plus", label: "6+ months" }].map((opt) => (
              <OptionButton key={opt.value} selected={formData.sickPayDuration === opt.value} onClick={() => { updateField("sickPayDuration", opt.value); setTimeout(nextStep, 300); }}>{opt.label}</OptionButton>
            ))}
          </div>
        </StepContainer>
      ),
      6: (
        <StepContainer title="How long could your savings cover expenses?">
          <div className="grid grid-cols-1 gap-3">
            {[{ value: "less-than-3", label: "Less than 3 months" }, { value: "3-6", label: "3–6 months" }, { value: "6-plus", label: "6+ months" }].map((opt) => (
              <OptionButton key={opt.value} selected={formData.savingsDuration === opt.value} onClick={() => { updateField("savingsDuration", opt.value); setTimeout(nextStep, 300); }}>{opt.label}</OptionButton>
            ))}
          </div>
        </StepContainer>
      ),
      7: (
        <StepContainer title="What is your age?">
          <input type="number" placeholder="e.g. 35" min="18" max="70" value={formData.age} onChange={(e) => updateField("age", e.target.value)}
            className="w-full px-4 py-4 bg-white border border-navy/10 rounded-xl text-navy placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none text-2xl text-center" />
          <button onClick={nextStep} disabled={!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 70} className="w-full mt-6 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all disabled:opacity-30">Continue</button>
        </StepContainer>
      ),
      8: (
        <StepContainer title="Do you smoke or vape?">
          <p className="text-navy/50 text-sm mb-6 text-center">Including e-cigarettes</p>
          <div className="grid grid-cols-2 gap-4">
            <OptionButton selected={formData.smoker === "yes"} onClick={() => { updateField("smoker", "yes"); setTimeout(nextStep, 300); }}>Yes</OptionButton>
            <OptionButton selected={formData.smoker === "no"} onClick={() => { updateField("smoker", "no"); setTimeout(nextStep, 300); }}>No</OptionButton>
          </div>
        </StepContainer>
      ),
      9: (
        <StepContainer title="Almost there!">
          <p className="text-navy/50 text-sm mb-6 text-center">Enter your details for your estimate</p>
          <div className="space-y-4">
            <div>
              <label className="block text-navy/70 text-sm mb-2 text-center">First name</label>
              <input type="text" placeholder="John" value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="w-full px-4 py-4 bg-white border border-navy/10 rounded-xl text-navy text-center placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none" />
            </div>
            <div>
              <label className="block text-navy/70 text-sm mb-2 text-center">Email</label>
              <input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-4 bg-white border border-navy/10 rounded-xl text-navy text-center placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none" />
            </div>
            <div>
              <label className="block text-navy/70 text-sm mb-2 text-center">Phone</label>
              <input type="tel" placeholder="07123 456789" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-4 bg-white border border-navy/10 rounded-xl text-navy text-center placeholder-navy/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none" />
            </div>
            <div className="pt-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.consentContact} onChange={(e) => updateField("consentContact", e.target.checked)} className="mt-1 w-5 h-5 rounded border-navy/20 bg-white text-gold focus:ring-gold/20" />
                <span className="text-navy/70 text-sm">I agree to be contacted <span className="text-gold">*</span></span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.consentMarketing} onChange={(e) => updateField("consentMarketing", e.target.checked)} className="mt-1 w-5 h-5 rounded border-navy/20 bg-white text-gold focus:ring-gold/20" />
                <span className="text-navy/70 text-sm">Send me tips and updates</span>
              </label>
            </div>
            <button onClick={handleSubmit} disabled={!formData.firstName || !formData.email || !formData.phone || !formData.consentContact || isSubmitting}
              className="w-full mt-4 py-4 bg-gold text-navy font-bold text-lg rounded-xl hover:bg-gold/90 transition-all disabled:opacity-30 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Calculating...</>
              ) : (
                <>See My Estimate<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></>
              )}
            </button>
          </div>
        </StepContainer>
      ),
    };
    return steps[currentStep] || null;
  };

  // RESULTS PAGE
  if (showResults && pricing) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-pearl">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md md:max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-600 text-xs font-medium mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Analysis Complete
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-navy mb-2 px-2">
                  Here's what protection could cost you:
                </h1>
              </div>

              {/* Main Estimate */}
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-6 md:p-8 mb-6 text-center">
                <p className="text-navy/60 text-xs uppercase tracking-wider mb-2">Estimated Monthly Cost</p>
                <p className="text-3xl md:text-4xl font-bold text-gold">
                  £{pricing.totalMin} – £{pricing.totalMax}
                </p>
                <p className="text-navy/50 text-xs mt-2">per month for comprehensive cover</p>
              </div>

              {/* Breakdown */}
              <div className="bg-white border border-navy/10 rounded-2xl p-4 md:p-6 mb-6 shadow-sm">
                <h2 className="text-base font-semibold text-navy mb-4 text-center">Breakdown</h2>
                <div className="space-y-3">
                  {[
                    { label: "Life Insurance", min: pricing.lifeMin, max: pricing.lifeMax },
                    { label: "Critical Illness", min: pricing.criticalMin, max: pricing.criticalMax },
                    { label: "Income Protection", min: pricing.incomeMin, max: pricing.incomeMax },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-navy/5 last:border-0">
                      <span className="text-navy text-sm">{item.label}</span>
                      <span className="text-navy font-semibold text-sm">£{item.min}–£{item.max}/mo</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Areas */}
              {(riskFlags.mortgageRisk || riskFlags.familyRisk || riskFlags.incomeRisk) && (
                <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 md:p-6 mb-6">
                  <h2 className="text-base font-semibold text-navy mb-3 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Your Priority Areas
                  </h2>
                  <div className="space-y-2 text-navy/80 text-sm">
                    {riskFlags.mortgageRisk && <p className="flex items-start gap-2"><svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Mortgage protection recommended</p>}
                    {riskFlags.familyRisk && <p className="flex items-start gap-2"><svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Family income protection recommended</p>}
                    {riskFlags.incomeRisk && <p className="flex items-start gap-2"><svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Income replacement cover recommended</p>}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3 mb-6">
                <button onClick={handleBookCall} className="block w-full py-4 bg-gold text-navy font-bold text-center rounded-xl hover:bg-gold/90 transition-all shadow-lg shadow-gold/20">
                  Book Free Protection Review
                </button>
                <a href="tel:01992535555" onClick={() => trackEvent("callback_click", { variant: abVariant.id })} className="block w-full py-3 bg-navy text-white font-semibold text-center rounded-xl hover:bg-navy/90 transition-all text-sm">
                  Call Us: 01992 535 555
                </a>
              </div>

              {/* Compliance */}
              <div className="bg-navy/5 border border-navy/10 rounded-xl p-4">
                <p className="text-navy/50 text-xs leading-relaxed text-center">
                  This is general guidance only, not a personal recommendation. Estimates based on typical UK pricing. Exact costs confirmed after speaking with an adviser. FCA regulated.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // FUNNEL MODE
  if (showFunnel) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-pearl">
          <section className="py-8 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-navy/50 text-xs">Step {currentStep} of {totalSteps}</span>
                    <span className="text-navy/50 text-xs">{Math.round((currentStep / totalSteps) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-navy/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gold rounded-full" initial={{ width: 0 }} animate={{ width: `${(currentStep / totalSteps) * 100}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {currentStep > 1 && (
                  <button onClick={prevStep} className="mt-6 flex items-center gap-2 text-navy/50 hover:text-navy transition-colors mx-auto text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // MAIN EDUCATIONAL PAGE
  return (
    <>
      <Header />
      <main className="min-h-screen bg-pearl">
        {/* HERO */}
        <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 bg-pearl overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-gold text-xs uppercase tracking-[0.15em] mb-3">
                Protection Insurance
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4 md:mb-6 px-2">
                {abVariant.headline} <span className="text-gold">{abVariant.highlight}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-navy/70 mb-8 max-w-xl mx-auto px-4">
                {abVariant.subheadline}
              </motion.p>
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={startFunnel}
                className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold text-base rounded-xl hover:bg-gold/90 transition-all shadow-lg shadow-gold/25">
                Start My Protection Check
                <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.button>

              {/* Trust badges - mobile optimized */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4 md:gap-6 text-navy/50 text-xs mt-8">
                {["FCA Regulated", "Whole of Market", "No Obligation", "Clear Guidance"].map((item, i) => (
                  <span key={i} className="flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY PROTECTION MATTERS */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Why It Matters</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">The Facts You Should Know</h2>
              <p className="text-navy/60 text-sm md:text-base">Understanding the reality helps you make informed decisions...</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { stat: "1 in 2", label: "People will face a serious illness in their lifetime", color: "text-navy" },
                { stat: "3 months", label: "Average savings most families have for emergencies", color: "text-navy" },
                { stat: "6 months", label: "Typical recovery time after serious illness", color: "text-gold" },
                { stat: "£1,500", label: "Average monthly mortgage payment to protect", color: "text-gold" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center p-4 md:p-6 bg-pearl rounded-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className={`text-2xl md:text-3xl font-bold ${item.color} mb-1`}>{item.stat}</p>
                  <p className="text-navy/60 text-xs md:text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-8 p-5 bg-navy/5 rounded-xl border border-navy/10">
              <p className="text-navy/70 text-sm text-center">
                <span className="font-semibold text-navy">Good news:</span> The right protection is often more affordable than people think, and having it in place means peace of mind for you and your family.
              </p>
            </div>
          </div>
        </section>

        {/* PROTECTION PRODUCTS */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Types of Cover</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">Your Protection Options</h2>
              <p className="text-navy/60 text-sm md:text-base max-w-xl mx-auto">Each type serves a different purpose. Most people benefit from a combination.</p>
            </div>

            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              {protectionProducts.map((product, idx) => (
                <motion.div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-navy/5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <div className="p-5 md:p-8">
                    {/* Header - mobile centered */}
                    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4 mb-5">
                      <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                        {product.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-navy">{product.title}</h3>
                          <span className="px-2.5 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium">From {product.monthlyFrom}/mo</span>
                        </div>
                        <p className="text-navy/70 text-sm">{product.description}</p>
                      </div>
                    </div>

                    {/* Who needs & Benefits - stacked on mobile */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-navy mb-3 flex items-center justify-center md:justify-start gap-2 text-sm">
                          <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Who Needs This?
                        </h4>
                        <ul className="space-y-1.5">
                          {product.whoNeeds.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-navy/70 text-xs md:text-sm">
                              <svg className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-3 flex items-center justify-center md:justify-start gap-2 text-sm">
                          <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Key Benefits
                        </h4>
                        <ul className="space-y-1.5">
                          {product.benefits.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-navy/70 text-xs md:text-sm">
                              <svg className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-8 md:mt-12">
              <button onClick={startFunnel} className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold/90 transition-all inline-flex items-center justify-center gap-2">
                Find Out What You Need
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">At a Glance</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">Compare Protection Types</h2>
              <p className="text-navy/60 text-sm md:text-base max-w-xl mx-auto">See the key differences between each type of cover</p>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {[
                {
                  type: "Life Insurance",
                  icon: "🛡️",
                  paysOut: "When you pass away",
                  payment: "Lump sum",
                  covers: "Death during policy term",
                  bestFor: "Mortgage, dependents, debts",
                  fromPrice: "£5/mo",
                  taxFree: true,
                  multiClaim: false,
                },
                {
                  type: "Critical Illness",
                  icon: "❤️",
                  paysOut: "When diagnosed with serious illness",
                  payment: "Lump sum",
                  covers: "40+ serious conditions",
                  bestFor: "Mortgage payoff, treatment costs",
                  fromPrice: "£12/mo",
                  taxFree: true,
                  multiClaim: false,
                },
                {
                  type: "Income Protection",
                  icon: "💷",
                  paysOut: "When unable to work",
                  payment: "Monthly income",
                  covers: "Any illness or injury",
                  bestFor: "Bills, ongoing expenses",
                  fromPrice: "£15/mo",
                  taxFree: true,
                  multiClaim: true,
                },
              ].map((item, i) => (
                <motion.div key={i} className="bg-pearl rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-navy">{item.type}</h3>
                      <span className="text-gold text-sm font-medium">From {item.fromPrice}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-navy/60">Pays out:</span><span className="text-navy font-medium text-right">{item.paysOut}</span></div>
                    <div className="flex justify-between"><span className="text-navy/60">Payment type:</span><span className="text-navy font-medium">{item.payment}</span></div>
                    <div className="flex justify-between"><span className="text-navy/60">Covers:</span><span className="text-navy font-medium text-right">{item.covers}</span></div>
                    <div className="flex justify-between"><span className="text-navy/60">Best for:</span><span className="text-navy font-medium text-right">{item.bestFor}</span></div>
                    <div className="flex justify-between"><span className="text-navy/60">Tax-free:</span><span className="text-green-600 font-medium">{item.taxFree ? "Yes" : "No"}</span></div>
                    <div className="flex justify-between"><span className="text-navy/60">Can claim multiple times:</span><span className={`font-medium ${item.multiClaim ? "text-green-600" : "text-navy/50"}`}>{item.multiClaim ? "Yes" : "No"}</span></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block max-w-5xl mx-auto">
              <div className="bg-pearl rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gold text-navy">
                      <th className="p-4 text-left font-bold">Feature</th>
                      <th className="p-4 text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl">🛡️</span>
                          <span>Life Insurance</span>
                        </div>
                      </th>
                      <th className="p-4 text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl">❤️</span>
                          <span>Critical Illness</span>
                        </div>
                      </th>
                      <th className="p-4 text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl">💷</span>
                          <span>Income Protection</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-navy/10">
                      <td className="p-4 font-medium text-navy">When it pays out</td>
                      <td className="p-4 text-center text-navy/70">When you pass away</td>
                      <td className="p-4 text-center text-navy/70">When diagnosed with serious illness</td>
                      <td className="p-4 text-center text-navy/70">When unable to work due to illness/injury</td>
                    </tr>
                    <tr className="border-b border-navy/10 bg-white">
                      <td className="p-4 font-medium text-navy">Payment type</td>
                      <td className="p-4 text-center text-navy/70">One-off lump sum</td>
                      <td className="p-4 text-center text-navy/70">One-off lump sum</td>
                      <td className="p-4 text-center text-navy/70">Monthly income</td>
                    </tr>
                    <tr className="border-b border-navy/10">
                      <td className="p-4 font-medium text-navy">What it covers</td>
                      <td className="p-4 text-center text-navy/70">Death during policy term</td>
                      <td className="p-4 text-center text-navy/70">40+ serious conditions</td>
                      <td className="p-4 text-center text-navy/70">Any illness or injury stopping work</td>
                    </tr>
                    <tr className="border-b border-navy/10 bg-white">
                      <td className="p-4 font-medium text-navy">Best for</td>
                      <td className="p-4 text-center text-navy/70">Mortgage, dependents, debts</td>
                      <td className="p-4 text-center text-navy/70">Mortgage payoff, treatment costs</td>
                      <td className="p-4 text-center text-navy/70">Bills, rent, ongoing expenses</td>
                    </tr>
                    <tr className="border-b border-navy/10">
                      <td className="p-4 font-medium text-navy">Can claim multiple times</td>
                      <td className="p-4 text-center"><span className="text-navy/40">—</span></td>
                      <td className="p-4 text-center"><span className="text-navy/40">Usually no</span></td>
                      <td className="p-4 text-center"><span className="text-green-600 font-medium">Yes ✓</span></td>
                    </tr>
                    <tr className="border-b border-navy/10 bg-white">
                      <td className="p-4 font-medium text-navy">Tax-free payout</td>
                      <td className="p-4 text-center"><span className="text-green-600 font-medium">Yes ✓</span></td>
                      <td className="p-4 text-center"><span className="text-green-600 font-medium">Yes ✓</span></td>
                      <td className="p-4 text-center"><span className="text-green-600 font-medium">Yes ✓</span></td>
                    </tr>
                    <tr className="border-b border-navy/10">
                      <td className="p-4 font-medium text-navy">Typical cost (age 35)</td>
                      <td className="p-4 text-center"><span className="text-gold font-bold">From £5/mo</span></td>
                      <td className="p-4 text-center"><span className="text-gold font-bold">From £12/mo</span></td>
                      <td className="p-4 text-center"><span className="text-gold font-bold">From £15/mo</span></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-4 font-medium text-navy">Who needs it most</td>
                      <td className="p-4 text-center text-navy/70">Anyone with mortgage or dependents</td>
                      <td className="p-4 text-center text-navy/70">Those without savings buffer</td>
                      <td className="p-4 text-center text-navy/70">Self-employed, limited sick pay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Self-employed callout */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto mt-8">
              <Link href="/protection/self-employed" className="block bg-white border-2 border-gold/30 rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-gold/50 transition-all group">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-navy font-bold text-lg mb-1">Self-Employed?</h3>
                    <p className="text-navy/70 text-sm">You need protection more than most. See our dedicated guide for freelancers, contractors, and business owners.</p>
                  </div>
                  <svg className="w-6 h-6 text-gold group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Real Stories</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy">Families We've Protected</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { quote: "The critical illness payout meant I could care for my husband without worrying about the mortgage.", name: "Sarah M.", location: "Essex", type: "Critical Illness" },
                { quote: "Income protection saved us when a back injury kept me off work for 8 months.", name: "James T.", location: "Hertfordshire", type: "Income Protection" },
                { quote: "Life insurance meant our children could stay in their home after my husband passed.", name: "Michelle R.", location: "London", type: "Life Insurance" },
              ].map((testimonial, i) => (
                <motion.div key={i} className="bg-pearl rounded-xl p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex gap-0.5 text-gold mb-3">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-navy/70 text-sm mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-navy text-sm">{testimonial.name}</p>
                      <p className="text-navy/50 text-xs">{testimonial.location}</p>
                    </div>
                    <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded">{testimonial.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROTECTION CALCULATOR */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Quick Estimate</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">Protection Cost Calculator</h2>
              <p className="text-navy/60 text-sm md:text-base max-w-xl mx-auto">Get a rough idea of what protection could cost you</p>
            </div>
            <ProtectionCalculator />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Common Questions</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">Protection Insurance FAQs</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "What's the difference between life insurance and critical illness cover?",
                  a: "Life insurance pays out a lump sum if you pass away during the policy term. Critical illness cover pays out if you're diagnosed with a serious illness listed in your policy while you're still alive. Many people combine both for comprehensive protection."
                },
                {
                  q: "How much life insurance do I need?",
                  a: "A common guideline is 10x your annual salary plus any outstanding debts like your mortgage. Consider how long your dependents would need support and any future costs like children's education. Our protection check can help you calculate this."
                },
                {
                  q: "What does income protection cover?",
                  a: "Income protection pays a monthly income (typically up to 60% of your salary) if you're unable to work due to illness or injury. Unlike critical illness which pays a one-off lump sum, income protection provides ongoing support until you recover or retire."
                },
                {
                  q: "Can I get protection if I have pre-existing conditions?",
                  a: "Yes, in many cases you can still get cover. Some conditions may be excluded or premiums may be higher, but we work with specialist insurers who cater for various health situations. It's always worth getting a quote."
                },
                {
                  q: "How long does it take to set up protection?",
                  a: "Most applications are completed within 24-48 hours. Some may require additional medical information or a GP report, which can take 2-4 weeks. We guide you through the entire process and keep you updated."
                },
                {
                  q: "Are protection premiums tax-deductible?",
                  a: "For personal policies, premiums aren't tax-deductible. However, if you're self-employed, income protection premiums can often be claimed as a business expense. Life insurance payouts are usually tax-free if set up correctly in trust."
                },
                {
                  q: "What's a deferred period in income protection?",
                  a: "The deferred period is how long you wait after being unable to work before payments begin. Common options are 4, 8, 13, 26, or 52 weeks. Longer deferred periods mean lower premiums. Choose based on how long your savings or employer sick pay would last."
                },
                {
                  q: "Do I need protection if I have savings?",
                  a: "Savings provide a buffer, but protection ensures long-term security. Consider: could your savings cover years of mortgage payments, bills, and living costs if you couldn't work? Protection gives you peace of mind beyond what savings alone can provide."
                },
              ].map((faq, i) => (
                <motion.div key={i} className="bg-pearl rounded-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <details className="group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="text-navy font-medium text-sm md:text-base pr-4">{faq.q}</span>
                      <svg className="w-5 h-5 text-gold flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-navy/70 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPLORE PROTECTION TYPES */}
        <section className="py-12 md:py-16 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-xs font-medium text-gold uppercase tracking-[0.15em] mb-2">Learn More</p>
              <h2 className="text-xl md:text-3xl font-bold text-navy mb-3">Explore Protection Types</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { title: "Life Insurance", desc: "Tax-free lump sum for your loved ones", href: "/protection/life-insurance", icon: "🛡️" },
                { title: "Critical Illness", desc: "Financial support when you need it most", href: "/protection/critical-illness", icon: "❤️" },
                { title: "Income Protection", desc: "Replace your salary if you can't work", href: "/protection/income-protection", icon: "💷" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="bg-white rounded-xl p-5 border border-navy/5 hover:border-gold/30 hover:shadow-lg transition-all group">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-navy/60 text-sm">{item.desc}</p>
                  <span className="text-gold text-sm font-medium mt-3 inline-flex items-center gap-1">
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block mb-4">
                <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-600 rounded-full text-xs font-medium">Takes just 60 seconds</span>
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-bold text-navy mb-4">Find Out What You Need</h2>
              <p className="text-navy/70 mb-6 text-sm md:text-base">Get a personalised estimate. No obligation, no hard sell.</p>
              <button onClick={startFunnel} className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold text-base rounded-xl hover:bg-gold/90 transition-all shadow-lg shadow-gold/25">
                Start My Protection Check
                <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <p className="text-navy/40 text-xs mt-6">Or call <a href="tel:01992535555" className="text-gold hover:underline">01992 535 555</a></p>
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="py-6 bg-pearl border-t border-navy/5">
          <div className="container mx-auto px-4">
            <p className="text-navy/40 text-xs text-center max-w-2xl mx-auto">
              General information only, not a personal recommendation. Apply Wise Financial is authorised and regulated by the FCA. Estimates are for illustrative purposes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Step Container Component
function StepContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-navy/5">
      <h2 className="text-xl md:text-2xl font-bold text-navy mb-5 text-center">{title}</h2>
      {children}
    </div>
  );
}

// Option Button Component
function OptionButton({ children, selected, onClick }: { children: React.ReactNode; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full px-4 py-3.5 rounded-xl font-medium text-center transition-all text-sm md:text-base ${selected ? "bg-gold text-navy border-2 border-gold" : "bg-pearl text-navy border-2 border-navy/10 hover:border-gold/50 hover:bg-gold/5"}`}>
      {children}
    </button>
  );
}
