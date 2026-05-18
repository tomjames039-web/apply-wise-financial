import { NextRequest, NextResponse } from "next/server";
import {
  sendNotifications,
  generateEnquiryId,
  storeEnquiry,
  type NotificationPayload,
} from "@/lib/notifications";
import { triggerWebhooks } from "@/lib/webhooks";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

interface BadCreditEnquiry {
  name: string;
  email: string;
  phone: string;
  creditIssue: string;
  propertyValue?: string;
  deposit?: string;
  message?: string;
  source?: string;
  submittedAt?: string;
  // Tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

// Map credit issue codes to readable names
const creditIssueLabels: Record<string, string> = {
  ccj: "CCJ (County Court Judgement)",
  defaults: "Defaults",
  iva: "IVA (Individual Voluntary Arrangement)",
  bankruptcy: "Bankruptcy",
  "late-payments": "Late Payments",
  "low-score": "Low Credit Score",
  dmp: "Debt Management Plan",
  repossession: "Previous Repossession",
  multiple: "Multiple Issues",
  other: "Other / Not Sure",
};

// Priority scoring based on credit issue severity
const priorityScores: Record<string, number> = {
  bankruptcy: 5,
  repossession: 5,
  iva: 4,
  ccj: 3,
  dmp: 3,
  defaults: 2,
  "late-payments": 1,
  "low-score": 1,
  multiple: 4,
  other: 2,
};

export async function POST(request: NextRequest) {
  try {
    const body: BadCreditEnquiry = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.creditIssue) {
      return NextResponse.json(
        { success: false, error: "Name, email, phone, and credit issue are required" },
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

    // Validate phone format (basic UK phone validation)
    const phoneRegex = /^(\+44|0)[0-9]{10,11}$/;
    const cleanedPhone = body.phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanedPhone)) {
      // Still accept but flag for review
      console.log("Phone format may need verification:", body.phone);
    }

    // Determine priority based on credit issue
    const priority = priorityScores[body.creditIssue] || 2;
    const priorityLabel = priority >= 4 ? "HIGH" : priority >= 2 ? "MEDIUM" : "STANDARD";

    // Parse property value and deposit if provided
    const parseAmount = (value?: string): number | null => {
      if (!value) return null;
      const cleaned = value.replace(/[£,\s]/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
    };

    const propertyValueNum = parseAmount(body.propertyValue);
    const depositNum = parseAmount(body.deposit);

    // Calculate LTV if both values provided
    let ltv: number | null = null;
    if (propertyValueNum && depositNum && propertyValueNum > 0) {
      ltv = Math.round(((propertyValueNum - depositNum) / propertyValueNum) * 100);
    }

    // Generate unique enquiry ID
    const enquiryId = generateEnquiryId("BC");

    // Build enquiry object with metadata
    const enquiry = {
      ...body,
      id: enquiryId,
      creditIssueLabel: creditIssueLabels[body.creditIssue] || body.creditIssue,
      priority: priorityLabel,
      priorityScore: priority,
      propertyValueParsed: propertyValueNum,
      depositParsed: depositNum,
      ltv,
      source: "bad-credit-page",
      submittedAt: new Date().toISOString(),
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

    // Store enquiry for admin dashboard
    const enquiryDetails = {
      creditIssue: creditIssueLabels[body.creditIssue] || body.creditIssue,
      propertyValue: formatCurrency(propertyValueNum) || body.propertyValue || "Not provided",
      deposit: formatCurrency(depositNum) || body.deposit || "Not provided",
      ltv: ltv ? `${ltv}%` : "Not calculated",
      additionalInfo: body.message || "None provided",
    };

    storeEnquiry({
      id: enquiryId,
      type: "bad-credit",
      priority: priorityLabel,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    });

    console.log("Bad Credit Enquiry received:", enquiry);

    // Send email notifications
    const notificationPayload: NotificationPayload = {
      type: "bad-credit",
      priority: priorityLabel as "HIGH" | "MEDIUM" | "STANDARD",
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      enquiryId,
      subject: `New Bad Credit Mortgage Enquiry - ${body.name}`,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    };

    const emailResults = await sendNotifications(notificationPayload);

    // Trigger webhooks for CRM integration
    const webhookResults = await triggerWebhooks(
      "enquiry.created",
      {
        id: enquiryId,
        type: "bad-credit",
        priority: priorityLabel,
        status: "new",
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: enquiryDetails,
        submittedAt: enquiry.submittedAt,
      },
      { page: "bad-credit-page" }
    );

    console.log(`[WEBHOOK] Triggered ${webhookResults.length} webhooks for ${enquiryId}`);

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name: body.name,
      email: body.email,
      phone: body.phone,
      propertyValue: propertyValueNum || undefined,
      depositAmount: depositNum || undefined,
      creditIssue: body.creditIssue,
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit bad credit lead:", supabaseResult.error);
    }

    // Prepare response with next steps based on credit issue
    const getNextSteps = (issue: string): string[] => {
      const baseSteps = [
        "A specialist adviser will review your case",
        "We'll call you within 2 hours (business hours)",
      ];

      switch (issue) {
        case "bankruptcy":
        case "repossession":
          return [
            ...baseSteps,
            "Please have your discharge papers ready if available",
            "We'll discuss specialist lenders who work with your situation",
          ];
        case "iva":
        case "dmp":
          return [
            ...baseSteps,
            "We may need to contact your IVA/DMP supervisor",
            "Gather any completion certificates if applicable",
          ];
        case "ccj":
          return [
            ...baseSteps,
            "Check if your CCJ has been satisfied",
            "Note down the date and amount of any CCJs",
          ];
        default:
          return [
            ...baseSteps,
            "Check your credit report at CheckMyFile.com",
            "We'll identify the best lenders for your situation",
          ];
      }
    };

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: enquiryId,
        name: body.name,
        creditIssue: creditIssueLabels[body.creditIssue] || body.creditIssue,
        priority: priorityLabel,
        ltv: ltv ? `${ltv}%` : null,
        nextSteps: getNextSteps(body.creditIssue),
        estimatedCallback: "Within 2 hours during business hours",
        emailsSent: {
          team: emailResults.teamEmail.sent,
          customer: emailResults.customerEmail.sent,
        },
      },
    });
  } catch (error) {
    console.error("Bad Credit Enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Bad Credit Enquiry API - POST your enquiry data to this endpoint",
    requiredFields: ["name", "email", "phone", "creditIssue"],
    optionalFields: ["propertyValue", "deposit", "message"],
    creditIssueOptions: Object.entries(creditIssueLabels).map(([value, label]) => ({
      value,
      label,
    })),
    priorityLevels: {
      HIGH: "Bankruptcy, Repossession, Multiple Issues, IVA",
      MEDIUM: "CCJ, DMP, Defaults, Other",
      STANDARD: "Late Payments, Low Credit Score",
    },
  });
}
