import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Palette, ShoppingCart, DollarSign, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: artworkCount },
    { count: orderCount },
    { data: revenueData },
    { count: commissionCount },
  ] = await Promise.all([
    supabase.from("artworks").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("amount").eq("payment_status", "completed"),
    supabase.from("commission_requests").select("*", { count: "exact", head: true }),
  ]);

  const totalRevenue = revenueData?.reduce((sum: number, o: any) => sum + o.amount, 0) || 0;

  const stats = [
    { label: "Total Artworks", value: artworkCount || 0, icon: Palette, href: "/admin/artworks" },
    { label: "Orders", value: orderCount || 0, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, href: "/admin/orders" },
    { label: "Commissions", value: commissionCount || 0, icon: MessageSquare, href: "/admin/commissions" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="p-6 rounded-lg border bg-card hover:border-foreground/20 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <stat.icon size={20} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-light">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
