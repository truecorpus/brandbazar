import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, IndianRupee, Factory, Image, MessageSquareQuote, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  revenue: Math.floor(Math.random() * 50000) + 10000,
}));

const statusData = [
  { name: "Pending", value: 12, color: "#9AA0A6" },
  { name: "Confirmed", value: 8, color: "#1A73E8" },
  { name: "In Production", value: 15, color: "#F9AB00" },
  { name: "Dispatched", value: 6, color: "#A142F4" },
  { name: "Delivered", value: 24, color: "#34A853" },
  { name: "Cancelled", value: 3, color: "#EA4335" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayOrders: 0, todayRevenue: 0, pendingProduction: 0,
    artworkReview: 0, pendingQuotes: 0, lowStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split("T")[0];

      const [ordersRes, quotesRes] = await Promise.all([
        supabase.from("orders").select("id, total_amount, order_status, created_at").gte("created_at", today),
        supabase.from("quotes").select("id").eq("status", "new"),
      ]);

      const todayOrders = ordersRes.data || [];
      setStats({
        todayOrders: todayOrders.length,
        todayRevenue: todayOrders.reduce((sum, o) => sum + Number(o.total_amount), 0),
        pendingProduction: 0,
        artworkReview: 0,
        pendingQuotes: quotesRes.data?.length || 0,
        lowStock: 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_number, customer_id, total_amount, order_status, payment_status, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      setRecentOrders(data || []);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const kpis = [
    { label: "Today's Orders", value: stats.todayOrders, icon: ShoppingCart, color: "#1A73E8", bg: "#E8F0FE" },
    { label: "Today's Revenue", value: `₹${stats.todayRevenue.toLocaleString()}`, icon: IndianRupee, color: "#34A853", bg: "#E6F4EA" },
    { label: "Pending Production", value: stats.pendingProduction, icon: Factory, color: "#F9AB00", bg: "#FEF7E0" },
    { label: "Artwork Review", value: stats.artworkReview, icon: Image, color: "#A142F4", bg: "#F3E8FD" },
    { label: "Pending Quotes", value: stats.pendingQuotes, icon: MessageSquareQuote, color: "#1A73E8", bg: "#E8F0FE" },
    { label: "Low Stock Alerts", value: stats.lowStock, icon: AlertTriangle, color: "#EA4335", bg: "#FCE8E6" },
  ];

  const getStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      pending_payment: { bg: "#F1F3F4", text: "#5F6368" },
      confirmed: { bg: "#E8F0FE", text: "#1A73E8" },
      in_production: { bg: "#FEF7E0", text: "#E37400" },
      dispatched: { bg: "#F3E8FD", text: "#A142F4" },
      delivered: { bg: "#E6F4EA", text: "#137333" },
      cancelled: { bg: "#FCE8E6", text: "#C5221F" },
    };
    const s = map[status] || map.pending_payment;
    return (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: s.bg, color: s.text }}>
        {status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Alert banners */}
      <div className="bg-[#FEF7E0] border border-[#F9AB00]/30 rounded-xl px-4 py-3 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-[#E37400] flex-shrink-0" />
        <p className="text-[13px] text-[#3C4043]">
          <span className="font-semibold">3 orders</span> are overdue for production. 
          <span className="font-semibold"> 2 artwork reviews</span> pending for over 24 hours.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4 border-[#DADCE0] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>{kpi.value}</p>
            <p className="text-[12px] text-[#5F6368] mt-0.5">{kpi.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-5 border-[#DADCE0]">
          <h3 className="text-[15px] font-semibold text-[#202124] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Revenue Trend (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F4" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9AA0A6" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9AA0A6" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DADCE0" }} />
              <Line type="monotone" dataKey="revenue" stroke="#1A73E8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 p-5 border-[#DADCE0]">
          <h3 className="text-[15px] font-semibold text-[#202124] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Order Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DADCE0" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] text-[#5F6368]">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders & Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-[#DADCE0]">
          <div className="p-4 border-b border-[#DADCE0]">
            <h3 className="text-[15px] font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#F1F3F4]">
                  <th className="px-4 py-2.5 text-left font-medium text-[#5F6368]">Order</th>
                  <th className="px-4 py-2.5 text-left font-medium text-[#5F6368]">Amount</th>
                  <th className="px-4 py-2.5 text-left font-medium text-[#5F6368]">Payment</th>
                  <th className="px-4 py-2.5 text-left font-medium text-[#5F6368]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-[#9AA0A6]">No orders yet</td></tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-4 py-2.5 font-medium text-[#1A73E8]">{order.order_number || "—"}</td>
                      <td className="px-4 py-2.5 text-[#3C4043]">₹{Number(order.total_amount).toLocaleString()}</td>
                      <td className="px-4 py-2.5">{getStatusBadge(order.payment_status)}</td>
                      <td className="px-4 py-2.5">{getStatusBadge(order.order_status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="border-[#DADCE0] p-4">
            <h3 className="text-[14px] font-semibold text-[#202124] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="flex items-center gap-2"><Image className="w-4 h-4 text-[#F9AB00]" /> Pending Artwork Reviews</span>
            </h3>
            <p className="text-[13px] text-[#9AA0A6]">No pending reviews</p>
          </Card>

          <Card className="border-[#DADCE0] p-4">
            <h3 className="text-[14px] font-semibold text-[#202124] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#34A853]" /> Upcoming Deliveries</span>
            </h3>
            <p className="text-[13px] text-[#9AA0A6]">No deliveries due</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
