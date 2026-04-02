
-- 1. Product type enum
CREATE TYPE public.product_type AS ENUM (
  'mug', 'tshirt', 'cap', 'idcard', 'lamp', 'keychain', 'notebook', 'kit'
);

-- 2. PRODUCT TEMPLATES
CREATE TABLE public.product_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name text NOT NULL,
  product_type public.product_type NOT NULL,
  canvas_width integer NOT NULL DEFAULT 1000,
  canvas_height integer NOT NULL DEFAULT 1000,
  base_product_image_url text,
  print_zones jsonb NOT NULL DEFAULT '[]'::jsonb,
  views jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.product_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active templates" ON public.product_templates FOR SELECT USING (status = 'active');
CREATE POLICY "Staff can manage templates" ON public.product_templates FOR ALL USING (is_staff_or_above(auth.uid()));
CREATE TRIGGER update_product_templates_updated_at BEFORE UPDATE ON public.product_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. DESIGN ELEMENTS LIBRARY
CREATE TABLE public.design_elements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  element_type text NOT NULL,
  element_name text NOT NULL,
  category text NOT NULL DEFAULT 'corporate',
  svg_content text,
  image_url text,
  tags text[] DEFAULT '{}'::text[],
  is_premium boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.design_elements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view elements" ON public.design_elements FOR SELECT USING (true);
CREATE POLICY "Admins can manage elements" ON public.design_elements FOR ALL USING (is_admin_or_above(auth.uid()));

-- 4. FONT LIBRARY
CREATE TABLE public.font_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  font_name text NOT NULL,
  font_family text NOT NULL,
  font_file_url text,
  preview_text_image_url text,
  category text NOT NULL DEFAULT 'sans-serif',
  is_safe_for_print boolean DEFAULT true,
  min_recommended_size integer DEFAULT 8,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.font_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active fonts" ON public.font_library FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage fonts" ON public.font_library FOR ALL USING (is_admin_or_above(auth.uid()));

-- 5. CUSTOMIZATION SESSIONS
CREATE TABLE public.customization_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_user_id uuid,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  template_id uuid REFERENCES public.product_templates(id) ON DELETE SET NULL,
  session_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  active_view text DEFAULT 'front',
  selected_print_method text,
  selected_variant_id uuid REFERENCES public.product_variants(id) ON DELETE SET NULL,
  session_status text NOT NULL DEFAULT 'active',
  last_modified_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  device_type text DEFAULT 'desktop'
);
ALTER TABLE public.customization_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own sessions" ON public.customization_sessions FOR ALL USING (customer_user_id = auth.uid());
CREATE POLICY "Staff can view all sessions" ON public.customization_sessions FOR SELECT USING (is_staff_or_above(auth.uid()));
CREATE TRIGGER update_sessions_last_modified BEFORE UPDATE ON public.customization_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for auto-save
ALTER PUBLICATION supabase_realtime ADD TABLE public.customization_sessions;

-- 6. SAVED DESIGNS
CREATE TABLE public.saved_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.customization_sessions(id) ON DELETE SET NULL,
  customer_user_id uuid NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  template_id uuid REFERENCES public.product_templates(id) ON DELETE SET NULL,
  design_name text DEFAULT 'Untitled Design',
  design_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  preview_image_urls text[] DEFAULT '{}'::text[],
  print_file_status text DEFAULT 'pending_generation',
  print_file_urls text[] DEFAULT '{}'::text[],
  customization_summary jsonb DEFAULT '{}'::jsonb,
  is_approved_by_admin boolean DEFAULT false,
  admin_approval_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz
);
ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own designs" ON public.saved_designs FOR ALL USING (customer_user_id = auth.uid());
CREATE POLICY "Staff can manage all designs" ON public.saved_designs FOR ALL USING (is_staff_or_above(auth.uid()));

