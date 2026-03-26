
-- ============================================
-- BRANDBAZAAR DATABASE ARCHITECTURE
-- Part 1: Enums, Functions, All 20 Tables, RLS, Triggers, Indexes
-- ============================================

-- 1. APP ROLE ENUM
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'staff', 'corporate_client', 'individual_customer');

-- 2. USER ROLES TABLE
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. SECURITY DEFINER FUNCTIONS
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE OR REPLACE FUNCTION public.is_admin_or_above(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin', 'admin')) $$;

CREATE OR REPLACE FUNCTION public.is_staff_or_above(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin', 'admin', 'staff')) $$;

-- 4. UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- TABLE 1: PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT, phone TEXT, profile_photo_url TEXT,
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'pending')),
  gst_number TEXT, company_name TEXT, designation TEXT,
  preferred_language TEXT DEFAULT 'en', newsletter_opt_in BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'individual_customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TABLE 2: ADDRESSES
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT DEFAULT 'Home' CHECK (label IN ('Home', 'Office', 'Warehouse', 'Other')),
  recipient_name TEXT NOT NULL, phone TEXT, address_line_1 TEXT NOT NULL, address_line_2 TEXT,
  city TEXT NOT NULL, state TEXT NOT NULL, pincode TEXT NOT NULL, country TEXT NOT NULL DEFAULT 'India',
  is_default BOOLEAN DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 3: CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, description TEXT,
  icon_url TEXT, banner_image_url TEXT, display_order INT DEFAULT 0, is_active BOOLEAN DEFAULT true,
  meta_title TEXT, meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 4: PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  short_description TEXT, long_description TEXT,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0, bulk_price_tiers JSONB DEFAULT '[]'::jsonb,
  gst_rate NUMERIC(5,2) DEFAULT 18.00, hsn_code TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  is_featured BOOLEAN DEFAULT false, is_corporate_pick BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0, meta_title TEXT, meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
ALTER TABLE public.products ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(long_description, ''))) STORED;
CREATE INDEX idx_products_fts ON public.products USING GIN(fts);

-- TABLE 5: PRODUCT VARIANTS
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_name TEXT NOT NULL, sku TEXT UNIQUE, color TEXT, size TEXT, material TEXT,
  stock_quantity INT DEFAULT 0, additional_price NUMERIC(10,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  variant_image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 6: PRODUCT IMAGES
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL, alt_text TEXT, display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  image_type TEXT DEFAULT 'product_shot' CHECK (image_type IN ('product_shot', 'lifestyle', 'print_area', 'mockup')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- TABLE 7: CUSTOMIZATION OPTIONS
CREATE TABLE public.customization_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  option_type TEXT NOT NULL CHECK (option_type IN ('print_side', 'print_method', 'color', 'size', 'material', 'finish')),
  option_label TEXT NOT NULL, option_values JSONB NOT NULL DEFAULT '[]'::jsonb, is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.customization_options ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_customization_options_updated_at BEFORE UPDATE ON public.customization_options FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 8: CORPORATE ACCOUNTS
CREATE TABLE public.corporate_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL, gst_number TEXT, pan_number TEXT, company_address TEXT,
  industry_type TEXT, company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '500+')),
  account_manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  payment_terms TEXT DEFAULT 'immediate' CHECK (payment_terms IN ('immediate', 'net_15', 'net_30')),
  credit_limit NUMERIC(12,2) DEFAULT 0, current_balance NUMERIC(12,2) DEFAULT 0,
  pricing_tier TEXT DEFAULT 'standard' CHECK (pricing_tier IN ('standard', 'silver', 'gold', 'platinum')),
  contract_start_date DATE, contract_end_date DATE, is_active BOOLEAN DEFAULT true,
  onboarding_date DATE DEFAULT CURRENT_DATE, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.corporate_accounts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_corporate_accounts_updated_at BEFORE UPDATE ON public.corporate_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.corporate_account_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  corporate_account_id UUID REFERENCES public.corporate_accounts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_primary_contact BOOLEAN DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(corporate_account_id, user_id)
);
ALTER TABLE public.corporate_account_members ENABLE ROW LEVEL SECURITY;

