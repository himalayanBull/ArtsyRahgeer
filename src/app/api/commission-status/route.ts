import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendCustomerEmail, commissionStatusEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: commission } = await supabase
      .from("commission_requests")
      .select("name, email")
      .eq("id", id)
      .single();

    if (!commission) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { error } = await supabase
      .from("commission_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (status !== "pending") {
      await sendCustomerEmail(
        commission.email,
        `Commission Update — Artsy Rahgeer`,
        commissionStatusEmail(commission.name, status)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
