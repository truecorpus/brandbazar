import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, CreditCard } from "lucide-react";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let q = supabase.from("payments").select("*").order("created_at", { ascending: false });
      if (statusFilter !== "all") q = q.eq("payment_status", statusFilter);
      const { data } = await q;
      setPayments(data || []);
      setLoading(false);
    };
    fetch();
  }, [statusFilter]);

  const statusBadge = (s: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      pending: { bg: "#FEF7E0", text: "#E37400" },
      completed: { bg: "#E6F4EA", text: "#137333" },
      failed: { bg: "#FCE8E6", text: "#C5221F" },
      refunded: { bg: "#F3E8FD", text: "#A142F4" },
    };
    const c = map[s] || map.pending;
    return <span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: c.bg, color: c.text }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Payments</h1>
        <Button variant="outline" size="sm" className="gap-2 text-[13px] border-[#DADCE0]"><Download className="w-4 h-4" /> Export</Button>
      </div>

      <Card className="p-3 border-[#DADCE0]">
        <div className="flex gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search..." className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Transaction</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Method</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">No payments found</td></tr>
              ) : payments.map(p => (
                <tr key={p.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-4 py-3 text-[#1A73E8] font-medium font-mono text-[12px]">{p.gateway_transaction_id || p.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-[#5F6368] capitalize">{p.payment_method || "—"}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#202124]">₹{Number(p.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">{statusBadge(p.payment_status)}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{p.payment_date ? new Date(p.payment_date).toLocaleDateString() : "—"}</td>
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