-- 7. DESIGN LAYERS
CREATE TABLE public.design_layers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id uuid NOT NULL REFERENCES public.saved_designs(id) ON DELETE CASCADE,
  layer_type text NOT NULL,
  layer_order integer NOT NULL DEFAULT 0,
  print_zone_id text,
  content text,
  position_x numeric DEFAULT 0,
  position_y numeric DEFAULT 0,
  width numeric DEFAULT 100,
  height numeric DEFAULT 100,
  rotation numeric DEFAULT 0,
  opacity numeric DEFAULT 1,
  font_id uuid REFERENCES public.font_library(id) ON DELETE SET NULL,
  font_size numeric,
  font_color text,
  font_weight text,
  font_style text,
  text_alignment text,
  letter_spacing numeric,
  fill_color text,
  stroke_color text,
  stroke_width numeric,
  filters_applied jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.design_layers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own design layers" ON public.design_layers FOR SELECT USING (
  design_id IN (SELECT id FROM public.saved_designs WHERE customer_user_id = auth.uid())
);
CREATE POLICY "Users can manage own design layers" ON public.design_layers FOR ALL USING (
  design_id IN (SELECT id FROM public.saved_designs WHERE customer_user_id = auth.uid())
);
CREATE POLICY "Staff can manage all layers" ON public.design_layers FOR ALL USING (is_staff_or_above(auth.uid()));

-- 8. DESIGN TEMPLATES GALLERY
CREATE TABLE public.design_templates_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  product_template_id uuid REFERENCES public.product_templates(id) ON DELETE CASCADE,
  thumbnail_url text,
  design_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  category text DEFAULT 'corporate',
  industry_tags text[] DEFAULT '{}'::text[],
  is_featured boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.design_templates_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view gallery templates" ON public.design_templates_gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.design_templates_gallery FOR ALL USING (is_admin_or_above(auth.uid()));

-- 9. CUSTOMIZATION PRICING RULES
CREATE TABLE public.customization_pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  rule_name text NOT NULL,
  rule_type text NOT NULL,
  additional_cost_per_unit numeric NOT NULL DEFAULT 0,
  minimum_quantity integer DEFAULT 1,
  rule_description text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.customization_pricing_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active pricing rules" ON public.customization_pricing_rules FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage pricing rules" ON public.customization_pricing_rules FOR ALL USING (is_admin_or_above(auth.uid()));

-- 10. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('design-uploads', 'design-uploads', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('design-previews', 'design-previews', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('print-files', 'print-files', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('design-templates', 'design-templates', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('element-library', 'element-library', true);

-- Storage policies: design-uploads (private, user-scoped)
CREATE POLICY "Users can upload own designs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'design-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own design uploads" ON storage.objects FOR SELECT USING (bucket_id = 'design-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Staff can view all design uploads" ON storage.objects FOR SELECT USING (bucket_id = 'design-uploads' AND public.is_staff_or_above(auth.uid()));

-- Storage policies: design-previews (private, user-scoped)
CREATE POLICY "Users can view own previews" ON storage.objects FOR SELECT USING (bucket_id = 'design-previews' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Service can manage previews" ON storage.objects FOR ALL USING (bucket_id = 'design-previews' AND auth.role() = 'service_role');

-- Storage policies: print-files (private, staff only)
CREATE POLICY "Staff can manage print files" ON storage.objects FOR ALL USING (bucket_id = 'print-files' AND public.is_staff_or_above(auth.uid()));

-- Storage policies: design-templates (public read)
CREATE POLICY "Anyone can view design templates" ON storage.objects FOR SELECT USING (bucket_id = 'design-templates');
CREATE POLICY "Admins can manage design template assets" ON storage.objects FOR ALL USING (bucket_id = 'design-templates' AND public.is_admin_or_above(auth.uid()));

-- Storage policies: element-library (public read)
CREATE POLICY "Anyone can view element library" ON storage.objects FOR SELECT USING (bucket_id = 'element-library');
CREATE POLICY "Admins can manage element library" ON storage.objects FOR ALL USING (bucket_id = 'element-library' AND public.is_admin_or_above(auth.uid()));
