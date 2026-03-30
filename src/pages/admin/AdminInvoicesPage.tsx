import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Plus, Eye, IndianRupee, Receipt } from "lucide-react";
import { toast } from "sonner";

const AdminInvoicesPage = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      let q = supabase.from("invoices").select("*").order("created_at", { ascending: false });
      if (typeFilter !== "all") q = q.eq("invoice_type", typeFilter);
      if (searchQuery) q = q.or(`invoice_number.ilike.%${searchQuery}%,buyer_name.ilike.%${searchQuery}%`);
      const { data } = await q;
      setInvoices(data || []);
      setLoading(false);
    };
    fetchInvoices();
  }, [typeFilter, searchQuery]);

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      draft: "bg-muted text-muted-foreground",
      issued: "bg-blue-50 text-blue-700",
      paid: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
      credit_noted: "bg-violet-50 text-violet-700",
    };
    return map[s] || "bg-muted text-muted-foreground";
  };

  const typeLabel = (t: string) => {
    const map: Record<string, string> = { tax_invoice: "Tax Invoice", proforma: "Proforma", credit_note: "Credit Note" };
    return map[t] || t;
  };

  const summaryStats = {
    total: invoices.length,
    totalValue: invoices.filter(i => i.invoice_type === "tax_invoice" && i.status !== "cancelled").reduce((s, i) => s + Number(i.grand_total), 0),
    totalGst: invoices.filter(i => i.invoice_type === "tax_invoice" && i.status !== "cancelled").reduce((s, i) => s + Number(i.total_gst), 0),
    creditNotes: invoices.filter(i => i.invoice_type === "credit_note").reduce((s, i) => s + Number(i.grand_total), 0),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Invoices</h1>
        <Button variant="outline" size="sm" className="gap-2 text-[13px] border-[#DADCE0]"><Download className="w-4 h-4" /> Export All</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Invoices", value: summaryStats.total, icon: FileText, color: "text-[#1A73E8] bg-[#E8F0FE]" },
          { label: "Total Invoiced", value: `₹${summaryStats.totalValue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-[#137333] bg-[#E6F4EA]" },
          { label: "GST Collected", value: `₹${summaryStats.totalGst.toLocaleString("en-IN")}`, icon: Receipt, color: "text-[#E37400] bg-[#FEF7E0]" },
          { label: "Credit Notes", value: `₹${summaryStats.creditNotes.toLocaleString("en-IN")}`, icon: FileText, color: "text-[#A142F4] bg-[#F3E8FD]" },
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
            <Input placeholder="Search by invoice number or customer..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tax_invoice">Tax Invoice</SelectItem>
              <SelectItem value="proforma">Proforma</SelectItem>
              <SelectItem value="credit_note">Credit Note</SelectItem>
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
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Invoice #</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">GSTIN</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Taxable</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">GST</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Total</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-[#9AA0A6]">No invoices found</td></tr>
              ) : invoices.map(inv => (
                <tr key={inv.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-4 py-3 text-[#1A73E8] font-medium font-mono text-[12px]">{inv.invoice_number}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-[10px] capitalize">{typeLabel(inv.invoice_type)}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[#202124]">{inv.buyer_name || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368] font-mono text-[11px]">{inv.buyer_gstin || "—"}</td>
                  <td className="px-4 py-3 text-right">₹{Number(inv.taxable_amount).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right">₹{Number(inv.total_gst).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#202124]">₹{Number(inv.grand_total).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`text-[10px] capitalize ${statusColor(inv.status)}`}>{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[#5F6368]">{new Date(inv.invoice_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-4 py-3">
                    {inv.pdf_url && (
                      <Button variant="ghost" size="sm" asChild><a href={inv.pdf_url} target="_blank" rel="noopener noreferrer"><Download className="w-3.5 h-3.5" /></a></Button>
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

export default AdminInvoicesPage;
