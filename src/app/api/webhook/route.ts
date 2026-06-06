import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const stripe = getStripe();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await supabaseAdmin.from("orders").insert({
      customer_name: session.customer_details?.name || "Unknown",
      customer_email: session.customer_details?.email || "",
      amount: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase() || "USD",
      payment_status: "completed",
      stripe_session_id: session.id,
    });
  }

  return NextResponse.json({ received: true });
}
