import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendAdminNotification,
  sendCustomerEmail,
  commissionAdminEmail,
  commissionConfirmationEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("commission_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      budget: data.budget,
      artwork_size: data.artwork_size,
      preferred_style: data.preferred_style,
      description: data.description,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await sendAdminNotification(
      `New Commission Request from ${data.name}`,
      commissionAdminEmail(data)
    );

    await sendCustomerEmail(
      data.email,
      "Commission Request Received — Artsy Rahgeer",
      commissionConfirmationEmail(data.name)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Commission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
