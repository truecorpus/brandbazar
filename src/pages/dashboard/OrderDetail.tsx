import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Package, CheckCircle2, Truck, MapPin, RotateCcw } from "lucide-react";

const steps = ["confirmed", "in_production", "quality_check", "dispatched", "delivered"];
const stepLabels = ["Confirmed", "In Production", "Quality Check", "Dispatched", "Delivered"];

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [shipment, setShipment] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;
    const fetch = async () => {
      const [orderRes, itemsRes, shipRes] = await Promise.all([
        supabase.from("orders").select("*").eq("id", orderId).single(),
        supabase.from("order_items").select("*, products(name, slug)").eq("order_id", orderId),
        supabase.from("shipments").select("*").eq("order_id", orderId).limit(1).maybeSingle(),
      ]);
      if (orderRes.data) setOrder(orderRes.data);
      if (itemsRes.data) setItems(itemsRes.data);
      if (shipRes.data) setShipment(shipRes.data);
    };
    fetch();
  }, [orderId]);

  if (!order) return <div className="p-12 text-center text-sm text-muted-foreground">Loading order...</div>;

  const currentStep = steps.indexOf(order.order_status);

  return (
    <div className="max-w-[900px] space-y-6">
      <Link to="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-heading font-semibold text-foreground">Order {order.order_number || order.id.slice(0, 8)}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Download size={14} /> Download Invoice</Button>
          {order.order_status === "delivered" && (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate(`/dashboard/returns/${orderId}`)}>
              <RotateCcw size={14} /> Request Return
            </Button>
          )}
        </div>
      </div>

      {/* Progress tracker */}
      {currentStep >= 0 && (
        <div className="bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
            <div className="absolute top-4 left-0 h-0.5 bg-primary transition-all" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
            {steps.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"
                }`}>
                  {i <= currentStep ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-2 ${i <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {stepLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order items */}
      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-heading font-semibold text-foreground">Order Items</h2>
        </div>
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Package size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.products?.name || "Product"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">₹{(Number(item.unit_price) * item.quantity).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border bg-secondary/30 rounded-b-2xl">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{Number(order.subtotal).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">GST</span><span className="text-foreground">₹{Number(order.gst_amount).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">₹{Number(order.shipping_amount).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-border"><span className="text-foreground">Total</span><span className="text-foreground">₹{Number(order.total_amount).toLocaleString("en-IN")}</span></div>
        </div>
      </div>

      {/* Shipment info */}
      {shipment && (
        <div className="bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <h2 className="text-base font-heading font-semibold text-foreground flex items-center gap-2"><Truck size={18} /> Shipment Details</h2>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div><span className="text-muted-foreground">Courier</span><p className="font-medium text-foreground mt-0.5">{shipment.courier_partner || "—"}</p></div>
            <div><span className="text-muted-foreground">Tracking #</span><p className="font-medium text-foreground mt-0.5">{shipment.tracking_number || "—"}</p></div>
            <div><span className="text-muted-foreground">Status</span><p className="font-medium text-foreground mt-0.5 capitalize">{(shipment.shipment_status || "").replace(/_/g, " ")}</p></div>
            <div><span className="text-muted-foreground">Expected Delivery</span><p className="font-medium text-foreground mt-0.5">{shipment.expected_delivery_date ? new Date(shipment.expected_delivery_date).toLocaleDateString("en-IN") : "—"}</p></div>
          </div>
          {shipment.tracking_url && (
            <Button variant="outline" size="sm" className="mt-4" asChild><a href={shipment.tracking_url} target="_blank" rel="noopener noreferrer">Track Shipment</a></Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
