import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, CreditCard, CheckCircle, XCircle, Clock, IndianRupee, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPayments = async () => {
    setLoading(true);
    let q = supabase.from("payments").select("*, orders(order_number, customer_id, total_amount)").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("payment_status", statusFilter);
    const { data } = await q;
    setPayments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPayments(); }, [statusFilter]);

  const confirmBankTransfer = async (paymentId: string, orderId: string) => {
    await supabase.from("payments").update({ payment_status: "completed", payment_date: new Date().toISOString() }).eq("id", paymentId);
    await supabase.from("orders").update({ payment_status: "paid", order_status: "confirmed" }).eq("id", orderId);
    toast.success("Bank transfer confirmed");
    fetchPayments();
  };

  const stats = {
    total: payments.reduce((s, p) => s + Number(p.amount), 0),
    completed: payments.filter(p => p.payment_status === "completed").reduce((s, p) => s + Number(p.amount), 0),
    pending: payments.filter(p => ["pending", "pending_verification"].includes(p.payment_status)).length,
    failed: payments.filter(p => p.payment_status === "failed").length,
  };

  const statusBadge = (s: string) => {
    const map: Record<string, { className: string; icon: any }> = {
      pending: { className: "bg-amber-50 text-amber-700", icon: Clock },
      pending_verification: { className: "bg-orange-50 text-orange-700", icon: AlertTriangle },
      completed: { className: "bg-green-50 text-green-700", icon: CheckCircle },
      failed: { className: "bg-red-50 text-red-700", icon: XCircle },
      refunded: { className: "bg-violet-50 text-violet-700", icon: CreditCard },
    };
    const c = map[s] || map.pending;
    return (
      <Badge variant="secondary" className={`text-[10px] gap-1 capitalize ${c.className}`}>
        <c.icon className="w-3 h-3" /> {s.replace("_", " ")}
      </Badge>
    );
  };

  const exportPayments = () => {
    const headers = ["Transaction ID", "Order", "Amount", "Method", "Gateway", "Status", "Date"];
    const rows = payments.map(p => [
      p.gateway_transaction_id || p.id.slice(0, 12),
      (p.orders as any)?.order_number || "",
      Number(p.amount).toFixed(2),
      p.payment_method || "",
      p.payment_gateway || "",
      p.payment_status,
      p.payment_date ? new Date(p.payment_date).toLocaleDateString("en-IN") : "",
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Payments exported");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Payments & Reconciliation</h1>
        <Button variant="outline" size="sm" className="gap-2 text-[13px] border-[#DADCE0]" onClick={exportPayments}><Download className="w-4 h-4" /> Export</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Collected", value: `₹${stats.total.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-[#1A73E8] bg-[#E8F0FE]" },
          { label: "Completed", value: `₹${stats.completed.toLocaleString("en-IN")}`, icon: CheckCircle, color: "text-[#137333] bg-[#E6F4EA]" },
          { label: "Pending Verification", value: stats.pending, icon: AlertTriangle, color: "text-[#E37400] bg-[#FEF7E0]" },
          { label: "Failed", value: stats.failed, icon: XCircle, color: "text-[#C5221F] bg-[#FCE8E6]" },
        ].map(s => (
          <Card key={s.label} className="p-4 border-[#DADCE0]">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <p className="text-lg font-semibold text-[#202124] mt-2">{s.value}</p>
            <p className="text-[11px] text-[#5F6368]">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-3 border-[#DADCE0]">
        <div className="flex gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search by transaction ID..." className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="pending_verification">Pending Verification</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Transaction</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Order</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Method</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Gateway</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-[#9AA0A6]">No payments found</td></tr>
              ) : payments.map(p => (
                <tr key={p.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-4 py-3 text-[#1A73E8] font-medium font-mono text-[12px]">{p.gateway_transaction_id || p.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-[#202124] font-medium text-[12px]">{(p.orders as any)?.order_number || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368] capitalize">{p.payment_method || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368] capitalize">{p.payment_gateway || "—"}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#202124]">₹{Number(p.amount).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">{statusBadge(p.payment_status)}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{p.payment_date ? new Date(p.payment_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</td>
                  <td className="px-4 py-3">
                    {p.payment_status === "pending_verification" && (
                      <Button size="sm" variant="outline" className="text-[11px] h-7 gap-1 text-[#137333] border-[#137333]/30 hover:bg-[#E6F4EA]" onClick={() => confirmBankTransfer(p.id, p.order_id)}>
                        <CheckCircle className="w-3 h-3" /> Confirm
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminPayments;