-- TABLE 9: ORDERS
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE, customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  order_type TEXT NOT NULL DEFAULT 'retail' CHECK (order_type IN ('retail', 'bulk', 'corporate')),
  order_status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (order_status IN ('pending_payment', 'confirmed', 'in_production', 'quality_check', 'dispatched', 'delivered', 'cancelled', 'refund_requested', 'refunded')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partially_paid', 'refunded')),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0, gst_amount NUMERIC(12,2) DEFAULT 0,
  shipping_amount NUMERIC(10,2) DEFAULT 0, discount_amount NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0, currency TEXT DEFAULT 'INR',
  shipping_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  billing_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  special_instructions TEXT, internal_notes TEXT, expected_delivery_date DATE,
  assigned_staff_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  corporate_account_id UUID REFERENCES public.corporate_accounts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
DECLARE seq_num INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 9) AS INT)), 0) + 1 INTO seq_num FROM public.orders WHERE order_number LIKE 'BB-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.order_number := 'BB-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER set_order_number BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- TABLE 10: ORDER ITEMS
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity INT NOT NULL DEFAULT 1, unit_price NUMERIC(10,2) NOT NULL,
  customization_selections JSONB DEFAULT '{}'::jsonb, artwork_file_urls TEXT[] DEFAULT '{}',
  mockup_approved BOOLEAN DEFAULT false, mockup_url TEXT,
  production_status TEXT DEFAULT 'pending' CHECK (production_status IN ('pending', 'printing', 'finishing', 'quality_check', 'packed', 'shipped')),
  print_notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- TABLE 11: QUOTES
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE, customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  lead_email TEXT, lead_name TEXT, lead_phone TEXT,
  corporate_account_id UUID REFERENCES public.corporate_accounts(id) ON DELETE SET NULL,
  products_requested JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_estimated_amount NUMERIC(12,2),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until DATE, admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), responded_at TIMESTAMPTZ, updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS TRIGGER AS $$
DECLARE seq_num INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 9) AS INT)), 0) + 1 INTO seq_num FROM public.quotes WHERE quote_number LIKE 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-%';
  NEW.quote_number := 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(seq_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER set_quote_number BEFORE INSERT ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.generate_quote_number();

-- TABLE 12: ARTWORK UPLOADS
CREATE TABLE public.artwork_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  file_url TEXT NOT NULL, file_name TEXT NOT NULL, file_type TEXT, file_size BIGINT,
  review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'revision_needed')),
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, reviewer_notes TEXT, is_final_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.artwork_uploads ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_artwork_uploads_updated_at BEFORE UPDATE ON public.artwork_uploads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 13: MOCKUPS
CREATE TABLE public.mockups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  mockup_image_url TEXT NOT NULL, version_number INT DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent_to_client', 'approved', 'rejected')),
  client_feedback TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), client_responded_at TIMESTAMPTZ
);
ALTER TABLE public.mockups ENABLE ROW LEVEL SECURITY;

-- TABLE 14: PAYMENTS
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  payment_gateway TEXT CHECK (payment_gateway IN ('razorpay', 'manual', 'bank_transfer', 'upi')),
  gateway_transaction_id TEXT, amount NUMERIC(12,2) NOT NULL, currency TEXT DEFAULT 'INR',
  payment_method TEXT CHECK (payment_method IN ('upi', 'card', 'netbanking', 'wallet', 'neft')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded')),
  payment_date TIMESTAMPTZ, gst_invoice_number TEXT, invoice_url TEXT,
  refund_amount NUMERIC(10,2), refund_date TIMESTAMPTZ, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- TABLE 15: SHIPMENTS
CREATE TABLE public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  courier_partner TEXT, tracking_number TEXT, tracking_url TEXT,
  shipment_status TEXT DEFAULT 'booked' CHECK (shipment_status IN ('booked', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'returned')),
  dispatch_date DATE, expected_delivery_date DATE, actual_delivery_date DATE,
  delivery_proof_url TEXT, weight NUMERIC(8,2), dimensions TEXT, shipping_cost NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON public.shipments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 16: NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('order_update', 'payment', 'mockup_ready', 'quote_received', 'artwork_review', 'system_alert')),
  title TEXT NOT NULL, message TEXT, is_read BOOLEAN DEFAULT false, action_url TEXT,
  channel TEXT DEFAULT 'in_app' CHECK (channel IN ('in_app', 'email', 'sms', 'whatsapp')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- TABLE 17: REVIEWS
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5), review_title TEXT, review_body TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_response TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), approved_at TIMESTAMPTZ
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- TABLE 18: COUPONS
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE, description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat', 'free_shipping')),
  discount_value NUMERIC(10,2) NOT NULL DEFAULT 0, min_order_value NUMERIC(10,2) DEFAULT 0,
  max_discount_cap NUMERIC(10,2), applicable_product_ids UUID[] DEFAULT '{}',
  applicable_category_ids UUID[] DEFAULT '{}', valid_from TIMESTAMPTZ, valid_until TIMESTAMPTZ,
  usage_limit_total INT, usage_limit_per_user INT DEFAULT 1, times_used INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true, created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- TABLE 19: CMS CONTENT
