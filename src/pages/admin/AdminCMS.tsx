import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileImage, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminCMS = () => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "", content_type: "banner", body: "", cta_text: "", cta_link: "", target_audience: "all" });
  const { toast } = useToast();

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("cms_content").select("*").order("display_order");
    setContent(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    await supabase.from("cms_content").insert({ ...form, body: form.body || null, subtitle: form.subtitle || null, cta_text: form.cta_text || null, cta_link: form.cta_link || null });
    toast({ title: "Content created" });
    setDialogOpen(false);
    fetchContent();
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("cms_content").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchContent();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Banners & CMS</h1>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]"><Plus className="w-4 h-4" /> Add Content</Button>
      </div>

      {loading ? (
        <p className="text-[#9AA0A6] text-[13px]">Loading...</p>
      ) : content.length === 0 ? (
        <Card className="p-8 border-[#DADCE0] text-center"><FileImage className="w-12 h-12 text-[#DADCE0] mx-auto mb-3" /><p className="text-[13px] text-[#9AA0A6]">No CMS content yet</p></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map(c => (
            <Card key={c.id} className="border-[#DADCE0] overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-[#E8F0FE] to-[#F8F9FA] flex items-center justify-center"><FileImage className="w-8 h-8 text-[#1A73E8]/30" /></div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E8F0FE] text-[#1A73E8] capitalize">{c.content_type}</span>
                  <span className={`text-[10px] font-medium ${c.is_active ? "text-[#34A853]" : "text-[#9AA0A6]"}`}>{c.is_active ? "Live" : "Draft"}</span>
                </div>
                <p className="text-[14px] font-medium text-[#202124] truncate">{c.title}</p>
                {c.subtitle && <p className="text-[12px] text-[#5F6368] truncate">{c.subtitle}</p>}
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => deleteContent(c.id)}><Trash2 className="w-3.5 h-3.5 text-[#EA4335]" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-[#202124]">Add CMS Content</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Title</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Type</label>
                <Select value={form.content_type} onValueChange={v => setForm(f => ({ ...f, content_type: v }))}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="banner">Banner</SelectItem><SelectItem value="announcement">Announcement</SelectItem><SelectItem value="promo">Promo</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Audience</label>
                <Select value={form.target_audience} onValueChange={v => setForm(f => ({ ...f, target_audience: v }))}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="corporate">Corporate</SelectItem><SelectItem value="individual">Individual</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div><label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Body</label><Textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} className="text-[13px] border-[#DADCE0] min-h-[60px]" /></div>
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

export default AdminCMS;
