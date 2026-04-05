import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CreditCard, Smartphone, Building2, Wallet, ChevronRight,
  ShieldCheck, IndianRupee, AlertCircle, CheckCircle2, Loader2,
  Receipt, Truck, MapPin
} from "lucide-react";

declare global {
  interface Window { Razorpay: any; }
}

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", description: "GPay, PhonePe, Paytm, BHIM", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", description: "Visa, Mastercard, Rupay", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", description: "All major Indian banks", icon: Building2 },
  { id: "wallet", label: "Wallets", description: "Paytm, Amazon Pay", icon: Wallet },
  { id: "emi", label: "EMI", description: "Available on orders ₹5,000+", icon: IndianRupee },
  { id: "bank_transfer", label: "Bank Transfer / NEFT / RTGS", description: "For corporate orders", icon: Building2 },
];

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");

  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"review" | "payment" | "success">("review");

  const isAdvanceRequired = order && Number(order.total_amount) >= 10000;
  const advanceAmount = isAdvanceRequired ? Math.ceil(Number(order.total_amount) * 0.5) : Number(order?.total_amount || 0);
  const isCorporate = order?.order_type === "corporate";

  useEffect(() => {
    if (!orderId || !user) return;
    const fetchOrder = async () => {
      const { data: o } = await supabase.from("customer_orders" as any).select("*").eq("id", orderId).single();
      if (!o) { navigate("/dashboard/orders"); return; }
      setOrder(o);

      const { data: items } = await supabase.from("order_items").select("*, products(name, hsn_code)").eq("order_id", orderId);
      setOrderItems(items || []);

      if (o.shipping_address_id) {
        const { data: addr } = await supabase.from("addresses").select("*").eq("id", o.shipping_address_id).single();
        setShippingAddress(addr);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [orderId, user]);

  const handlePayment = async () => {
    if (selectedMethod === "bank_transfer") {
      setProcessing(true);
      await supabase.from("payments").insert({
        order_id: orderId!,
        amount: advanceAmount,
        payment_method: "bank_transfer",
        payment_status: "pending_verification",
        payment_gateway: "manual",
        notes: "Bank transfer — pending admin verification",
      });
      await supabase.from("orders").update({ payment_status: "pending_verification" }).eq("id", orderId!);
      setStep("success");
      setProcessing(false);
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { order_id: orderId, amount: advanceAmount, is_advance: isAdvanceRequired },
      });
      if (error || !data?.razorpay_order_id) throw new Error(error?.message || "Failed to create payment");

      const options = {
        key: data.razorpay_key_id,
        amount: advanceAmount * 100,
        currency: "INR",
        name: "BrandBazaar",
        description: `Order ${order?.order_number || ""}`,
        order_id: data.razorpay_order_id,
        prefill: { email: user?.email },
        handler: async (response: any) => {
          const { error: verifyError } = await supabase.functions.invoke("verify-razorpay-payment", {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderId,
              amount: advanceAmount,
              is_advance: isAdvanceRequired,
              payment_method: selectedMethod,
            },
          });
          if (verifyError) { toast.error("Payment verification failed"); setProcessing(false); return; }
          setStep("success");
          setProcessing(false);
        },
        modal: { ondismiss: () => setProcessing(false) },
        theme: { color: "#1A73E8" },
        method: { [selectedMethod]: true },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mt-6">
            {selectedMethod === "bank_transfer" ? "Order Placed — Awaiting Payment" : "Payment Successful!"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {selectedMethod === "bank_transfer"
              ? "Please complete the bank transfer. We'll confirm once payment is received."
              : `Your order ${order?.order_number} has been confirmed.`}
          </p>
          {isAdvanceRequired && selectedMethod !== "bank_transfer" && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Advance Paid:</strong> ₹{advanceAmount.toLocaleString("en-IN")} |{" "}
              <strong>Remaining:</strong> ₹{(Number(order.total_amount) - advanceAmount).toLocaleString("en-IN")} (due before dispatch)
            </div>
          )}
          <div className="flex gap-3 justify-center mt-8">
            <Button variant="outline" onClick={() => navigate(`/dashboard/orders/${orderId}`)}>View Order</Button>
            <Button onClick={() => navigate("/dashboard/orders")}>My Orders</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button onClick={() => setStep("review")} className={`flex items-center gap-1.5 font-medium ${step === "review" ? "text-primary" : "text-muted-foreground"}`}>
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span> Review
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className={`flex items-center gap-1.5 font-medium ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}>2</span> Payment
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {step === "review" && (
              <>
                {/* Shipping */}
                {shippingAddress && (
                  <Card className="p-5 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Deliver to: {shippingAddress.recipient_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {shippingAddress.address_line_1}, {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Items */}
                <Card className="border-border overflow-hidden">
                  <div className="p-4 border-b border-border bg-secondary/30">
                    <h2 className="text-sm font-heading font-semibold text-foreground">Order Items ({orderItems.length})</h2>
                  </div>
                  <div className="divide-y divide-border">
                    {orderItems.map((item) => (
                      <div key={item.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-foreground">{(item.products as any)?.name || "Product"}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity} × ₹{Number(item.unit_price).toLocaleString("en-IN")}</p>
                          {(item.products as any)?.hsn_code && (
                            <p className="text-[11px] text-muted-foreground">HSN: {(item.products as any).hsn_code}</p>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-foreground">₹{(item.quantity * Number(item.unit_price)).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Advance notice */}
                {isAdvanceRequired && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Advance Payment Required</p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Orders above ₹10,000 require 50% advance (₹{advanceAmount.toLocaleString("en-IN")}). Remaining ₹{(Number(order.total_amount) - advanceAmount).toLocaleString("en-IN")} is due before dispatch.
                      </p>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg" onClick={() => setStep("payment")}>
                  Proceed to Payment <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </>
            )}

            {step === "payment" && (
              <Card className="border-border">
                <div className="p-4 border-b border-border bg-secondary/30">
                  <h2 className="text-sm font-heading font-semibold text-foreground">Select Payment Method</h2>
                </div>
                <div className="p-4">
                  <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
                    {PAYMENT_METHODS.map((method) => {
                      const disabled = method.id === "emi" && Number(order.total_amount) < 5000;
                      const isCorporateOnly = method.id === "bank_transfer" && !isCorporate;
                      if (isCorporateOnly) return null;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedMethod === method.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
                          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <RadioGroupItem value={method.id} disabled={disabled} />
                          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                            <method.icon className="w-5 h-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                          {disabled && <Badge variant="secondary" className="text-[10px]">Min ₹5,000</Badge>}
                        </label>
                      );
                    })}
                  </RadioGroup>

                  {selectedMethod === "bank_transfer" && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                      <p className="font-medium">Bank Transfer Details</p>
                      <p className="mt-1 text-xs">Account Name: BrandBazaar Pvt Ltd</p>
                      <p className="text-xs">Bank: HDFC Bank</p>
                      <p className="text-xs">Account: 50200012345678</p>
                      <p className="text-xs">IFSC: HDFC0001234</p>
                      <p className="text-xs mt-2 text-blue-600">Use Order #{order?.order_number} as payment reference.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" /> Secured by Razorpay • 256-bit encryption
                  </div>

                  <Button className="w-full mt-4" size="lg" onClick={handlePayment} disabled={processing}>
                    {processing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</> : (
                      <>Pay ₹{advanceAmount.toLocaleString("en-IN")} {isAdvanceRequired ? "(50% Advance)" : ""}</>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="border-border sticky top-24">
              <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="text-sm font-heading font-semibold text-foreground">Order Summary</h3>
                {order?.order_number && <p className="text-xs text-muted-foreground mt-0.5">{order.order_number}</p>}
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{Number(order?.subtotal || 0).toLocaleString("en-IN")}</span></div>
                {Number(order?.discount_amount) > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{Number(order.discount_amount).toLocaleString("en-IN")}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{Number(order?.gst_amount || 0).toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{Number(order?.shipping_amount) > 0 ? `₹${Number(order.shipping_amount).toLocaleString("en-IN")}` : "Free"}</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span><span>₹{Number(order?.total_amount || 0).toLocaleString("en-IN")}</span>
                </div>
                {isAdvanceRequired && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-primary font-medium">
                      <span>Pay Now (50%)</span><span>₹{advanceAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-xs">
                      <span>Due before dispatch</span><span>₹{(Number(order.total_amount) - advanceAmount).toLocaleString("en-IN")}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4 border-t border-border bg-secondary/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Receipt className="w-3.5 h-3.5" /> GST invoice generated on payment
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                  <Truck className="w-3.5 h-3.5" /> {order?.expected_delivery_date ? `Expected by ${new Date(order.expected_delivery_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : "Delivery estimate after payment"}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
