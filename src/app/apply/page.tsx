"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

type FormData = {
  applicationType: string;
  buyerType: string;
  propertyValue: string;
  depositAmount: string;
  employmentStatus: string;
  annualIncome: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  callbackTime: string;
};

const initialFormData: FormData = {
  applicationType: "",
  buyerType: "",
  propertyValue: "",
  depositAmount: "",
  employmentStatus: "",
  annualIncome: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postcode: "",
  callbackTime: "",
};

// Loading fallback for Suspense
function ApplyPageLoading() {
  return (
    <div className="min-h-screen bg-pearl flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm py-4 px-4 md:px-6 border-b border-navy/5">
        <Link href="/" className="flex items-center w-fit">
          <img
            src="/logos/apply-wise-logo.png"
            alt="Apply Wise"
            className="h-10 w-auto"
          />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-xl p-8 shadow-lg flex items-center justify-center border border-navy/5">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-navy/60">Loading your application...</span>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Inner component that uses useSearchParams
function ApplyPageContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    // Store tracking data on page load
    storeTrackingData();

    const type = searchParams.get("type");
    if (type === "purchase") {
      setFormData((prev) => ({ ...prev, applicationType: "purchase" }));
    } else if (type === "remortgage") {
      setFormData((prev) => ({ ...prev, applicationType: "remortgage" }));
    }
  }, [searchParams]);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitApplication = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Get tracking data for lead attribution
      const tracking = getStoredTrackingData();

      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...tracking,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsComplete(true);
      } else {
        console.error("Submission failed:", result.error);
        setSubmitError(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Connection error. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setDirection(1);
      setStep(step + 1);
    } else {
      submitApplication();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.applicationType;
      case 2:
        return !!formData.buyerType;
      case 3:
        return !!formData.propertyValue;
      case 4:
        return !!formData.depositAmount;
      case 5:
        return !!formData.employmentStatus;
      case 6:
        return !!formData.annualIncome;
      case 7:
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone && !!formData.postcode;
      case 8:
        return !!formData.callbackTime;
      default:
        return false;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-pearl flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 relative">
          {/* Celebration particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${10 + (i * 7)}%`,
                  backgroundColor: i % 3 === 0 ? '#D4A524' : i % 3 === 1 ? '#0B1F3A' : '#F5F3EF',
                }}
                initial={{ y: -20, opacity: 0, scale: 0 }}
                animate={{
                  y: ['0%', '100vh'],
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.5],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: 0.2 + (i * 0.1),
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 max-w-lg w-full text-center space-y-6 shadow-2xl border border-navy/5 relative z-10"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Success icon with ring animation */}
            <div className="relative mx-auto w-24 h-24">
              <motion.div
                className="absolute inset-0 bg-gold/10 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-2 bg-gold/20 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-4 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
                  />
                </motion.svg>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
                Thank you, {formData.firstName}!
              </h1>
              <p className="text-gold font-medium">Application Submitted Successfully</p>
            </motion.div>

            <motion.p
              className="text-navy/60 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              One of our mortgage experts will be in touch within <span className="font-semibold text-navy">24 hours</span> to discuss your options.
            </motion.p>

            {/* What happens next */}
            <motion.div
              className="bg-pearl rounded-xl p-5 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </p>
              <ul className="space-y-2 text-sm text-navy/70">
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-gold mt-0.5">1.</span>
                  <span>We'll review your application</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-gold mt-0.5">2.</span>
                  <span>A specialist will call you to discuss options</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="text-gold mt-0.5">3.</span>
                  <span>We'll search 90+ lenders for the best deal</span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact details confirmation */}
            <motion.div
              className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xs font-medium text-navy/50 uppercase tracking-wider mb-2">Your contact details</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-navy font-medium">{formData.firstName} {formData.lastName}</p>
                  <p className="text-navy/60">{formData.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-navy font-medium">{formData.phone}</p>
                  <p className="text-navy/60">{formData.postcode}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/" className="flex-1">
                <motion.button
                  className="w-full px-6 py-3 bg-navy text-white font-medium tracking-wider uppercase rounded-lg hover:bg-navy-deep transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to Home
                </motion.button>
              </Link>
              <a href="tel:01992535555" className="flex-1">
                <motion.button
                  className="w-full px-6 py-3 bg-gold/10 text-navy font-medium tracking-wider uppercase rounded-lg border border-gold/30 hover:bg-gold/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Call Us Now
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-xl">
          {/* Progress bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-1 bg-navy/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-navy/50 mt-3 text-center">
              Step {step} of {totalSteps}
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-navy/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {/* Step 1: Application Type */}
                {step === 1 && (
                  <StepContent
                    title="What are you looking to do?"
                    subtitle={
                      formData.applicationType
                        ? "We've pre-selected based on what you told us. Please confirm."
                        : undefined
                    }
                  >
                    <RadioOption
                      label="Buy a property"
                      selected={formData.applicationType === "purchase"}
                      onClick={() => handleSelect("applicationType", "purchase")}
                    />
                    <RadioOption
                      label="Remortgage"
                      selected={formData.applicationType === "remortgage"}
                      onClick={() => handleSelect("applicationType", "remortgage")}
                    />
                  </StepContent>
                )}

                {/* Step 2: Buyer Type */}
                {step === 2 && (
                  <StepContent title="Which best describes you?">
                    <RadioOption
                      label="First-time buyer"
                      selected={formData.buyerType === "first-time"}
                      onClick={() => handleSelect("buyerType", "first-time")}
                    />
                    <RadioOption
                      label="Moving home"
                      selected={formData.buyerType === "moving"}
                      onClick={() => handleSelect("buyerType", "moving")}
                    />
                    <RadioOption
                      label="Buy to let"
                      selected={formData.buyerType === "buy-to-let"}
                      onClick={() => handleSelect("buyerType", "buy-to-let")}
                    />
                    {formData.applicationType === "remortgage" && (
                      <RadioOption
                        label="Remortgaging my current home"
                        selected={formData.buyerType === "remortgage-current"}
                        onClick={() => handleSelect("buyerType", "remortgage-current")}
                      />
                    )}
                  </StepContent>
                )}

                {/* Step 3: Property Value */}
                {step === 3 && (
                  <StepContent
                    title="What's the estimated property value?"
                    subtitle="Give us your best estimate - we can refine this later."
                  >
                    <RadioOption
                      label="Under £150,000"
                      selected={formData.propertyValue === "under-150k"}
                      onClick={() => handleSelect("propertyValue", "under-150k")}
                    />
                    <RadioOption
                      label="£150,000 - £250,000"
                      selected={formData.propertyValue === "150k-250k"}
                      onClick={() => handleSelect("propertyValue", "150k-250k")}
                    />
                    <RadioOption
                      label="£250,000 - £400,000"
                      selected={formData.propertyValue === "250k-400k"}
                      onClick={() => handleSelect("propertyValue", "250k-400k")}
                    />
                    <RadioOption
                      label="£400,000 - £600,000"
                      selected={formData.propertyValue === "400k-600k"}
                      onClick={() => handleSelect("propertyValue", "400k-600k")}
                    />
                    <RadioOption
                      label="Over £600,000"
                      selected={formData.propertyValue === "over-600k"}
                      onClick={() => handleSelect("propertyValue", "over-600k")}
                    />
                  </StepContent>
                )}

                {/* Step 4: Deposit Amount */}
                {step === 4 && (
                  <StepContent
                    title="How much deposit do you have?"
                    subtitle="This helps us find the best deals for your situation."
                  >
                    <RadioOption
                      label="5% - 10%"
                      selected={formData.depositAmount === "5-10"}
                      onClick={() => handleSelect("depositAmount", "5-10")}
                    />
                    <RadioOption
                      label="10% - 15%"
                      selected={formData.depositAmount === "10-15"}
                      onClick={() => handleSelect("depositAmount", "10-15")}
                    />
                    <RadioOption
                      label="15% - 25%"
                      selected={formData.depositAmount === "15-25"}
                      onClick={() => handleSelect("depositAmount", "15-25")}
                    />
                    <RadioOption
                      label="25% or more"
                      selected={formData.depositAmount === "25-plus"}
                      onClick={() => handleSelect("depositAmount", "25-plus")}
                    />
                  </StepContent>
                )}

                {/* Step 5: Employment Status */}
                {step === 5 && (
                  <StepContent title="What's your employment status?">
                    <RadioOption
                      label="Employed"
                      selected={formData.employmentStatus === "employed"}
                      onClick={() => handleSelect("employmentStatus", "employed")}
                    />
                    <RadioOption
                      label="Self-employed"
                      selected={formData.employmentStatus === "self-employed"}
                      onClick={() => handleSelect("employmentStatus", "self-employed")}
                    />
                    <RadioOption
                      label="Contractor"
                      selected={formData.employmentStatus === "contractor"}
                      onClick={() => handleSelect("employmentStatus", "contractor")}
                    />
                    <RadioOption
                      label="Retired"
                      selected={formData.employmentStatus === "retired"}
                      onClick={() => handleSelect("employmentStatus", "retired")}
                    />
                    <RadioOption
                      label="Other"
                      selected={formData.employmentStatus === "other"}
                      onClick={() => handleSelect("employmentStatus", "other")}
                    />
                  </StepContent>
                )}

                {/* Step 6: Annual Income */}
                {step === 6 && (
                  <StepContent
                    title="What's your annual income?"
                    subtitle="Before tax - this helps us calculate what you can borrow."
                  >
                    <RadioOption
                      label="Under £25,000"
                      selected={formData.annualIncome === "under-25k"}
                      onClick={() => handleSelect("annualIncome", "under-25k")}
                    />
                    <RadioOption
                      label="£25,000 - £40,000"
                      selected={formData.annualIncome === "25k-40k"}
                      onClick={() => handleSelect("annualIncome", "25k-40k")}
                    />
                    <RadioOption
                      label="£40,000 - £60,000"
                      selected={formData.annualIncome === "40k-60k"}
                      onClick={() => handleSelect("annualIncome", "40k-60k")}
                    />
                    <RadioOption
                      label="£60,000 - £100,000"
                      selected={formData.annualIncome === "60k-100k"}
                      onClick={() => handleSelect("annualIncome", "60k-100k")}
                    />
                    <RadioOption
                      label="Over £100,000"
                      selected={formData.annualIncome === "over-100k"}
                      onClick={() => handleSelect("annualIncome", "over-100k")}
                    />
                  </StepContent>
                )}

                {/* Step 7: Contact Details */}
                {step === 7 && (
                  <StepContent
                    title="Your contact details"
                    subtitle="So we can get in touch to discuss your mortgage options."
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-navy">First name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="h-12 text-base bg-white border-navy/10 focus:border-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-navy">Last name</Label>
                          <Input
                            id="lastName"
                            placeholder="Smith"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="h-12 text-base bg-white border-navy/10 focus:border-gold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-navy">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.smith@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="h-12 text-base bg-white border-navy/10 focus:border-gold"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-navy">Phone number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="07700 900000"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="h-12 text-base bg-white border-navy/10 focus:border-gold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postcode" className="text-navy">Postcode</Label>
                          <Input
                            id="postcode"
                            placeholder="CM16 7PY"
                            value={formData.postcode}
                            onChange={(e) =>
                              handleInputChange("postcode", e.target.value.toUpperCase())
                            }
                            className="h-12 text-base bg-white border-navy/10 focus:border-gold uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </StepContent>
                )}

                {/* Step 8: Callback Time */}
                {step === 8 && (
                  <StepContent
                    title="When's the best time to call you?"
                    subtitle="We'll try to call you during your preferred time slot."
                  >
                    <RadioOption
                      label="Morning (9am - 12pm)"
                      selected={formData.callbackTime === "morning"}
                      onClick={() => handleSelect("callbackTime", "morning")}
                    />
                    <RadioOption
                      label="Afternoon (12pm - 5pm)"
                      selected={formData.callbackTime === "afternoon"}
                      onClick={() => handleSelect("callbackTime", "afternoon")}
                    />
                    <RadioOption
                      label="Evening (5pm - 8pm)"
                      selected={formData.callbackTime === "evening"}
                      onClick={() => handleSelect("callbackTime", "evening")}
                    />
                    <RadioOption
                      label="Anytime"
                      selected={formData.callbackTime === "anytime"}
                      onClick={() => handleSelect("callbackTime", "anytime")}
                    />
                  </StepContent>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Error display */}
            {submitError && (
              <motion.div
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Submission failed</p>
                    <p>{submitError}</p>
                    <p className="mt-2">
                      Or call us directly on{" "}
                      <a href="tel:01992535555" className="text-red-800 font-semibold hover:underline">
                        01992 535 555
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy/5">
              {step > 1 ? (
                <motion.button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-navy/50 hover:text-navy transition-colors px-4 py-2 -ml-4"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </motion.button>
              ) : (
                <div />
              )}
              <motion.button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className="flex items-center gap-2 bg-gold text-navy font-semibold px-6 md:px-8 py-3 rounded hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={isStepValid() && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={isStepValid() && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    {step === totalSteps ? "Submit Application" : "Continue"}
                    {step !== totalSteps && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Help text */}
          <motion.p
            className="text-center text-sm text-navy/40 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Need help? Call us on{" "}
            <a href="tel:01992535555" className="text-gold hover:underline">
              01992 535 555
            </a>
          </motion.p>
        </div>
      </main>
    </div>
  );
}

// Main export with Suspense wrapper
export default function ApplyPage() {
  return (
    <Suspense fallback={<ApplyPageLoading />}>
      <ApplyPageContent />
    </Suspense>
  );
}

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm py-4 px-4 md:px-6 border-b border-navy/5 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <Link href="/" className="flex items-center w-fit">
          <motion.img
            src="/logos/apply-wise-logo.png"
            alt="Apply Wise"
            className="h-10 w-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
        <motion.div
          className="flex items-center gap-2 text-xs text-navy/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure
        </motion.div>
      </div>
    </header>
  );
}

function StepContent({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl md:text-2xl font-semibold text-navy">
        {title}
      </h2>
      {subtitle && (
        <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 text-sm text-navy/70">
          {subtitle}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function RadioOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
        selected
          ? "border-gold bg-gold/5"
          : "border-navy/10 hover:border-navy/20 bg-white"
      }`}
      whileHover={{ scale: 1.01, x: 3 }}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-gold" : "border-navy/30"
        }`}
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {selected && (
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-gold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <span className="text-base text-navy">{label}</span>
    </motion.button>
  );
}
