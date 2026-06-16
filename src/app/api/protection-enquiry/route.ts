import { NextResponse } from "next/server";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

// In-memory storage (replace with database in production)
const protectionEnquiries: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  protectionType: string;
  message: string;
  submittedAt: string;
  status: string;
}> = [];

// Send email notification
async function sendEmailNotification(enquiry: {
  name: string;
  email: string;
  phone: string;
  protectionType: string;
  message: string;
}) {
  // Send via Resend if API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "info@apply-wise.co.uk";

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Apply Wise <notifications@apply-wise.co.uk>",
          to: [notificationEmail],
          subject: `New Protection Enquiry: ${enquiry.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1a1f2e; padding: 20px; text-align: center;">
                <h1 style="color: #d4a853; margin: 0;">New Protection Enquiry</h1>
              </div>
              <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #1a1f2e; margin-top: 0;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Name:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${enquiry.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Type:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${enquiry.protectionType}</td>
                  </tr>
                </table>
                ${enquiry.message ? `
                  <h3 style="color: #1a1f2e; margin-top: 20px;">Funnel Data</h3>
                  <pre style="background: #fff; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px;">${enquiry.message}</pre>
                ` : ""}
                <div style="margin-top: 30px; text-align: center;">
                  <a href="tel:${enquiry.phone}" style="display: inline-block; background: #d4a853; color: #1a1f2e; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Call Now</a>
                </div>
              </div>
              <div style="background: #1a1f2e; padding: 15px; text-align: center;">
                <p style="color: #888; margin: 0; font-size: 12px;">This is an automated notification from Apply Wise Financial</p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        console.error("[EMAIL] Failed to send notification:", await response.text());
      } else {
        console.log("[EMAIL] Notification sent successfully");
      }
    } catch (error) {
      console.error("[EMAIL] Error sending notification:", error);
    }
  }

  // Log to console
  console.log("=== NEW PROTECTION ENQUIRY ===");
  console.log("Name:", enquiry.name);
  console.log("Email:", enquiry.email);
  console.log("Phone:", enquiry.phone);
  console.log("Protection Type:", enquiry.protectionType);
  console.log("Message:", enquiry.message);
  console.log("Submitted at:", new Date().toISOString());
  console.log("==============================");
}

// Send to GHL (GoHighLevel) webhook
async function sendToGHL(data: Record<string, unknown>) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[GHL] No webhook URL configured, skipping...");
    return { success: false, error: "No webhook URL configured" };
  }

  try {
    // Format data for GHL
    const ghlPayload = {
      // Contact fields
      firstName: data.firstName || data.name,
      email: data.email,
      phone: data.phone,

      // Custom fields - protection funnel data
      customField: {
        scenario: data.scenario,
        mortgage: data.mortgage,
        dependents: data.dependents,
        income: data.income,
        sickPay: data.sickPay,
        savings: data.savings,
        age: data.age,
        smoker: data.smoker,
        estimatedRange: data.estimatedRange,
        riskFlags: Array.isArray(data.riskFlags) ? data.riskFlags.join(", ") : data.riskFlags,
      },

      // Source tracking
      source: "Protection Funnel",
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,

      // Tags
      tags: ["protection", "funnel-lead"],

      // Timestamp
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[GHL] Webhook failed:", errorText);
      return { success: false, error: errorText };
    }

    console.log("[GHL] Webhook sent successfully");
    return { success: true };
  } catch (error) {
    console.error("[GHL] Webhook error:", error);
    return { success: false, error: String(error) };
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ["name", "email", "phone"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create enquiry record
    const enquiry = {
      id: `PROT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      protectionType: data.protectionType || "Protection Funnel",
      message: data.message || "",
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    // Store enquiry
    protectionEnquiries.push(enquiry);

    // Send email notification
    await sendEmailNotification(enquiry);

    // Send to GHL webhook
    const ghlResult = await sendToGHL({
      ...data,
      firstName: data.name,
    });

    // Submit to Supabase CRM (protection = insurance, not a mortgage enquiry).
    // isNonMortgageLead → no fabricated mortgage figures are sent.
    const supabaseResult = await submitLeadToSupabase({
      name: data.name,
      email: data.email,
      phone: data.phone,
      isNonMortgageLead: true,
      submissionType: "protection-enquiry",
      // UTM tracking from client
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      referrer: data.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit protection lead:", supabaseResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Protection enquiry submitted successfully",
      enquiryId: enquiry.id,
      supabaseSubmitted: supabaseResult.success,
      ghlSubmitted: ghlResult.success,
    });
  } catch (error) {
    console.error("Error processing protection enquiry:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: protectionEnquiries,
    count: protectionEnquiries.length,
  });
}
