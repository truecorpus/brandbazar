import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit2, Trash2, Copy, Eye, Layers } from "lucide-react";
import { toast } from "sonner";

const PRODUCT_TYPES = ["mug", "tshirt", "cap", "idcard", "lamp", "keychain", "notebook", "kit"];

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<any>(null);
  const [jsonDialogOpen, setJsonDialogOpen] = useState(false);
  const [viewingJson, setViewingJson] = useState<any>(null);

  const [form, setForm] = useState({
    template_name: "",
    product_type: "mug",
    canvas_width: "1000",
    canvas_height: "1000",
    status: "draft",
    base_product_image_url: "",
    print_zones: "[]",
    views: "[]",
  });

  useEffect(() => {
    fetchTemplates();
  }, [typeFilter]);

  const fetchTemplates = async () => {
    setLoading(true);
    let q = supabase.from("product_templates").select("*").order("created_at", { ascending: false });
    if (typeFilter !== "all") q = q.eq("product_type", typeFilter as any);
    const { data } = await q;
    setTemplates(data || []);
    setLoading(false);
  };

  const filtered = templates.filter(
    (t) => !search || t.template_name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditTemplate(null);
    setForm({
      template_name: "", product_type: "mug", canvas_width: "1000",
      canvas_height: "1000", status: "draft", base_product_image_url: "",
      print_zones: "[]", views: "[]",
    });
    setDialogOpen(true);
  };

  const openEdit = (t: any) => {
    setEditTemplate(t);
    setForm({
      template_name: t.template_name,
      product_type: t.product_type,
      canvas_width: String(t.canvas_width),
      canvas_height: String(t.canvas_height),
      status: t.status,
      base_product_image_url: t.base_product_image_url || "",
      print_zones: JSON.stringify(t.print_zones, null, 2),
      views: JSON.stringify(t.views, null, 2),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    let parsedZones, parsedViews;
    try {
      parsedZones = JSON.parse(form.print_zones);
      parsedViews = JSON.parse(form.views);
    } catch {
      toast.error("Invalid JSON in print zones or views");
      return;
    }

    const payload = {
      template_name: form.template_name,
      product_type: form.product_type as any,
      canvas_width: Number(form.canvas_width),
      canvas_height: Number(form.canvas_height),
      status: form.status,
      base_product_image_url: form.base_product_image_url || null,
      print_zones: parsedZones,
      views: parsedViews,
    };

    if (editTemplate) {
      const { error } = await supabase
        .from("product_templates")
        .update(payload)
        .eq("id", editTemplate.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Template updated");
    } else {
      const { error } = await supabase.from("product_templates").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Template created");
    }
    setDialogOpen(false);
    fetchTemplates();
  };

  const handleDuplicate = async (t: any) => {
    const { id, created_at, updated_at, ...rest } = t;
    const { error } = await supabase.from("product_templates").insert({
      ...rest,
      template_name: `${t.template_name} (Copy)`,
      status: "draft",
    });
    if (error) toast.error(error.message);
    else { toast.success("Template duplicated"); fetchTemplates(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    await supabase.from("product_templates").delete().eq("id", id);
    toast.success("Template deleted");
    fetchTemplates();
  };

  const statusColor = (s: string) =>
    s === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#202124" }}>Product Templates</h1>
          <p className="text-sm mt-1" style={{ color: "#5F6368" }}>
            Manage customization blueprints for each product type
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2" style={{ backgroundColor: "#1A73E8" }}>
          <Plus className="w-4 h-4" /> New Template
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AA0A6" }} />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PRODUCT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ backgroundColor: "#F8F9FA" }}>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Template Name</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Type</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Canvas</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Zones</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Views</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Status</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: "#5F6368" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center" style={{ color: "#9AA0A6" }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center" style={{ color: "#9AA0A6" }}>No templates found</td></tr>
              ) : (
                filtered.map((t) => {
                  const zones = Array.isArray(t.print_zones) ? t.print_zones : [];
                  const views = Array.isArray(t.views) ? t.views : [];
                  return (
                    <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium" style={{ color: "#202124" }}>{t.template_name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="capitalize">{t.product_type}</Badge>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#5F6368" }}>{t.canvas_width}×{t.canvas_height}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { setViewingJson({ title: `Print Zones — ${t.template_name}`, data: zones }); setJsonDialogOpen(true); }}
                          className="text-xs underline"
                          style={{ color: "#1A73E8" }}
                        >
                          {zones.length} zones
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { setViewingJson({ title: `Views — ${t.template_name}`, data: views }); setJsonDialogOpen(true); }}
                          className="text-xs underline"
                          style={{ color: "#1A73E8" }}
                        >
                          {views.length} views
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColor(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(t)}>
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(t.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editTemplate ? "Edit Template" : "Create Template"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Template Name</label>
                <Input value={form.template_name} onChange={(e) => setForm({ ...form, template_name: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Product Type</label>
                <Select value={form.product_type} onValueChange={(v) => setForm({ ...form, product_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PRODUCT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Canvas Width (px)</label>
                <Input type="number" value={form.canvas_width} onChange={(e) => setForm({ ...form, canvas_width: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Canvas Height (px)</label>
                <Input type="number" value={form.canvas_height} onChange={(e) => setForm({ ...form, canvas_height: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Status</label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>Base Product Image URL</label>
              <Input value={form.base_product_image_url} onChange={(e) => setForm({ ...form, base_product_image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>
                Print Zones (JSON Array)
              </label>
              <Textarea
                value={form.print_zones}
                onChange={(e) => setForm({ ...form, print_zones: e.target.value })}
                className="font-mono text-xs min-h-[150px]"
                placeholder='[{"id":"zone-1","name":"Front","zoneType":"print","x":0,"y":0,"width":800,"height":600,"shape":"rectangle","isSafeArea":true,"maxColors":12,"supportedPrintMethods":["digital_print"]}]'
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#5F6368" }}>
                Views (JSON Array)
              </label>
              <Textarea
                value={form.views}
                onChange={(e) => setForm({ ...form, views: e.target.value })}
                className="font-mono text-xs min-h-[100px]"
                placeholder='[{"id":"front","name":"Front View","baseImageUrl":"","printZoneIds":["zone-1"]}]'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} style={{ backgroundColor: "#1A73E8" }}>
              {editTemplate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* JSON Viewer Dialog */}
      <Dialog open={jsonDialogOpen} onOpenChange={setJsonDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingJson?.title}</DialogTitle>
          </DialogHeader>
          <pre className="bg-gray-50 rounded-lg p-4 text-xs overflow-x-auto font-mono" style={{ color: "#202124" }}>
            {JSON.stringify(viewingJson?.data, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTemplates;
