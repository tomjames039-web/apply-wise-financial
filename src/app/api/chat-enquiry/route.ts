import { NextResponse } from "next/server";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

// In-memory store for enquiries (in production, use a database)
const enquiries: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  query: string;
  source: string;
  timestamp: string;
  status: string;
}> = [];

// Email notification function (placeholder - connect to SendGrid, Resend, etc.)
async function sendEmailNotification(enquiry: {
  name: string;
  phone: string;
  email: string;
  query: string;
  reference: string;
}) {
  // TODO: Replace with actual email service integration
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Apply Wise <notifications@apply-wise.co.uk>',
  //   to: ['info@apply-wise.co.uk'],
  //   subject: `New Chat Enquiry: ${enquiry.name}`,
  //   html: `...email template...`
  // });

  console.log("\n📧 EMAIL NOTIFICATION WOULD BE SENT:");
  console.log(`To: info@apply-wise.co.uk`);
  console.log(`Subject: New Chat Enquiry from ${enquiry.name}`);
  console.log(`Body:
    Name: ${enquiry.name}
    Phone: ${enquiry.phone}
    Email: ${enquiry.email}
    Query: ${enquiry.query}
    Reference: ${enquiry.reference}

    Reply to this customer ASAP!
  `);

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, query, source, timestamp } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create enquiry reference
    const enquiryRef = `CHAT-${Date.now().toString(36).toUpperCase()}`;
    const enquiryTime = timestamp || new Date().toISOString();

    // Store the enquiry
    const newEnquiry = {
      id: enquiryRef,
      name,
      phone,
      email,
      query: query || "Not specified",
      source: source || "chatbot",
      timestamp: enquiryTime,
      status: "new",
    };

    enquiries.push(newEnquiry);

    // Log the enquiry with clear formatting
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║     🔔 NEW CHAT ENQUIRY - ACTION NEEDED    ║");
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Reference: ${enquiryRef.padEnd(30)}║`);
    console.log(`║ Time: ${new Date(enquiryTime).toLocaleString("en-GB").padEnd(35)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Name:  ${name.padEnd(34)}║`);
    console.log(`║ Phone: ${phone.padEnd(34)}║`);
    console.log(`║ Email: ${email.padEnd(34)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Query: ${(query || "Not specified").substring(0, 34).padEnd(34)}║`);
    if (query && query.length > 34) {
      console.log(`║        ${query.substring(34, 68).padEnd(34)}║`);
    }
    console.log("╚════════════════════════════════════════════╝\n");

    // Send email notification (async, don't wait)
    sendEmailNotification({
      name,
      phone,
      email,
      query: query || "Not specified",
      reference: enquiryRef,
    }).catch(console.error);

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name,
      email,
      phone,
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit chat lead:", supabaseResult.error);
    }

    return NextResponse.json({
      success: true,
      data: {
        reference: enquiryRef,
        message: "Enquiry received. We will be in touch shortly.",
      },
    });
  } catch (error) {
    console.error("Chat enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all enquiries (for admin review)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format === "summary") {
    // Return summary for quick review
    const summary = enquiries.map(e => ({
      id: e.id,
      name: e.name,
      phone: e.phone,
      time: new Date(e.timestamp).toLocaleString("en-GB"),
      status: e.status,
    }));

    return NextResponse.json({
      total: enquiries.length,
      enquiries: summary,
    });
  }

  // Return full details
  return NextResponse.json({
    total: enquiries.length,
    enquiries: enquiries.slice().reverse(), // Newest first
    note: "Enquiries are stored in memory and will reset when server restarts. Connect to a database for persistence.",
  });
}
