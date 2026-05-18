import { NextRequest, NextResponse } from "next/server";
import {
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
} from "@/lib/notifications";

// Simple auth check - in production, use proper authentication
const checkAuth = (request: NextRequest): boolean => {
  const authHeader = request.headers.get("authorization");
  const adminToken = process.env.ADMIN_API_TOKEN || "apply-wise-admin-2024";

  // For development, allow without auth
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return authHeader === `Bearer ${adminToken}`;
};

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const id = searchParams.get("id");

  // Get single enquiry by ID
  if (id) {
    const enquiry = getEnquiry(id);
    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: enquiry });
  }

  // Get all enquiries with optional filtering
  let enquiries = getAllEnquiries();

  if (type) {
    enquiries = enquiries.filter((e) => e.type === type);
  }

  if (status) {
    enquiries = enquiries.filter((e) => e.status === status);
  }

  if (priority) {
    enquiries = enquiries.filter((e) => e.priority === priority);
  }

  // Calculate stats
  const stats = {
    total: enquiries.length,
    byStatus: {
      new: enquiries.filter((e) => e.status === "new").length,
      contacted: enquiries.filter((e) => e.status === "contacted").length,
      inProgress: enquiries.filter((e) => e.status === "in-progress").length,
      completed: enquiries.filter((e) => e.status === "completed").length,
      closed: enquiries.filter((e) => e.status === "closed").length,
    },
    byType: {
      "self-employed": enquiries.filter((e) => e.type === "self-employed").length,
      "bad-credit": enquiries.filter((e) => e.type === "bad-credit").length,
      btl: enquiries.filter((e) => e.type === "btl").length,
      "equity-release": enquiries.filter((e) => e.type === "equity-release").length,
    },
    byPriority: {
      HIGH: enquiries.filter((e) => e.priority === "HIGH").length,
      MEDIUM: enquiries.filter((e) => e.priority === "MEDIUM").length,
      STANDARD: enquiries.filter((e) => e.priority === "STANDARD").length,
    },
  };

  return NextResponse.json({
    success: true,
    data: {
      enquiries,
      stats,
    },
  });
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Enquiry ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["new", "contacted", "in-progress", "completed", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const success = updateEnquiryStatus(id, status);

    if (!success) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry ${id} status updated to ${status}`,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
