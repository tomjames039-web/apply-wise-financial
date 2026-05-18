import { NextResponse } from "next/server";
import { submitLeadToSupabase } from "@/lib/supabase-leads";

// In-memory store for bookings (in production, use a database)
const bookings: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  notes: string;
  date: string;
  time: string;
  formattedDate: string;
  formattedTime: string;
  timestamp: string;
  status: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, topic, notes, date, time, formattedDate, formattedTime } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking reference
    const bookingRef = `AWF-${Date.now().toString(36).toUpperCase()}`;

    // Store the booking
    const newBooking = {
      id: bookingRef,
      name,
      phone,
      email,
      topic: topic || "General enquiry",
      notes: notes || "",
      date,
      time,
      formattedDate,
      formattedTime,
      timestamp: new Date().toISOString(),
      status: "confirmed",
    };

    bookings.push(newBooking);

    // Log the booking with clear formatting
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║     📅 NEW CALL BOOKING - ADD TO DIARY     ║");
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Reference: ${bookingRef.padEnd(30)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ 📆 Date: ${formattedDate.padEnd(32)}║`);
    console.log(`║ ⏰ Time: ${formattedTime.padEnd(32)}║`);
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Name:  ${name.padEnd(34)}║`);
    console.log(`║ Phone: ${phone.padEnd(34)}║`);
    console.log(`║ Email: ${email.padEnd(34)}║`);
    console.log(`║ Topic: ${(topic || "General").padEnd(34)}║`);
    if (notes) {
      console.log("╠════════════════════════════════════════════╣");
      console.log(`║ Notes: ${notes.substring(0, 34).padEnd(34)}║`);
    }
    console.log("╚════════════════════════════════════════════╝\n");

    // Submit to Supabase CRM
    const supabaseResult = await submitLeadToSupabase({
      name,
      email,
      phone,
      postcode: body.postcode,
      timeframe: "asap",
      // UTM tracking from client
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });

    if (!supabaseResult.success) {
      console.error("[SUPABASE] Failed to submit booking lead:", supabaseResult.error);
    }

    return NextResponse.json({
      success: true,
      data: {
        reference: bookingRef,
        appointment: {
          date: formattedDate,
          time: formattedTime,
        },
        message: "Your call has been booked successfully. We'll send a confirmation email shortly.",
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all bookings (for admin review)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upcoming = searchParams.get("upcoming");

  let result = bookings.slice();

  if (upcoming === "true") {
    const now = new Date();
    result = result.filter(b => new Date(b.date) >= now);
  }

  // Sort by date/time
  result.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return NextResponse.json({
    total: result.length,
    bookings: result,
    note: "Bookings are stored in memory and will reset when server restarts. Connect to a database for persistence.",
  });
}
