import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RotateCcw } from "lucide-react";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Under Review", variant: "secondary" },
  approved: { label: "Approved", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  pickup_scheduled: { label: "Pickup Scheduled", variant: "outline" },
  received: { label: "Item Received", variant: "outline" },
  refunded: { label: "Refunded", variant: "default" },
};

const MyReturns = () => {
  const { user } = useAuth();
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("return_requests")
      .select("*, orders(order_number)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setReturns(data || []); setLoading(false); });
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-[800px] space-y-6">
      <h1 className="text-[22px] font-heading font-semibold text-foreground">My Returns</h1>

      {returns.length === 0 ? (
        <Card className="p-12 text-center border-border">
          <RotateCcw className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground mt-3">No return requests yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {returns.map(r => {
            const s = statusMap[r.status] || { label: r.status, variant: "secondary" as const };
            return (
              <Card key={r.id} className="p-4 border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Order {(r.orders as any)?.order_number || r.order_id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.reason}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={s.variant}>{s.label}</Badge>
                    {Number(r.refund_amount) > 0 && (
                      <p className="text-xs text-green-600 font-medium mt-1">₹{Number(r.refund_amount).toLocaleString("en-IN")} refunded</p>
                    )}
                  </div>
                </div>
                {r.admin_notes && (
                  <div className="mt-3 p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Admin response:</p>
                    <p className="text-sm text-foreground mt-0.5">{r.admin_notes}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReturns;
