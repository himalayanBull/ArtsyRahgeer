"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
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
        <h3 className="font-serif text-2xl mb-4">Message Sent</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. I&apos;ll get back to you within 48 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="name"
          name="name"
          label="Name"
          placeholder="Your name"
          required
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <Input
        id="subject"
        name="subject"
        label="Subject"
        placeholder="What is this regarding?"
        required
      />
      <Textarea
        id="message"
        name="message"
        label="Message"
        placeholder="Tell me about your inquiry..."
        required
      />
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
