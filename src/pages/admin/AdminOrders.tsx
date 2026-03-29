import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const statusColors: Record<string, { bg: string; text: string }> = {
  pending_payment: { bg: "#F1F3F4", text: "#5F6368" },
  confirmed: { bg: "#E8F0FE", text: "#1A73E8" },
  in_production: { bg: "#FEF7E0", text: "#E37400" },
  quality_check: { bg: "#F3E8FD", text: "#A142F4" },
  ready_to_dispatch: { bg: "#E8F0FE", text: "#1557B0" },
  dispatched: { bg: "#F3E8FD", text: "#A142F4" },
  delivered: { bg: "#E6F4EA", text: "#137333" },
  cancelled: { bg: "#FCE8E6", text: "#C5221F" },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, typeFilter, page]);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (statusFilter !== "all") query = query.eq("order_status", statusFilter);
    if (typeFilter !== "all") query = query.eq("order_type", typeFilter);

    const { data, error } = await query;
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const filteredOrders = orders.filter(o =>
    !search || o.order_number?.toLowerCase().includes(search.toLowerCase())
  );

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    await supabase.from("orders").update({ order_status: newStatus }).eq("id", orderId);
    fetchOrders();
    if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, order_status: newStatus });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const s = statusColors[status] || statusColors.pending_payment;
    return (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap" style={{ background: s.bg, color: s.text }}>
        {status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>All Orders</h1>
        <Button variant="outline" size="sm" className="gap-2 text-[13px] border-[#DADCE0]">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-3 border-[#DADCE0]">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search by order number..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-9 text-[13px] border-[#DADCE0]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.keys(statusColors).map(s => (
                <SelectItem key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] border-[#DADCE0]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="bulk">Bulk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Order #</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Type</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Payment</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-[#9AA0A6]">No orders found</td></tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#1A73E8]">{order.order_number || "—"}</td>
                    <td className="px-4 py-3 text-[#5F6368]">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><span className="capitalize text-[#3C4043]">{order.order_type}</span></td>
                    <td className="px-4 py-3 text-right font-medium text-[#202124]">₹{Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.payment_status} /></td>
                    <td className="px-4 py-3"><StatusBadge status={order.order_status} /></td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setSelectedOrder(order); setSheetOpen(true); }}>
                        <Eye className="w-4 h-4 text-[#5F6368]" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#F1F3F4]">
          <p className="text-[12px] text-[#9AA0A6]">Page {page + 1}</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setPage(p => p + 1)}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>

      {/* Order Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[480px] sm:max-w-[480px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-[#202124]">Order {selectedOrder?.order_number}</SheetTitle>
          </SheetHeader>
          {selectedOrder && (
            <div className="space-y-5 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-[11px] text-[#9AA0A6]">Order Type</p>
                  <p className="text-[13px] font-medium text-[#202124] capitalize">{selectedOrder.order_type}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-[11px] text-[#9AA0A6]">Total Amount</p>
                  <p className="text-[13px] font-medium text-[#202124]">₹{Number(selectedOrder.total_amount).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1.5 block">Update Status</label>
                <Select value={selectedOrder.order_status} onValueChange={v => updateOrderStatus(selectedOrder.id, v)}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(statusColors).map(s => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1.5 block">Internal Notes</label>
                <Textarea placeholder="Add notes..." className="text-[13px] border-[#DADCE0] min-h-[80px]" defaultValue={selectedOrder.internal_notes || ""} />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1.5 block">Special Instructions</label>
                <p className="text-[13px] text-[#3C4043]">{selectedOrder.special_instructions || "None"}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminOrders;
