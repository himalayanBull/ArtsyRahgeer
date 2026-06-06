import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminNotification, contactAdminEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await sendAdminNotification(
      `New Contact: ${data.subject}`,
      contactAdminEmail(data)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
