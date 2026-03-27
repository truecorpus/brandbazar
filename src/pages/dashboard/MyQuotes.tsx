import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, Plus } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  in_review: "bg-yellow-50 text-yellow-700",
  sent: "bg-purple-50 text-purple-700",
  accepted: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  expired: "bg-muted text-muted-foreground",
};

const MyQuotes = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ requirements: "", quantity: "" });

  const fetchQuotes = async () => {
    if (!user) return;
    const { data } = await supabase.from("quotes").select("*").eq("customer_id", user.id).order("created_at", { ascending: false });
    setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchQuotes(); }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("quotes").insert({
      customer_id: user.id,
      products_requested: [{ notes: form.requirements, quantity: form.quantity }],
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Quote request submitted!");
    setOpen(false);
    setForm({ requirements: "", quantity: "" });
    fetchQuotes();
  };

  return (
    <div className="max-w-[1100px] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">My Quotes</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus size={16} /> Request Quote</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader><DialogTitle className="font-heading">Request a Quote</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label>Estimated quantity</Label>
                <Input placeholder="e.g. 500 units" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} required />
              </div>
              <div className="space-y-1.5">
                <Label>Requirements</Label>
                <Textarea placeholder="Describe products, customization, timeline..." value={form.requirements} onChange={(e) => setForm((p) => ({ ...p, requirements: e.target.value }))} rows={4} required />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Submit Quote Request"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Loading...</div>
        ) : quotes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto text-muted-foreground/40" size={40} />
            <p className="mt-3 text-sm text-muted-foreground">No quotes yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {quotes.map((q) => (
              <div key={q.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{q.quote_number || `Quote #${q.id.slice(0, 8)}`}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(q.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  {q.total_estimated_amount && <span className="text-sm font-medium text-foreground">₹{Number(q.total_estimated_amount).toLocaleString("en-IN")}</span>}
                  <Badge variant="secondary" className={`text-xs ${statusColors[q.status] || ""}`}>{q.status.replace(/_/g, " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuotes;
