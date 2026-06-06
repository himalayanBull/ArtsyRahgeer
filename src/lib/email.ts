import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@artsyrahgeer.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Artsy Rahgeer <onboarding@resend.dev>";

export async function sendAdminNotification(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}

export async function sendCustomerEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

export function commissionAdminEmail(data: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  artwork_size: string;
  preferred_style: string;
  description: string;
}) {
  return `
    <h2>New Commission Request</h2>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
    <p><strong>Budget:</strong> ${data.budget}</p>
    <p><strong>Size:</strong> ${data.artwork_size || "Not specified"}</p>
    <p><strong>Style:</strong> ${data.preferred_style || "Not specified"}</p>
    <hr/>
    <p><strong>Description:</strong></p>
    <p>${data.description}</p>
  `;
}

export function commissionConfirmationEmail(name: string) {
  return `
    <h2>Thank You, ${name}!</h2>
    <p>I've received your commission request and will review it carefully.</p>
    <p>You can expect to hear back from me within 3-5 business days with next steps.</p>
    <br/>
    <p>Warm regards,</p>
    <p><strong>Pragya Shah</strong><br/>Artsy Rahgeer</p>
  `;
}

export function commissionStatusEmail(name: string, status: string) {
  const messages: Record<string, string> = {
    reviewing: `
      <h2>Your Commission is Being Reviewed</h2>
      <p>Hi ${name},</p>
      <p>Great news — I'm actively reviewing your commission request. I'll reach out soon to discuss details and next steps.</p>
    `,
    accepted: `
      <h2>Commission Accepted!</h2>
      <p>Hi ${name},</p>
      <p>I'm excited to let you know that I've accepted your commission request! I'll be in touch shortly to discuss timelines, sketches, and payment details.</p>
    `,
    declined: `
      <h2>Commission Update</h2>
      <p>Hi ${name},</p>
      <p>Thank you for your interest in a commission. Unfortunately, I'm unable to take on this project at this time. Please feel free to reach out again in the future or browse my available works in the gallery.</p>
    `,
    completed: `
      <h2>Commission Complete!</h2>
      <p>Hi ${name},</p>
      <p>Your commissioned artwork is complete! I'll be in touch with delivery details shortly.</p>
    `,
  };

  const body = messages[status] || `<p>Hi ${name}, your commission status has been updated to: <strong>${status}</strong>.</p>`;

  return `
    ${body}
    <br/>
    <p>Warm regards,</p>
    <p><strong>Pragya Shah</strong><br/>Artsy Rahgeer</p>
  `;
}

export function contactAdminEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
    <h2>New Contact Message</h2>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <hr/>
    <p>${data.message}</p>
  `;
}
