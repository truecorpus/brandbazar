
-- 1. REVIEWS: Prevent customers from modifying admin-only fields
CREATE OR REPLACE FUNCTION public.protect_review_admin_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- If the user is NOT staff/admin, prevent changes to sensitive fields
  IF NOT is_staff_or_above(auth.uid()) THEN
    NEW.status := 'pending'; -- Always reset to pending on user edit
    NEW.is_verified_purchase := OLD.is_verified_purchase;
    NEW.approved_at := OLD.approved_at;
    NEW.admin_response := OLD.admin_response;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_review_admin_fields_trigger
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.protect_review_admin_fields();

-- 2. ORDER ITEMS: Enforce server-side pricing on insert
CREATE OR REPLACE FUNCTION public.enforce_order_item_pricing()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  actual_price numeric;
  variant_additional numeric;
BEGIN
  -- Staff/admin can set prices directly
  IF is_staff_or_above(auth.uid()) THEN
    RETURN NEW;
  END IF;

  -- Look up the actual price
  IF NEW.variant_id IS NOT NULL THEN
    SELECT p.base_price, COALESCE(pv.additional_price, 0)
    INTO actual_price, variant_additional
    FROM public.products p
    JOIN public.product_variants pv ON pv.product_id = p.id
    WHERE pv.id = NEW.variant_id;
    
    IF actual_price IS NOT NULL THEN
      NEW.unit_price := actual_price + variant_additional;
    END IF;
  ELSIF NEW.product_id IS NOT NULL THEN
    SELECT p.base_price INTO actual_price
    FROM public.products p
    WHERE p.id = NEW.product_id;
    
    IF actual_price IS NOT NULL THEN
      NEW.unit_price := actual_price;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_order_item_pricing_trigger
BEFORE INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.enforce_order_item_pricing();

-- 3. ORDERS: Enforce safe defaults for customer-created orders
CREATE OR REPLACE FUNCTION public.enforce_order_defaults()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Staff/admin can set values directly
  IF is_staff_or_above(auth.uid()) THEN
    RETURN NEW;
  END IF;

  -- Reset sensitive financial fields to safe defaults
  NEW.discount_amount := 0;
  NEW.advance_amount := 0;
  NEW.advance_paid := false;
  NEW.payment_status := 'pending';
  NEW.order_status := 'pending_payment';
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_order_defaults_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.enforce_order_defaults();

-- 4. COUPONS: Restrict public SELECT to authenticated users only
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;
CREATE POLICY "Authenticated users can view active coupons"
ON public.coupons
FOR SELECT
TO authenticated
USING ((is_active = true) AND ((valid_until IS NULL) OR (valid_until > now())));
