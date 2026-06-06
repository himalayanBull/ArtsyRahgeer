import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-20 min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-6 max-w-lg">
        <CheckCircle size={64} className="mx-auto text-emerald-600 mb-6" />
        <h1 className="font-serif text-3xl md:text-4xl mb-4">
          Thank You for Your Purchase
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Your order has been confirmed. You&apos;ll receive an email with
          tracking details once your artwork ships. Each piece is carefully
          packaged to ensure it arrives in perfect condition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/gallery">
            <Button size="lg">Continue Browsing</Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
