import type { Metadata } from "next";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart",
};

export default function CartPage() {
  return <CartClient />;
}
