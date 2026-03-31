
-- Shipping zones configuration
CREATE TABLE public.shipping_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_name text NOT NULL,
  zone_type text NOT NULL DEFAULT 'national',
  free_shipping_threshold numeric DEFAULT 0,
  flat_rate numeric DEFAULT 0,
  express_rate numeric DEFAULT 0,
  standard_days integer DEFAULT 5,
  express_days integer DEFAULT 2,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active shipping zones" ON public.shipping_zones
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage shipping zones" ON public.shipping_zones
  FOR ALL USING (is_admin_or_above(auth.uid()));

-- Pincode serviceability
CREATE TABLE public.pincode_serviceability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pincode text NOT NULL,
  zone_id uuid REFERENCES public.shipping_zones(id) ON DELETE SET NULL,
  city text,
  state text,
  is_serviceable boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pincode_serviceability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can check pincode" ON public.pincode_serviceability
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage pincodes" ON public.pincode_serviceability
  FOR ALL USING (is_admin_or_above(auth.uid()));

CREATE UNIQUE INDEX idx_pincode_unique ON public.pincode_serviceability(pincode);

-- Return requests
CREATE TABLE public.return_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL,
  reason text NOT NULL,
  description text,
  photo_urls text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  refund_amount numeric DEFAULT 0,
  refund_status text DEFAULT 'none',
  credit_note_id uuid REFERENCES public.invoices(id),
  return_tracking_number text,
  return_courier text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own returns" ON public.return_requests
  FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers can create returns" ON public.return_requests
  FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Staff can manage returns" ON public.return_requests
  FOR ALL USING (is_staff_or_above(auth.uid()));

-- Add shipping_zone_id to orders for zone tracking
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_zone_id uuid REFERENCES public.shipping_zones(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_method text DEFAULT 'standard';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS production_days integer DEFAULT 3;

-- Triggers for updated_at
CREATE TRIGGER update_shipping_zones_updated_at BEFORE UPDATE ON public.shipping_zones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_return_requests_updated_at BEFORE UPDATE ON public.return_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
