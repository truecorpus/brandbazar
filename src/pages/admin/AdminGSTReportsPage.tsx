import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, IndianRupee, Receipt, Building2 } from "lucide-react";
import { toast } from "sonner";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const AdminGSTReportsPage = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState(String(currentMonth));
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const startDate = new Date(Number(year), Number(month), 1).toISOString();
      const endDate = new Date(Number(year), Number(month) + 1, 0, 23, 59, 59).toISOString();
      const { data } = await supabase
        .from("invoices")
        .select("*")
        .eq("invoice_type", "tax_invoice")
        .neq("status", "cancelled")
        .gte("invoice_date", startDate)
        .lte("invoice_date", endDate)
        .order("invoice_date", { ascending: true });
      setInvoices(data || []);
      setLoading(false);
    };
    fetch();
  }, [year, month]);

  const stats = {
    totalInvoices: invoices.length,
    totalTaxable: invoices.reduce((s, i) => s + Number(i.taxable_amount), 0),
    totalCGST: invoices.reduce((s, i) => s + Number(i.cgst_amount), 0),
    totalSGST: invoices.reduce((s, i) => s + Number(i.sgst_amount), 0),
    totalIGST: invoices.reduce((s, i) => s + Number(i.igst_amount), 0),
    totalGST: invoices.reduce((s, i) => s + Number(i.total_gst), 0),
    totalGrand: invoices.reduce((s, i) => s + Number(i.grand_total), 0),
    b2bInvoices: invoices.filter(i => i.buyer_gstin),
    b2cInvoices: invoices.filter(i => !i.buyer_gstin),
  };

  const exportCSV = () => {
    const headers = ["Invoice Number", "Date", "Customer", "GSTIN", "HSN", "Taxable Amount", "CGST Rate", "CGST Amount", "SGST Rate", "SGST Amount", "IGST Rate", "IGST Amount", "Total GST", "Grand Total"];
    const rows = invoices.map(inv => [
      inv.invoice_number, new Date(inv.invoice_date).toLocaleDateString("en-IN"),
      inv.buyer_name || "", inv.buyer_gstin || "", "",
      Number(inv.taxable_amount).toFixed(2),
      Number(inv.cgst_rate).toFixed(2), Number(inv.cgst_amount).toFixed(2),
      Number(inv.sgst_rate).toFixed(2), Number(inv.sgst_amount).toFixed(2),
      Number(inv.igst_rate).toFixed(2), Number(inv.igst_amount).toFixed(2),
      Number(inv.total_gst).toFixed(2), Number(inv.grand_total).toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GST_Report_${MONTHS[Number(month)]}_${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("GST report exported");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>GST Reports</h1>
        <Button variant="outline" size="sm" className="gap-2 text-[13px] border-[#DADCE0]" onClick={exportCSV}><Download className="w-4 h-4" /> Export CSV</Button>
      </div>

      {/* Period selector */}
      <Card className="p-3 border-[#DADCE0]">
        <div className="flex gap-3 items-center">
          <span className="text-[13px] text-[#5F6368]">Period:</span>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>{MONTHS.map((m, i) => <SelectItem key={i} value={String(i)}>{m}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>{[currentYear - 1, currentYear, currentYear + 1].map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Taxable Value", value: `₹${stats.totalTaxable.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-[#1A73E8] bg-[#E8F0FE]" },
          { label: "CGST Collected", value: `₹${stats.totalCGST.toLocaleString("en-IN")}`, icon: Receipt, color: "text-[#137333] bg-[#E6F4EA]" },
          { label: "SGST Collected", value: `₹${stats.totalSGST.toLocaleString("en-IN")}`, icon: Receipt, color: "text-[#E37400] bg-[#FEF7E0]" },
          { label: "IGST Collected", value: `₹${stats.totalIGST.toLocaleString("en-IN")}`, icon: Receipt, color: "text-[#A142F4] bg-[#F3E8FD]" },
        ].map(s => (
          <Card key={s.label} className="p-4 border-[#DADCE0]">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <p className="text-lg font-semibold text-[#202124] mt-2">{s.value}</p>
            <p className="text-[11px] text-[#5F6368]">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* B2B Summary */}
      <Card className="border-[#DADCE0]">
        <div className="p-4 border-b border-[#DADCE0] bg-[#F8F9FA] flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#5F6368]" />
          <h2 className="text-[13px] font-medium text-[#202124]">B2B Invoices (GSTIN-wise) — {stats.b2bInvoices.length} invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">GSTIN</th>
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">Customer</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">Invoices</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">Taxable</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">CGST</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">SGST</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">IGST</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : (() => {
                const grouped: Record<string, any[]> = {};
                stats.b2bInvoices.forEach(i => { const g = i.buyer_gstin; if (!grouped[g]) grouped[g] = []; grouped[g].push(i); });
                const entries = Object.entries(grouped);
                if (!entries.length) return <tr><td colSpan={8} className="px-4 py-8 text-center text-[#9AA0A6]">No B2B invoices for this period</td></tr>;
                return entries.map(([gstin, invs]) => (
                  <tr key={gstin} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                    <td className="px-4 py-2 font-mono text-[12px] text-[#1A73E8]">{gstin}</td>
                    <td className="px-4 py-2 text-[#202124]">{invs[0].buyer_name}</td>
                    <td className="px-4 py-2 text-right">{invs.length}</td>
                    <td className="px-4 py-2 text-right">₹{invs.reduce((s: number, i: any) => s + Number(i.taxable_amount), 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2 text-right">₹{invs.reduce((s: number, i: any) => s + Number(i.cgst_amount), 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2 text-right">₹{invs.reduce((s: number, i: any) => s + Number(i.sgst_amount), 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2 text-right">₹{invs.reduce((s: number, i: any) => s + Number(i.igst_amount), 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2 text-right font-medium">₹{invs.reduce((s: number, i: any) => s + Number(i.grand_total), 0).toLocaleString("en-IN")}</td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </Card>

      {/* All Invoices Detail */}
      <Card className="border-[#DADCE0]">
        <div className="p-4 border-b border-[#DADCE0] bg-[#F8F9FA]">
          <h2 className="text-[13px] font-medium text-[#202124]">All Invoices — {MONTHS[Number(month)]} {year}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">Invoice #</th>
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">Date</th>
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">Customer</th>
                <th className="px-4 py-2 text-left font-medium text-[#5F6368]">GSTIN</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">Taxable</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">GST</th>
                <th className="px-4 py-2 text-right font-medium text-[#5F6368]">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#9AA0A6]">No invoices for this period</td></tr>
              ) : (
                <>
                  {invoices.map(inv => (
                    <tr key={inv.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                      <td className="px-4 py-2 text-[#1A73E8] font-mono text-[12px]">{inv.invoice_number}</td>
                      <td className="px-4 py-2 text-[#5F6368]">{new Date(inv.invoice_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                      <td className="px-4 py-2">{inv.buyer_name || "—"}</td>
                      <td className="px-4 py-2 font-mono text-[11px] text-[#5F6368]">{inv.buyer_gstin || "B2C"}</td>
                      <td className="px-4 py-2 text-right">₹{Number(inv.taxable_amount).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-2 text-right">₹{Number(inv.total_gst).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-2 text-right font-medium">₹{Number(inv.grand_total).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8F9FA] font-semibold border-t-2 border-[#DADCE0]">
                    <td colSpan={4} className="px-4 py-3 text-[#202124]">Total ({invoices.length} invoices)</td>
                    <td className="px-4 py-3 text-right">₹{stats.totalTaxable.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 text-right">₹{stats.totalGST.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 text-right">₹{stats.totalGrand.toLocaleString("en-IN")}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminGSTReportsPage;
