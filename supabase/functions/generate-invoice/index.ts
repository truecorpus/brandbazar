import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SELLER_INFO = {
  company: "BrandBazaar Pvt Ltd",
  address: "123 MG Road, Bengaluru, Karnataka 560001",
  gstin: "29AABCB1234A1Z5",
  pan: "AABCB1234A",
  state: "Karnataka",
  state_code: "29",
};

function numberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (num === 0) return "Zero";
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = Math.floor((num % 1000) / 100);
  const remainder = Math.floor(num % 100);
  let result = "";
  if (crore) result += numberToWords(crore) + " Crore ";
  if (lakh) result += numberToWords(lakh) + " Lakh ";
  if (thousand) result += numberToWords(thousand) + " Thousand ";
  if (hundred) result += ones[hundred] + " Hundred ";
  if (remainder) {
    if (remainder < 20) result += ones[remainder];
    else result += tens[Math.floor(remainder / 10)] + " " + ones[remainder % 10];
  }
  return result.trim();
}

function amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let result = "Indian Rupees " + numberToWords(rupees);
  if (paise > 0) result += " and " + numberToWords(paise) + " Paise";
  return result + " Only";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { order_id, payment_id, invoice_type = "tax_invoice" } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get order with items
    const { data: order } = await supabase.from("orders").select("*").eq("id", order_id).single();
    if (!order) throw new Error("Order not found");

    const { data: items } = await supabase.from("order_items").select("*, products(name, hsn_code, gst_rate, base_price)").eq("order_id", order_id);

    // Get customer profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", order.customer_id).single();

    // Get shipping address
    let shippingAddr = null;
    if (order.shipping_address_id) {
      const { data } = await supabase.from("addresses").select("*").eq("id", order.shipping_address_id).single();
      shippingAddr = data;
    }

    // Get billing address
    let billingAddr = shippingAddr;
    if (order.billing_address_id) {
      const { data } = await supabase.from("addresses").select("*").eq("id", order.billing_address_id).single();
      billingAddr = data;
    }

    // Determine if IGST or CGST+SGST
    const buyerState = billingAddr?.state || "";
    const isInterstate = buyerState.toLowerCase() !== SELLER_INFO.state.toLowerCase();

    // Build line items
    const lineItems = (items || []).map(item => {
      const product = item.products as any;
      const gstRate = Number(product?.gst_rate || 18);
      const taxableAmt = Number(item.unit_price) * item.quantity;
      const gstAmt = taxableAmt * (gstRate / 100);
      return {
        product_name: product?.name || "Product",
        hsn_code: product?.hsn_code || "",
        quantity: item.quantity,
        unit_price: Number(item.unit_price),
        taxable_amount: taxableAmt,
        gst_rate: gstRate,
        cgst_rate: isInterstate ? 0 : gstRate / 2,
        cgst_amount: isInterstate ? 0 : gstAmt / 2,
        sgst_rate: isInterstate ? 0 : gstRate / 2,
        sgst_amount: isInterstate ? 0 : gstAmt / 2,
        igst_rate: isInterstate ? gstRate : 0,
        igst_amount: isInterstate ? gstAmt : 0,
        total: taxableAmt + gstAmt,
      };
    });

    const totalTaxable = lineItems.reduce((s, i) => s + i.taxable_amount, 0);
    const totalCGST = lineItems.reduce((s, i) => s + i.cgst_amount, 0);
    const totalSGST = lineItems.reduce((s, i) => s + i.sgst_amount, 0);
    const totalIGST = lineItems.reduce((s, i) => s + i.igst_amount, 0);
    const totalGST = totalCGST + totalSGST + totalIGST;
    const grandTotal = totalTaxable + totalGST;

    // Corporate account info
    let corpGstin = null;
    if (order.corporate_account_id) {
      const { data: corp } = await supabase.from("corporate_accounts").select("gst_number, company_name").eq("id", order.corporate_account_id).single();
      if (corp) corpGstin = corp.gst_number;
    }

    // Create invoice record
    const { data: invoice, error: invoiceError } = await supabase.from("invoices").insert({
      invoice_type,
      order_id,
      customer_id: order.customer_id,
      corporate_account_id: order.corporate_account_id,
      seller_gstin: SELLER_INFO.gstin,
      seller_pan: SELLER_INFO.pan,
      seller_company: SELLER_INFO.company,
      seller_address: SELLER_INFO.address,
      buyer_name: profile?.full_name || profile?.company_name || "Customer",
      buyer_gstin: corpGstin || profile?.gst_number || null,
      buyer_address: billingAddr ? `${billingAddr.address_line_1}, ${billingAddr.city}, ${billingAddr.state} ${billingAddr.pincode}` : null,
      buyer_state: buyerState,
      buyer_state_code: billingAddr?.state || null,
      shipping_address: shippingAddr ? `${shippingAddr.address_line_1}, ${shippingAddr.city}, ${shippingAddr.state} ${shippingAddr.pincode}` : null,
      shipping_state: shippingAddr?.state,
      subtotal: Number(order.subtotal),
      discount_amount: Number(order.discount_amount || 0),
      taxable_amount: totalTaxable,
      cgst_rate: isInterstate ? 0 : (lineItems[0]?.gst_rate || 18) / 2,
      cgst_amount: totalCGST,
      sgst_rate: isInterstate ? 0 : (lineItems[0]?.gst_rate || 18) / 2,
      sgst_amount: totalSGST,
      igst_rate: isInterstate ? (lineItems[0]?.gst_rate || 18) : 0,
      igst_amount: totalIGST,
      total_gst: totalGST,
      grand_total: grandTotal,
      amount_in_words: amountInWords(grandTotal),
      line_items: lineItems,
      payment_method: "razorpay",
      transaction_id: payment_id || null,
      status: invoice_type === "proforma" ? "draft" : "issued",
    }).select().single();

    if (invoiceError) throw invoiceError;

    // Update payment record with GST invoice number
    if (payment_id && invoice) {
      await supabase.from("payments").update({
        gst_invoice_number: invoice.invoice_number,
      }).eq("gateway_transaction_id", payment_id);
    }

    return new Response(JSON.stringify({ success: true, invoice_number: invoice?.invoice_number }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
