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

interface SelfEmployedEnquiry {
  name: string;
  email: string;
  phone: string;
  companyType?: string;
  yearsTrading?: string;
  netProfit?: string;
  salaryDividends?: string;
  shareholding?: string;
  propertyValue?: string;
  message?: string;
  source?: string;
  // Tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

// Company type labels for readable display
const companyTypeLabels: Record<string, string> = {
  "ltd-sole": "Limited Company (Sole Director)",
  "ltd-multiple": "Limited Company (Multiple Directors)",
  "contractor-ltd": "Contractor Ltd Company",
  "multiple-companies": "Multiple Companies",
  "holding-company": "Holding Company Structure",
  "sole-trader": "Sole Trader",
  "partnership": "Partnership / LLP",
};

// Years trading labels
const yearsTradingLabels: Record<string, string> = {
  "0-1": "Less than 1 year",
  "1-2": "1-2 years",
  "2-3": "2-3 years",
  "3+": "3+ years",
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

export async function POST(request: NextRequest) {
  try {
    const body: SelfEmployedEnquiry = await request.json();

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

    // Parse numeric values
    const netProfitNum = parseAmount(body.netProfit);
    const salaryDividendsNum = parseAmount(body.salaryDividends);
    const propertyValueNum = parseAmount(body.propertyValue);
    const shareholdingNum = body.shareholding
      ? parseFloat(body.shareholding.replace(/%/g, ""))
      : null;

    // Calculate potential borrowing estimates
    let traditionalBorrowing: number | null = null;
    let specialistBorrowing: number | null = null;
    let potentialExtraBorrowing: number | null = null;

    if (salaryDividendsNum && netProfitNum && shareholdingNum) {
      // Traditional: salary + dividends × 4.5
      traditionalBorrowing = Math.round(salaryDividendsNum * 4.5);

      // Specialist: salary portion + share of net profit after corp tax (approx 75%)
      const salaryPortion = 12570; // Assuming NI threshold salary
      const profitShare = (netProfitNum * 0.75 * shareholdingNum) / 100;
      const specialistIncome = salaryPortion + profitShare;
      specialistBorrowing = Math.round(specialistIncome * 4.5);

      potentialExtraBorrowing = specialistBorrowing - traditionalBorrowing;
    }

    // Generate unique enquiry ID
    const enquiryId = generateEnquiryId("SE");

    // Calculate priority
    const priority = calculatePriority("self-employed", {
      companyType: body.companyType,
      yearsTrading: body.yearsTrading,
      propertyValue: body.propertyValue,
      message: body.message,
    });

    // Build enquiry details for storage/notification
    const enquiryDetails = {
      companyType: companyTypeLabels[body.companyType || ""] || body.companyType || "Not specified",
      yearsTrading: yearsTradingLabels[body.yearsTrading || ""] || body.yearsTrading || "Not specified",
      netProfit: formatCurrency(netProfitNum) || body.netProfit || "Not provided",
      salaryDividends: formatCurrency(salaryDividendsNum) || body.salaryDividends || "Not provided",
      shareholding: shareholdingNum ? `${shareholdingNum}%` : "Not provided",
      propertyValue: formatCurrency(propertyValueNum) || body.propertyValue || "Not provided",
      estimatedTraditionalBorrowing: formatCurrency(traditionalBorrowing),
      estimatedSpecialistBorrowing: formatCurrency(specialistBorrowing),
      potentialExtraBorrowing: formatCurrency(potentialExtraBorrowing),
      additionalInfo: body.message || "None provided",
    };

    // Full enquiry record (would be saved to database in production)
    const enquiry = {
      id: enquiryId,
      type: "self-employed",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      ...enquiryDetails,
      source: body.source || "company-directors-page",
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    // Store enquiry for admin dashboard
    storeEnquiry({
      id: enquiryId,
      type: "self-employed",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    });

    console.log("Self-Employed Enquiry received:", enquiry);

    // Send email notifications
    const notificationPayload: NotificationPayload = {
      type: "self-employed",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      enquiryId,
      subject: `New Self-Employed Mortgage Enquiry - ${body.name}`,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    };

    const emailResults = await sendNotifications(notificationPayload);

    // Trigger webhooks for CRM integration
    const webhookResults = await triggerWebhooks(
      "enquiry.created",
      {
        id: enquiryId,
        type: "self-employed",
        priority,
        status: "new",
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: enquiryDetails,
        submittedAt: enquiry.submittedAt,
      },
      { page: body.source || "self-employed-page" }
    );

    console.log(`[WEBHOOK] Triggered ${webhookResults.length} webhooks for ${enquiryId}`);

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name: body.name,
      email: body.email,
      phone: body.phone,
      propertyValue: propertyValueNum || undefined,
      annualIncome: salaryDividendsNum || undefined,
      employmentStatus: "self-employed",
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit self-employed lead:", supabaseResult.error);
    }

    // Prepare response with helpful next steps
    const getNextSteps = (): string[] => {
      const steps = [
        "A specialist adviser will review your enquiry",
        "We'll call you within 2 hours (business hours)",
      ];

      if (body.companyType === "multiple-companies" || body.companyType === "holding-company") {
        steps.push("Prepare accounts for each company if available");
        steps.push("We'll discuss how to consolidate your income");
      } else if (body.yearsTrading === "0-1") {
        steps.push("Have your latest accounts or management figures ready");
        steps.push("Contract documentation can help with newer businesses");
      } else {
        steps.push("Have your SA302 and company accounts ready if available");
        steps.push("We'll find lenders who use the net profit approach");
      }

      return steps;
    };

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: enquiryId,
        name: body.name,
        priority,
        companyType: enquiryDetails.companyType,
        estimatedBorrowing: {
          traditional: formatCurrency(traditionalBorrowing),
          specialist: formatCurrency(specialistBorrowing),
          potentialExtra: formatCurrency(potentialExtraBorrowing),
        },
        nextSteps: getNextSteps(),
        estimatedCallback: "Within 2 hours during business hours (Mon-Fri 9am-7pm, Sat 10am-4pm)",
        emailsSent: {
          team: emailResults.teamEmail.sent,
          customer: emailResults.customerEmail.sent,
        },
      },
    });
  } catch (error) {
    console.error("Self-Employed Enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Self-Employed Enquiry API - POST your enquiry data to this endpoint",
    requiredFields: ["name", "email", "phone"],
    optionalFields: [
      "companyType",
      "yearsTrading",
      "netProfit",
      "salaryDividends",
      "shareholding",
      "propertyValue",
      "message",
    ],
    companyTypeOptions: Object.entries(companyTypeLabels).map(([value, label]) => ({
      value,
      label,
    })),
    yearsTradingOptions: Object.entries(yearsTradingLabels).map(([value, label]) => ({
      value,
      label,
    })),
    features: [
      "Automatic borrowing estimates (traditional vs specialist)",
      "Priority scoring based on complexity",
      "Email notifications to team and customer",
    ],
  });
}
