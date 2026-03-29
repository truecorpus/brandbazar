import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", slug: "", short_description: "", long_description: "",
    base_price: "", gst_rate: "18", hsn_code: "", category_id: "",
    status: "draft", meta_title: "", meta_description: "",
    is_featured: false, is_corporate_pick: false,
  });

  useEffect(() => {
    fetchProducts();
    supabase.from("categories").select("id, name").then(({ data }) => setCategories(data || []));
  }, [statusFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    let q = supabase.from("products").select("*, categories(name)").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    const { data } = await q;
    setProducts(data || []);
    setLoading(false);
  };

  const filtered = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditProduct(null);
    setForm({ name: "", slug: "", short_description: "", long_description: "", base_price: "", gst_rate: "18", hsn_code: "", category_id: "", status: "draft", meta_title: "", meta_description: "", is_featured: false, is_corporate_pick: false });
    setDialogOpen(true);
  };

  const openEdit = (p: any) => {
    setEditProduct(p);
    setForm({
      name: p.name, slug: p.slug, short_description: p.short_description || "", long_description: p.long_description || "",
      base_price: String(p.base_price), gst_rate: String(p.gst_rate || 18), hsn_code: p.hsn_code || "",
      category_id: p.category_id || "", status: p.status, meta_title: p.meta_title || "", meta_description: p.meta_description || "",
      is_featured: p.is_featured || false, is_corporate_pick: p.is_corporate_pick || false,
    });
    setDialogOpen(true);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    const payload = {
      name: form.name, slug: form.slug || generateSlug(form.name),
      short_description: form.short_description || null, long_description: form.long_description || null,
      base_price: Number(form.base_price) || 0, gst_rate: Number(form.gst_rate) || 18,
      hsn_code: form.hsn_code || null, category_id: form.category_id || null,
      status: form.status, meta_title: form.meta_title || null, meta_description: form.meta_description || null,
      is_featured: form.is_featured, is_corporate_pick: form.is_corporate_pick,
    };

    if (editProduct) {
      await supabase.from("products").update(payload).eq("id", editProduct.id);
      toast({ title: "Product updated" });
    } else {
      await supabase.from("products").insert(payload);
      toast({ title: "Product created" });
    }
    setDialogOpen(false);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    fetchProducts();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Products</h1>
        <Button onClick={openCreate} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <Card className="p-3 border-[#DADCE0]">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Product</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Category</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Price</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">No products found</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F1F3F4] rounded-lg flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-4 h-4 text-[#9AA0A6]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#202124]">{p.name}</p>
                        <p className="text-[11px] text-[#9AA0A6]">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5F6368]">{p.categories?.name || "—"}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#202124]">₹{Number(p.base_price).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${p.status === "active" ? "bg-[#E6F4EA] text-[#137333]" : p.status === "draft" ? "bg-[#F1F3F4] text-[#5F6368]" : "bg-[#FCE8E6] text-[#C5221F]"}`}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openEdit(p)}><Edit2 className="w-3.5 h-3.5 text-[#5F6368]" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => deleteProduct(p.id)}><Trash2 className="w-3.5 h-3.5 text-[#EA4335]" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#202124]">{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Product Name *</label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: generateSlug(e.target.value) }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Slug</label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Short Description</label>
              <Input value={form.short_description} onChange={e => setForm(f => ({ ...f, short_description: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Long Description</label>
              <Textarea value={form.long_description} onChange={e => setForm(f => ({ ...f, long_description: e.target.value }))} className="text-[13px] border-[#DADCE0]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Base Price (₹) *</label>
                <Input type="number" value={form.base_price} onChange={e => setForm(f => ({ ...f, base_price: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">GST Rate (%)</label>
                <Input type="number" value={form.gst_rate} onChange={e => setForm(f => ({ ...f, gst_rate: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">HSN Code</label>
                <Input value={form.hsn_code} onChange={e => setForm(f => ({ ...f, hsn_code: e.target.value }))} className="h-9 text-[13px] border-[#DADCE0]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Category</label>
                <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Status</label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[13px] text-[#3C4043]">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="rounded" /> Featured
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#3C4043]">
                <input type="checkbox" checked={form.is_corporate_pick} onChange={e => setForm(f => ({ ...f, is_corporate_pick: e.target.checked }))} className="rounded" /> Corporate Pick
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-[13px] border-[#DADCE0]">Cancel</Button>
            <Button onClick={handleSave} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]">{editProduct ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
