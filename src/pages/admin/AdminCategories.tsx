import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, FolderTree, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const { toast } = useToast();

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("display_order");
    setCategories(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    await supabase.from("categories").insert({
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: form.description || null,
    });
    toast({ title: "Category created" });
    setDialogOpen(false);
    setForm({ name: "", slug: "", description: "" });
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    toast({ title: "Category deleted" });
    fetchCategories();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Categories</h1>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]"><Plus className="w-4 h-4" /> Add Category</Button>
      </div>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Name</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Slug</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-12 text-center text-[#9AA0A6]">No categories</td></tr>
              ) : categories.map(c => (
                <tr key={c.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                  <td className="px-4 py-3 font-medium text-[#202124]"><div className="flex items-center gap-2"><FolderTree className="w-4 h-4 text-[#9AA0A6]" />{c.name}</div></td>
                  <td className="px-4 py-3 text-[#9AA0A6] font-mono text-[12px]">{c.slug}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${c.is_active ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#F1F3F4] text-[#5F6368]"}`}>{c.is_active ? "Active" : "Inactive"}</span></td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => deleteCategory(c.id)}><Trash2 className="w-3.5 h-3.5 text-[#EA4335]" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-[#202124]">Add Category</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Name</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" /></div>
            <div><label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Slug</label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" placeholder="auto-generated" /></div>
            <div><label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Description</label><Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" /></div>
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

export default AdminCategories;
