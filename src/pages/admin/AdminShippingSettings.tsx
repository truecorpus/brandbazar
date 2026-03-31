import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Truck, MapPin, Plus, Pencil, Trash2, Search, Upload, Loader2 } from "lucide-react";

const AdminShippingSettings = () => {
  const [zones, setZones] = useState<any[]>([]);
  const [pincodes, setPincodes] = useState<any[]>([]);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [zoneDialogOpen, setZoneDialogOpen] = useState(false);
  const [pincodeDialogOpen, setPincodeDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<any>(null);
  const [zoneForm, setZoneForm] = useState({
    zone_name: "", zone_type: "national", free_shipping_threshold: "0",
    flat_rate: "0", express_rate: "0", standard_days: "5", express_days: "2",
  });
  const [pincodeForm, setPincodeForm] = useState({ pincode: "", city: "", state: "", zone_id: "", is_serviceable: true });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [z, p] = await Promise.all([
      supabase.from("shipping_zones").select("*").order("created_at"),
      supabase.from("pincode_serviceability").select("*, shipping_zones(zone_name)").order("pincode").limit(100),
    ]);
    setZones(z.data || []);
    setPincodes(p.data || []);
    setLoading(false);
  };

  const saveZone = async () => {
    const payload = {
      zone_name: zoneForm.zone_name,
      zone_type: zoneForm.zone_type,
      free_shipping_threshold: Number(zoneForm.free_shipping_threshold),
      flat_rate: Number(zoneForm.flat_rate),
      express_rate: Number(zoneForm.express_rate),
      standard_days: Number(zoneForm.standard_days),
      express_days: Number(zoneForm.express_days),
    };
    if (editingZone) {
      await supabase.from("shipping_zones").update(payload).eq("id", editingZone.id);
    } else {
      await supabase.from("shipping_zones").insert(payload);
    }
    toast.success(editingZone ? "Zone updated" : "Zone created");
    setZoneDialogOpen(false);
    setEditingZone(null);
    setZoneForm({ zone_name: "", zone_type: "national", free_shipping_threshold: "0", flat_rate: "0", express_rate: "0", standard_days: "5", express_days: "2" });
    fetchData();
  };

  const deleteZone = async (id: string) => {
    await supabase.from("shipping_zones").delete().eq("id", id);
    toast.success("Zone deleted");
    fetchData();
  };

  const savePincode = async () => {
    await supabase.from("pincode_serviceability").upsert({
      pincode: pincodeForm.pincode,
      city: pincodeForm.city,
      state: pincodeForm.state,
      zone_id: pincodeForm.zone_id || null,
      is_serviceable: pincodeForm.is_serviceable,
    }, { onConflict: "pincode" });
    toast.success("Pincode saved");
    setPincodeDialogOpen(false);
    setPincodeForm({ pincode: "", city: "", state: "", zone_id: "", is_serviceable: true });
    fetchData();
  };

  const searchPincodes = async () => {
    if (!pincodeSearch.trim()) { fetchData(); return; }
    const { data } = await supabase.from("pincode_serviceability")
      .select("*, shipping_zones(zone_name)")
      .ilike("pincode", `${pincodeSearch}%`).limit(50);
    setPincodes(data || []);
  };

  const openEditZone = (zone: any) => {
    setEditingZone(zone);
    setZoneForm({
      zone_name: zone.zone_name,
      zone_type: zone.zone_type,
      free_shipping_threshold: String(zone.free_shipping_threshold),
      flat_rate: String(zone.flat_rate),
      express_rate: String(zone.express_rate),
      standard_days: String(zone.standard_days),
      express_days: String(zone.express_days),
    });
    setZoneDialogOpen(true);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#1A73E8]" /></div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Shipping Settings</h1>

      <Tabs defaultValue="zones" className="space-y-4">
        <TabsList className="bg-white border border-[#DADCE0]">
          <TabsTrigger value="zones" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">
            <Truck className="w-3.5 h-3.5 mr-1.5" /> Shipping Zones
          </TabsTrigger>
          <TabsTrigger value="pincodes" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">
            <MapPin className="w-3.5 h-3.5 mr-1.5" /> Pincode Serviceability
          </TabsTrigger>
        </TabsList>

        {/* ZONES TAB */}
        <TabsContent value="zones">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[13px] text-[#5F6368]">Configure delivery zones with rates and estimated delivery times.</p>
            <Dialog open={zoneDialogOpen} onOpenChange={(o) => { setZoneDialogOpen(o); if (!o) { setEditingZone(null); setZoneForm({ zone_name: "", zone_type: "national", free_shipping_threshold: "0", flat_rate: "0", express_rate: "0", standard_days: "5", express_days: "2" }); } }}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]"><Plus className="w-3.5 h-3.5 mr-1" /> Add Zone</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle className="text-[15px]">{editingZone ? "Edit" : "Add"} Shipping Zone</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label className="text-[12px]">Zone Name</Label><Input value={zoneForm.zone_name} onChange={e => setZoneForm(p => ({ ...p, zone_name: e.target.value }))} className="h-9 text-[13px]" placeholder="e.g. Local, Regional, National" /></div>
                  <div><Label className="text-[12px]">Zone Type</Label>
                    <select value={zoneForm.zone_type} onChange={e => setZoneForm(p => ({ ...p, zone_type: e.target.value }))} className="w-full h-9 text-[13px] border border-[#DADCE0] rounded-md px-3">
                      <option value="local">Local (Same City)</option>
                      <option value="regional">Regional (Same State)</option>
                      <option value="national">National (Rest of India)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-[12px]">Free Shipping Above (₹)</Label><Input type="number" value={zoneForm.free_shipping_threshold} onChange={e => setZoneForm(p => ({ ...p, free_shipping_threshold: e.target.value }))} className="h-9 text-[13px]" /></div>
                    <div><Label className="text-[12px]">Flat Rate (₹)</Label><Input type="number" value={zoneForm.flat_rate} onChange={e => setZoneForm(p => ({ ...p, flat_rate: e.target.value }))} className="h-9 text-[13px]" /></div>
                    <div><Label className="text-[12px]">Express Rate (₹)</Label><Input type="number" value={zoneForm.express_rate} onChange={e => setZoneForm(p => ({ ...p, express_rate: e.target.value }))} className="h-9 text-[13px]" /></div>
                    <div><Label className="text-[12px]">Standard Days</Label><Input type="number" value={zoneForm.standard_days} onChange={e => setZoneForm(p => ({ ...p, standard_days: e.target.value }))} className="h-9 text-[13px]" /></div>
                    <div><Label className="text-[12px]">Express Days</Label><Input type="number" value={zoneForm.express_days} onChange={e => setZoneForm(p => ({ ...p, express_days: e.target.value }))} className="h-9 text-[13px]" /></div>
                  </div>
                  <Button onClick={saveZone} className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]">{editingZone ? "Update" : "Create"} Zone</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zones.map(zone => (
              <Card key={zone.id} className="p-5 border-[#DADCE0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1A73E8]" />
                    <h3 className="text-[14px] font-semibold text-[#202124]">{zone.zone_name}</h3>
                  </div>
                  <Badge variant="outline" className="text-[11px] capitalize">{zone.zone_type}</Badge>
                </div>
                <div className="space-y-1.5 text-[12px] text-[#5F6368]">
                  <p>Free above: <span className="font-medium text-[#202124]">₹{Number(zone.free_shipping_threshold).toLocaleString("en-IN")}</span></p>
                  <p>Flat rate: <span className="font-medium text-[#202124]">₹{Number(zone.flat_rate)}</span></p>
                  <p>Express: <span className="font-medium text-[#202124]">₹{Number(zone.express_rate)}</span></p>
                  <p>Standard: <span className="font-medium text-[#202124]">{zone.standard_days} days</span> | Express: <span className="font-medium text-[#202124]">{zone.express_days} days</span></p>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="text-[12px] h-7" onClick={() => openEditZone(zone)}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                  <Button variant="outline" size="sm" className="text-[12px] h-7 text-red-600 hover:text-red-700" onClick={() => deleteZone(zone.id)}><Trash2 className="w-3 h-3 mr-1" /> Delete</Button>
                </div>
              </Card>
            ))}
            {zones.length === 0 && (
              <Card className="p-8 border-[#DADCE0] col-span-3 text-center">
                <p className="text-[13px] text-[#9AA0A6]">No shipping zones configured. Add your first zone to get started.</p>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* PINCODES TAB */}
        <TabsContent value="pincodes">
          <div className="flex justify-between items-center mb-3 gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Input value={pincodeSearch} onChange={e => setPincodeSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && searchPincodes()} placeholder="Search pincode..." className="h-9 text-[13px]" />
              <Button variant="outline" size="sm" onClick={searchPincodes}><Search className="w-3.5 h-3.5" /></Button>
            </div>
            <Dialog open={pincodeDialogOpen} onOpenChange={setPincodeDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]"><Plus className="w-3.5 h-3.5 mr-1" /> Add Pincode</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle className="text-[15px]">Add Pincode</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label className="text-[12px]">Pincode</Label><Input value={pincodeForm.pincode} onChange={e => setPincodeForm(p => ({ ...p, pincode: e.target.value }))} className="h-9 text-[13px]" maxLength={6} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-[12px]">City</Label><Input value={pincodeForm.city} onChange={e => setPincodeForm(p => ({ ...p, city: e.target.value }))} className="h-9 text-[13px]" /></div>
                    <div><Label className="text-[12px]">State</Label><Input value={pincodeForm.state} onChange={e => setPincodeForm(p => ({ ...p, state: e.target.value }))} className="h-9 text-[13px]" /></div>
                  </div>
                  <div><Label className="text-[12px]">Assign Zone</Label>
                    <select value={pincodeForm.zone_id} onChange={e => setPincodeForm(p => ({ ...p, zone_id: e.target.value }))} className="w-full h-9 text-[13px] border border-[#DADCE0] rounded-md px-3">
                      <option value="">No zone</option>
                      {zones.map(z => <option key={z.id} value={z.id}>{z.zone_name}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={pincodeForm.is_serviceable} onCheckedChange={v => setPincodeForm(p => ({ ...p, is_serviceable: v }))} />
                    <Label className="text-[12px]">Serviceable</Label>
                  </div>
                  <Button onClick={savePincode} className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]">Save Pincode</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-[#DADCE0] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <tr>
                  <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Pincode</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">City</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">State</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Zone</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[#5F6368]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                {pincodes.map((p: any) => (
                  <tr key={p.id} className="hover:bg-[#F8F9FA]">
                    <td className="px-4 py-2.5 font-medium text-[#202124]">{p.pincode}</td>
                    <td className="px-4 py-2.5 text-[#5F6368]">{p.city || "—"}</td>
                    <td className="px-4 py-2.5 text-[#5F6368]">{p.state || "—"}</td>
                    <td className="px-4 py-2.5 text-[#5F6368]">{(p.shipping_zones as any)?.zone_name || "—"}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={p.is_serviceable ? "default" : "destructive"} className="text-[11px]">
                        {p.is_serviceable ? "Serviceable" : "Not Serviceable"}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {pincodes.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-[#9AA0A6]">No pincodes found.</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminShippingSettings;
