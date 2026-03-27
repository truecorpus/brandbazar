import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { MapPin, Plus, Pencil, Trash2, Star } from "lucide-react";

const emptyAddr = { recipient_name: "", phone: "", address_line_1: "", address_line_2: "", city: "", state: "", pincode: "", label: "Home" };

const Addresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyAddr);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    if (!user) return;
    const { data } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", { ascending: false });
    setAddresses(data || []);
  };

  useEffect(() => { fetch(); }, [user]);

  const openNew = () => { setEditing(null); setForm(emptyAddr); setSheetOpen(true); };
  const openEdit = (a: any) => { setEditing(a); setForm({ recipient_name: a.recipient_name, phone: a.phone || "", address_line_1: a.address_line_1, address_line_2: a.address_line_2 || "", city: a.city, state: a.state, pincode: a.pincode, label: a.label || "Home" }); setSheetOpen(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("addresses").update(form).eq("id", editing.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Address updated");
    } else {
      const { error } = await supabase.from("addresses").insert({ ...form, user_id: user.id });
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Address added");
    }
    setSaving(false);
    setSheetOpen(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Address deleted");
    fetch();
  };

  const setDefault = async (id: string) => {
    if (!user) return;
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
    await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    toast.success("Default address updated");
    fetch();
  };

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="max-w-[1100px] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">Addresses</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((a) => (
          <div key={a.id} className="bg-background rounded-2xl border border-border p-5 relative" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">{a.label || "Home"}</Badge>
              {a.is_default && <Badge className="text-xs bg-primary/10 text-primary border-0">Default</Badge>}
            </div>
            <p className="text-sm font-medium text-foreground">{a.recipient_name}</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {a.address_line_1}{a.address_line_2 && `, ${a.address_line_2}`}<br />
              {a.city}, {a.state} — {a.pincode}
            </p>
            {a.phone && <p className="text-sm text-muted-foreground mt-1">📞 {a.phone}</p>}
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => openEdit(a)}><Pencil size={14} /></Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(a.id)}><Trash2 size={14} /></Button>
              {!a.is_default && <Button variant="ghost" size="sm" className="text-muted-foreground ml-auto" onClick={() => setDefault(a.id)}><Star size={14} /> Set Default</Button>}
            </div>
          </div>
        ))}

        {/* Add new card */}
        <button onClick={openNew} className="rounded-2xl border-2 border-dashed border-border p-8 flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-primary/[0.02] transition-all">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><Plus size={20} className="text-muted-foreground" /></div>
          <span className="text-sm font-medium text-muted-foreground">Add New Address</span>
        </button>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-[440px]">
          <SheetHeader><SheetTitle className="font-heading">{editing ? "Edit Address" : "New Address"}</SheetTitle></SheetHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-6">
            <div className="space-y-1.5"><Label>Recipient name</Label><Input value={form.recipient_name} onChange={(e) => update("recipient_name", e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Address line 1</Label><Input value={form.address_line_1} onChange={(e) => update("address_line_1", e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Address line 2</Label><Input value={form.address_line_2} onChange={(e) => update("address_line_2", e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>City</Label><Input value={form.city} onChange={(e) => update("city", e.target.value)} required /></div>
              <div className="space-y-1.5"><Label>State</Label><Input value={form.state} onChange={(e) => update("state", e.target.value)} required /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Pincode</Label><Input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} required /></div>
              <div className="space-y-1.5"><Label>Label</Label><Input value={form.label} onChange={(e) => update("label", e.target.value)} placeholder="Home / Office" /></div>
            </div>
            <Button type="submit" className="w-full" disabled={saving}>{saving ? "Saving..." : "Save Address"}</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Addresses;
