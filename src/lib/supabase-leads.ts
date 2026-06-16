/**
 * Supabase Lead Submission Service for Apply Wise Financial
 * Submits all form enquiries to the centralized Supabase backend
 */

const SUPABASE_ENDPOINT = "https://xpxdfkjaqzkovmerfhbq.supabase.co/functions/v1/submit-lead";

// Interface for the Supabase lead payload (central submit-lead contract).
// mortgage/postcode are optional so non-mortgage forms (employer, contact)
// can submit without fabricating values. leadSource is the full domain and
// submissionType tags the form type.
export interface SupabaseLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadSource: string; // full domain, e.g. "apply-wise.co.uk"
  submissionType: string; // e.g. "employer-benefits", "mortgage-enquiry"
  // Mortgage-specific (only sent for mortgage flows)
  postcode?: string;
  mortgageAmount?: number; // integer
  householdIncome?: number; // integer
  mortgageEnd?: "within-30-days" | "1-3-months" | "3-6-months" | "over-6-months" | "already-ended";
  secureRate?: "asap" | "not-sure" | "exploring";
  extraMoney?: "no" | "home-improvements" | "clear-debt" | "other";
  badCredit?: "no-issues" | "missed-mortgage" | "missed-personal" | "ccj-defaults";
  employmentStatus?: "employed" | "self-employed" | "retired" | "unemployed";
  // Employer-benefit specific (only sent for employer-benefits)
  companyName?: string | null;
  employeeCount?: number | null;
  staffCommsMethod?: string | null;
  notes?: string | null;
  // Attribution
  landingPage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
}

// Interface for form data coming from various forms
export interface FormLeadData {
  // Name - can be full name or separate first/last
  name?: string;
  firstName?: string;
  lastName?: string;

  // Required fields
  email: string;
  phone: string;
  postcode?: string;

  // Optional mortgage fields
  propertyValue?: number | string;
  mortgageAmount?: number | string;
  depositAmount?: number | string;
  annualIncome?: number | string;
  householdIncome?: number | string;
  employmentStatus?: string;
  timeframe?: string;
  mortgageEnd?: string;
  secureRate?: string;
  extraMoney?: string;
  badCredit?: string;
  creditIssue?: string;
  callbackTime?: string;

  // Lead routing / attribution
  leadSource?: string; // full domain, defaults to "apply-wise.co.uk"
  submissionType?: string; // form-type slug, defaults to "mortgage-enquiry"
  landingPage?: string | null;

  // UTM tracking (passed from client-side)
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;

  // Employer benefit lead handling
  // When true, this is an EMPLOYER registering to offer mortgage advice as a
  // staff benefit - NOT a mortgage client. We must NOT fabricate mortgage
  // figures for these leads.
  isEmployerLead?: boolean;
  companyName?: string;
  employeeCount?: string | number;
  staffCommsMethod?: string;
  notes?: string;

  // Non-mortgage lead (e.g. protection/insurance, generic contact). Like
  // employer leads, these must NOT carry fabricated mortgage figures.
  isNonMortgageLead?: boolean;
}

// Default values matching the required enum values
const DEFAULT_VALUES = {
  mortgageAmount: 100000,
  householdIncome: 40000,
  mortgageEnd: "1-3-months" as const,
  secureRate: "not-sure" as const,
  extraMoney: "no" as const,
  badCredit: "no-issues" as const,
  employmentStatus: "employed" as const,
  postcode: "N/A",
};

// Map timeframe/callbackTime values to mortgageEnd format (exact enum values)
function mapTimeframeToMortgageEnd(timeframe?: string): SupabaseLeadPayload["mortgageEnd"] {
  if (!timeframe) return DEFAULT_VALUES.mortgageEnd;

  const normalized = timeframe.toLowerCase().replace(/\s+/g, "-");

  const mapping: Record<string, SupabaseLeadPayload["mortgageEnd"]> = {
    // Direct matches
    "within-30-days": "within-30-days",
    "1-3-months": "1-3-months",
    "3-6-months": "3-6-months",
    "over-6-months": "over-6-months",
    "already-ended": "already-ended",
    // Alternate formats
    "asap": "within-30-days",
    "urgent": "within-30-days",
    "within-30": "within-30-days",
    "30-days": "within-30-days",
    "1-3months": "1-3-months",
    "3-6months": "3-6-months",
    "6-months-plus": "over-6-months",
    "6+months": "over-6-months",
    "over-6": "over-6-months",
    "exploring": "over-6-months",
    "not-sure": "3-6-months",
    "ended": "already-ended",
    // Callback time mappings
    "morning": "1-3-months",
    "afternoon": "1-3-months",
    "evening": "1-3-months",
    "anytime": "1-3-months",
  };

  return mapping[normalized] || DEFAULT_VALUES.mortgageEnd;
}

