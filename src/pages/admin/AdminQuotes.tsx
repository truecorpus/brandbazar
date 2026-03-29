import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => { fetchQuotes(); }, [statusFilter]);

  const fetchQuotes = async () => {
    setLoading(true);
    let q = supabase.from("quotes").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    const { data } = await q;
    setQuotes(data || []);
    setLoading(false);
  };

  const statusBadge = (s: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      new: { bg: "#E8F0FE", text: "#1A73E8" },
      in_review: { bg: "#FEF7E0", text: "#E37400" },
      quoted: { bg: "#F3E8FD", text: "#A142F4" },
      accepted: { bg: "#E6F4EA", text: "#137333" },
      declined: { bg: "#FCE8E6", text: "#C5221F" },
      expired: { bg: "#F1F3F4", text: "#5F6368" },
    };
    const c = map[s] || map.new;
    return <span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: c.bg, color: c.text }}>{s.replace(/_/g, " ").replace(/\b\w/g, ch => ch.toUpperCase())}</span>;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Quote Requests</h1>

      <Card className="p-3 border-[#DADCE0]">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search quotes..." className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Quote #</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Estimated</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">No quotes found</td></tr>
              ) : quotes.map(q => (
                <tr key={q.id} className={`border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors ${q.status === "new" ? "border-l-2 border-l-[#1A73E8]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[#1A73E8]">{q.quote_number || "—"}</td>
                  <td className="px-4 py-3 text-[#3C4043]">{q.lead_name || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{new Date(q.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#202124]">{q.total_estimated_amount ? `₹${Number(q.total_estimated_amount).toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3">{statusBadge(q.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setSelected(q); setSheetOpen(true); }}>
                      <Eye className="w-4 h-4 text-[#5F6368]" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[480px] sm:max-w-[480px] overflow-y-auto">
          <SheetHeader><SheetTitle>Quote {selected?.quote_number}</SheetTitle></SheetHeader>
          {selected && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-[11px] text-[#9AA0A6]">Contact</p>
                  <p className="text-[13px] font-medium text-[#202124]">{selected.lead_name || "—"}</p>
                  <p className="text-[12px] text-[#5F6368]">{selected.lead_email}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-[11px] text-[#9AA0A6]">Phone</p>
                  <p className="text-[13px] font-medium text-[#202124]">{selected.lead_phone || "—"}</p>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1.5 block">Admin Notes</label>
                <Textarea placeholder="Add pricing notes..." className="text-[13px] border-[#DADCE0]" defaultValue={selected.admin_notes || ""} />
              </div>
              <Button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]">
                <Send className="w-4 h-4" /> Send Quote to Customer
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminQuotes;
