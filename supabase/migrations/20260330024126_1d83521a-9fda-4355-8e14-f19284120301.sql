
-- Invoices table for GST-compliant invoices
CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE,
  invoice_type text NOT NULL DEFAULT 'tax_invoice', -- tax_invoice, proforma, credit_note
  order_id uuid REFERENCES public.orders(id),
  payment_id uuid REFERENCES public.payments(id),
  customer_id uuid NOT NULL,
  corporate_account_id uuid REFERENCES public.corporate_accounts(id),
  
  -- Seller info
  seller_gstin text,
  seller_pan text,
  seller_company text,
  seller_address text,
  
  -- Buyer info  
  buyer_name text,
  buyer_gstin text,
  buyer_address text,
  buyer_state text,
  buyer_state_code text,
  
  -- Shipping address
  shipping_address text,
  shipping_state text,
  
  -- Financial
  subtotal numeric NOT NULL DEFAULT 0,
  discount_amount numeric DEFAULT 0,
  taxable_amount numeric NOT NULL DEFAULT 0,
  cgst_rate numeric DEFAULT 0,
  cgst_amount numeric DEFAULT 0,
  sgst_rate numeric DEFAULT 0,
  sgst_amount numeric DEFAULT 0,
  igst_rate numeric DEFAULT 0,
  igst_amount numeric DEFAULT 0,
  total_gst numeric DEFAULT 0,
  grand_total numeric NOT NULL DEFAULT 0,
  amount_in_words text,
  
  -- Items stored as JSONB array
  line_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  
  -- Metadata
  invoice_date timestamp with time zone DEFAULT now(),
  due_date timestamp with time zone,
  payment_method text,
  transaction_id text,
  notes text,
  
  -- Credit note specific
  original_invoice_id uuid REFERENCES public.invoices(id),
  credit_reason text,
  
  -- PDF storage
  pdf_url text,
  
  -- Status
  status text DEFAULT 'draft', -- draft, issued, paid, cancelled, credit_noted
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can manage all invoices" ON public.invoices FOR ALL TO public USING (is_admin_or_above(auth.uid()));
CREATE POLICY "Staff can view invoices" ON public.invoices FOR SELECT TO public USING (is_staff_or_above(auth.uid()));
CREATE POLICY "Customers can view own invoices" ON public.invoices FOR SELECT TO public USING (customer_id = auth.uid());

-- Auto-generate invoice numbers
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
DECLARE seq_num INT; prefix TEXT;
BEGIN
  IF NEW.invoice_type = 'tax_invoice' THEN prefix := 'BB-INV';
  ELSIF NEW.invoice_type = 'proforma' THEN prefix := 'BB-PI';
  ELSIF NEW.invoice_type = 'credit_note' THEN prefix := 'BB-CN';
  ELSE prefix := 'BB-INV';
  END IF;
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM LENGTH(prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-') + 1) AS INT)), 0) + 1
  INTO seq_num FROM public.invoices
  WHERE invoice_number LIKE prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.invoice_number := prefix || '-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_generate_invoice_number BEFORE INSERT ON public.invoices
FOR EACH ROW WHEN (NEW.invoice_number IS NULL) EXECUTE FUNCTION generate_invoice_number();

-- Updated_at trigger
CREATE TRIGGER trg_invoices_updated_at BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add advance_payment fields to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS advance_amount numeric DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS advance_paid boolean DEFAULT false;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS remaining_amount numeric DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_terms text DEFAULT 'full_payment';

-- Create invoices storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('invoices', 'invoices', false) ON CONFLICT (id) DO NOTHING;

-- RLS for invoices bucket
CREATE POLICY "Admins can manage invoice files" ON storage.objects FOR ALL TO public
USING (bucket_id = 'invoices' AND is_admin_or_above(auth.uid()));

CREATE POLICY "Customers can view own invoice files" ON storage.objects FOR SELECT TO public
USING (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);