// Map employment status to exact enum values
function mapEmploymentStatus(status?: string): SupabaseLeadPayload["employmentStatus"] {
  if (!status) return DEFAULT_VALUES.employmentStatus;

  const normalized = status.toLowerCase().replace(/[\s-_]+/g, "-");

  const mapping: Record<string, SupabaseLeadPayload["employmentStatus"]> = {
    "employed": "employed",
    "full-time": "employed",
    "part-time": "employed",
    "self-employed": "self-employed",
    "selfemployed": "self-employed",
    "director": "self-employed",
    "contractor": "self-employed",
    "retired": "retired",
    "pension": "retired",
    "unemployed": "unemployed",
    "not-working": "unemployed",
  };

  return mapping[normalized] || DEFAULT_VALUES.employmentStatus;
}

// Map credit issue values to exact badCredit enum values
function mapCreditToBadCredit(creditIssue?: string): SupabaseLeadPayload["badCredit"] {
  if (!creditIssue) return DEFAULT_VALUES.badCredit;

  const normalized = creditIssue.toLowerCase().replace(/[\s-_]+/g, "-");

  const mapping: Record<string, SupabaseLeadPayload["badCredit"]> = {
    // Direct matches
    "no-issues": "no-issues",
    "missed-mortgage": "missed-mortgage",
    "missed-personal": "missed-personal",
    "ccj-defaults": "ccj-defaults",
    // Alternate formats
    "none": "no-issues",
    "clean": "no-issues",
    "good": "no-issues",
    "no": "no-issues",
    "late-mortgage": "missed-mortgage",
    "mortgage-arrears": "missed-mortgage",
    "late-payments": "missed-personal",
    "late-personal": "missed-personal",
    "defaults": "ccj-defaults",
    "ccj": "ccj-defaults",
    "iva": "ccj-defaults",
    "bankruptcy": "ccj-defaults",
    "dmp": "missed-personal",
    "repossession": "ccj-defaults",
    "multiple": "ccj-defaults",
    "multiple-issues": "ccj-defaults",
  };

  return mapping[normalized] || DEFAULT_VALUES.badCredit;
}

// Map secureRate to exact enum values
function mapSecureRate(rate?: string): SupabaseLeadPayload["secureRate"] {
  if (!rate) return DEFAULT_VALUES.secureRate;

  const normalized = rate.toLowerCase().replace(/[\s-_]+/g, "-");

  const mapping: Record<string, SupabaseLeadPayload["secureRate"]> = {
    "asap": "asap",
    "urgent": "asap",
    "now": "asap",
    "not-sure": "not-sure",
    "unsure": "not-sure",
    "exploring": "exploring",
    "just-looking": "exploring",
  };

  return mapping[normalized] || DEFAULT_VALUES.secureRate;
}

// Map extraMoney to exact enum values
function mapExtraMoney(extra?: string): SupabaseLeadPayload["extraMoney"] {
  if (!extra) return DEFAULT_VALUES.extraMoney;

  const normalized = extra.toLowerCase().replace(/[\s-_]+/g, "-");

  const mapping: Record<string, SupabaseLeadPayload["extraMoney"]> = {
    "no": "no",
    "none": "no",
    "home-improvements": "home-improvements",
    "improvements": "home-improvements",
    "renovation": "home-improvements",
    "clear-debt": "clear-debt",
    "debt": "clear-debt",
    "consolidation": "clear-debt",
    "other": "other",
    "yes": "other",
  };

  return mapping[normalized] || DEFAULT_VALUES.extraMoney;
}

// Parse name into first and last name
function parseName(fullName?: string, firstName?: string, lastName?: string): { firstName: string; lastName: string } {
  if (firstName && lastName) {
    return { firstName: firstName.trim(), lastName: lastName.trim() };
  }

  if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "-" };
    }
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" "),
    };
  }

  return { firstName: firstName || "Unknown", lastName: lastName || "-" };
}

