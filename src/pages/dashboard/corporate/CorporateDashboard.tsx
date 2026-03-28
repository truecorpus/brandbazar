import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ShoppingBag, Clock, IndianRupee, TrendingDown, FileText, Wallet,
  Building2, Crown, MessageCircle, CreditCard, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const tierColors: Record<string, string> = {
  standard: "bg-muted text-muted-foreground",
  silver: "bg-slate-100 text-slate-700 border border-slate-300",
  gold: "bg-amber-50 text-amber-700 border border-amber-300",
  platinum: "bg-violet-50 text-violet-700 border border-violet-300",
};

const statusColors: Record<string, string> = {
  pending_payment: "bg-muted text-muted-foreground",
  confirmed: "bg-blue-50 text-blue-700",
  in_production: "bg-orange-50 text-orange-700",
  dispatched: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const CorporateDashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0, totalSpend: 0, activeOrders: 0,
    pendingQuotes: 0, bulkSavings: 0, creditBalance: 0,
  });
  const [corpAccount, setCorpAccount] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      // Get corporate account
      const { data: membership } = await supabase
        .from("corporate_account_members")
        .select("corporate_account_id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (membership) {
        const { data: account } = await supabase
          .from("corporate_accounts")
          .select("*")
          .eq("id", membership.corporate_account_id)
          .single();
        if (account) setCorpAccount(account);
      }

      // Orders
      const { data: orders } = await supabase
        .from("orders")
        .select("id, order_number, created_at, total_amount, order_status, order_type")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (orders) {
        const thisYear = orders.filter(
          (o) => new Date(o.created_at).getFullYear() === new Date().getFullYear()
        );
        setRecentOrders(orders.slice(0, 5));
        setStats((prev) => ({
          ...prev,
          totalOrders: thisYear.length,
          totalSpend: thisYear.reduce((s, o) => s + Number(o.total_amount), 0),
          activeOrders: orders.filter((o) =>
            !["delivered", "cancelled"].includes(o.order_status)
          ).length,
        }));

        // Build chart data for last 12 months
        const months: any[] = [];
        for (let i = 11; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          const label = d.toLocaleDateString("en-IN", { month: "short" });
          const monthOrders = orders.filter((o) => o.created_at.startsWith(key));
          months.push({
            month: label,
            orders: monthOrders.length,
            spend: monthOrders.reduce((s, o) => s + Number(o.total_amount), 0) / 1000,
          });
        }
        setChartData(months);
      }

      // Quotes
      const { data: quotes } = await supabase
        .from("quotes")
        .select("id, status")
        .eq("customer_id", user.id);
      if (quotes) {
        setStats((prev) => ({
          ...prev,
          pendingQuotes: quotes.filter((q) => ["new", "in_review"].includes(q.status)).length,
        }));
      }
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (corpAccount) {
      setStats((prev) => ({
        ...prev,
        creditBalance: Number(corpAccount.credit_limit || 0) - Number(corpAccount.current_balance || 0),
      }));
    }
  }, [corpAccount]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const statCards = [
    { label: "Orders This Year", value: stats.totalOrders, icon: ShoppingBag, color: "text-primary bg-primary/10" },
    { label: "Total Spend", value: `₹${stats.totalSpend.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-600 bg-green-50" },
    { label: "Active Orders", value: stats.activeOrders, icon: Clock, color: "text-orange-600 bg-orange-50" },
    { label: "Pending Quotes", value: stats.pendingQuotes, icon: FileText, color: "text-violet-600 bg-violet-50" },
    { label: "Bulk Savings", value: `₹${stats.bulkSavings.toLocaleString("en-IN")}`, icon: TrendingDown, color: "text-emerald-600 bg-emerald-50" },
    { label: "Credit Balance", value: `₹${stats.creditBalance.toLocaleString("en-IN")}`, icon: Wallet, color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="max-w-[1200px] space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-heading font-semibold text-foreground">
            {greeting()}, {profile?.full_name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {corpAccount?.company_name || "Corporate"} — Business Dashboard
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/corporate/bulk-order">
            <ShoppingBag size={16} className="mr-1" /> New Bulk Order
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-background rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="mt-3 text-[20px] font-heading font-semibold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Two columns: Chart + Account */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <h2 className="text-base font-heading font-semibold text-foreground mb-4">Order Activity</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                  formatter={(value: number, name: string) =>
                    name === "spend" ? [`₹${(value * 1000).toLocaleString("en-IN")}`, "Spend"] : [value, "Orders"]
                  }
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="spend" fill="hsl(var(--primary) / 0.3)" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-sm bg-primary" /> Orders
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-sm bg-primary/30" /> Spend (₹K)
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="lg:col-span-2 bg-background rounded-2xl border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-heading font-semibold text-foreground">Account Details</h2>
            <Badge className={`capitalize text-xs ${tierColors[corpAccount?.pricing_tier || "standard"]}`}>
              {corpAccount?.pricing_tier || "Standard"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{corpAccount?.company_name || "—"}</p>
                <p className="text-xs text-muted-foreground">GST: {corpAccount?.gst_number || "N/A"}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credit Limit</span>
                <span className="font-medium text-foreground">₹{Number(corpAccount?.credit_limit || 0).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-medium text-foreground">₹{stats.creditBalance.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Terms</span>
                <span className="font-medium text-foreground capitalize">{corpAccount?.payment_terms || "Immediate"}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full gap-2" asChild>
              <Link to="/dashboard/corporate/invoices">
                <CreditCard size={14} /> View Invoices & Billing
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-heading font-semibold text-foreground">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="mx-auto text-muted-foreground/40" size={40} />
            <p className="mt-3 text-sm text-muted-foreground">No orders yet</p>
            <Button size="sm" className="mt-4" asChild>
              <Link to="/dashboard/corporate/bulk-order">Create Bulk Order</Link>
            </Button>
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

export default CorporateDashboard;
