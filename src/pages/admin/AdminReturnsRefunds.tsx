import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RotateCcw, Eye, CheckCircle2, XCircle, Loader2, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  pickup_scheduled: "bg-blue-100 text-blue-800",
  received: "bg-indigo-100 text-indigo-800",
  refunded: "bg-emerald-100 text-emerald-800",
};

const AdminReturnsRefunds = () => {
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchReturns(); }, [filter]);

  const fetchReturns = async () => {
    let q = supabase.from("return_requests").select("*, orders(order_number, total_amount)").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setReturns(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const updates: any = { status, admin_notes: adminNotes, reviewed_at: new Date().toISOString() };
    if (status === "refunded" && refundAmount) {
      updates.refund_amount = Number(refundAmount);
      updates.refund_status = "processed";
    }
    await supabase.from("return_requests").update(updates).eq("id", id);
    toast.success(`Return ${status}`);
    setSelected(null);
    setAdminNotes("");
    setRefundAmount("");
    fetchReturns();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#1A73E8]" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Returns & Refunds</h1>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected", "refunded"].map(s => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" className="text-[12px] h-7 capitalize"
              onClick={() => setFilter(s)}>{s === "all" ? "All" : s}</Button>
          ))}
        </div>
      </div>

      <Card className="border-[#DADCE0] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Order</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Reason</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Date</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Status</th>
              <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Refund</th>
              <th className="text-right px-4 py-2.5 font-medium text-[#5F6368]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DADCE0]">
            {returns.map(r => (
              <tr key={r.id} className="hover:bg-[#F8F9FA]">
                <td className="px-4 py-2.5 font-medium text-[#1A73E8]">{(r.orders as any)?.order_number || r.order_id.slice(0, 8)}</td>
                <td className="px-4 py-2.5 text-[#5F6368] max-w-[200px] truncate">{r.reason}</td>
                <td className="px-4 py-2.5 text-[#5F6368]">{new Date(r.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[r.status] || "bg-gray-100 text-gray-800"}`}>
                    {r.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[#5F6368]">{Number(r.refund_amount) > 0 ? `₹${Number(r.refund_amount).toLocaleString("en-IN")}` : "—"}</td>
                <td className="px-4 py-2.5 text-right">
                  <Button variant="ghost" size="sm" className="text-[12px] h-7" onClick={() => { setSelected(r); setAdminNotes(r.admin_notes || ""); setRefundAmount(String(r.refund_amount || "")); }}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Review
                  </Button>
                </td>
              </tr>
            ))}
            {returns.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#9AA0A6]">No return requests found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Review Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="text-[15px]">Review Return Request</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div><span className="text-[#5F6368]">Order:</span><p className="font-medium text-[#202124]">{(selected.orders as any)?.order_number}</p></div>
                <div><span className="text-[#5F6368]">Order Total:</span><p className="font-medium text-[#202124]">₹{Number((selected.orders as any)?.total_amount || 0).toLocaleString("en-IN")}</p></div>
              </div>
              <div className="text-[13px]">
                <span className="text-[#5F6368]">Reason:</span>
                <p className="font-medium text-[#202124] mt-0.5">{selected.reason}</p>
                {selected.description && <p className="text-[#5F6368] mt-1">{selected.description}</p>}
              </div>
              {selected.photo_urls?.length > 0 && (
                <div>
                  <span className="text-[12px] text-[#5F6368]">Photos:</span>
                  <div className="flex gap-2 mt-1">
                    {selected.photo_urls.map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] overflow-hidden">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div><Label className="text-[12px]">Admin Notes</Label><Textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} className="text-[13px]" placeholder="Internal notes..." /></div>
              <div><Label className="text-[12px]">Refund Amount (₹)</Label><Input type="number" value={refundAmount} onChange={e => setRefundAmount(e.target.value)} className="h-9 text-[13px]" /></div>

              {selected.status === "pending" && (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[13px]" onClick={() => updateStatus(selected.id, "approved")}>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[13px]" onClick={() => updateStatus(selected.id, "rejected")}>
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                  </Button>
                </div>
              )}
              {selected.status === "approved" && (
                <Button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]" onClick={() => updateStatus(selected.id, "refunded")}>
                  Process Refund
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReturnsRefunds;
