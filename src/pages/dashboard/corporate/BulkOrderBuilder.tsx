import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag, Upload, MapPin, FileText, CheckCircle2,
  Plus, Trash2, ArrowLeft, ArrowRight, Package
} from "lucide-react";

type OrderLine = {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  artworkOption: "upload" | "later";
  artworkUrl: string;
  notes: string;
};

const steps = [
  { label: "Products", icon: ShoppingBag },
  { label: "Artwork", icon: Upload },
  { label: "Delivery", icon: MapPin },
  { label: "Instructions", icon: FileText },
  { label: "Review", icon: CheckCircle2 },
];

const BulkOrderBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [lines, setLines] = useState<OrderLine[]>([
    { productId: "", productName: "", variantId: "", variantName: "", quantity: 25, artworkOption: "later", artworkUrl: "", notes: "" },
  ]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [overallNotes, setOverallNotes] = useState("");

  useEffect(() => {
    const load = async () => {
      const [{ data: prods }, { data: addrs }] = await Promise.all([
        supabase.from("products").select("id, name, slug, base_price, bulk_price_tiers").eq("status", "active").order("name"),
        user ? supabase.from("addresses").select("*").eq("user_id", user.id) : Promise.resolve({ data: [] }),
      ]);
      if (prods) setProducts(prods);
      if (addrs && addrs.length) {
        setAddresses(addrs);
        const def = addrs.find((a: any) => a.is_default);
        if (def) setSelectedAddress(def.id);
      }
    };
    load();
  }, [user]);

  const addLine = () =>
    setLines([...lines, { productId: "", productName: "", variantId: "", variantName: "", quantity: 25, artworkOption: "later", artworkUrl: "", notes: "" }]);

  const removeLine = (i: number) => {
    if (lines.length <= 1) return;
    setLines(lines.filter((_, idx) => idx !== i));
  };

  const updateLine = (i: number, patch: Partial<OrderLine>) => {
    setLines(lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  };

  const getBulkPrice = (product: any, qty: number) => {
    const tiers = product?.bulk_price_tiers as any[];
    if (!tiers?.length) return Number(product?.base_price || 0);
    const sorted = [...tiers].sort((a, b) => b.min_quantity - a.min_quantity);
    const tier = sorted.find((t) => qty >= t.min_quantity);
    return tier ? Number(tier.price_per_unit) : Number(product?.base_price || 0);
  };

  const lineTotal = (line: OrderLine) => {
    const prod = products.find((p) => p.id === line.productId);
    return getBulkPrice(prod, line.quantity) * line.quantity;
  };

  const subtotal = lines.reduce((s, l) => s + lineTotal(l), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const canNext = () => {
    if (step === 0) return lines.every((l) => l.productId && l.quantity >= 1);
    if (step === 2) return !!selectedAddress;
    return true;
  };

  return (
    <div className="max-w-[900px] space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/corporate")}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-xl font-heading font-semibold text-foreground">Bulk Order Builder</h1>
          <p className="text-sm text-muted-foreground">Create a multi-product order with bulk pricing</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 bg-background rounded-2xl border border-border p-2" style={{ boxShadow: "var(--shadow-sm)" }}>
        {steps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => i <= step && setStep(i)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "text-primary bg-primary/5"
                : "text-muted-foreground"
            }`}
          >
            <s.icon size={14} />
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
        {/* Step 0: Products */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Select Products & Quantities</h3>
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex-1 space-y-3">
                  <select
                    value={line.productId}
                    onChange={(e) => {
                      const p = products.find((pr) => pr.id === e.target.value);
                      updateLine(i, { productId: e.target.value, productName: p?.name || "" });
                    }}
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option value="">Select product…</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    <div className="w-32">
                      <label className="text-xs text-muted-foreground mb-1 block">Quantity</label>
                      <Input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) => updateLine(i, { quantity: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    {line.productId && (
                      <div className="flex items-end gap-2 text-sm">
                        <span className="text-muted-foreground">
                          ₹{getBulkPrice(products.find((p) => p.id === line.productId), line.quantity).toFixed(0)}/unit
                        </span>
                        <span className="font-medium text-foreground">
                          = ₹{lineTotal(line).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeLine(i)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLine} className="gap-2">
              <Plus size={14} /> Add Product
            </Button>
          </div>
        )}

        {/* Step 1: Artwork */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Artwork for Each Product</h3>
            {lines.filter((l) => l.productId).map((line, i) => (
              <div key={i} className="p-4 bg-secondary/50 rounded-xl border border-border space-y-3">
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Package size={14} className="text-primary" /> {line.productName}
                  <Badge variant="secondary" className="text-xs">×{line.quantity}</Badge>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateLine(i, { artworkOption: "upload" })}
                    className={`flex-1 p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      line.artworkOption === "upload" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    <Upload size={16} className="mx-auto mb-1" />
                    Upload Now
                  </button>
                  <button
                    onClick={() => updateLine(i, { artworkOption: "later" })}
                    className={`flex-1 p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      line.artworkOption === "later" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    <FileText size={16} className="mx-auto mb-1" />
                    Upload Later
                  </button>
                </div>
                {line.artworkOption === "upload" && (
                  <Input type="file" accept="image/*,.pdf,.ai,.svg,.eps" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Delivery Details</h3>
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Delivery Address</label>
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedAddress === addr.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{addr.recipient_name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {addr.address_line_1}, {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  {addr.is_default && <Badge variant="secondary" className="text-[10px] mt-2">Default</Badge>}
                </button>
              ))}
              {addresses.length === 0 && (
                <p className="text-sm text-muted-foreground">No saved addresses. <a href="/dashboard/addresses" className="text-primary underline">Add one</a></p>
              )}
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Expected Delivery Date</label>
              <Input type="date" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 3: Instructions */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Special Instructions</h3>
            {lines.filter((l) => l.productId).map((line, i) => (
              <div key={i} className="p-4 bg-secondary/50 rounded-xl border border-border space-y-2">
                <p className="text-sm font-medium text-foreground">{line.productName}</p>
                <textarea
                  placeholder="Notes for this item (print placement, color notes, etc.)"
                  value={line.notes}
                  onChange={(e) => updateLine(i, { notes: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Overall Order Notes</label>
              <textarea
                placeholder="General instructions for the entire order…"
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Order Summary</h3>
            <div className="divide-y divide-border">
              {lines.filter((l) => l.productId).map((line, i) => {
                const prod = products.find((p) => p.id === line.productId);
                const unitPrice = getBulkPrice(prod, line.quantity);
                return (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{line.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {line.quantity} units × ₹{unitPrice.toFixed(0)}
                        {line.artworkOption === "later" && " · Artwork: upload later"}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground">₹{(unitPrice * line.quantity).toLocaleString("en-IN")}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span><span>₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-foreground font-semibold text-base pt-2 border-t border-border">
                <span>Total</span><span>₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Submit Order</Button>
              <Button variant="outline" className="flex-1">Request Quote Instead</Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
            Next <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkOrderBuilder;
