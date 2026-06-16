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

// Internal notification to the Apply Wise team.
// IMPORTANT: This is an EMPLOYER BENEFIT lead - NOT a mortgage client.
// Only employer-relevant fields are shown (no mortgage figures).
async function sendTeamNotification(enquiry: {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  employees: string;
  employeeCount?: string;
  staffCommsMethod?: string;
  message?: string;
  sourceUrl?: string;
  submittedAt?: string;
  utm?: UTMParams;
}) {
  if (!resend) {
    console.log("📧 Email skipped (no RESEND_API_KEY):", enquiry.businessName);
    return false;
  }

  const submitted = enquiry.submittedAt
    ? new Date(enquiry.submittedAt).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })
    : new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" });

  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:10px 16px; border-bottom:1px solid #e5e7eb; color:#6b7280; font-size:14px; width:42%;">${label}</td>
           <td style="padding:10px 16px; border-bottom:1px solid #e5e7eb; color:#0B1F3A; font-size:14px; font-weight:600;">${value}</td>
         </tr>`
      : "";

  try {
    await resend.emails.send({
      from: "Apply Wise <notifications@apply-wise.co.uk>",
      to: ["info@apply-wise.co.uk"],
      replyTo: enquiry.email,
      subject: `New Employer Benefit Lead - Not a Mortgage Lead — ${enquiry.businessName}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:600px; margin:0 auto; background:#ffffff;">
          <div style="background:#0B1F3A; padding:24px 28px;">
            <h1 style="color:#D4A524; margin:0; font-size:20px;">New Employer Benefit Lead</h1>
            <p style="color:#ffffff; margin:6px 0 0; font-size:13px; font-weight:600; letter-spacing:0.03em;">⚠️ EMPLOYER BENEFIT REGISTRATION — NOT A MORTGAGE LEAD</p>
          </div>

          <div style="padding:24px 28px;">
            <p style="margin:0 0 16px;">
              <span style="background:#D4A524; color:#0B1F3A; padding:6px 12px; border-radius:6px; font-size:13px; font-weight:700;">Ref: ${enquiry.id}</span>
            </p>

            <p style="color:#4a5568; font-size:14px; line-height:1.6; margin:0 0 20px;">
              A business has registered to offer Apply Wise mortgage support as a staff benefit.
              This is <strong>not</strong> a mortgage enquiry and the person has <strong>not</strong> provided any mortgage details.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
              ${row("Contact name", enquiry.fullName)}
              ${row("Company name", enquiry.businessName)}
              ${row("Email", `<a href="mailto:${enquiry.email}" style="color:#0B1F3A;">${enquiry.email}</a>`)}
              ${row("Phone", `<a href="tel:${enquiry.phone}" style="color:#0B1F3A;">${enquiry.phone}</a>`)}
              ${row("Approx. employees", enquiry.employeeCount && enquiry.employeeCount !== "not-specified" ? enquiry.employeeCount : undefined)}
              ${row("Preferred staff comms", enquiry.staffCommsMethod)}
              ${row("Optional message", enquiry.message)}
              ${row("Source URL", enquiry.sourceUrl)}
              ${row("UTM source", enquiry.utm?.utm_source)}
              ${row("UTM medium", enquiry.utm?.utm_medium)}
              ${row("UTM campaign", enquiry.utm?.utm_campaign)}
              ${row("Submitted", submitted)}
            </table>

            <div style="margin-top:24px; text-align:center;">
              <a href="tel:${enquiry.phone}" style="display:inline-block; background:#0B1F3A; color:#D4A524; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px;">
                📞 Call ${enquiry.fullName.split(" ")[0]}
              </a>
            </div>
          </div>

          <div style="background:#f5f3ef; padding:16px 28px; text-align:center;">
            <p style="color:#8a8a8a; font-size:12px; margin:0;">Employer Benefit registration via /business — not a mortgage enquiry.</p>
          </div>
        </div>
      `,
    });
    console.log("📧 Employer-lead notification sent for:", enquiry.businessName);
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
    const firstName = enquiry.fullName.split(" ")[0];
    await resend.emails.send({
      from: "Apply Wise <hello@apply-wise.co.uk>",
      to: [enquiry.email],
      replyTo: "info@apply-wise.co.uk",
      subject: `🎉 Congratulations ${firstName} — you're giving your team a brilliant benefit`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0; padding:0; background-color:#f5f3ef; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3ef; padding:24px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(11,31,58,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0B1F3A 0%,#13294d 100%); padding:48px 40px 40px; text-align:center;">
                      <div style="font-size:48px; line-height:1; margin-bottom:12px;">🎉</div>
                      <h1 style="margin:0; color:#D4A524; font-size:26px; font-weight:700; letter-spacing:-0.02em;">Welcome aboard, ${firstName}!</h1>
                      <p style="margin:12px 0 0; color:rgba(255,255,255,0.7); font-size:15px; letter-spacing:0.04em;">You've just done something great for your team</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 18px; color:#0B1F3A; font-size:16px;">Hi ${firstName},</p>

                      <p style="margin:0 0 18px; color:#0B1F3A; font-size:17px; line-height:1.6;">
                        Congratulations — <strong>${enquiry.businessName}</strong> is now registered for the Apply Wise Employer Mortgage Benefit.
                      </p>

                      <p style="margin:0 0 18px; color:#4a5568; font-size:16px; line-height:1.7;">
                        This gives your employees access to mortgage support from an FCA-regulated mortgage adviser, with the standard Apply Wise broker fee waived for eligible employees of registered businesses.
                      </p>

                      <p style="margin:0 0 28px; color:#0B1F3A; font-size:16px; line-height:1.7; font-weight:600;">
                        That means your staff could save up to £695 where our standard broker fee would normally apply.
                      </p>

                      <p style="margin:0 0 28px; color:#4a5568; font-size:16px; line-height:1.7;">
                        Money worries are one of the biggest sources of stress for employees. By offering this benefit, you are giving your team practical access to clear, professional mortgage support when buying, remortgaging, moving home, reviewing a product transfer, or considering buy-to-let.
                      </p>

                      <!-- Benefit highlight -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fdf6e3 0%,#faf0d2 100%); border-radius:12px; border:1px solid #f0e0a8; margin-bottom:28px;">
                        <tr>
                          <td style="padding:24px 28px;">
                            <p style="margin:0 0 14px; color:#0B1F3A; font-size:15px; font-weight:700;">What your employees can access:</p>
                            <table cellpadding="0" cellspacing="0" width="100%">
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Free initial mortgage review</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Standard Apply Wise broker fee waived for eligible employees</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Potential saving of up to £695 where our standard broker fee would normally apply</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Support with purchases, remortgages, product transfers and buy-to-let</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Access to a wide range of lenders through Apply Wise</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;Help understanding affordability, credit position and mortgage options</td></tr>
                              <tr><td style="padding:5px 0; color:#5c4a1a; font-size:15px; line-height:1.5;">✓&nbsp;&nbsp;No fee for product transfers or insurance advice</td></tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- What happens next -->
                      <p style="margin:0 0 16px; color:#0B1F3A; font-size:16px; font-weight:700;">What happens next:</p>
                      <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                        <tr>
                          <td style="vertical-align:top; width:36px; padding:0 0 16px;"><div style="width:28px; height:28px; background:#D4A524; border-radius:50%; color:#0B1F3A; font-weight:700; font-size:14px; text-align:center; line-height:28px;">1</div></td>
                          <td style="vertical-align:top; padding:0 0 16px; color:#4a5568; font-size:15px; line-height:1.5;">We will contact you to confirm a few details about your business and team size.</td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top; width:36px; padding:0 0 16px;"><div style="width:28px; height:28px; background:#D4A524; border-radius:50%; color:#0B1F3A; font-weight:700; font-size:14px; text-align:center; line-height:28px;">2</div></td>
                          <td style="vertical-align:top; padding:0 0 16px; color:#4a5568; font-size:15px; line-height:1.5;">We will create your employer benefit setup, including a dedicated staff link, QR code and ready-to-share staff materials.</td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top; width:36px; padding:0 0 16px;"><div style="width:28px; height:28px; background:#D4A524; border-radius:50%; color:#0B1F3A; font-weight:700; font-size:14px; text-align:center; line-height:28px;">3</div></td>
                          <td style="vertical-align:top; padding:0 0 16px; color:#4a5568; font-size:15px; line-height:1.5;">You share the benefit with your team using the materials we provide.</td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top; width:36px; padding:0 0 16px;"><div style="width:28px; height:28px; background:#D4A524; border-radius:50%; color:#0B1F3A; font-weight:700; font-size:14px; text-align:center; line-height:28px;">4</div></td>
                          <td style="vertical-align:top; padding:0 0 16px; color:#4a5568; font-size:15px; line-height:1.5;">Each month, we will send you a short staff reminder/newsletter. To keep the benefit active and visible, we ask that you forward this to your employees, add it to your staff WhatsApp group, or place it on your staff noticeboard.</td>
                        </tr>
                      </table>

                      <p style="margin:0 0 28px; color:#4a5568; font-size:15px; line-height:1.7; font-style:italic;">
                        This monthly reminder is important because it ensures your employees know the benefit is available when they need it.
                      </p>

                      <!-- Reference -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef; border-radius:10px; margin-bottom:24px;">
                        <tr>
                          <td style="padding:16px 20px; text-align:center;">
                            <p style="margin:0 0 4px; color:#8a8a8a; font-size:13px;">Your reference</p>
                            <p style="margin:0; color:#0B1F3A; font-size:18px; font-weight:700; letter-spacing:0.05em;">${enquiry.id}</p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0; color:#4a5568; font-size:15px; line-height:1.6;">
                        Got a question before we call? Just reply to this email or call us on
                        <a href="tel:01992535555" style="color:#D4A524; text-decoration:none; font-weight:600;">01992 535 555</a>.
                      </p>
                      <p style="margin:20px 0 0; color:#0B1F3A; font-size:15px;">Speak soon,<br /><strong>The Apply Wise Team</strong></p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#0B1F3A; padding:24px 40px; text-align:center;">
                      <p style="margin:0 0 12px; color:rgba(255,255,255,0.7); font-size:12px;">FCA Regulated&nbsp;&nbsp;•&nbsp;&nbsp;Whole of Market</p>
                      <p style="margin:0 0 10px; color:rgba(255,255,255,0.45); font-size:11px; line-height:1.6;">
                        Apply Wise Financial Limited is an Appointed Representative of Scott &amp; Goose LLP, which is authorised and regulated by the Financial Conduct Authority under Firm Reference Number 661183.
                      </p>
                      <p style="margin:0; color:rgba(255,255,255,0.45); font-size:11px; line-height:1.6;">
                        Your home may be repossessed if you do not keep up repayments on your mortgage.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
      employeeCount,
      staffCommsMethod = "",
      message = "",
      businessType = "Employer Benefits Registration",
      source = "direct",
      sourceUrl = "",
      leadType = "employer_contact", // Distinguishes from mortgage leads
      utm_source = "",
      utm_medium = "",
      utm_campaign = "",
      utm_term = "",
      utm_content = "",
    } = body;

    // Approx employee count (new field) with backward-compat fallback to `employees`
    const employeesValue = employeeCount || employees || "not-specified";

    // Validate required fields (only contact essentials are required;
    // employer did NOT provide mortgage details and that's expected)
    if (!fullName || !businessName || !email || !phone) {
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
    const submittedAt = new Date().toISOString();
    const newEnquiry = {
      id: enquiryRef,
      fullName,
      businessName,
      email,
      phone,
      employees: employeesValue,
      employeeCount: employeesValue,
      staffCommsMethod,
      message,
      sourceUrl,
      businessType,
      timestamp: submittedAt,
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
    console.log(`║ Employees:     ${String(employeesValue).padEnd(27)}║`);
    console.log(`║ Business Type: ${String(businessType).padEnd(27)}║`);

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

    // Send notifications - AWAIT so they reliably fire in Netlify's serverless
    // functions (fire-and-forget gets cut off when the function returns).
    // allSettled ensures one failure doesn't block the others.
    await Promise.allSettled([
      sendTeamNotification({ ...newEnquiry, submittedAt, utm }),
      sendConfirmationEmail({
        id: newEnquiry.id,
        fullName: newEnquiry.fullName,
        businessName: newEnquiry.businessName,
        email: newEnquiry.email,
      }),
      sendToCRM(newEnquiry),
    ]);

    // Submit to the central CRM as an EMPLOYER BENEFIT lead.
    // isEmployerLead → no mortgage fields are sent; tagged via submissionType
    // "employer-benefits". leadSource defaults to "apply-wise.co.uk".
    const nameParts = fullName.trim().split(/\s+/);
    const supabaseResult = await submitLeadToSupabase({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" ") || "",
      email,
      phone,
      isEmployerLead: true,
      companyName: businessName,
      employeeCount: employeesValue,
      staffCommsMethod,
      notes: message,
      landingPage: sourceUrl || "https://apply-wise.co.uk/business",
      // Real attribution only - channel info, not the form type
      utmSource: utm_source || null,
      utmMedium: utm_medium || null,
      utmCampaign: utm_campaign || null,
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
