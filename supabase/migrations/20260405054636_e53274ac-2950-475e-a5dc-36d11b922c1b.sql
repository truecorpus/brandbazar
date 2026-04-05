
-- Create customer-facing view for orders (excludes internal_notes, assigned_staff_id)
CREATE OR REPLACE VIEW public.customer_orders AS
SELECT
  id, order_number, customer_id, order_type, order_status, payment_status,
  subtotal, discount_amount, gst_amount, shipping_amount, total_amount,
  currency, advance_amount, advance_paid, remaining_amount, payment_terms,
  shipping_address_id, billing_address_id, shipping_zone_id, shipping_method,
  corporate_account_id, special_instructions, expected_delivery_date,
  production_days, created_at, updated_at
FROM public.orders;

ALTER VIEW public.customer_orders SET (security_invoker = true);

-- Create customer-facing view for quotes (excludes admin_notes)
CREATE OR REPLACE VIEW public.customer_quotes AS
SELECT
  id, quote_number, customer_id, lead_name, lead_email, lead_phone,
  products_requested, corporate_account_id, status,
  total_estimated_amount, valid_until, responded_at, created_at, updated_at
FROM public.quotes;

ALTER VIEW public.customer_quotes SET (security_invoker = true);

-- Create customer-facing view for return_requests (excludes admin_notes, reviewed_by)
CREATE OR REPLACE VIEW public.customer_return_requests AS
SELECT
  id, order_id, customer_id, reason, description, photo_urls,
  status, refund_amount, refund_status, return_tracking_number,
  return_courier, credit_note_id, reviewed_at, created_at, updated_at
FROM public.return_requests;

ALTER VIEW public.customer_return_requests SET (security_invoker = true);
