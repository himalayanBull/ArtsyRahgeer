import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { MapPin, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for inquiries about artwork, commissions, studio visits, or collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Contact
          </p>
          <h1 className="font-serif text-4xl md:text-6xl">Get in Touch</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Whether you have a question about a painting, want to schedule a
            studio visit, or are interested in a commission — I&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-muted-foreground" />
                <h3 className="font-medium">Studio</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                123 Artist Lane<br />
                Creative District<br />
                New York, NY 10012
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Mail size={18} className="text-muted-foreground" />
                <h3 className="font-medium">Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                hello@atelier-art.com
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Phone size={18} className="text-muted-foreground" />
                <h3 className="font-medium">Phone</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                +1 (555) 123-4567
              </p>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-medium mb-3">Studio Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Tuesday - Saturday: 10am - 6pm</p>
                <p>Sunday - Monday: By appointment</p>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-medium mb-3">Follow</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/artsy.rahgeer/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pinterest
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Behance
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
