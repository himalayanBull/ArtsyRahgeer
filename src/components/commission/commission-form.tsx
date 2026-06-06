"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function CommissionForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const supabase = createClient();
    const { error } = await supabase.from("commission_requests").insert({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      budget: formData.get("budget") as string,
      artwork_size: formData.get("artwork_size") as string,
      preferred_style: formData.get("preferred_style") as string,
      description: formData.get("description") as string,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
      form.reset();
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif text-2xl mb-4">Request Submitted</h3>
        <p className="text-muted-foreground">
          Thank you for your interest in a commission. I&apos;ll review your
          request and respond within 3-5 business days.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="name" name="name" label="Full Name" placeholder="Your name" required />
        <Input id="email" name="email" label="Email" type="email" placeholder="your@email.com" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="phone" name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        <Input id="budget" name="budget" label="Budget Range" placeholder="e.g. $3,000 - $5,000" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="artwork_size" name="artwork_size" label="Desired Size" placeholder="e.g. 80 × 60 cm" />
        <Input id="preferred_style" name="preferred_style" label="Preferred Style" placeholder="e.g. Abstract, Landscape" />
      </div>
      <Textarea
        id="description"
        name="description"
        label="Describe Your Vision"
        placeholder="Tell me about the artwork you'd like created. Include details about colors, subject matter, mood, where it will be displayed, and any reference images or inspirations..."
        className="min-h-[180px]"
        required
      />
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Submit Commission Request"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
