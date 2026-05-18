import { NextResponse } from "next/server";
import { Resend } from "resend";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

// Initialize Resend (will be undefined if no API key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// UTM parameters type
interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// In-memory store for business/employer enquiries (in production, use a database)
const businessEnquiries: Array<{
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  employees: string;
  businessType: string;
  timestamp: string;
  status: string;
  source: string;
  leadType: string; // "employer_contact" - NOT a mortgage lead
  utm: UTMParams;
}> = [];

// Email notification to Apply Wise team
async function sendTeamNotification(enquiry: {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  employees: string;
  businessType: string;
  leadType?: string;
  utm?: UTMParams;
}) {
  if (!resend) {
    console.log("📧 Email skipped (no RESEND_API_KEY):", enquiry.businessName);
    return false;
  }

  try {
    const utmInfo = enquiry.utm?.utm_source
      ? `
        <h3 style="color: #D4A524; margin-top: 20px;">Campaign Tracking</h3>
        <p><strong>Source:</strong> ${enquiry.utm.utm_source || "N/A"}</p>
        <p><strong>Medium:</strong> ${enquiry.utm.utm_medium || "N/A"}</p>
        <p><strong>Campaign:</strong> ${enquiry.utm.utm_campaign || "N/A"}</p>
      `
      : "";

    await resend.emails.send({
      from: "Apply Wise <notifications@apply-wise.co.uk>",
      to: ["info@apply-wise.co.uk"],
      subject: `🏢 EMPLOYER BENEFITS: ${enquiry.businessName} (Not a mortgage lead)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1F3A; padding: 20px; text-align: center;">
            <h1 style="color: #D4A524; margin: 0;">New Employer Benefits Registration</h1>
            <p style="color: #fff; margin: 8px 0 0 0; font-size: 14px;">⚠️ This is an EMPLOYER contact - NOT a mortgage lead</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="background: #D4A524; color: #0B1F3A; padding: 10px 15px; border-radius: 5px; display: inline-block;">
              <strong>Reference:</strong> ${enquiry.id}
            </p>

            <h3 style="color: #0B1F3A; border-bottom: 2px solid #D4A524; padding-bottom: 10px;">Contact Details</h3>
            <p><strong>Name:</strong> ${enquiry.fullName}</p>
            <p><strong>Business:</strong> ${enquiry.businessName}</p>
            <p><strong>Email:</strong> <a href="mailto:${enquiry.email}">${enquiry.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${enquiry.phone}">${enquiry.phone}</a></p>

            <h3 style="color: #0B1F3A; border-bottom: 2px solid #D4A524; padding-bottom: 10px; margin-top: 20px;">Business Info</h3>
            <p><strong>Number of Employees:</strong> ${enquiry.employees}</p>
            <p><strong>Business Type:</strong> ${enquiry.businessType}</p>

            ${utmInfo}

            <div style="margin-top: 30px; padding: 15px; background: #0B1F3A; border-radius: 5px; text-align: center;">
              <a href="tel:${enquiry.phone}" style="color: #D4A524; text-decoration: none; font-weight: bold;">
                📞 Call ${enquiry.fullName} Now
              </a>
            </div>
          </div>
          <div style="background: #0B1F3A; padding: 15px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Submitted via Business Benefits Landing Page
            </p>
          </div>
        </div>
      `,
    });
    console.log("📧 Team notification sent for:", enquiry.businessName);
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
}

// Confirmation email to the business
async function sendConfirmationEmail(enquiry: {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
}) {
  if (!resend) {
    console.log("📧 Confirmation skipped (no RESEND_API_KEY):", enquiry.email);
    return false;
  }

  try {
    await resend.emails.send({
      from: "Apply Wise <hello@apply-wise.co.uk>",
      to: [enquiry.email],
      subject: `Thanks for your enquiry, ${enquiry.fullName.split(" ")[0]}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1F3A; padding: 30px; text-align: center;">
            <h1 style="color: #D4A524; margin: 0;">Apply Wise</h1>
            <p style="color: #fff; margin: 10px 0 0 0;">Employee Mortgage Benefits</p>
          </div>
          <div style="padding: 30px; background: #fff;">
            <p>Hi ${enquiry.fullName.split(" ")[0]},</p>

            <p>Thanks for getting in touch about offering mortgage benefits to your team at <strong>${enquiry.businessName}</strong>.</p>

            <p>We've received your enquiry and one of our team will call you within <strong>24 hours</strong> to have a quick chat about how we can help.</p>

            <div style="background: #f5f3ef; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Your reference:</strong> ${enquiry.id}</p>
              <p style="margin: 0; font-size: 14px; color: #666;">Keep this for your records</p>
            </div>

            <p>In the meantime, if you have any questions, just reply to this email or call us on <a href="tel:01992535355" style="color: #D4A524;">01992 535 355</a>.</p>

            <p>Speak soon,<br><strong>The Apply Wise Team</strong></p>
          </div>
          <div style="background: #f5f3ef; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0 0 10px 0;">
              Apply Wise Financial Ltd | FCA Regulated | Whole of Market
            </p>
            <p style="margin: 0;">
              <a href="tel:01992535355" style="color: #D4A524;">01992 535 355</a> |
              <a href="mailto:info@apply-wise.co.uk" style="color: #D4A524;">info@apply-wise.co.uk</a>
            </p>
          </div>
        </div>
      `,
    });
    console.log("📧 Confirmation email sent to:", enquiry.email);
    return true;
  } catch (error) {
    console.error("Confirmation email error:", error);
    return false;
  }
}

// Webhook function for CRM integration
async function sendToCRM(enquiry: {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  employees: string;
  businessType: string;
}) {
  // In production, integrate with:
  // - HubSpot: https://developers.hubspot.com/
  // - Salesforce: https://developer.salesforce.com/
  // - Pipedrive: https://developers.pipedrive.com/
  // - Zapier Webhooks: https://zapier.com/

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "business_benefits_enquiry",
          data: enquiry,
          timestamp: new Date().toISOString(),
        }),
      });
      console.log("🔗 CRM webhook sent successfully");
    } catch (error) {
      console.error("CRM webhook error:", error);
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      businessName,
      email,
      phone,
      employees,
      businessType,
      source = "direct",
      leadType = "employer_contact", // Distinguishes from mortgage leads
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      utm_term = "",
      utm_content = "",
    } = body;

    // Validate required fields
    if (!fullName || !businessName || !email || !phone || !employees || !businessType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create enquiry reference
    const enquiryRef = `AWB-${Date.now().toString(36).toUpperCase()}`;

    // Collect UTM parameters
    const utm: UTMParams = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    };

    // Store the enquiry
    const newEnquiry = {
      id: enquiryRef,
      fullName,
      businessName,
      email,
      phone,
      employees,
      businessType,
      timestamp: new Date().toISOString(),
      status: "new",
      source,
      leadType, // "employer_contact" - NOT a mortgage lead
      utm,
    };

    businessEnquiries.push(newEnquiry);

    // Log the enquiry with clear formatting
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║   🏢 EMPLOYER BENEFITS REGISTRATION        ║");
    console.log("║   ⚠️  NOT A MORTGAGE LEAD                  ║");
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Reference: ${enquiryRef.padEnd(30)}║`);
    console.log(`║ Lead Type: ${leadType.padEnd(30)}║`);
    console.log(`║ Source:    ${source.padEnd(30)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Contact:  ${fullName.padEnd(32)}║`);
    console.log(`║ Business: ${businessName.padEnd(32)}║`);
    console.log(`║ Phone:    ${phone.padEnd(32)}║`);
    console.log(`║ Email:    ${email.padEnd(32)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Employees:     ${employees.padEnd(27)}║`);
    console.log(`║ Business Type: ${businessType.padEnd(27)}║`);

    // Log UTM parameters if present
    if (utm_source || utm_campaign) {
      console.log("╠════════════════════════════════════════════╣");
      console.log("║ 📊 UTM TRACKING                            ║");
      if (utm_source) console.log(`║ Source:   ${utm_source.padEnd(31)}║`);
      if (utm_medium) console.log(`║ Medium:   ${utm_medium.padEnd(31)}║`);
      if (utm_campaign) console.log(`║ Campaign: ${utm_campaign.padEnd(31)}║`);
      if (utm_term) console.log(`║ Term:     ${utm_term.padEnd(31)}║`);
      if (utm_content) console.log(`║ Content:  ${utm_content.padEnd(31)}║`);
    }
    console.log("╚════════════════════════════════════════════╝\n");

    // Send notifications (non-blocking)
    Promise.all([
      sendTeamNotification({ ...newEnquiry, leadType, utm }),
      sendConfirmationEmail({
        id: newEnquiry.id,
        fullName: newEnquiry.fullName,
        businessName: newEnquiry.businessName,
        email: newEnquiry.email,
      }),
      sendToCRM(newEnquiry),
    ]).catch(console.error);

    // Submit to Supabase CRM - parse full name into first/last
    // Note: This is marked as "business-owner" and utm_content includes "employer_benefits"
    // to distinguish from regular mortgage leads
    const nameParts = fullName.trim().split(/\s+/);
    const supabaseResult = await submitLeadToSupabase({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" ") || "-",
      email,
      phone,
      employmentStatus: "business-owner",
      // UTM tracking - include employer_benefits marker in utm_content
      utmSource: utm_source || "employer_benefits",
      utmMedium: utm_medium || "website",
      utmCampaign: utm_campaign || "employer_registration",
      referrer: body.referrer || null,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit business lead:", supabaseResult.error);
    }

    return NextResponse.json({
      success: true,
      data: {
        reference: enquiryRef,
        message: "Thank you for your enquiry. We'll be in touch within 24 hours to arrange a call.",
      },
    });
  } catch (error) {
    console.error("Business enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all business enquiries (for admin review)
export async function GET() {
  return NextResponse.json({
    total: businessEnquiries.length,
    enquiries: businessEnquiries,
    note: "Enquiries are stored in memory and will reset when server restarts. Connect to a database for persistence.",
  });
}
