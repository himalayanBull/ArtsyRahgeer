import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Orders</h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium">Customer</th>
              <th className="text-left p-4 font-medium hidden sm:table-cell">Email</th>
              <th className="text-left p-4 font-medium">Amount</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((order: any) => (
              <tr key={order.id} className="border-t">
                <td className="p-4 font-medium">{order.customer_name}</td>
                <td className="p-4 hidden sm:table-cell text-muted-foreground">
                  {order.customer_email}
                </td>
                <td className="p-4">
                  {formatPrice(order.amount, order.currency)}
                </td>
                <td className="p-4">
                  <Badge
                    variant={
                      order.payment_status === "completed"
                        ? "available"
                        : "default"
                    }
                  >
                    {order.payment_status}
                  </Badge>
                </td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!orders || orders.length === 0) && (
          <div className="p-8 text-center text-muted-foreground">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
}