// Parse numeric values - MUST return integers
function parseNumeric(value?: number | string | null, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === "number") return Math.round(value);

  // Strip £, commas, spaces, and any other non-numeric characters except digits
  const cleaned = String(value).replace(/[£,\s]/g, "");
  const parsed = parseInt(cleaned, 10);

  return isNaN(parsed) ? defaultValue : Math.round(parsed);
}

// Convert property value range to numeric amount
function parsePropertyValueRange(range?: string): number {
  if (!range) return 0;

  const mapping: Record<string, number> = {
    "under-150k": 125000,
    "150k-250k": 200000,
    "250k-400k": 325000,
    "400k-600k": 500000,
    "over-600k": 750000,
  };

  return mapping[range] || parseNumeric(range, 0);
}

// Convert deposit range to numeric amount or percentage
function parseDepositRange(range?: string, propertyValue?: number): number {
  if (!range) return 0;

  // Handle percentage-based deposit ranges (from apply form)
  const percentageMapping: Record<string, number> = {
    "5-10": 0.075, // Use midpoint 7.5%
    "10-15": 0.125, // Use midpoint 12.5%
    "15-25": 0.2, // Use midpoint 20%
    "25-plus": 0.3, // Use 30%
  };

  if (percentageMapping[range] && propertyValue && propertyValue > 0) {
    return Math.round(propertyValue * percentageMapping[range]);
  }

  // Handle amount-based deposit ranges
  const amountMapping: Record<string, number> = {
    "under-10k": 7500,
    "10k-25k": 17500,
    "25k-50k": 37500,
    "50k-100k": 75000,
    "over-100k": 150000,
  };

  return amountMapping[range] || parseNumeric(range, 0);
}

// Convert income range to numeric amount
function parseIncomeRange(range?: string): number {
  if (!range) return DEFAULT_VALUES.householdIncome;

  const mapping: Record<string, number> = {
    // Apply form ranges
    "under-25k": 22000,
    "25k-40k": 32500,
    "40k-60k": 50000,
    "60k-100k": 80000,
    "over-100k": 125000,
    // Alternative formats
    "under-30k": 25000,
    "30k-50k": 40000,
    "50k-75k": 62500,
    "75k-100k": 87500,
  };

  return mapping[range] || parseNumeric(range, DEFAULT_VALUES.householdIncome);
}

// Calculate mortgage amount from property value and deposit
function calculateMortgageAmount(
  propertyValue?: number | string,
  depositAmount?: number | string,
  mortgageAmount?: number | string
): number {
  // If mortgage amount is directly provided, use it
  if (mortgageAmount) {
    return parseNumeric(mortgageAmount, DEFAULT_VALUES.mortgageAmount);
  }

  // Parse property value (could be a range like "250k-400k")
  let propValue = 0;
  if (typeof propertyValue === "string" && propertyValue.includes("k")) {
    propValue = parsePropertyValueRange(propertyValue);
  } else {
    propValue = parseNumeric(propertyValue, 0);
  }

  // Parse deposit (could be a range or percentage range like "5-10", "10-15")
  let deposit = 0;
  if (typeof depositAmount === "string") {
    if (depositAmount.includes("k")) {
      deposit = parseDepositRange(depositAmount, propValue);
    } else if (depositAmount.match(/^\d+-\d+$/) || depositAmount === "25-plus") {
      // Percentage-based range from apply form
      deposit = parseDepositRange(depositAmount, propValue);
    } else {
      deposit = parseNumeric(depositAmount, 0);
    }
  } else {
    deposit = parseNumeric(depositAmount, 0);
  }

  if (propValue > 0 && deposit > 0) {
    return propValue - deposit;
  }

  if (propValue > 0) {
    // Assume 10% deposit
    return Math.round(propValue * 0.9);
  }

  return DEFAULT_VALUES.mortgageAmount;
}

/**
 * Transform form data into Supabase lead payload
 */