CREATE TABLE public.cms_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('hero_banner', 'announcement_bar', 'promotional_strip', 'blog_post', 'faq_item')),
  title TEXT NOT NULL, subtitle TEXT, body TEXT, image_url TEXT, cta_text TEXT, cta_link TEXT,
  display_order INT DEFAULT 0, is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMPTZ, valid_until TIMESTAMPTZ,
  target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'corporate', 'individual')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON public.cms_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TABLE 20: AUDIT LOG
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL, affected_table TEXT NOT NULL, affected_record_id UUID,
  old_value JSONB, new_value JSONB, ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin_or_above(auth.uid()));
CREATE POLICY "System can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all addresses" ON public.addresses FOR SELECT USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Anyone can view active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Staff can manage products" ON public.products FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Anyone can view active variants" ON public.product_variants FOR SELECT USING (status = 'active');
CREATE POLICY "Staff can manage variants" ON public.product_variants FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Anyone can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Staff can manage product images" ON public.product_images FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Anyone can view customization options" ON public.customization_options FOR SELECT USING (true);
CREATE POLICY "Staff can manage customization options" ON public.customization_options FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Members can view own corp account" ON public.corporate_accounts FOR SELECT USING (id IN (SELECT corporate_account_id FROM public.corporate_account_members WHERE user_id = auth.uid()));
CREATE POLICY "Admins can manage corp accounts" ON public.corporate_accounts FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Members can view own membership" ON public.corporate_account_members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage memberships" ON public.corporate_account_members FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Customers can view own orders" ON public.orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers can create orders" ON public.orders FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Staff can view all orders" ON public.orders FOR SELECT USING (public.is_staff_or_above(auth.uid()));
CREATE POLICY "Staff can update orders" ON public.orders FOR UPDATE USING (public.is_staff_or_above(auth.uid()));
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Customers can view own order items" ON public.order_items FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE customer_id = auth.uid()));
CREATE POLICY "Customers can insert order items" ON public.order_items FOR INSERT WITH CHECK (order_id IN (SELECT id FROM public.orders WHERE customer_id = auth.uid()));
CREATE POLICY "Staff can manage order items" ON public.order_items FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Users can view own quotes" ON public.quotes FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Anyone can create quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can manage quotes" ON public.quotes FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Users can view own artwork" ON public.artwork_uploads FOR SELECT USING (uploaded_by = auth.uid());
CREATE POLICY "Users can upload artwork" ON public.artwork_uploads FOR INSERT WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "Staff can manage artwork" ON public.artwork_uploads FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Customers can view own mockups" ON public.mockups FOR SELECT USING (order_item_id IN (SELECT oi.id FROM public.order_items oi JOIN public.orders o ON oi.order_id = o.id WHERE o.customer_id = auth.uid()));
CREATE POLICY "Staff can manage mockups" ON public.mockups FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Customers can view own payments" ON public.payments FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE customer_id = auth.uid()));
CREATE POLICY "Staff can manage payments" ON public.payments FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Customers can view own shipments" ON public.shipments FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE customer_id = auth.uid()));
CREATE POLICY "Staff can manage shipments" ON public.shipments FOR ALL USING (public.is_staff_or_above(auth.uid()));

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (recipient_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (recipient_id = auth.uid());
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (reviewer_id = auth.uid());
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (reviewer_id = auth.uid());
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Anyone can view active coupons" ON public.coupons FOR SELECT USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Anyone can view active CMS" ON public.cms_content FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage CMS" ON public.cms_content FOR ALL USING (public.is_admin_or_above(auth.uid()));

CREATE POLICY "Admins can view audit log" ON public.audit_log FOR SELECT USING (public.is_admin_or_above(auth.uid()));
CREATE POLICY "System can insert audit log" ON public.audit_log FOR INSERT WITH CHECK (true);

-- ORDER STATUS NOTIFICATION TRIGGER
CREATE OR REPLACE FUNCTION public.notify_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.order_status IS DISTINCT FROM NEW.order_status THEN
    INSERT INTO public.notifications (recipient_id, notification_type, title, message, action_url)
    VALUES (NEW.customer_id, 'order_update', 'Order ' || NEW.order_number || ' Updated', 'Your order status changed to: ' || REPLACE(NEW.order_status, '_', ' '), '/orders/' || NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_order_status_change AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.notify_order_status_change();

-- PERFORMANCE INDEXES
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);
CREATE INDEX idx_orders_corporate_account ON public.orders(corporate_account_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_quotes_customer_id ON public.quotes(customer_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_notifications_recipient ON public.notifications(recipient_id, is_read);
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_audit_log_admin ON public.audit_log(admin_user_id);
CREATE INDEX idx_audit_log_table ON public.audit_log(affected_table);
