import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { FileText, Download, IndianRupee, Receipt, CreditCard, ArrowUpRight } from "lucide-react";

const InvoicesBilling = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    totalInvoiced: 0, totalGst: 0, totalRefunds: 0
  });

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      // Get user's orders first, then payments
      const { data: orders } = await supabase
        .from("orders")
        .select("id")
        .eq("customer_id", user.id);

      if (orders?.length) {
        const orderIds = orders.map((o) => o.id);
        const { data: pays } = await supabase
          .from("payments")
          .select("*")
          .in("order_id", orderIds)
          .order("created_at", { ascending: false });

        if (pays) {
          setPayments(pays);
          const thisYear = pays.filter(
            (p) => new Date(p.created_at).getFullYear() === new Date().getFullYear()
          );
          setSummaryStats({
            totalInvoiced: thisYear.reduce((s, p) => s + Number(p.amount), 0),
            totalGst: thisYear.reduce((s, p) => s + Number(p.amount) * 0.18 / 1.18, 0),
            totalRefunds: thisYear.reduce((s, p) => s + Number(p.refund_amount || 0), 0),
          });
        }
      }
    };
    fetch();
  }, [user]);

  const summaryCards = [
    { label: "Total Invoiced (FY)", value: `₹${summaryStats.totalInvoiced.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: IndianRupee, color: "text-primary bg-primary/10" },
    { label: "GST Paid (FY)", value: `₹${summaryStats.totalGst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: Receipt, color: "text-orange-600 bg-orange-50" },
    { label: "Refunds", value: `₹${summaryStats.totalRefunds.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: ArrowUpRight, color: "text-red-600 bg-red-50" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      completed: "bg-green-50 text-green-700",
      pending: "bg-amber-50 text-amber-700",
      failed: "bg-red-50 text-red-700",
      refunded: "bg-violet-50 text-violet-700",
    };
    return map[status] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="max-w-[1000px] space-y-6">
      <div>
        <h1 className="text-xl font-heading font-semibold text-foreground">Invoices & Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">View invoices, payment history, and GST details</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((s) => (
          <div key={s.label} className="bg-background rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="mt-3 text-[20px] font-heading font-semibold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="invoices">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="invoices" className="gap-1.5 text-xs"><FileText size={13} /> Invoices</TabsTrigger>
          <TabsTrigger value="payments" className="gap-1.5 text-xs"><CreditCard size={13} /> Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
            {payments.filter((p) => p.gst_invoice_number).length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="mx-auto text-muted-foreground/40" size={40} />
                <p className="mt-3 text-sm text-muted-foreground">No invoices yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">GST</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter((p) => p.gst_invoice_number).map((p) => {
                    const gstAmt = Number(p.amount) * 0.18 / 1.18;
                    const baseAmt = Number(p.amount) - gstAmt;
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium text-sm">{p.gst_invoice_number}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(p.payment_date || p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </TableCell>
                        <TableCell className="text-right text-sm">₹{baseAmt.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell className="text-right text-sm">₹{gstAmt.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell className="text-right text-sm font-medium">₹{Number(p.amount).toLocaleString("en-IN")}</TableCell>
                        <TableCell>
                          {p.invoice_url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={p.invoice_url} target="_blank" rel="noopener noreferrer">
                                <Download size={14} />
                              </a>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
            {payments.length === 0 ? (
              <div className="p-12 text-center">
                <CreditCard className="mx-auto text-muted-foreground/40" size={40} />
                <p className="mt-3 text-sm text-muted-foreground">No payment history</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-sm font-medium font-mono">{p.gateway_transaction_id || p.id.slice(0, 12)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(p.payment_date || p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </TableCell>
                      <TableCell className="text-sm capitalize">{p.payment_method || p.payment_gateway || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs capitalize ${statusBadge(p.payment_status)}`}>
                          {p.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">₹{Number(p.amount).toLocaleString("en-IN")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoicesBilling;
