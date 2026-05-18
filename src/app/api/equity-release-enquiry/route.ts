import { NextRequest, NextResponse } from "next/server";
import {
  sendNotifications,
  generateEnquiryId,
  calculatePriority,
  storeEnquiry,
  type NotificationPayload,
} from "@/lib/notifications";
import { triggerWebhooks } from "@/lib/webhooks";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

interface EquityReleaseEnquiry {
  name: string;
  email: string;
  phone: string;
  age?: string;
  propertyValue?: string;
  outstandingMortgage?: string;
  reason?: string;
  message?: string;
  source?: string;
  // Tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

// Reason labels
const reasonLabels: Record<string, string> = {
  retirement: "Enjoy Retirement",
  family: "Help Family Financially",
  home: "Home Improvements",
  debt: "Pay Off Debts",
  care: "Care Costs",
  holiday: "Holiday / Travel",
  other: "Other",
};

// Parse currency values
const parseAmount = (value?: string): number | null => {
  if (!value) return null;
  const cleaned = value.replace(/[£,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};

// Format currency for display
const formatCurrency = (value: number | null): string | null => {
  if (value === null) return null;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Estimate equity release based on age and property value
const estimateRelease = (age: number, propertyValue: number): { min: number; max: number; ltv: number } => {
  // LTV increases with age, roughly 20% at 55, up to 55% at 90
  const baseLTV = Math.min(55, Math.max(20, (age - 55) * 1.5 + 20));
  const maxRelease = (propertyValue * baseLTV) / 100;
  return {
    min: Math.round(maxRelease * 0.7),
    max: Math.round(maxRelease),
    ltv: Math.round(baseLTV),
  };
};

export async function POST(request: NextRequest) {
  try {
    const body: EquityReleaseEnquiry = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Parse values
    const ageNum = body.age ? parseInt(body.age) : null;
    const propertyValueNum = parseAmount(body.propertyValue);
    const outstandingMortgageNum = parseAmount(body.outstandingMortgage);

    // Calculate estimated release
    let releaseEstimate: { min: number; max: number; ltv: number } | null = null;
    let availableEquity: number | null = null;

    if (ageNum && propertyValueNum) {
      releaseEstimate = estimateRelease(ageNum, propertyValueNum);
      if (outstandingMortgageNum) {
        availableEquity = propertyValueNum - outstandingMortgageNum;
      }
    }

    // Generate unique enquiry ID
    const enquiryId = generateEnquiryId("ER");

    // Calculate priority
    const priority = calculatePriority("equity-release", {
      age: body.age,
      propertyValue: body.propertyValue,
      message: body.message,
    });

    // Build enquiry details
    const enquiryDetails = {
      age: ageNum ? `${ageNum} years` : "Not provided",
      propertyValue: formatCurrency(propertyValueNum) || body.propertyValue || "Not provided",
      outstandingMortgage: formatCurrency(outstandingMortgageNum) || body.outstandingMortgage || "None / Not provided",
      availableEquity: formatCurrency(availableEquity),
      estimatedReleaseMin: releaseEstimate ? formatCurrency(releaseEstimate.min) : null,
      estimatedReleaseMax: releaseEstimate ? formatCurrency(releaseEstimate.max) : null,
      estimatedLTV: releaseEstimate ? `${releaseEstimate.ltv}%` : null,
      reason: reasonLabels[body.reason || ""] || body.reason || "Not specified",
      additionalInfo: body.message || "None provided",
    };

    // Store enquiry
    storeEnquiry({
      id: enquiryId,
      type: "equity-release",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      details: enquiryDetails,
      submittedAt: new Date().toISOString(),
    });

    // Log for debugging
    console.log("Equity Release Enquiry received:", {
      id: enquiryId,
      priority,
      ...enquiryDetails,
    });

    // Send email notifications
    const notificationPayload: NotificationPayload = {
      type: "equity-release",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      enquiryId,
      subject: `New Equity Release Enquiry - ${body.name}`,
      details: enquiryDetails,
      submittedAt: new Date().toISOString(),
    };

    const emailResults = await sendNotifications(notificationPayload);

    // Trigger webhooks for CRM integration
    const submittedAt = new Date().toISOString();
    const webhookResults = await triggerWebhooks(
      "enquiry.created",
      {
        id: enquiryId,
        type: "equity-release",
        priority,
        status: "new",
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: enquiryDetails,
        submittedAt,
      },
      { page: "equity-release-page" }
    );

    console.log(`[WEBHOOK] Triggered ${webhookResults.length} webhooks for ${enquiryId}`);

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name: body.name,
      email: body.email,
      phone: body.phone,
      propertyValue: propertyValueNum || undefined,
      employmentStatus: "retired",
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit equity release lead:", supabaseResult.error);
    }

    // Prepare next steps
    const getNextSteps = (): string[] => {
      const steps = [
        "A qualified equity release adviser will review your enquiry",
        "We'll call you within 2 hours (business hours)",
      ];

      if (outstandingMortgageNum && outstandingMortgageNum > 0) {
        steps.push("We'll discuss clearing your existing mortgage with equity release");
      }

      if (body.reason === "care") {
        steps.push("We'll explain how equity release can help with care costs");
      }

      steps.push("We'll provide a personalised illustration with no obligation");
      steps.push("All plans from Equity Release Council members with full protections");

      return steps;
    };

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: enquiryId,
        name: body.name,
        priority,
        estimatedRelease: releaseEstimate ? {
          min: formatCurrency(releaseEstimate.min),
          max: formatCurrency(releaseEstimate.max),
          ltv: `${releaseEstimate.ltv}%`,
        } : null,
        availableEquity: formatCurrency(availableEquity),
        nextSteps: getNextSteps(),
        estimatedCallback: "Within 2 hours during business hours",
        emailsSent: {
          team: emailResults.teamEmail.sent,
          customer: emailResults.customerEmail.sent,
        },
      },
    });
  } catch (error) {
    console.error("Equity Release Enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Equity Release Enquiry API - POST your enquiry data to this endpoint",
    requiredFields: ["name", "email", "phone"],
    optionalFields: ["age", "propertyValue", "outstandingMortgage", "reason", "message"],
    reasonOptions: Object.entries(reasonLabels).map(([value, label]) => ({
      value,
      label,
    })),
    features: [
      "Automatic release amount estimation based on age and property value",
      "Priority scoring for complex cases",
      "Email notifications to equity release team and customer",
      "Equity Release Council compliant advice",
    ],
  });
}
