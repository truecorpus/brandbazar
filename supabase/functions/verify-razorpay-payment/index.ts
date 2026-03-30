import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.224.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id, amount, is_advance, payment_method } = await req.json();

    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!RAZORPAY_KEY_SECRET) {
      return new Response(JSON.stringify({ error: "Razorpay not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(RAZORPAY_KEY_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const expectedSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");

    if (expectedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: "Invalid payment signature" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verified — update database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert payment record
    await supabase.from("payments").insert({
      order_id,
      amount,
      payment_method: payment_method || "razorpay",
      payment_gateway: "razorpay",
      gateway_transaction_id: razorpay_payment_id,
      payment_status: "completed",
      payment_date: new Date().toISOString(),
    });

    // Update order status
    const updateData: any = {
      payment_status: is_advance ? "advance_paid" : "paid",
    };
    if (is_advance) {
      updateData.advance_paid = true;
      updateData.advance_amount = amount;
      const { data: orderData } = await supabase.from("orders").select("total_amount").eq("id", order_id).single();
      if (orderData) {
        updateData.remaining_amount = Number(orderData.total_amount) - amount;
      }
    }
    if (!is_advance) {
      updateData.order_status = "confirmed";
    }
    await supabase.from("orders").update(updateData).eq("id", order_id);

    // Trigger invoice generation
    await supabase.functions.invoke("generate-invoice", {
      body: { order_id, payment_id: razorpay_payment_id },
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
