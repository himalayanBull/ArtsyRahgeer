import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { CommissionStatusUpdate } from "@/components/admin/commission-status";

export default async function AdminCommissionsPage() {
  const supabase = await createClient();
  const { data: commissions } = await supabase
    .from("commission_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Commission Requests</h1>

      <div className="space-y-4">
        {(commissions || []).map((commission: any) => (
          <div key={commission.id} className="p-6 rounded-lg border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium">{commission.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {commission.email} &middot; {commission.phone}
                </p>
              </div>
              <Badge>{commission.status}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium">{commission.budget}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{commission.artwork_size || "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Style</p>
                <p className="font-medium">{commission.preferred_style || "—"}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {commission.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(commission.created_at).toLocaleDateString()}
              </span>
              <CommissionStatusUpdate
                id={commission.id}
                currentStatus={commission.status}
              />
            </div>
          </div>
        ))}
        {(!commissions || commissions.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            No commission requests yet.
          </div>
        )}
      </div>
    </div>
  );
}