export function transformToSupabaseLead(formData: FormLeadData): SupabaseLeadPayload {
  const { firstName, lastName } = parseName(formData.name, formData.firstName, formData.lastName);

  // Every Apply Wise lead is tagged with the full domain (the central system
  // retired the website-organic auto-fallback). Channel info lives in UTM.
  const leadSource = formData.leadSource || "apply-wise.co.uk";

  // ===== EMPLOYER BENEFIT LEAD =====
  // An employer registering to OFFER mortgage advice to their staff is NOT a
  // mortgage client. Per the central contract we send NO mortgage fields at all
  // (no mortgageAmount, householdIncome, postcode or funnel answers) - only the
  // real data the employer provided. The lead is tagged via submissionType.
  if (formData.isEmployerLead) {
    const employeeCountInt =
      formData.employeeCount != null && String(formData.employeeCount).trim() !== ""
        ? parseNumeric(formData.employeeCount, 0) || null
        : null;

    return {
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      leadSource,
      submissionType: "employer-benefits",
      companyName: formData.companyName || null,
      employeeCount: employeeCountInt,
      staffCommsMethod: formData.staffCommsMethod || null,
      notes: formData.notes || null,
      landingPage: formData.landingPage || null,
      utmSource: formData.utmSource || null,
      utmMedium: formData.utmMedium || null,
      utmCampaign: formData.utmCampaign || null,
      referrer: formData.referrer || null,
    };
  }

  // ===== NON-MORTGAGE LEAD (protection/insurance, generic contact) =====
  // No mortgage figures are fabricated - we only send real contact data.
  if (formData.isNonMortgageLead) {
    return {
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      leadSource,
      submissionType: formData.submissionType || "contact-form",
      notes: formData.notes || null,
      landingPage: formData.landingPage || null,
      utmSource: formData.utmSource || null,
      utmMedium: formData.utmMedium || null,
      utmCampaign: formData.utmCampaign || null,
      referrer: formData.referrer || null,
    };
  }

  // ===== MORTGAGE / STANDARD LEAD =====
  const mortgageAmount = calculateMortgageAmount(
    formData.propertyValue,
    formData.depositAmount,
    formData.mortgageAmount
  );

  // Parse household income - could be a range or direct value
  let householdIncome = DEFAULT_VALUES.householdIncome;
  const incomeValue = formData.annualIncome || formData.householdIncome;
  if (typeof incomeValue === "string" && incomeValue.includes("k")) {
    householdIncome = parseIncomeRange(incomeValue);
  } else {
    householdIncome = parseNumeric(incomeValue, DEFAULT_VALUES.householdIncome);
  }

  return {
    firstName,
    lastName,
    email: formData.email,
    phone: formData.phone,
    postcode: formData.postcode || DEFAULT_VALUES.postcode,
    mortgageAmount,
    householdIncome,
    mortgageEnd: mapTimeframeToMortgageEnd(formData.timeframe || formData.mortgageEnd || formData.callbackTime),
    secureRate: mapSecureRate(formData.secureRate),
    extraMoney: mapExtraMoney(formData.extraMoney),
    badCredit: mapCreditToBadCredit(formData.badCredit || formData.creditIssue),
    employmentStatus: mapEmploymentStatus(formData.employmentStatus),
    leadSource,
    submissionType: formData.submissionType || "mortgage-enquiry",
    landingPage: formData.landingPage || null,
    utmSource: formData.utmSource || null,
    utmMedium: formData.utmMedium || null,
    utmCampaign: formData.utmCampaign || null,
    referrer: formData.referrer || null,
  };
}

/**
 * Submit lead to Supabase endpoint
 */
export async function submitLeadToSupabase(formData: FormLeadData): Promise<{
  success: boolean;
  error?: string;
  data?: unknown;
}> {
  try {
    const payload = transformToSupabaseLead(formData);

    console.log("[SUPABASE] Submitting lead:", {
      name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      mortgageAmount: payload.mortgageAmount,
      householdIncome: payload.householdIncome,
      employmentStatus: payload.employmentStatus,
      mortgageEnd: payload.mortgageEnd,
    });

    const response = await fetch(SUPABASE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("[SUPABASE] Submission failed:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      return {
        success: false,
        error: responseData?.message || responseData?.error || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    console.log("[SUPABASE] Lead submitted successfully:", responseData);
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[SUPABASE] Exception during submission:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Helper to extract UTM parameters from URL search params
 */
export function extractTrackingParams(searchParams: URLSearchParams): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
} {
  return {
    utmSource: searchParams.get("utm_source"),
    utmMedium: searchParams.get("utm_medium"),
    utmCampaign: searchParams.get("utm_campaign"),
  };
}
