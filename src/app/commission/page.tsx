import type { Metadata } from "next";
import { CommissionForm } from "@/components/commission/commission-form";

export const metadata: Metadata = {
  title: "Commission",
  description: "Request a custom artwork commission. Describe your vision and I will bring it to life on canvas.",
};

export default function CommissionPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
        <div className="mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Commission
          </p>
          <h1 className="font-serif text-4xl md:text-6xl">
            Create Something Unique
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Have a vision for a custom piece? I work closely with collectors to
            bring their ideas to life. Every commission is a collaborative
            journey from concept to canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <CommissionForm />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-3">How It Works</h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-medium text-foreground shrink-0">01.</span>
                  <span>Submit your request with details about your vision, preferred style, and budget.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-foreground shrink-0">02.</span>
                  <span>We&apos;ll schedule a consultation to discuss your ideas in depth.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-foreground shrink-0">03.</span>
                  <span>I&apos;ll provide preliminary sketches and a detailed proposal.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-foreground shrink-0">04.</span>
                  <span>Upon approval, creation begins with progress updates along the way.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-foreground shrink-0">05.</span>
                  <span>Your finished piece is carefully packaged and delivered to you.</span>
                </li>
              </ol>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-medium mb-3">Timeline</h3>
              <p className="text-sm text-muted-foreground">
                Most commissions take 4-12 weeks depending on size and
                complexity. Rush requests may be accommodated.
              </p>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-medium mb-3">Starting Prices</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Small (up to 50cm): from $2,000</p>
                <p>Medium (50-100cm): from $4,500</p>
                <p>Large (100cm+): from $8,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
