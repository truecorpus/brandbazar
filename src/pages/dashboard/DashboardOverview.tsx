import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, Clock, IndianRupee, Star, Plus, FileText, Upload, Truck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  pending_payment: "bg-muted text-muted-foreground",
  confirmed: "bg-blue-50 text-blue-700",
  in_production: "bg-orange-50 text-orange-700",
  dispatched: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const DashboardOverview = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, spent: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: orders } = await supabase
        .from("orders")
        .select("id, order_number, created_at, total_amount, order_status")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (orders) {
        setRecentOrders(orders);
        setStats({
          total: orders.length,
          pending: orders.filter((o) => !["delivered", "cancelled"].includes(o.order_status)).length,
          spent: orders.reduce((s, o) => s + Number(o.total_amount), 0),
        });
      }
    };
    fetchData();
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const statCards = [
    { label: "Total Orders", value: stats.total, icon: ShoppingBag, color: "text-primary bg-primary/10" },
    { label: "Pending Orders", value: stats.pending, icon: Clock, color: "text-orange-600 bg-orange-50" },
    { label: "Total Spent", value: `₹${stats.spent.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-600 bg-green-50" },
    { label: "Loyalty Points", value: "0", icon: Star, color: "text-amber-600 bg-amber-50" },
  ];

  const quickActions = [
    { label: "Place New Order", icon: Plus, href: "/shop" },
    { label: "Request Quote", icon: FileText, href: "/dashboard/quotes" },
    { label: "Upload Artwork", icon: Upload, href: "/dashboard/artwork" },
    { label: "Track Shipment", icon: Truck, href: "/dashboard/orders" },
  ];

  return (
    <div className="max-w-[1100px] space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-[24px] font-heading font-semibold text-foreground">
          {greeting()}, {profile?.full_name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-background rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="mt-3 text-[22px] font-heading font-semibold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            to={a.href}
            className="bg-background rounded-xl border border-border p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <a.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-heading font-semibold text-foreground">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-sm text-primary font-medium hover:text-primary/80">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="mx-auto text-muted-foreground/40" size={40} />
            <p className="mt-3 text-sm text-muted-foreground">No orders yet</p>
            <Button size="sm" className="mt-4" asChild><Link to="/shop">Browse Products</Link></Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.order_number || order.id.slice(0, 8)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">₹{Number(order.total_amount).toLocaleString("en-IN")}</span>
                  <Badge variant="secondary" className={`text-xs ${statusColors[order.order_status] || ""}`}>
                    {order.order_status.replace(/_/g, " ")}
                  </Badge>
                  <Link to={`/dashboard/orders/${order.id}`} className="text-sm text-primary font-medium">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
