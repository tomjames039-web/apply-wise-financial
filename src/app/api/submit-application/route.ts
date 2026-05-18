import { NextResponse } from "next/server";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "postcode",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Log the submission
    console.log("=== NEW MORTGAGE APPLICATION ===");
    console.log("Application Type:", data.applicationType);
    console.log("Buyer Type:", data.buyerType);
    console.log("Property Value:", data.propertyValue);
    console.log("Deposit:", data.depositAmount);
    console.log("Employment:", data.employmentStatus);
    console.log("Income:", data.annualIncome);
    console.log("Name:", `${data.firstName} ${data.lastName}`);
    console.log("Email:", data.email);
    console.log("Phone:", data.phone);
    console.log("Postcode:", data.postcode);
    console.log("Callback Time:", data.callbackTime);
    console.log("Submitted at:", new Date().toISOString());
    console.log("================================");

    // Submit to Supabase CRM - this is the ONLY storage destination
    const supabaseResult = await submitLeadToSupabase({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      postcode: data.postcode,
      propertyValue: data.propertyValue,
      depositAmount: data.depositAmount,
      annualIncome: data.annualIncome,
      employmentStatus: data.employmentStatus,
      callbackTime: data.callbackTime,
      // UTM tracking from client
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      referrer: data.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit lead:", supabaseResult.error);
      // Return error to user - we need the Supabase submission to succeed
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit application. Please try again or call us directly."
        },
        { status: 500 }
      );
    }

    const applicationId = `AW-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId,
    });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}
