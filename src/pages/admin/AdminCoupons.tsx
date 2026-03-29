import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Ticket, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    code: "", description: "", discount_type: "percentage", discount_value: "",
    min_order_value: "", max_discount_cap: "", usage_limit_total: "", usage_limit_per_user: "1",
  });

  useEffect(() => { fetchCoupons(); }, []);

  const fetchCoupons = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setCoupons(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    await supabase.from("coupons").insert({
      code: form.code.toUpperCase(),
      description: form.description || null,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_value: Number(form.min_order_value) || null,
      max_discount_cap: Number(form.max_discount_cap) || null,
      usage_limit_total: Number(form.usage_limit_total) || null,
      usage_limit_per_user: Number(form.usage_limit_per_user) || 1,
    });
    toast({ title: "Coupon created" });
    setDialogOpen(false);
    fetchCoupons();
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    await supabase.from("coupons").delete().eq("id", id);
    toast({ title: "Coupon deleted" });
    fetchCoupons();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Coupons & Offers</h1>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]"><Plus className="w-4 h-4" /> Create Coupon</Button>
      </div>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Code</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Discount</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Min Order</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Used</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">No coupons</td></tr>
              ) : coupons.map(c => (
                <tr key={c.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#F9AB00]" />
                      <span className="font-mono font-semibold text-[#202124]">{c.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#3C4043]">{c.discount_type === "percentage" ? `${c.discount_value}%` : `₹${c.discount_value}`}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{c.min_order_value ? `₹${Number(c.min_order_value).toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3 text-center text-[#5F6368]">{c.times_used}/{c.usage_limit_total || "∞"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${c.is_active ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#F1F3F4] text-[#5F6368]"}`}>
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { navigator.clipboard.writeText(c.code); toast({ title: "Copied!" }); }}>
                      <Copy className="w-3.5 h-3.5 text-[#5F6368]" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => deleteCoupon(c.id)}>
                      <Trash2 className="w-3.5 h-3.5 text-[#EA4335]" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-[#202124]">Create Coupon</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Code *</label>
              <Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="SAVE20" className="h-9 text-[13px] border-[#DADCE0] uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Type</label>
                <Select value={form.discount_type} onValueChange={v => setForm(f => ({ ...f, discount_type: v }))}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="flat">Flat Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Value *</label>
                <Input type="number" value={form.discount_value} onChange={e => setForm(f => ({ ...f, discount_value: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Min Order (₹)</label>
                <Input type="number" value={form.min_order_value} onChange={e => setForm(f => ({ ...f, min_order_value: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Usage Limit</label>
                <Input type="number" value={form.usage_limit_total} onChange={e => setForm(f => ({ ...f, usage_limit_total: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Description</label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="text-[13px] border-[#DADCE0] min-h-[60px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-[13px] border-[#DADCE0]">Cancel</Button>
            <Button onClick={handleCreate} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;
