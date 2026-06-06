"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartClient() {
  const { items, removeItem, clearCart, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            artwork_id: item.artwork.id,
            title: item.artwork.title,
            price: item.artwork.price,
            currency: item.artwork.currency,
            image: item.artwork.images[0]?.image_url,
          })),
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Discover original paintings in the gallery.
          </p>
          <Link href="/gallery">
            <Button size="lg">Browse Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl mb-12">Your Cart</h1>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.artwork.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-6 p-4 rounded-lg border"
              >
                <div className="relative w-24 h-32 rounded-md overflow-hidden bg-muted shrink-0">
                  <Image
                    src={item.artwork.images[0]?.image_url || "/images/placeholder.jpg"}
                    alt={item.artwork.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/artwork/${item.artwork.slug}`}
                      className="font-medium hover:opacity-70 transition-opacity"
                    >
                      {item.artwork.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.artwork.medium} &middot; {item.artwork.width}&times;
                      {item.artwork.height} cm
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.artwork.price, item.artwork.currency)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.artwork.id)}
                  className="self-center p-2 text-muted-foreground hover:text-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg">Total</span>
            <span className="text-2xl font-light">
              {formatPrice(totalPrice())}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
            <Button size="lg" variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Secure checkout powered by Stripe. Shipping costs calculated at
            checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
