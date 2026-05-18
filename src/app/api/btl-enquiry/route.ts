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

interface BTLEnquiry {
  propertyType: string;
  propertyValue: number;
  expectedRent: number;
  deposit: number;
  ownershipType: string;
  existingProperties: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
  postcode?: string;
  source?: string;
  submittedAt?: string;
  // Tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

// Property type labels
const propertyTypeLabels: Record<string, string> = {
  house: "House",
  flat: "Flat/Apartment",
  hmo: "HMO (House of Multiple Occupation)",
  "new-build": "New Build",
  commercial: "Commercial/Mixed Use",
};

// Ownership type labels
const ownershipTypeLabels: Record<string, string> = {
  personal: "Personal Name",
  "limited-company": "Limited Company (SPV)",
  partnership: "Partnership",
};

// Existing properties labels
const existingPropertiesLabels: Record<string, string> = {
  "0": "None - First BTL",
  "1-3": "1-3 Properties",
  "4-10": "4-10 Properties (Portfolio)",
  "10+": "10+ Properties (Large Portfolio)",
};

// Format currency for display
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export async function POST(request: NextRequest) {
  try {
    const body: BTLEnquiry = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name, email and phone are required" },
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

    // Generate unique enquiry ID
    const enquiryId = generateEnquiryId("BTL");

    // Calculate metrics
    const annualRent = (body.expectedRent || 0) * 12;
    const grossYield = body.propertyValue ? (annualRent / body.propertyValue) * 100 : 0;
    const ltv = body.propertyValue && body.deposit
      ? ((body.propertyValue - body.deposit) / body.propertyValue) * 100
      : 0;
    const loanAmount = body.propertyValue && body.deposit
      ? body.propertyValue - body.deposit
      : 0;

    // Calculate priority
    const priority = calculatePriority("btl", {
      propertyValue: body.propertyValue?.toString(),
      ownershipType: body.ownershipType,
      existingProperties: body.existingProperties,
    });

    // Add metadata
    const enquiry = {
      ...body,
      id: enquiryId,
      source: "buy-to-let-page",
      submittedAt: new Date().toISOString(),
      grossYield: grossYield.toFixed(2),
      ltv: ltv.toFixed(0),
      priority,
    };

    // Build details object
    const enquiryDetails = {
      propertyType: propertyTypeLabels[body.propertyType] || body.propertyType || "Not specified",
      propertyValue: body.propertyValue ? formatCurrency(body.propertyValue) : "Not provided",
      expectedRent: body.expectedRent ? `${formatCurrency(body.expectedRent)}/month` : "Not provided",
      deposit: body.deposit ? formatCurrency(body.deposit) : "Not provided",
      loanRequired: loanAmount ? formatCurrency(loanAmount) : "Not calculated",
      ltv: ltv ? `${ltv.toFixed(0)}%` : "Not calculated",
      grossYield: grossYield ? `${grossYield.toFixed(2)}%` : "Not calculated",
      ownershipType: ownershipTypeLabels[body.ownershipType] || body.ownershipType || "Not specified",
      existingProperties: existingPropertiesLabels[body.existingProperties] || body.existingProperties || "Not specified",
      timeframe: body.timeframe || "Not specified",
    };

    // Store enquiry for admin dashboard
    storeEnquiry({
      id: enquiryId,
      type: "btl",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    });

    console.log("BTL Enquiry received:", enquiry);

    // Send email notifications
    const notificationPayload: NotificationPayload = {
      type: "btl",
      priority,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      enquiryId,
      subject: `New Buy-to-Let Enquiry - ${body.name}`,
      details: enquiryDetails,
      submittedAt: enquiry.submittedAt,
    };

    const emailResults = await sendNotifications(notificationPayload);

    // Trigger webhooks for CRM integration
    const webhookResults = await triggerWebhooks(
      "enquiry.created",
      {
        id: enquiryId,
        type: "btl",
        priority,
        status: "new",
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: enquiryDetails,
        submittedAt: enquiry.submittedAt,
      },
      { page: "buy-to-let-page" }
    );

    console.log(`[WEBHOOK] Triggered ${webhookResults.length} webhooks for ${enquiryId}`);

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name: body.name,
      email: body.email,
      phone: body.phone,
      postcode: body.postcode,
      propertyValue: body.propertyValue,
      depositAmount: body.deposit,
      timeframe: body.timeframe,
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit BTL lead:", supabaseResult.error);
    }

    // Prepare next steps based on situation
    const getNextSteps = (): string[] => {
      const steps = [
        "A BTL specialist will review your enquiry",
        "We'll call you within 2 hours (business hours)",
      ];

      if (body.ownershipType === "limited-company") {
        steps.push("We'll discuss Ltd company BTL benefits and setup");
      }

      if (body.existingProperties === "4-10" || body.existingProperties === "10+") {
        steps.push("We'll review your portfolio and consolidation options");
      }

      if (body.propertyType === "hmo") {
        steps.push("We'll find HMO-specialist lenders for your property");
      }

      steps.push("We'll compare rates across 50+ BTL lenders");

      return steps;
    };

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: enquiryId,
        name: body.name,
        priority,
        estimatedYield: grossYield.toFixed(2),
        ltv: ltv.toFixed(0),
        loanAmount: loanAmount ? formatCurrency(loanAmount) : null,
        nextSteps: getNextSteps(),
        estimatedCallback: "Within 2 hours during business hours",
        emailsSent: {
          team: emailResults.teamEmail.sent,
          customer: emailResults.customerEmail.sent,
        },
      },
    });
  } catch (error) {
    console.error("BTL Enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "BTL Enquiry API - POST your enquiry data to this endpoint",
    requiredFields: ["name", "email", "phone"],
    optionalFields: [
      "propertyType",
      "propertyValue",
      "expectedRent",
      "deposit",
      "ownershipType",
      "existingProperties",
      "timeframe",
    ],
    propertyTypeOptions: Object.entries(propertyTypeLabels).map(([value, label]) => ({
      value,
      label,
    })),
    ownershipTypeOptions: Object.entries(ownershipTypeLabels).map(([value, label]) => ({
      value,
      label,
    })),
    features: [
      "Automatic yield and LTV calculations",
      "Priority scoring based on deal complexity",
      "Email notifications to team and customer",
    ],
  });
}
